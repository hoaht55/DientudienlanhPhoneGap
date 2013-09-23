//-----------------------------------------
//get Json to SQLite.
json="";

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

function startCreate() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	db.transaction(createTable, errorCB);
	console.log("B0");
}


function createTable(tx) {
	tx.executeSql('DROP TABLE IF EXISTS PRODUCTS');
	tx.executeSql('CREATE TABLE IF NOT EXISTS PRODUCTS (id int, image text, catid int, price int, name text)');
	
	// loop to read data from jsonObject to create table
//	console.log("B1");
	for (var i in json){
			tx.executeSql('INSERT INTO PRODUCTS (id, image, catid, price, name) VALUES ("'+json[i].id+'","'+json[i].image+'","'+json[i].catid+'","'+json[i].price+'","'+json[i].name+'")');
			//console.log("jsonmarkstudent");
			//console.log(json[i].id + "  " + json[i].image + "  " + json[i].price + "   " + json[i].name);
			

	}// end for 
	//console.log("B2");
}//

function errorCB(err) {
	console.log("Error processing SQL 1: "+err.code);
}

//read error
function errorRead( error)
{
	console.log("errorRead : " + error.code );

}
//-----------------
// read from data base
function readDatabases() {
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	getJson();
	db.transaction(queryDB, errorRead);
}


function queryDB( tx )
{
	tx.executeSql('SELECT * FROM PRODUCTS', [], querySuccess, errorCB);
}

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

//-------------------
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

//------------------
//control home
//go page Category
function goCategory() {
	window.location.assign("category.html")
}

/*//go page Category
function goC() {
	window.location.assign("category.html")
}

//go page Category
function goCategory() {
	window.location.assign("category.html")
}*/

