//----------------------Read data to Json from SQLite-------------------

json="";
//get Json to SQLite.
function getJson()
{
	var urls= "http://203.113.130.218:50080/dtdl/api/all_products.php?callback=?";
	//console.log("url: " + urls );
	
	$.ajax({
	dataType: "json",
	url: urls,
	type: "GET",
	success: function( data){ // get read data from json to database with nameTable DEMO
	//	console.log(data);
		
		json=data;
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
	tx.executeSql('CREATE TABLE IF NOT EXISTS PRODUCTS (id int, image text, catid int, price int, name text)');
	
	for (var i in json){
			tx.executeSql('INSERT INTO PRODUCTS (id, image, catid, price, name) VALUES ("'+json[i].id+'","'+json[i].image+'","'+json[i].catid+'","'+json[i].price+'","'+json[i].name+'")');
			//console.log("jsonmarkstudent");
			//console.log(json[i].id + "  " + json[i].image + "  " + json[i].price + "   " + json[i].name);
			

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
//--------------------------------
// read from data base
function readDatabases() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDB, errorRead);
}

//query databases table products
function queryDB( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccess, errorCB);
}

//display list products
function querySuccess( tx,results )
{
	
	//display list desktop
	$.mobile.showPageLoadingMsg(true);
	 $('#maytinhban').empty();
        $.each(results.rows,function(index){
            var row = results.rows.item(index);
            if (row["catid"] == 8) {
            	$('#maytinhban').append('<li id="'+row["id"]+'"><a href="#"><img src="http://203.113.130.218:50080/dtdl/'+row["image"]+'" class="ui-li-thumb" /><h2>'+row["name"]+'</h2><p class="cost">Giá: '+row["price"]+' VNĐ</p></a></li>');
            }
        });
 
        $('#maytinhban').listview();
        $.mobile.hidePageLoadingMsg();
}

//--------------------------
//display list laptop
function querySuccessLaptop( tx,results )
{
	
	//display list desktop
	$.mobile.showPageLoadingMsg(true);
	 $('#maytinhcanhan').empty();
        $.each(results.rows,function(index){
            var row = results.rows.item(index);
            if (row["catid"] == 10) {
            	$('#maytinhcanhan').append('<li id="'+row["id"]+'"><a href="#"><img src="http://203.113.130.218:50080/dtdl/'+row["image"]+'" class="ui-li-thumb" /><h2>'+row["name"]+'</h2><p class="cost">Giá: '+row["price"]+' VNĐ</p></a></li>');
            }
        });
 
        $('#maytinhcanhan').listview();
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

//-------------------------------------------
//display list tablets
function querySuccessTablet( tx,results )
{
	
	//display list desktop
	//$.mobile.showPageLoadingMsg(true);
	 $('#maytinhbang').empty();
        $.each(results.rows,function(index){
            var row = results.rows.item(index);
            if (row["catid"] == 11) {
            	$('#maytinhbang').append('<li id="'+row["id"]+'"><a href="#"><img src="http://203.113.130.218:50080/dtdl/'+row["image"]+'" class="ui-li-thumb" /><h2>'+row["name"]+'</h2><p class="cost">Giá: '+row["price"]+' VNĐ</p></a></li>');
            }
        });
 
        $('#maytinhbang').listview();
      //  $.mobile.hidePageLoadingMsg();
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

//-------------------------------
//display list fridge
function querySuccessFridge( tx,results )
{
	
	//display list fridge
	$.mobile.showPageLoadingMsg(true);
	 $('#tulanh').empty();
        $.each(results.rows,function(index){
            var row = results.rows.item(index);
            if (row["catid"] == 9) {
            	$('#tulanh').append('<li id="'+row["id"]+'"><a href="#"><img src="http://203.113.130.218:50080/dtdl/'+row["image"]+'" class="ui-li-thumb" /><h2>'+row["name"]+'</h2><p class="cost">Giá: '+row["price"]+' VNĐ</p></a></li>');
            }
        });
 
        $('#tulanh').listview();
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

//--------------------------------------
//display list washer
function querySuccessWasher( tx,results )
{
	
	//display list washer
	$.mobile.showPageLoadingMsg(true);
	 $('#maygiat').empty();
        $.each(results.rows,function(index){
            var row = results.rows.item(index);
            if (row["catid"] == 14) {
            	$('#maygiat').append('<li id="'+row["id"]+'"><a href="#"><img src="http://203.113.130.218:50080/dtdl/'+row["image"]+'" class="ui-li-thumb" /><h2>'+row["name"]+'</h2><p class="cost">Giá: '+row["price"]+' VNĐ</p></a></li>');
            }
        });
 
        $('#maygiat').listview();
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
	 $('#dieuhoa').empty();
        $.each(results.rows,function(index){
            var row = results.rows.item(index);
            if (row["catid"] == 13) {
            	$('#dieuhoa').append('<li id="'+row["id"]+'"><a href="#"><img src="http://203.113.130.218:50080/dtdl/'+row["image"]+'" class="ui-li-thumb" /><h2>'+row["name"]+'</h2><p class="cost">Giá: '+row["price"]+' VNĐ</p></a></li>');
            }
        });
 
        $('#dieuhoa').listview();
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


