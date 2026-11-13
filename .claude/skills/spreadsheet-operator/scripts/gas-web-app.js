/**
 * Spreadsheet Operator - GAS Web App
 *
 * スプレッドシートサポーターがシートを操作するための GAS 側エンドポイント。
 *
 * デプロイ方法: references/gas-web-app-guide.md を参照
 *
 * セキュリティ設計:
 * - ACCESS_TOKEN プロパティによる簡易認証
 * - ALLOWED_SHEET_IDS プロパティで操作可能シートをホワイトリスト
 * - 全リクエストをログに記録
 * - 破壊的操作はドライラン必須
 */

// =====================================================================
// エントリポイント
// =====================================================================

function doPost(e) {
  return handleRequest_(e, 'POST');
}

function doGet(e) {
  return handleRequest_(e, 'GET');
}

function handleRequest_(e, method) {
  try {
    // 認証チェック
    const token = (e.parameter && e.parameter.token) || '';
    const expected = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN');
    if (!expected || token !== expected) {
      return jsonResponse_({ status: 'error', message: 'unauthorized' }, 401);
    }

    // リクエスト解析
    const body = e.postData ? JSON.parse(e.postData.contents) : {};
    const action = (e.parameter && e.parameter.action) || body.action || '';

    console.log(`[${new Date().toISOString()}] ${method} action=${action}`);

    // ディスパッチ
    switch (action) {
      case 'ping':
        return jsonResponse_({ status: 'ok', message: 'pong' });
      case 'read':
        return jsonResponse_(readSheet_(body));
      case 'write':
        return jsonResponse_(writeSheet_(body));
      case 'list_sheets':
        return jsonResponse_(listSheets_(body));
      case 'create_backup':
        return jsonResponse_(createBackup_(body));
      case 'run_dry_run':
        return jsonResponse_(runDryRun_(body));
      default:
        return jsonResponse_({ status: 'error', message: `unknown action: ${action}` }, 400);
    }
  } catch (err) {
    console.error(err);
    return jsonResponse_({ status: 'error', message: err.message }, 500);
  }
}

// =====================================================================
// シートID の許可チェック
// =====================================================================

function ensureAllowed_(sheetId) {
  const allowed = PropertiesService.getScriptProperties().getProperty('ALLOWED_SHEET_IDS') || '';
  const list = allowed.split(',').map(s => s.trim()).filter(Boolean);
  if (!list.includes(sheetId)) {
    throw new Error(`sheet not allowed: ${sheetId}`);
  }
}

// =====================================================================
// 読み取り
// =====================================================================

function readSheet_(body) {
  const { sheetId, sheetName, range } = body;
  ensureAllowed_(sheetId);

  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = sheetName ? ss.getSheetByName(sheetName) : ss.getSheets()[0];
  if (!sheet) throw new Error(`sheet not found: ${sheetName}`);

  const values = range ? sheet.getRange(range).getValues() : sheet.getDataRange().getValues();
  return {
    status: 'ok',
    sheetName: sheet.getName(),
    range: range || sheet.getDataRange().getA1Notation(),
    values: values,
    rowCount: values.length,
    colCount: values[0] ? values[0].length : 0,
  };
}

// =====================================================================
// 書き込み（危険）
// =====================================================================

function writeSheet_(body) {
  const { sheetId, sheetName, range, values, skipBackup } = body;
  ensureAllowed_(sheetId);

  if (!values || !Array.isArray(values)) {
    throw new Error('values must be an array of arrays');
  }

  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error(`sheet not found: ${sheetName}`);

  // バックアップ（skipBackup=true でない限り必ず作る）
  let backupName = null;
  if (!skipBackup) {
    backupName = `${sheetName}_backup_${formatDate_(new Date())}`;
    sheet.copyTo(ss).setName(backupName);
  }

  // 書き込み
  const targetRange = sheet.getRange(range);
  targetRange.setValues(values);

  return {
    status: 'ok',
    wroteRows: values.length,
    wroteCols: values[0] ? values[0].length : 0,
    backup: backupName,
  };
}

// =====================================================================
// シート一覧取得
// =====================================================================

function listSheets_(body) {
  const { sheetId } = body;
  ensureAllowed_(sheetId);

  const ss = SpreadsheetApp.openById(sheetId);
  const sheets = ss.getSheets().map(s => ({
    name: s.getName(),
    rowCount: s.getLastRow(),
    colCount: s.getLastColumn(),
  }));

  return {
    status: 'ok',
    spreadsheetName: ss.getName(),
    sheets: sheets,
  };
}

// =====================================================================
// バックアップ作成
// =====================================================================

function createBackup_(body) {
  const { sheetId, sheetName } = body;
  ensureAllowed_(sheetId);

  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error(`sheet not found: ${sheetName}`);

  const backupName = `${sheetName}_backup_${formatDate_(new Date())}`;
  sheet.copyTo(ss).setName(backupName);

  return {
    status: 'ok',
    backup: backupName,
  };
}

// =====================================================================
// ドライラン（読み取りだけで、書き込まない）
// =====================================================================

function runDryRun_(body) {
  const { sheetId, sheetName, range, operation } = body;
  ensureAllowed_(sheetId);

  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error(`sheet not found: ${sheetName}`);

  const original = sheet.getRange(range).getValues();

  // operation に応じて、変更後のプレビューを計算（シートは書き換えない）
  // ここではシンプルに「現状」だけ返す。実際の変換は Claude 側で行う
  return {
    status: 'ok',
    range: range,
    rowCount: original.length,
    colCount: original[0] ? original[0].length : 0,
    sample: original.slice(0, 5), // 先頭5行をサンプルとして返す
    message: 'dry run: no changes made',
  };
}

// =====================================================================
// ヘルパー
// =====================================================================

function jsonResponse_(obj, status) {
  const output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  // status は Web App では設定できないが、レスポンスボディで伝える
  return output;
}

function formatDate_(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
