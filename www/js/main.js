//----------------------Read data to Json from SQLite-------------------
function escape (key, val) {
    if (typeof(val)!="string") return val;
    return val
      .replace(/[\\]/g, ' ')
    .replace(/[\"]/g, ' ')
    .replace(/[\/]/g, ' ')
    .replace(/[\b]/g, ' ')
    .replace(/[\f]/g, ' ')
    .replace(/[\n]/g, ' ')
    .replace(/[\r]/g, ' ')
    .replace(/[\t]/g, ' ')
	.replace(/&nbsp;/g, ' ')
    ; 
}


//function convert date
function convertDate(key, val) {
    //eg:-divTimeStr=18/03/2013 12:53:00
   /* var tmstr = divTimeStr.toString().split(' '); //'21-01-2013 PM 3:20:24'
    var dt = tmstr[0].split('/');
    var str = dt[2] + "/" + dt[1] + "/" + dt[0] + " " + tmstr[1]; //+ " " + tmstr[1]//'2013/01/20 3:20:24 pm'
    var time = new Date(str);
    if (time == "Invalid Date") {
        time = new Date(divTimeStr);
    } 
    return time;*/
	if (typeof(val)!="string") return val;
    return val.replace(/[-]/g, '/'); 
	
}


json="";
//get Json to SQLite.
function getJson()
{
	//var urls= "http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/api/all_products.php?callback=?";
	var urls= "http://203.113.130.218:50080/miniShop/client/stock.php?callback=?";
	//console.log("url: " + urls );
	
	$.ajax({
	dataType: "json",
	url: urls,
	type: "GET",
	success: function( data){ // get read data from json to database with titleTable DEMO
	//	console.log(data);
		//var myJSONString = JSON.stringify(data,escape);
		//var myJSONString1 = JSON.stringfy(data, convertDate);
		//json=myJSONString;
		json = data;
		
		
		
		//alert(myJSONString);
		//alert(json);
		startCreate();
	},
	error: function(xhr, textStatus, error){
		alert("Erorr mark");
	}
	});// end ajax
	
}

//start create 
function startCreate() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	db.transaction(createTable, errorCB);
	console.log("B0");
}

//create table products
function createTable(tx) {
	tx.executeSql('DROP TABLE IF EXISTS PRODUCTS');
	tx.executeSql('CREATE TABLE IF NOT EXISTS PRODUCTS (id int, Image_product text, category_id int, price int, title text, date_created date, stock int)');
	
	for (var i in json){
			//ConvertDateFromDiv();
			tx.executeSql('INSERT INTO PRODUCTS (id, Image_product, category_id, price, title, date_created, stock) VALUES ("'+json[i].id+'","'+json[i].Image_product+'","'+json[i].category_id+'","'+json[i].price+'","'+json[i].title+'","'+json[i].date_created+'","'+json[i].stock+'")');
			//console.log("jsonmarkstudent");
			//alert(json[i].id + "  " + json[i].detail_product);
			

	}// end for 
	//console.log("B2");
}

//display error processing sql 1
function errorCB(err) {
	console.log("Error processing SQL 1: "+err.code);
}

//read error
function errorRead( error)
{
	console.log("errorRead : " + error.code );

}

//--------------------------May tinh de ban---------------
//display list desktop
function querySuccessDesktop( tx,results )
{
	
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 7) {
			$('#wrap').children('ul').append(
               /*// '<li id="'+row["id"]+'"><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
				'<li id="'+row["id"]+'"><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img class="items" src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'"/>'+
                '<span class="title">'+row["title"]+ '</span>'+
				'<span class="price">' + row["price"] +'</span>'+
			   // '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
                /*'<p class="introtext">'+rowintrotext+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["id"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');*/
				'<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
                '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			   // '<span class="price">'+ row["price"] + '</span>'+
                '<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["date_created"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
        }
    });
    $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesDesktop() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBDesktop, errorRead);
}


function queryDBDesktop( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessDesktop, errorCB);
}

//
//--------------------------

//--------------------------
//display list laptop
function querySuccessProductsNew( tx,results )
{
	
	//display list desktop
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		
		var d = row["date_created"];
		//var i = d.slice(0,10).split('-');
		//var j = d.slice(11,19).split(':');
		//var date = i[2]+'/'+i[1]+'/'+i[0]+' '+j[0]+':'+j[1]+':'+j[2];
		//alert(date);
		var subDate = Math.abs(new Date() - new Date(d.replace(/-/g,"/")));
		var oneDay = 1000*60*60*24;
		//var arrSubDate = new Array();
		//arrSbuDate.push(subDate);
	//	for (i=0; i < arrSubDate.length; i++) {
	//		alert(arrSubDate[i]);
	//	}
		//alert(row['id']);
		
		//alert(subDate);
		//alert('Difference in days ' + Math.round(subDate/oneDay));*/
		
		if ( Math.round(subDate/oneDay) < 15 ) {
			//alert('Difference in days ' + Math.round(subDate/oneDay))
			$('#mayanh').children('ul').append(
               '<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
               '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
                /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" onclick="count()" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
        }
    });
    $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesProductsNew() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBProductsNew, errorRead);
}


function queryDBProductsNew( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessProductsNew, errorCB);
}

//
//--------------------------May tinh ca nhan-------------------
//display list laptop
function querySuccessLaptop( tx,results )
{
	
	//display list desktop
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 9) {
			$('#maytinhcanhan').children('ul').append(
               '<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
               '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
                /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" onclick="count()" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
        }
    });
    $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesLaptop() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBLaptop, errorRead);
}


function queryDBLaptop( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessLaptop, errorCB);
}



//--------------------------------Máy tính bảng-----------------
//display list tablets
function querySuccessTablet( tx,results )
{
	
	//display list tablet
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 8) {
			$('#maytinhbang').children('ul').append(
               '<li onclick="count()"><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
               '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
                /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" id="update"  data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
        }
    });
    $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesTablet() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBTablet, errorRead);
}


function queryDBTablet( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessTablet, errorCB);
}

//-------------------------------Tủ lạnh-----------------
//display list fridge
function querySuccessFridge( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 5) {
			$('#tulanh').children('ul').append(
				'<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
                '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
                /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
        }
    });
    $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesFridge() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBFridge, errorRead);
}


function queryDBFridge( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessFridge, errorCB);
}

//-------------------------------Máy ảnh-----------------
//display list fridge
function querySuccessCamera( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 7) {
			$('#mayanh').children('ul').append(
				'<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
              '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
              /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
      }
  });
  $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesCamera() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBCamera, errorRead);
}


function queryDBCamera( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessCamera, errorCB);
}

//

//-------------------------------Máy ghi âm-----------------
//display list fridge
function querySuccessTapeMachine( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 21) {
			$('#mayghiam').children('ul').append(
				'<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
              '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
              /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
      }
  });
  $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesTapeMachine() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBTapeMachine, errorRead);
}


function queryDBTapeMachine( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessTapeMachine, errorCB);
}

//-------------------------------Máy nghe nhạc-----------------
//display list fridge
function querySuccessHeadPhone( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 20) {
			$('#maynghenhac').children('ul').append(
				'<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
              '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
              /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
      }
  });
  $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesHeadPhone() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBHeadPhone, errorRead);
}


function queryDBHeadPhone( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessHeadPhone, errorCB);
}

//-------------------------------Phụ kiện-----------------
//display list fridge
function querySuccessPhuKien( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 20) {
			$('#phukien').children('ul').append(
				'<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
              '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
              /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
      }
  });
  $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesPhuKien() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBPhuKien, errorRead);
}


function queryDBPhuKien( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessPhuKien, errorCB);
}


//
//--------------------------------------Máy giặt-------------------
//display list washer
function querySuccessWasher( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 3) {
			$('#maygiat').children('ul').append(
                '<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
                '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + ' VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
                /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
        }
    });
    $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesWasher() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBWasher, errorRead);
}


function queryDBWasher( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessWasher, errorCB);
}
//---------------------------------------
//display list air-condition
function querySuccessAir( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	$.each(results.rows,function(index){
		var row = results.rows.item(index);
		if (row["category_id"] == 6) {
			$('#dieuhoa').children('ul').append(
				'<li><a href="#'+row["id"]+'" data-rel="popup" data-position-to="window" data-transition="pop"><img src="http://203.113.130.218:50080/miniShop/sites/default/files-7.24/styles/product_medium/public/'+row["Image_product"]+'" class="ui-li-thumb" />'+
                '<span class="title">'+row["title"]+ '</span>'+
			    '<span class="price">'+'Giá:' + row["price"] + '  VNĐ' + '</span>'+
			    //'<span class="price">'+ row["price"] + '</span>'+
                /*'<p class="introtext">'+rowintrotext+'</p>'+*/
				'<p class="introtext">'+'Số hàng trong kho: '+row["stock"]+'</p>'+
			    '</a>'+
			    '<div data-role="popup" id="'+row["id"]+'" class="ui-content mypopup" data-theme="b">'+
				'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>'+ '<div class="full_text">'+ row["detail_product"] +'</div>'+'</div>'+ 
				'<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>' +
				'</li>').listview('refresh');
        }
    });
    $('div.mypopup').popup();
	$.mobile.hidePageLoadingMsg();	
}


//read from data base
function readDatabasesAir() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDBAir, errorRead);
}


function queryDBAir( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccessAir, errorCB);
}
//-----------------------------Control page--------------------------------
//go page Desktop
function goHome() {
	window.location.assign("home.html");
}

// go page camera.html
function goCamera() {
	window.location.assign("mayanh.html");
}

//go page mayghiam.html
function goTapeMachine() {
	window.location.assign("mayghiam.html");
}

//go page maynghenhac.html
function goHeadPhone() {
	window.location.assign("maynghenhac.html");
}

function goPhuKien() {
	window.location.assign("phukien.html");
}
//go to page spare
function goDesktop() {
	window.location.assign("maytinhban.html");
}

function goDesktop() {
	window.location.assign("maytinhban.html");
}
//go page Desktop
function goDesktop() {
	window.location.assign("maytinhban.html");
}

//go page Laptop
function goLaptop() {
	window.location.assign("maytinhcanhan.html");
}

//go page Tablet
function goTablet() {
	window.location.assign("maytinhbang.html");
}

//go page Fridge
function goFridge() {
	window.location.assign("tulanh.html")
}

//go page Washer
function goWasher() {
	window.location.assign("maygiat.html")
}

//go page Air - condition
function goAir() {
	window.location.assign("dieuhoa.html")
}
//------------------
//control home
//go page Category
function goCategory() {
	window.location.assign("category.html")
}

//---------
//function go back
function goBack() {
	window.history.back()
}

//--------------
//go page login
function goLogin() {
	window.location.assign("login.html")
}

function goDashboard() {
	window.location.assign("logout.html")
}

function goNewProduct() {
	window.location.assign("sanphammoi.html")
}

function goDesktop() {
	window.location.assign("mayanh.html")
}
//-------------------------------------------------------------

//-------------Check state connection----------------------------

//Wait for PhoneGap to load
//

document.addEventListener("deviceready", onDeviceReady, false);
//PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//
function onDeviceReady() {
  checkConnection();
}
//function checkConnection
function checkConnection() {
	var networkState = navigator.network.connection.type;
	if(networkState == Connection.NONE) {
		check_network = 0;
		console.log("Check type connect: " + networkState);
	} else {
		check_network = 1;
		console.log("Check type connect: " + networkState);
	}
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';

	console.log('Connection type: ' + states[networkState]);
	//alert('Connection type: ' + states[networkState]);
	
}

/*$('a').click(function (e) {
    // custom handling here
    e.preventDefault();
});

$('a').click(function () {
    // custom handling here
    return false;
});*/
