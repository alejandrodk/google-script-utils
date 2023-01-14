function onOpen() {
  // Create custom items to user's menu
  SpreadsheetApp.getUi()
    .createMenu("Menu_name")
    .addItem("Menu item", "function to be executed")
    .addToUi();
}
