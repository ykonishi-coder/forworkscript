/**
 * Slide Maker - Google Slides GAS Web App
 *
 * スライド作成チームの builder が、Google Slides を生成するためのGAS側エンドポイント。
 *
 * デプロイ方法:
 * 1. Google Apps Script で新規プロジェクト作成
 * 2. このコードをコピー
 * 3. プロパティ設定:
 *    - ACCESS_TOKEN: 任意のシークレット文字列
 *    - ALLOWED_PRESENTATION_IDS: 編集を許可する既存プレゼンIDのカンマ区切り（新規作成だけなら空でOK）
 * 4. 初回実行で権限承認
 * 5. Web App としてデプロイ（実行: 自分、アクセス: 自分のみ）
 * 6. 発行されたURLを config.yaml の google_slides.web_app_url に保存
 *
 * セキュリティ設計:
 * - ACCESS_TOKEN による簡易認証
 * - 既存プレゼン編集時は ALLOWED_PRESENTATION_IDS でホワイトリスト制御
 * - 新規作成は自由（自分のDrive内のみ）
 * - 全リクエストをログ記録
 */

function doPost(e) {
  return handleRequest_(e, 'POST');
}

function doGet(e) {
  return handleRequest_(e, 'GET');
}

function handleRequest_(e, method) {
  try {
    // 認証
    const token = (e.parameter && e.parameter.token) || '';
    const expected = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
    if (!expected || token !== expected) {
      return jsonResponse_({ status: 'error', message: 'unauthorized' });
    }

    const body = e.postData ? JSON.parse(e.postData.contents) : {};
    const action = (e.parameter && e.parameter.action) || body.action || '';

    console.log(`[${new Date().toISOString()}] ${method} action=${action}`);

    switch (action) {
      case 'ping':
        return jsonResponse_({ status: 'ok', message: 'pong' });
      case 'create_presentation':
        return jsonResponse_(createPresentation_(body));
      case 'add_slide':
        return jsonResponse_(addSlide_(body));
      case 'get_presentation':
        return jsonResponse_(getPresentation_(body));
      default:
        return jsonResponse_({ status: 'error', message: `unknown action: ${action}` });
    }
  } catch (err) {
    console.error(err);
    return jsonResponse_({ status: 'error', message: err.message });
  }
}

/**
 * 新規プレゼンテーション作成
 *
 * body:
 *   title: プレゼンタイトル
 *   theme: { primary, secondary, accent, background, heading_font, body_font }
 *   slides: [{ type, title, ... }]
 */
function createPresentation_(body) {
  const { title, theme, slides } = body;
  if (!title) throw new Error('title is required');

  const pres = SlidesApp.create(title);
  const presId = pres.getId();
  const presUrl = pres.getUrl();

  // 初期の空スライドを削除
  const initialSlides = pres.getSlides();
  if (initialSlides.length > 0) {
    initialSlides[0].remove();
  }

  // テーマ適用 (簡易)
  applyTheme_(pres, theme || {});

  // スライド追加
  if (slides && Array.isArray(slides)) {
    for (const slideSpec of slides) {
      appendSlide_(pres, slideSpec, theme || {});
    }
  }

  return {
    status: 'ok',
    presentationId: presId,
    url: presUrl,
    slideCount: pres.getSlides().length,
  };
}

function applyTheme_(pres, theme) {
  // Google Slides API はテーマの直接操作に制約があるため、
  // 各スライド作成時に色・フォントを個別に適用する方針
  // ここでは主な設定値を返すだけ
  return {
    primary: theme.primary || '#1F2937',
    secondary: theme.secondary || '#6B7280',
    accent: theme.accent || '#3B82F6',
    background: theme.background || '#FFFFFF',
    heading_font: theme.heading_font || 'Arial',
    body_font: theme.body_font || 'Arial',
  };
}

/**
 * スライドを追加
 *
 * spec.type: "title" / "content" / "2column" / "section_header" / "blank"
 */
function appendSlide_(pres, spec, theme) {
  const layoutType = mapLayout_(spec.type);
  const slide = pres.appendSlide(layoutType);

  if (spec.type === 'title') {
    setTextIfExists_(slide, 0, spec.title);
    setTextIfExists_(slide, 1, spec.subtitle);
  } else if (spec.type === 'content') {
    setTextIfExists_(slide, 0, spec.title);
    // 箇条書き
    if (spec.content && Array.isArray(spec.content)) {
      const body = slide.getPlaceholders()[1];
      if (body) {
        body.asShape().getText().setText(spec.content.join('\n'));
      }
    } else if (typeof spec.content === 'string') {
      setTextIfExists_(slide, 1, spec.content);
    }
  } else if (spec.type === '2column') {
    setTextIfExists_(slide, 0, spec.title);
    // 左右の内容は Google Slides の TWO_COLUMNS_TEXT レイアウトに依存
    // （要確認：最新の SlidesApp API で対応するレイアウト名）
    if (spec.left && spec.left.content) {
      setTextIfExists_(slide, 1, Array.isArray(spec.left.content) ? spec.left.content.join('\n') : spec.left.content);
    }
    if (spec.right && spec.right.content) {
      setTextIfExists_(slide, 2, Array.isArray(spec.right.content) ? spec.right.content.join('\n') : spec.right.content);
    }
  } else if (spec.type === 'section_header') {
    setTextIfExists_(slide, 0, spec.title);
    setTextIfExists_(slide, 1, spec.description);
  }
  // blank やその他はプレースホルダーを触らない

  // 注記（スピーカーノート）
  if (spec.notes) {
    slide.getNotesPage().getSpeakerNotesShape().getText().setText(spec.notes);
  }

  return slide;
}

function mapLayout_(type) {
  // SlidesApp.PredefinedLayout の値
  switch (type) {
    case 'title': return SlidesApp.PredefinedLayout.TITLE;
    case 'content': return SlidesApp.PredefinedLayout.TITLE_AND_BODY;
    case '2column': return SlidesApp.PredefinedLayout.TITLE_AND_TWO_COLUMNS;
    case 'section_header': return SlidesApp.PredefinedLayout.SECTION_HEADER;
    case 'blank': return SlidesApp.PredefinedLayout.BLANK;
    default: return SlidesApp.PredefinedLayout.TITLE_AND_BODY;
  }
}

function setTextIfExists_(slide, placeholderIndex, text) {
  if (text === undefined || text === null) return;
  const placeholders = slide.getPlaceholders();
  if (placeholders[placeholderIndex]) {
    placeholders[placeholderIndex].asShape().getText().setText(String(text));
  }
}

/**
 * 既存プレゼンにスライド追加
 */
function addSlide_(body) {
  const { presentationId, slide, theme } = body;
  if (!presentationId) throw new Error('presentationId is required');

  ensureAllowed_(presentationId);

  const pres = SlidesApp.openById(presentationId);
  const newSlide = appendSlide_(pres, slide, theme || {});

  return {
    status: 'ok',
    slideId: newSlide.getObjectId(),
    totalSlides: pres.getSlides().length,
  };
}

/**
 * プレゼン情報取得
 */
function getPresentation_(body) {
  const { presentationId } = body;
  if (!presentationId) throw new Error('presentationId is required');

  ensureAllowed_(presentationId);

  const pres = SlidesApp.openById(presentationId);
  const slides = pres.getSlides().map((s, i) => ({
    index: i,
    objectId: s.getObjectId(),
  }));

  return {
    status: 'ok',
    title: pres.getName(),
    url: pres.getUrl(),
    slideCount: slides.length,
    slides: slides,
  };
}

/**
 * プレゼンID の許可チェック
 * （新規作成は許可なしでもOK、既存プレゼンの編集時のみチェック）
 */
function ensureAllowed_(presentationId) {
  const allowed = PropertiesService.getScriptProperties().getProperty('ALLOWED_PRESENTATION_IDS') || '';
  if (!allowed) {
    // ホワイトリストが空 = すべて許可（ユーザー自身のDrive内のみ物理的にアクセス可能）
    return;
  }
  const list = allowed.split(',').map(s => s.trim()).filter(Boolean);
  if (!list.includes(presentationId)) {
    throw new Error(`presentation not allowed: ${presentationId}`);
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
