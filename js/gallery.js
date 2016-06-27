var numOfImage;
var galleryItems;
var frames = [];

function loadGallery() {

    var showGallery = $('#links');

    // $.getJSON('data/gallery.json', function (data) {

    //   console.log(data);

    //   galleryItems = data.items;

    //   var content = data.items.map(function (item){
    //     return makeItem(item, "rating");
    //   });

    //   showGallery.empty();

    //   if (content.length) {
    //     showGallery.html(content);
    //   attachRating();
    //   }


    // });

    // showGallery.text('Loading the JSON file.'); 
    


    $.getJSON('data/frame.json', function(data){

    	console.log(data);


    	frames = data.items;

    	console.log(frames.length);

    	$.ajax({
    		url: "gallery/imglist/0",
    		method: "get",
    		contentType: "application/json",
    		success: function(galleryResponse){

    			console.log(galleryResponse);

    			galleryItems = galleryResponse.painted;

    			var content = '';
    			var framei = -1;


    			var content = galleryItems.map(function (item){

    				return makeItem(item);

    			});


    			if (content.length) {
    				showGallery.append(content);
    				setTimeout(sizeImages(false), 50);	
    			}

    		},
    		error: function(){
    			console.log("fail to get gallery data");
    		}
    	});


    	// $.getJSON('data/gallery.json', function (data2){

    	// 	var content = '';
    	// 	var framei = -1;

    	// 	galleryItems = data2.items;


    	// 	var content = data2.items.map(function (item){


    	// 		framei = (framei + 1) % frames.length;
    	// 		item.frame = framei;
    	// 		return makeItem(item, framei);

    	// 	});

    	// 	// showGallery.empty();

    	// 	if (content.length) {
    	// 		showGallery.append(content);
    	// 		setTimeout(sizeImages(false), 50);	
    	// 	}

    	// });
    });

}
function sizeImages(animate){
	for (var i = 0; i < galleryItems.length; i++) {
		console.log(frames[galleryItems[i].frame]);
		sizeImage(frames[galleryItems[i].frame], i, animate);
	}
}

function sizeImage(frame, galleryItem, animate){
	var iWidth = $("#links .gallery-thumb:eq("+ galleryItem +")").find("img").width();
	var iHeight = $("#links .gallery-thumb:eq("+ galleryItem +")").find("img").height();
	var proportion = iWidth  / frame.size.width;
	var paddingTop = frame.padding.top* proportion;
	var paddingLeft = frame.padding.bottom * proportion;
	var paddingBottom = frame.padding.left * proportion;
	var paddingRight = frame.padding.right * proportion;
	if (animate) {
		$("#links .gallery-thumb:eq("+ galleryItem +")").find(".frame-inner").animate({width: iWidth + 'px', height: iHeight + 'px', "padding-top": paddingTop + 'px', "padding-top": paddingTop + 'px', "padding-bottom": paddingBottom + 'px', "padding-left": paddingLeft + 'px', "padding-right": paddingRight + 'px'}, 300);			
	}else{
		$("#links .gallery-thumb:eq("+ galleryItem +")").find(".frame-inner").css({width: iWidth + 'px', height: iHeight + 'px', "padding-top": paddingTop + 'px', "padding-top": paddingTop + 'px', "padding-bottom": paddingBottom + 'px', "padding-left": paddingLeft + 'px', "padding-right": paddingRight + 'px'});			
	}

	console.log("current frame width is " + iWidth + ", scale proportion is " + proportion + ".");
	console.log("frame's original padding: Top: " + frame.padding.top + "; Bottom: " + frame.padding.bottom + "; Left: " + frame.padding.left + "; Right: " + frame.padding.right);
	console.log("current item" + "'s calculated padding: Top: " + paddingTop + "; Bottom: " + paddingBottom + "; Left: " + paddingLeft + "; Right: " + paddingRight);

}

// function makeItem(item, field) {
	// 	if (field == "rating") {
// 		return '<a href="'+ item.sourceImg + '" title="' + item.name + '" data-gallery><div class="gallery-thumb" style="background-image: url(' + item.thumbImg + ');" ><div><p>' + item.name + '</p><p>' + styleName(item.style) + '</p>' + 
//         '<div class="stars">' + 
//         	'<form action="">' +
//         		'<input class="star star-5" id="star-5" type="radio" value="5" name="star"/>' +
//         		'<label class="star star-5" for="star-5"></label>' +
//         		'<input class="star star-4" id="star-4" type="radio" value="4" name="star"/>' +
//         		'<label class="star star-4" for="star-4"></label>' +
//         		'<input class="star star-3" id="star-3" type="radio" value="3" name="star"/>' +
//         		'<label class="star star-3" for="star-3"></label>' +
//         		'<input class="star star-2" id="star-2" type="radio" value="2" name="star"/>' +
//         		'<label class="star star-2" for="star-2"></label>' +
//         		'<input class="star star-1" id="star-1" type="radio" value="1" name="star"/>' +
//         		'<label class="star star-1" for="star-1"></label>' +
//         	'</form>' +
//         '</div>' +
//         '</div><img src="' + item.thumbImg + '" alt="' + item.name + '"></div></a>';
// 	}else if (field == "popular") {
// 		return '<a href="'+ item.sourceImg + '" title="' + item.name + '" data-gallery><div class="gallery-thumb" style="background-image: url(' + item.thumbImg + ');" ><div><p>' + item.name + '</p><p>' + styleName(item.style) + '</p>' + 
//         	'<p> Veiwed by ' + item.views + ' people</p>' +
//         '</div><img src="' + item.thumbImg + '" alt="' + item.name + '"></div></a>';
// 	}
// }

function makeItem(item) {
	return '<a href="'+ item.sourceImg + '" title="' + item.name + '" data-gallery>'+ 
		'<div class="gallery-thumb"><div class="frame-inner" >' + 
		'<div style="background-image: url('+ item.thumbImg +');">' + 
		'<div></div></div></div>' + 
		'<img src="' + frames[item.frame].frameImg + '"/><div class="info-tag"><p>Author: '+ item.username + '</p><p>Style: '+ styleName(item.style) + '</p></div></div>' + 
		'</a>';
}

function attachRating(){
	for (var i = 0; i < galleryItems.length; i++) {
		$('a:nth-of-type(' + (i+1) +') .gallery-thumb input.star-'+ galleryItems[i].rating).attr("checked", "checked");
	}
}

function styleName(styleNumber){
	if (styleNumber == 102) {
		return "Oil Painting";
	}else if (styleNumber == 301){
		return "Gouache Painting" ;
	}else if (styleNumber == 305){
		return "Line Watercolor" ;
	}else if (styleNumber == 306){
		return "Pure Watercolor" ;
	}else if (styleNumber == 501){
		return "BW Silouette" ;
	}else if (styleNumber == 601){
		return "Ad Poster" ;
	}
}

function reOrder(sortMethod){

	var content = '';
	if (sortMethod == "latest") {
		$.getJSON('data/gallery.json', function (data) {

			console.log(data);

			galleryItems = data.items;

			content = data.items.map(function (item){
				return makeItem(item, "rating");
			});
		});

	}else if (sortMethod == "stlye") {



		var oil = '';
		var gouache = '';
		var line = '';
		var water = '';
		var bw = '';
		var ad = '';

		var oilArr = [];
		var gouacheArr = [];
		var lineArr = [];
		var waterArr = [];
		var bwArr = [];
		var adArr = [];

		for (var i = 0; i < galleryItems.length; i++) {
			if (galleryItems[i].style == 102){
				oil += makeItem(galleryItems[i], "rating");
				oilArr.push(galleryItems[i]);
			}else if (galleryItems[i].style == 301){
				gouache += makeItem(galleryItems[i], "rating");
				gouacheArr.push(galleryItems[i]);
			}else if (galleryItems[i].style == 305){
				line += makeItem(galleryItems[i], "rating");
				lineArr.push(galleryItems[i]);
			}else if (galleryItems[i].style == 306){
				water += makeItem(galleryItems[i], "rating");
				waterArr.push(galleryItems[i]);
			}else if (galleryItems[i].style == 501){
				bw += makeItem(galleryItems[i], "rating");
				bwArr.push(galleryItems[i]);
			}else if (galleryItems[i].style == 601){
				ad += makeItem(galleryItems[i], "rating");
				adArr.push(galleryItems[i]);
			}
		}

		galleryItems = oilArr.concat(gouacheArr, lineArr, waterArr, bwArr, adArr);


		if (oil.length) {
			oil = '<p>Oil Painting</p><hr/>' + oil;
			content += oil;
		}
		if (gouache.length) {
			gouache = '<p>Gouache Painting</p><hr/>' + gouache;
			content += gouache;
		}
		if (line.length) {
			line = '<p>Line Watercolor</p><hr/>' + line;
			content += line;
		}
		if (water.length) {
			water = '<p>Pure Watercolor</p><hr/>' + water;
			content += water;
		}
		if (bw.length) {
			bw = '<p>B&W Silouette</p><hr/>' + bw;
			content += bw;
		}
		if (ad.length) {
			ad = '<p>Ad Poster</p><hr/>' + ad;
			content += ad;
		}

	}else{
		galleryItems.sort(function(a,b){
			var aValue;
			var bValue
			if (sortMethod == "rating") {
				aValue = a.rating;
				bValue = b.rating;
				if(aValue < bValue) {
					return 1;
				} else if(aValue > bValue) {
					return -1;
				} else {
					return 0;
				}
			}
			else if (sortMethod == "popular") {
				var aValue = a.views;
				var bValue = b.views;
				if(aValue < bValue) {
					return 1;
				} else if(aValue > bValue) {
					return -1;
				} else {
					return 0;
				}
			}
		});
		for (var i = 0; i < galleryItems.length; i++) {
			content += makeItem(galleryItems[i], sortMethod);
			console.log("views: " + galleryItems[i].views);
		}
	}
	

	$("#links a").animate({opacity: 0},
		300, 
		function() { 
			$("#links a").detach();
			$("#links").html(content);	
			$("#links a").css({"opacity":0});
			attachRating();
		});

	var timeoutId = window.setTimeout(function(){
		$("#links a").animate({"opacity": 1}, 300)
	}, 350);


}

function render(url){
		
}

function activePage(){
	$(".nav li:eq(1) .menu-underline").addClass("active");
}

loadGallery();

$('#sortby').change(function(){
	console.log($(this).find('option:selected').val());
	reOrder($(this).find('option:selected').val());	
});


$(window).resize(function(){
	sizeImages(false);
});
 