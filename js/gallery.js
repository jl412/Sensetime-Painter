var numOfImage;
var galleryItems;

function loadGallery() {

    var showGallery = $('#links');

    $.getJSON('data/gallery.json', function (data) {

      console.log(data);

      galleryItems = data.items;

      var content = data.items.map(function (item){
        return makeItem(item, "rating");
      });

      showGallery.empty();

      if (content.length) {
        showGallery.html(content);
      }

      attachRating();

    });

    showGallery.text('Loading the JSON file.'); 

}

function makeItem(item, field) {
	if (field == "rating") {
		return '<a href="'+ item.sourceImg + '" title="' + item.name + '" data-gallery><div class="gallery-thumb" style="background-image: url(' + item.thumbImg + ');" ><div><p>' + item.name + '</p><p>' + styleName(item.style) + '</p>' + 
        '<div class="stars">' + 
        	'<form action="">' +
        		'<input class="star star-5" id="star-5" type="radio" value="5" name="star"/>' +
        		'<label class="star star-5" for="star-5"></label>' +
        		'<input class="star star-4" id="star-4" type="radio" value="4" name="star"/>' +
        		'<label class="star star-4" for="star-4"></label>' +
        		'<input class="star star-3" id="star-3" type="radio" value="3" name="star"/>' +
        		'<label class="star star-3" for="star-3"></label>' +
        		'<input class="star star-2" id="star-2" type="radio" value="2" name="star"/>' +
        		'<label class="star star-2" for="star-2"></label>' +
        		'<input class="star star-1" id="star-1" type="radio" value="1" name="star"/>' +
        		'<label class="star star-1" for="star-1"></label>' +
        	'</form>' +
        '</div>' +
        '</div><img src="' + item.thumbImg + '" alt="' + item.name + '"></div></a>';
	}else if (field == "popular") {
		return '<a href="'+ item.sourceImg + '" title="' + item.name + '" data-gallery><div class="gallery-thumb" style="background-image: url(' + item.thumbImg + ');" ><div><p>' + item.name + '</p><p>' + styleName(item.style) + '</p>' + 
        	'<p> Veiwed by ' + item.views + ' people</p>' +
        '</div><img src="' + item.thumbImg + '" alt="' + item.name + '"></div></a>';
	}
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


loadGallery();

$('#sortby').change(function(){
	console.log($(this).find('option:selected').val());
	reOrder($(this).find('option:selected').val());	
});