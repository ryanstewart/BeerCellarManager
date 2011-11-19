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
		
		beers.get(beerID,function(obj){
			beerData = obj.value;
			$.get('templates/beer_detail.mustache',
				function(data){
					template = data;	
					var renderedhtml = Mustache.to_html( template,beerData);
					$("#content").html(renderedhtml);	
				});
		});					
		
		$.get('templates/beer_detail.mustache',
			function(data){
				template = data;	
			});
		

	});
	
	$(document).bind( "mobileinit", function(){
			console.log('test');
			$.mobile.page.prototype.options.degradeInputs.date = true;
	});	
	
	function getBeerByID(id)
	{
		var beerData = {};	
		
		return beerData;
	}
});

