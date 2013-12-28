var nid; // global node id variable

$('#page_dashboard').live('pageshow',function(){
  try {
    $.ajax({
      url: "http://203.113.130.218:50080/miniShop/?q=api/system/connect.json",
      type: 'post',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('page_dashboard - failed to system connect');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        var drupal_user = data.user;
        if (drupal_user.uid == 0) { // user is not logged in, show the login button, hide the logout button
          $('#button_login').show();
          $('#button_logout').hide();
        }
        else { // user is logged in, hide the login button, show the logout button
          $('#button_login').hide();
          $('#button_logout').show();
        }
      }
    });
  }
  catch (error) { alert("page_dashboard - " + error); }
});


$('#button_logout').live("click",function(){
try {
 $.ajax({
     url: "http://203.113.130.218:50080/miniShop/?q=api/user/logout.json",
     type: 'post',
     dataType: 'json',
     error: function (XMLHttpRequest, textStatus, errorThrown) {
       alert('button_logout - failed to logout');
       console.log(JSON.stringify(XMLHttpRequest));
       console.log(JSON.stringify(textStatus));
       console.log(JSON.stringify(errorThrown));
     },
     success: function (data) {
       alert("You have been logged out.");
       $.mobile.changePage("index.html",{reloadPage:true},{allowSamePageTranstion:true},{transition:'none'});
     }
 });
}
catch (error) { alert("button_logout - " + error); }
return false;
});