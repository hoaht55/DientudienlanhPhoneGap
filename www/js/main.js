			jsonProducts="";
			function getJson()
			{
				var urls= "http://203.113.130.218:50080/dtdl/api/all_products.php?callback=?";
				console.log("url: " + urls );
				//alert(urls);
				$.ajax({// cau lenh ajax POST vs usernam password
				dataType: "json",
				url: urls,
				type: "GET",
				success: function( data){ // get read data from json to database with nameTable MARKSTUDENT
					console.log(data);
					//var	myJSONText	=	JSON.stringify(data,replacer);
					jsonProducts=data;
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
			//	tx.executeSql('CREATE TABLE IF NOT EXISTS PRODUCTS (id int, catid int, name text, price text, image text, introtex text, fulltext text )');
			tx.executeSql('CREATE TABLE IF NOT EXISTS PRODUCTS (id int, name text, image text)');
				
				// loop to read data from jsonObject to create table
				console.log("B1");
				for (var i in jsonProducts){
						//tx.executeSql('INSERT INTO PRODUCTS (id, catid, name, price, image, introtext, fulltext) VALUES ("'+jsonProducts[i].id+'","'+jsonProducts[i].catid+'","'+jsonProducts[i].name+'","'+jsonProducts[i].price+'","'+jsonProducts[i].image+'","'+jsonProducts[i].introtext+'","'+jsonProducts[i].fulltext+'")');
						tx.executeSql('INSERT INTO PRODUCTS (id, name, image) VALUES ("'+jsonProducts[i].id+'","'+jsonProducts[i].name+'", "'+jsonProducts[i].image+'")');
				//		console.log("jsonmarkstudent");
					//	console.log(json[i].id + "  " + json[i].parent_id + "   " + json[i].title);
						

				}// end for 
				console.log("B2");
			}//
			
			function errorCB(err) {
				console.log("Error processing SQL 1: "+err.code);
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
				/*  var len = results.rows.length;
				console.log("MARKSTUDENT table: " + len + " rows found.");
				for( var i = 0; i < len; i++)
				{
					console.log("Row " + (i+1));
					console.log( results.rows.item(i).id + "   " + results.rows.item(i).parent_id + "   " + results.rows.item(i).title);
				}  */
				  var playerlist = document.getElementById("category");
				    var players = "";
				 //   alert("The show is on");
				    var len = results.rows.length;
				    for (var i=0; i<len; i++){
				   // 	console.log("Row " + (i+1));
						console.log( results.rows.item(i).id + "   " + results.rows.item(i).image + "   " + results.rows.item(i).name);
				       // alert(results.rows.item(i).Name + result.rows.item(i).Club);
				        players = players + 
				        		'<li><a href="#"><img src="http://203.113.130.218:50080/dtdl/'+results.rows.item(i).image+'" class="ui-li-thumb" /><h3 class="ui-li-heading">'+results.rows.item(i).name +'</h3><p class="ui-li-desc">ID '+results.rows.item(i).id+'</p></a></li>';
				    }   

				    playerlist.innerHTML = players;
				    $("#category").listview();
				
				
			}
			
			function errorRead( error)
			{
				Console.log("errorRead : " + error.code );
			}

/*json="";
		var db="";
		function getJson()
		{
			var urls= "http://203.113.130.218:50080/dtdl/api/get_category.php?callback=?";
			console.log("url: " + urls );
			//alert(urls);
			$.ajax({// cau lenh ajax POST vs usernam password
			dataType: "json",
			url: urls,
			type: "GET",
			success: function( data){ // get read data from json to database with nameTable MARKSTUDENT
				console.log(data);
				//var	myJSONText	=	JSON.stringify(data,replacer);
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
			tx.executeSql('DROP TABLE IF EXISTS CATEGORY');
			tx.executeSql('CREATE TABLE IF NOT EXISTS CATEGORY (parent_id int, title text)');
			
			// loop to read data from jsonObject to create table
			console.log("B1");
			for (var i in json){
					tx.executeSql('INSERT INTO CATEGORY ( parent_id,title) VALUES ("'+json[i].parent_id+'","'+json[i].title+'")');
					console.log("jsonmarkstudent");
					console.log( json[i].parent_id + "   " + json[i].title);
					
	
			}// end for 
			console.log("B2");
		}//
		
		function errorCB(err) {
			console.log("Error processing SQL: "+err.code);
		}
		
		//-----------------
		// read from data base
		function readDatabases() {
			var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
			db.transaction(queryDB, errorRead);
		}
		
		function queryDB( tx )
		{
			tx.executeSql('SELECT * FROM CATEGORY', [], querySuccess, errorCB);
		}
		
		function querySuccess( tx,results )
		{
			$.mobile.showPageLoadingMsg(true);
			var len = results.rows.length;
			console.log("category: " + len + " rows found.");
			$("#category").html('');
			for( var i = 0; i < len; i++)
			{
				var row = results.rows.item(i);
				if(row["parent_id"] == 15) {
					
					var htmlData = '<li parent_id="'+row["parent_id"]+'"><a href="#"><h2>'+row["title"]+'</h2></a></li>';
			        $("#userList").append(htmlData).listview('refresh');
					console.log("Row " + (i+1));
					console.log(  results.rows.item(i).parent_id + "   " + results.rows.item(i).title);
				}
				
				
			} 
			
			 var playerlist = document.getElementById("category");
		    var players = "";
		    alert("The show is on");
		    var len = results.rows.length;
		    console.log("MARKSTUDENT table: " + len + " rows found.");
		    for (var i=0; i<len; i++){
		    	console.log("Row " + (i+1));
				console.log( results.rows.item(i).id + "   " + results.rows.item(i).parent_id + "   " + results.rows.item(i).title);
		        alert(results.rows.item(i).title + results.rows.item(i).parent_id + results.rows.item(i).id);
		        players = players + '<li><a href="#"><h3 class="ui-li-heading">'+results.rows.item(i).title+'</h3><p class="ui-li-desc">Parent ID '+results.rows.item(i).parent_id+'</p><p>ID '+results.rows.item(i).id+'</p></a></li>';
		    }   
	
		    playerlist.innerHTML = players;
		    $("#category").listview(); 
		}
		
		function errorRead( error)
		{
			Console.log("errorRead : " + error.code );
		}
		
		//--------------------------------------------------
	*/