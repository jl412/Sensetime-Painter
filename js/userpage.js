var numOfImage;
var numOfFrame;
var galleryItems;
var frames = [];
var conetentMaxWidth = Math.min($(window).width()* 0.55, 600);
var conetentMaxHeight = Math.min($(window).height()* 0.55, 400);
var frameHeight = 100000;
var wrapperWidth = 0;
var wrapperHeight = 0;
var currentFrame = 0;
var currentGalleryItem = 0;
var itemInRow = 4;

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


    if ($(".page-btn-wrapper").css("height") == "60px") {
    conetentMaxHeight = Math.min($(window).height()* 0.25, 300);
  }

  var showFrame = $('#show-frame');

  $.getJSON('data/frame.json', function (data) {

      console.log(data);

      numOfFrame =  data.items.length;
      
      var content = '';
      var previewContent = '';
      for (var i = 0; i < data.items.length; i++) {
        if (data.items[i].size.height > data.items[i].size.width) {
        var proportion = conetentMaxHeight / (data.items[i].size.height - data.items[i].padding.top - data.items[i].padding.bottom); 
        var contentWidth = (data.items[i].size.width - data.items[i].padding.left - data.items[i].padding.right)*proportion;
        var contentHeight = conetentMaxHeight;
        var displayPaddingLeft = data.items[i].padding.left*proportion;
        var displayPaddingRight = data.items[i].padding.right*proportion;
        var displayPaddingTop = data.items[i].padding.top*proportion;
        var displayPaddingBottom = data.items[i].padding.bottom*proportion;


        var displayWidth = contentWidth + displayPaddingLeft + displayPaddingRight;
        var displayHeight = conetentMaxHeight + displayPaddingTop + displayPaddingBottom;
        }else{
        var proportion = conetentMaxWidth / (data.items[i].size.width - data.items[i].padding.left - data.items[i].padding.right); 
        var contentWidth = conetentMaxWidth;
        var contentHeight = (data.items[i].size.height - data.items[i].padding.top - data.items[i].padding.bottom)*proportion;
        var displayPaddingLeft = data.items[i].padding.left*proportion;
        var displayPaddingRight = data.items[i].padding.right*proportion;
        var displayPaddingTop = data.items[i].padding.top*proportion;
        var displayPaddingBottom = data.items[i].padding.bottom*proportion;


        var displayWidth = conetentMaxWidth + displayPaddingLeft + displayPaddingRight;
        var displayHeight = contentHeight + displayPaddingTop + displayPaddingBottom;
        }

        frames[i] = {
          value: i, 
          contentHeight: contentHeight, 
          contentWidth: contentWidth, 
          displayHeight: displayHeight, 
          displayWidth: displayWidth,
          resContentWidth: data.items[i].size.width - data.items[i].padding.left - data.items[i].padding.right,
          resContentHeight: data.items[i].size.height - data.items[i].padding.top - data.items[i].padding.bottom,
          resHeight: data.items[i].size.height, 
          resWidth: data.items[i].size.width, 
          paddingTop: data.items[i].padding.top, 
          paddingLeft: data.items[i].padding.left,
          paddingBottom: data.items[i].padding.bottom,
          paddingRight: data.items[i].padding.right,
          frameImg: data.items[i].frameImg
        };
        

        if (displayHeight > wrapperHeight) {
          wrapperHeight = displayHeight;
        }

        if (displayWidth > wrapperWidth) {
          wrapperWidth = displayWidth;
        }

        content += '<div class="frame-item-container nodisplay" id="frame' + i + '"><div class="frame-item" style="width:' + displayWidth  + 'px; height:' + displayHeight + 'px; background-image: url(\''+ data.items[i].frameImg + '\')"></div><div class="framebase" style="width:' + (frames[i].contentWidth + 6) + 'px; height:' + (frames[i].contentHeight + 6) + 'px;"></div></div>';
        if (i % itemInRow == 0) {
          previewContent += '<div class="item" id="row' + Math.floor(i / itemInRow) + '">';
        };
        previewContent += '<div class="frame-thumb-wrapper"><div class="thumb" value="' + i + '" style="background-image: url(\''+ data.items[i].frameImg + '\')"></div></div>';
        if ( ( (i + 1) % itemInRow == 0) || ( (i + 1) ==  numOfFrame) ) {
          previewContent += '</div>';
        };
      
      }

      content += '<div class="result-img zoom" style="width:' + (frames[currentFrame].contentWidth+2) +'px; height:' + (frames[currentFrame].contentHeight+2) +'px"></div><div class="toggle-result-img" style="width:' + (frames[currentFrame].contentWidth+2) +'px; height:' + (frames[currentFrame].contentHeight+2) +'px" data-toggle="modal" data-target="#resultImgZoom"></div></div>';

      showFrame.css({"height": wrapperHeight + "px"});
      $(".frame-control").css({"width": wrapperWidth + "px"});

      if (content.length && previewContent.length) {
        showFrame.prepend(content);
        $('#frame-carousel .carousel-inner').html(previewContent);
      }

      $(".frame-item-container:first-child").removeClass("nodisplay");
      $("#frame-carousel .item:first-child").addClass("active");

      $('#frame-carousel').on("click",".frame-thumb-wrapper .thumb", function(){
      	var frameToShow = $(this).attr("value");
      	if (currentFrame < frameToShow) {
      		moveFrameRight(frameToShow);
      	}else if(currentFrame > frameToShow){
      		moveFrameLeft(frameToShow);
      	}
      });

      $.ajax({
    		url: "/user/picmanage/imglist",
    		method: "get",
    		contentType: "application/json",
    		success: function(galleryResponse){
    			galleryItems = galleryResponse.painted;

    			var content = '';
    			var framei = -1;


    			var content = galleryItems.map(function (item){

    				return makeItem(item);

    			});

    			// showGallery.empty();

    			if (content.length) {
    				showGallery.append(content);
    				sizeImages(false);	

    				setGalleryClickEvent();

    				$(".remove-upload").click(function(event){
    					event.preventDefault();
    					removeUpload($(this).parent());
    				});
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


    	// 	var content = galleryItems.map(function (item){


    	// 		framei = (framei + 1) % frames.length;
    	// 		item.frame = framei;
    	// 		item.public = true;
    	// 		return makeItem(item);

    	// 	});

    	// 	// showGallery.empty();

    	// 	if (content.length) {
    	// 		showGallery.append(content);
    	// 		sizeImages(false);	

    	// 		setGalleryClickEvent();

    	// 		$(".remove-upload").click(function(event){
    	// 			event.preventDefault();
    	// 			removeAnimation($(this).parent());
    	// 		});
    	// 	}


    	// 	showGallery.find("h1").html(username);
    	// });	
    });
}


function setGalleryClickEvent(){
	$(".gallery-thumb img").click(function(){
		currentGalleryItem = $(this).parent().parent().index(".gallery-thumb");
		console.log("clicked-item:" + currentGalleryItem + " isPublic:" + galleryItems[currentGalleryItem].public);
		var frameToShow = galleryItems[currentGalleryItem].frame;
		$(".toggle-result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
		$(".result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
		$("#frame" + currentFrame).hide();
		$("#frame" + frameToShow).show();
		$('.result-img').css({"background-image" : 'url(' + galleryItems[currentGalleryItem].sourceImg + ')'});
		currentFrame = frameToShow;
		if (galleryItems[currentGalleryItem].public) {
			$("#viewport #setting .checkbox-inline input").prop( "checked", true );
		}else{
			$("#viewport #setting .checkbox-inline input").prop( "checked", false );
		}
		$("#viewport").show("fade", 300);
	});
}



function removeUpload(item){
	console.log("username::" + username);

	var formdata = [{
		"username": username,
		"origin_id": galleryItems[item.index(".gallery-thumb")].origin_id,
		"type":"painted",
		"style": galleryItems[item.index(".gallery-thumb")].style,
		"publicity": galleryItems[item.index(".gallery-thumb")].public? 1:0
	},{
		"username":username,
		"_id":galleryItems[item.index(".gallery-thumb")]._id,
		"type":"origin",
		"style":""
	}];
    

  $.ajax({
      url: "painter/paint",
      method: "post",
      data:JSON.stringify(formdata),
      success: function(response){
      	console.log(response.msg);
        removeAnimation(item);
      },
      error: function(){
    	console.log("fail to remove");
      }
  });
}

function removeAnimation(item){
	item.animate({"opacity": "0"}, 200, function(){
		item.animate({"width": 0, "margin-left": 0, "margin-right": 0}, 400, function(){
			galleryItems.splice(item.index(), 1);
			item.detach();
		});
	});
}
    	
function changeItemSetting(item){

	formdata = {
		"username": username,
		"origin_id": galleryItems[item.index(".gallery-thumb")].origin_id,
		"style": galleryItems[item.index(".gallery-thumb")].style,
		"publicity": galleryItems[item.index(".gallery-thumb")].public? 1:0,
		"frame": galleryItems[item.index(".gallery-thumb")].frame
	}

	$.ajax({
      url: "painter/paint",
      method: "post",
      data:JSON.stringify(formdata),
      success: function(response){
      	console.log(response.msg);
      },
      error: function(){
    	console.log("fail to remove");
      }
  });
}

function sizeImages(animate){
	for (var i = 0; i < galleryItems.length; i++) {
		sizeImage(frames[galleryItems[i].frame], i, animate);
	}
}

function sizeImage(frame, galleryItem, animate){
	var iWidth = $("#links .gallery-thumb:eq("+ galleryItem +")").find("img").width();
		var iHeight = $("#links .gallery-thumb:eq("+ galleryItem +")").find("img").height();
		var proportion = iWidth  / frame.resWidth;
		var paddingTop = frame.paddingTop* proportion;
		var paddingLeft = frame.paddingLeft * proportion;
		var paddingBottom = frame.paddingBottom * proportion;
		var paddingRight = frame.paddingRight * proportion;
		if (animate) {
			$("#links .gallery-thumb:eq("+ galleryItem +")").find(".frame-inner").animate({width: iWidth + 'px', height: iHeight + 'px', "padding-top": paddingTop + 'px', "padding-top": paddingTop + 'px', "padding-bottom": paddingBottom + 'px', "padding-left": paddingLeft + 'px', "padding-right": paddingRight + 'px'}, 300);			
		}else{
			$("#links .gallery-thumb:eq("+ galleryItem +")").find(".frame-inner").css({width: iWidth + 'px', height: iHeight + 'px', "padding-top": paddingTop + 'px', "padding-top": paddingTop + 'px', "padding-bottom": paddingBottom + 'px', "padding-left": paddingLeft + 'px', "padding-right": paddingRight + 'px'});			
	}
}




function makeItem(item) {
	return '<div class="gallery-thumb"><a title="' + item.name + '" data-gallery><div class="frame-inner" >' + 
		'<div style="background-image: url('+ item.thumbImg +');">' + 
		'<div></div></div></div>' + 
		'<img src="' + frames[item.frame].frameImg + '"/></a>' + 
		'<div class="control-btn remove-upload"><span class="glyphicon glyphicon-remove"></span></div><div class="control-btn"><span class="glyphicon glyphicon-wrench"></span></div></div>';
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
	$(".nav li:eq(2) .menu-underline").addClass("active");
}

loadGallery();

function modDecrease(dividend, divisor){
  if ((dividend - 1) < 0) {
    return dividend - 1 + divisor;
  }else{
    return dividend -1;
  }
}

function moveFrameLeft(frameToShow){

    $(".toggle-result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
    $(".result-img").animate({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'}, 500, "swing");

    // Hide to left / show from left
  $("#frame" + currentFrame).hide("slide", {direction: "right"}, 500);

    // Show from right / hide to right
  $("#frame" + frameToShow).show("slide", {direction: "left"}, 500);
  currentFrame = frameToShow;
}

function moveFrameRight(frameToShow){

    $(".toggle-result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
    $(".result-img").animate({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'}, 500, "swing");
    // Hide to left / show from left
  $("#frame" + currentFrame).hide("slide", {direction: "left"}, 500);

    // Show from right / hide to right
  $("#frame" + frameToShow).show("slide", {direction: "right"}, 500);
  
  currentFrame = frameToShow; 
}


$('#show-frame .right').click(function(event){
	event.stopPropagation();
  moveFrameRight((currentFrame + 1) % numOfFrame);
});

$('#show-frame .left').click(function(event){
	event.stopPropagation();
  moveFrameLeft(modDecrease(currentFrame, numOfFrame));
});


$("#display").click(function(){
	$("#viewport").hide("fade", 400);
});

$("#save-changes").click(function(){
	$("#viewport").hide("fade", 400, function(){
		console.log("currentFrame: " + currentFrame + "; currentGalleryItem: " + galleryItems[currentGalleryItem].frame)
		if (currentFrame != galleryItems[currentGalleryItem].frame) {
			$(".gallery-thumb:eq("+ currentGalleryItem  +")").find("img").hide("fade", 300, function(){
				$(this).detach();
				$(".gallery-thumb:eq("+ currentGalleryItem  +") a").append('<img class="nodisplay" src="' + frames[currentFrame].frameImg + '"/>');
				$(".gallery-thumb:eq("+ currentGalleryItem  +")").find("img").show("fade",300);
				galleryItems[currentGalleryItem].frame = currentFrame;
				sizeImage(galleryItems[currentGalleryItem].frame ,currentGalleryItem,true);
				setGalleryClickEvent();
				changeItemSetting(galleryItem[currentGalleryItem]);
			});
		}
		
	});
	console.log("checked:" + $("#viewport #setting .checkbox-inline input").prop( "checked" ));
	galleryItems[currentGalleryItem].public = $("#viewport #setting .checkbox-inline input").prop( "checked" );
});

$("#display .snap").click(function(event){
	event.stopPropagation();
});

$('#sortby').change(function(){
	console.log($(this).find('option:selected').val());
	reOrder($(this).find('option:selected').val());	
});

$("#links h1").click(function(){
	console.log("username-test:" + username);
})

$(window).resize(function(){
	sizeImages(false);
})