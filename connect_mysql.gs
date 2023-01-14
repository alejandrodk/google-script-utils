var Database_Host = "";
var Database_Name = "";
var Database_username = "";
var Database_password = "";
var Port_number = "3306";

/*
 * Connect to MySQL database and print data from different tables
 */
function MySQL_connection() {
  var url =
    "jdbc:mysql://" + Database_Host + ":" + Port_number + "/" + Database_Name;
  var conn = Jdbc.getConnection(url, Database_username, Database_password);

  // Tables variable should have the following format:
  // {
  //   table: "wp_amelia_users",
  //   sheet: "clientes_data",
  //   query: "SELECT * FROM `wp_amelia_users` WHERE type = 'customer';",
  // },
  var tables = [
    {
      table: "table_name",
      sheet: "sheet_to_insert_data",
      query: "SELECT * FROM `table`",
    },
  ];

  for (var i = 0; i < tables.length; i++) {
    var stmt = conn.createStatement();
    var results = stmt.executeQuery(tables[i].query);
    var numCols = results.getMetaData().getColumnCount();
    var sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tables[i].sheet) ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(tables[i].sheet);
    sheet.clear();

    //print column names
    var row = [];
    for (var j = 0; j < numCols; j++) {
      row.push(results.getMetaData().getColumnName(j + 1));
    }
    sheet.appendRow(row);

    //print rows
    while (results.next()) {
      row = [];
      for (var j = 0; j < numCols; j++) {
        row.push(results.getString(j + 1));
      }
      sheet.appendRow(row);
    }
    results.close();
    stmt.close();
  }
  conn.close();
}