$(function(e) {
	//,adaptor:'webkit-sqlite'
	var beers = Lawnchair({name:'beers'},function(e){
		console.log('storage open');
	});
	//beers.nuke();
	
		
	beers.all(function(arrBeers){
		for(var i = 0; i<arrBeers.length;i++)
		{
			console.log(arrBeers.length);
			var listdiv = document.createElement('li');
            	listdiv.setAttribute('id','listdiv');
            	listdiv.innerHTML = '<a href="beer_details.html?id='+arrBeers[i].key+'">'+arrBeers[i].value.beername+'</a>';			
			$('#beer_list').append(listdiv);	
		}
		$('#beer_list').listview("refresh");
	});
		
  	$('#save').click(function(e){  
		
		var obj1 = {beername:"Wet Hop",brewername:"Deschuttes",brewerlocation:"Bend, OR"
					,beerstyle:"IPA",quantity:1,purchasedate:"12/11/2011",price:"9.00"
					,cellardate:"9/11/2011",cellartemp:40,brewdate:"8/10/2011"};
		var obj2 = {beername:"Vertical Epic 11",brewername:"Stone",brewerlocation:"San Diego, CA"
					,beerstyle:"Belgian",quantity:1,purchasedate:"1/10/2011",price:"15.00"
					,cellardate:"1/12/2011",cellartemp:45,brewdate:"10/10/2010"};				
		beers.save({key:"1",value:obj1});   	
		beers.save({key:"2",value:obj2});
 

	});
		
	$('#retrieve').click(function(e){
   		beers.get("1",function(obj){
	   		console.log(obj);
	   	});
   	});		
	$('#modify').click(function(e) {
		beers.get("1",function(thisobj){
			console.log(thisobj);
			var obj = {};
				obj = thisobj.value;
				obj.beername = "Not Wet Hop";
			beers.save({key:thisobj.key,value:obj});
		});
	});
	
	$('#beerdetail').live('pagebeforeshow',function(e) {
		var template = "{{beername}} blah {{breweryname}}";
		var beerID;
		beerData = {};
		
			
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');	
	
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  if(hash[0] == "id")
		  {
			  beerID = hash[1];
		  }
		}
		if(beerID)
		{
			beers.get(beerID,function(obj){
				beerData = obj.value;
				$.get('templates/beer_detail.mustache',
					function(data){
						template = data;	
						var renderedhtml = Mustache.to_html( template,beerData);
						$("#content").html(renderedhtml);	
					});
			});
		} else {
			$.get('templates/beer_add.mustache',
				function(data){
					template = data;
					var renderedhtml = Mustache.to_html(template);
					$('#content').html(renderedhtml);
					// The template should be loaded.
					$('#beerform').submit(function(e){
						var beer_obj = new Object();
						$('#beerform :input').each(function(){
							beer_obj[this.name] = this.value;
						});
						beers.all(function(arrBeers){
							
							var beer_db_obj = {beername:beer_obj.beername,brewername:beer_obj.brewername,brewerlocation:beer_obj.brewerlocation
					,beerstyle:beer_obj.beerstyle,quantity:beer_obj.quantity,purchasedate:beer_obj.purchasedate,price:beer_obj.price
					,cellardate:beer_obj.cellardate,cellartemp:beer_obj.cellartemp,brewdate:beer_obj.brewdate};
							beers.save({key:arrBeers.length.toString(),value:beer_db_obj});
						});
				});
	
			});
		}					

	});
	

	$(document).bind( "mobileinit", function(){
			//console.log('test');
			//$.mobile.page.prototype.options.degradeInputs.date = true;
			$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 }); 
	});	
	
	function getBeerByID(id)
	{
		var beerData = {};	
		
		return beerData;
	}
});

