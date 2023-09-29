gsheet_link = "https://docs.google.com/spreadsheets/"

function resetEmailFieldEveryDay(){

  var sheet = SpreadsheetApp.getActive().getSheetByName("Backend");
  var range = sheet.getRange("K2:K100");

  range.clear();

  var n = sheet.getLastRow();

  for (var i = 2; i<n+1; i++){

    var emailReq = sheet.getRange(i,10).getValue();

    if(emailReq=="NO"){
      // Reset the field 
      sheet.getRange(i,11).setValue("YES"); // Reset "Email Sent" field on start of the day
      console.log("resetEmailFieldEveryDay: Reset 'Email Sent' field successful.");
    }

  }
  console.log("resetEmailFieldEveryDay: Function execution done.");
}

function TradingTimeCheck(){
  
  var now = new Date();
  Logger.log(now)
  var k = now.getDay() * 100 + now.getHours() + now.getMinutes()/100;
   
  if(  (k>=109 && k<=116) || 
       (k>=209 && k<=216) ||
       (k>=309 && k<=316) ||
       (k>=409 && k<=416) ||
       (k>=509 && k<=516)  ){
    Logger.log("This is Trading Hour: "+k)
    return true
  }
  else{
    Logger.log("This is NOT Trading Hour: "+k)
    return false
  }
}


function sendAnEmail() {

  var sendTo = "rjs.swarnkar@gmail.com"


  var sheet = SpreadsheetApp.getActive().getSheetByName("Backend");
  var range = sheet.getRange("K2:K100");

  range.clear();

  var n = sheet.getLastRow();

  if (TradingTimeCheck()==true){
      for (var i = 2; i<n+1; i++){
          var emailReq = sheet.getRange(i,10).getValue();
          var subject = "[Positional Trading Alert]: " + sheet.getRange(i,12).getValue();
          var message = sheet.getRange(i,13).getValue();
          message = message + "<br /> <br /> <br /> <small> <a href='"+ gsheet_link +"'>Go to GoogleSheet</a> </small>"

          if(emailReq=="YES"){
              // MailApp.sendEmail(sendTo,subject,message);
              MailApp.sendEmail(sendTo, subject,'' ,{htmlBody: message})
              sheet.getRange(i,11).setValue("YES");
          }
      }
  }
 
  console.log("sendAnEmail: Function execution done.");
}
