// Get a JSON object from a specific cell and paste keys and values in another sheet.

function parseJSON(source, target, jsonColumn) {
  var sheet1 = SpreadsheetApp.getActive().getSheetByName(source);
  var sheet2 =
    SpreadsheetApp.getActive().getSheetByName(target) ||
    SpreadsheetApp.getActive().insertSheet(target);

  var jsonString = sheet1.getRange(jsonColumn).getValues();
  var jsonData = JSON.parse(jsonString);

  var keys = Object.keys(jsonData);
  var values = Object.values(jsonData);

  sheet2.clear();
  //              initial row - initial col - rows count - cols count
  sheet2.getRange(1, 1, keys.length, keys.length).setValues([keys]);
  sheet2.getRange(2, 1, values.length, values.length).setValues([values]);
}

function formatJSONFields() {
  parseJSON("source_sheet", "target_sheet", "Range, Ej: A1:A2");
}
