var THRESHOLD = 30;                       // send an alert above this temperature (C)
var COOLDOWN_MS = 10 * 60 * 1000;         // at most one alert every 10 minutes

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var temp = parseFloat(e.parameter.temp);
  var hum = parseFloat(e.parameter.hum);

  if (isNaN(temp) || isNaN(hum)) {
    return ContentService.createTextOutput("missing data");
  }

  sheet.appendRow([new Date(), temp, hum]);

  if (temp > THRESHOLD) {
    var props = PropertiesService.getScriptProperties();
    var last = Number(props.getProperty("lastAlert") || 0);
    var now = new Date().getTime();
    if (now - last > COOLDOWN_MS) {
      MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        "High temperature alert",
        "The temperature reached " + temp + " C (limit " + THRESHOLD + " C). Humidity: " + hum + " %."
      );
      props.setProperty("lastAlert", String(now));
    }
  }

  return ContentService.createTextOutput("OK");
}

function testEmail() {
  MailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Test alert", "The email alert is working.");
}
