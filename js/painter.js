var uploadedImg;
var styleCode;
var numOfFrame;
var frames = [];
var scenes = [];
var sceneLocations = [];
var framesLocations = [];
var conetentMaxWidth = 600;
var frameHeight = 100000;
var wrapperWidth = 0;
var wrapperHeight = 0;
var currentFrame = 0;
var itemInRow = 4;
var carouselItemHeight = 150;
var windowWidth = $(window).width();
var windowHeight = $(window).height();


Dropzone.options.uploadImage = { 
  acceptedFiles: "image/*",
  maxFiles: 1,
  thumbnailWidth: 250,
  thumbnailHeight: 250
};


$('#toggle-art-style').click(function () {

    var showStyle = $('#show-style');
    var styles;

    $.getJSON('data/art-style.json', function (data) {

      console.log(data);

      styles = data.items;
      var content = data.items.map(function (item){
        return '<div class="style-item ui-widget-content" value = "' + item.value + '"><div class="style-thumbnail img-thumbnail" style="background-image:' 
        + item.thumbnail 
        + ';"></div><p>' 
        + item.name 
        +'</p></div>';
      });

      showStyle.empty();

      if (content.length) {
        showStyle.html(content);
      }

    });

    showStyle.text('Loading the JSON file.'); 

    $(function() {
      $( "#show-style" ).selectable({
        selected: function() {
          $("#apply-style").removeClass("disabled");
        },
        unselected: function() {
          $("#apply-style").addClass("disabled");
        },
        selecting: function(event, ui){
          if( $(".ui-selected, .ui-selecting").length > 1){
            $(ui.selecting).removeClass("ui-selecting");
          }
        }
      });
    });

    $("#apply-style").click(function(){
      if (!$(this).hasClass("disabled")) {
        styleCode = $(".ui-selected").attr("value");

        $("#art-style-modal").modal('hide');
        for (var i = 0; i < styles.length; i++) {
          
          if (styles[i].value == styleCode) {
            $("#page2 .dz-message").html('<div class="zone-img style-thumbnail img-thumbnail" style="background-image:' 
        + styles[i].thumbnail 
        + ';"></div><p>' 
        + styles[i].name 
        +'</p>')
          }
        }

      }
    });

});


function setFrame(){
  var showFrame = $('#show-frame');

  $.getJSON('data/frame.json', function (data) {

      console.log(data);

      numOfFrame =  data.items.length;

      var content = '';
      var previewContent = '';
      for (var i = 0; i < data.items.length; i++) {
        var proportion = conetentMaxWidth / (data.items[i].size.width - data.items[i].padding.left - data.items[i].padding.right); 
        var contentHeight = (data.items[i].size.height - data.items[i].padding.top - data.items[i].padding.bottom)*proportion;
        var displayPaddingLeft = data.items[i].padding.left*proportion;
        var displayPaddingRight = data.items[i].padding.right*proportion;
        var displayPaddingTop = data.items[i].padding.top*proportion;
        var displayPaddingBottom = data.items[i].padding.bottom*proportion;


        var displayWidth = conetentMaxWidth + displayPaddingLeft + displayPaddingRight;
        var displayHeight = contentHeight + displayPaddingTop + displayPaddingBottom;

        frames[i] = {value: i, contentHeight: contentHeight, contentWidth: conetentMaxWidth, displayHeight: displayHeight, displayWidth: displayWidth, resHeight: data.items[i].size.height, resWidth: data.items[i].size.width, paddingTop: data.items[i].padding.top, paddingLeft: data.items[i].padding.left};
        framesLocations[i] = locateFrame(sceneLocations[$('#show-scene .item.active').attr("value")], frames[i]);

        if (displayHeight > wrapperHeight) {
          wrapperHeight = displayHeight;
        }

        if (displayWidth > wrapperWidth) {
          wrapperWidth = displayWidth;
        }

        content += '<div class="frame-item-container nodisplay" id="frame' + i + '"><div class="frame-item" style="width:' + displayWidth  + 'px; height:' + displayHeight + 'px; background-image: '+ data.items[i].frameImg + '"></div><div class="framebase" style="width:' + (conetentMaxWidth + 6) + 'px; height:' + (contentHeight + 6) + 'px;"></div></div>';
        if (i % itemInRow == 0) {
          previewContent += '<div class="item" id="row' + Math.floor(i / itemInRow) + '">';
        };
        previewContent += '<div class="frame-thumb-wrapper"><div class="thumb" value="' + i + '" style="background-image: '+ data.items[i].frameImg + '"></div></div>';
        if ( ( (i + 1) % itemInRow == 0) || ( (i + 1) ==  numOfFrame) ) {
          previewContent += '</div>';
        };
      
      }

      content += '<div class="result-img zoom" style="width:' + (conetentMaxWidth+2) +'px; height:' + (frames[currentFrame].contentHeight+2) +'px"></div><div class="toggle-result-img" style="width:' + (conetentMaxWidth+2) +'px; height:' + (frames[currentFrame].contentHeight+2) +'px" data-toggle="modal" data-target="#resultImgZoom"></div></div>';

      showFrame.css({"height": wrapperHeight + "px"});
      $(".frame-control").css({"width": wrapperWidth + "px"});

      if (content.length && previewContent.length) {
        showFrame.prepend(content);
        $('#frame-carousel .carousel-inner').html(previewContent);
      }

      $(".frame-item-container:first-child").removeClass("nodisplay");
      $("#frame-carousel .item:first-child").addClass("active");


    });
}

function locateFrame(scenelocation, frame){
  return {value: frame.value, }
}

function locate(scene){

  var areaNotShownW;
  var areaNotShownH;
  var sceneDisplayHeight;
  var sceneDisplayWidth;
  var proportion;
  var sceneActualPaddingTop;
  var sceneActualPaddingLeft;
  var sceneContentWidth;
  var sceneContentHeight;
  var widerThenWindow = ($(window).width() / $(window).height()) < (scene.resWidth / scene.resHeight);


  if (!widerThenWindow) {
    proportion = $(window).width() / scene.resWidth;
    sceneDisplayHeight = proportion*scene.resHeight;
    areaNotShownH = (sceneDisplayHeight - $(window).height()) / 2;
    sceneActualPaddingTop = scene.paddingTop*proportion - areaNotShownH;
    sceneActualPaddingLeft = scene.paddingLeft*proportion;
  }else{
    proportion = $(window).height() / scene.resHeight;
    sceneDisplayWidth = proportion*scene.resWidth;
    areaNotShownW = (sceneDisplayWidth - $(window).width()) / 2;
    sceneActualPaddingTop = scene.paddingTop*proportion;
    sceneActualPaddingLeft = scene.paddingLeft*proportion - areaNotShownW;
  }
  sceneContentWidth = scene.contentWidth*proportion;
  sceneContentHeight = scene.contentHeight*proportion;

  return {value: scene.value, sceneContentHeight: sceneContentHeight, sceneContentWidth: sceneContentWidth, sceneActualPaddingTop: sceneActualPaddingTop, sceneActualPaddingLeft: sceneActualPaddingLeft, widerThenWindow: widerThenWindow};
}

function relocate(sceneLocation, resize){
  if ( ((windowWidth!=$(window).width()) && (windowHeight!=$(window).height())) || (sceneLocation.widerThenWindow && (windowHeight!= $(window).height())) || ((!sceneLocation.widerThenWindow) && (windowWidth!= $(window).width())) ){
    sceneLocations[sceneLocation.value] = locate(scenes[sceneLocation.value]);
  }else if(sceneLocation.widerThenWindow && (windowWidth!=$(window).width())){
    sceneLocations[sceneLocation.value].sceneActualPaddingLeft = sceneLocation.sceneActualPaddingLeft -  ( (windowWidth - $(window).width()) / 2 );
  }else if ( (!sceneLocation.widerThenWindow) && (windowHeight!=$(window).height()) ){
    sceneLocations[sceneLocation.value].sceneActualPaddingTop = sceneLocation.sceneActualPaddingTop - ( (windowHeight - $(window).height()) / 2 );
  }
}

function createLocation(sceneLocation){
  return '<div id="location'+ sceneLocation.value + '" class="testEle" style="height:'+ sceneLocation.sceneContentHeight + 'px; width:'+ sceneLocation.sceneContentWidth +'px; top:'+ sceneLocation.sceneActualPaddingTop +'px; left:'+ sceneLocation.sceneActualPaddingLeft +'px;"></div>';
}


function setScene(){
   var showScene = $('#show-scene');

    $.getJSON('data/scene.json', function (data){

      console.log(data);

      var content = '';
      var previewContent = '';


      for (var i = 0; i < data.items.length; i++) {


        scenes[i] = {value: i, contentHeight: data.items[i].content.height, contentWidth: data.items[i].content.width, resHeight: data.items[i].size.height, resWidth: data.items[i].size.width, paddingTop: data.items[i].padding.top, paddingLeft: data.items[i].padding.left};
        sceneLocations[i] = locate(scenes[i]);

        content+= '<div class="item" style="background-image: '+ data.items[i].sceneImg +'" value="'+ i + '">'+ createLocation(sceneLocations[i]) +'</div>';

        if (i % itemInRow == 0) {
          previewContent += '<div class="item" id="row' + Math.floor(i / itemInRow) + '">';
        };
        previewContent += '<div class="scene-thumb-wrapper"><div class="thumb" value="' + i + '" style="background-image: '+ data.items[i].sceneImg + '" data-target="#preview-scene" data-slide-to="'+ i +'"></div></div>';
        if ( ( (i + 1) % itemInRow == 0) || ( (i + 1) ==  numOfFrame) ) {
          previewContent += '</div>';
        };

        


      }

      if (content.length && previewContent.length) {
        showScene.append(content);
        $('#scene-carousel .carousel-inner').prepend(previewContent);
        // $('#preview-scene').append(testEle);
      }

      $("#show-scene .item:first-child").addClass("active");
      $('#scene-carousel .item:first-child').addClass("active");
    });
}


function moveFrameLeft(frameToShow){

  // alert("frameToshow:" + frameToShow);
    // Hide to left / show from left
    $("#frame" + currentFrame).hide("slide", {direction: "right"}, 500);

    // Show from right / hide to right
    $("#frame" + frameToShow).show("slide", {direction: "left"}, 500);
    $(".toggle-result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
    $(".result-img").animate({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'}, 500, "swing");
    currentFrame = frameToShow;
}

function moveFrameRight(frameToShow){
    // Hide to left / show from left
    $("#frame" + currentFrame).hide("slide", {direction: "left"}, 500);

    // Show from right / hide to right
    $("#frame" + frameToShow).show("slide", {direction: "right"}, 500);
    $(".toggle-result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
    $(".result-img").animate({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'}, 500, "swing");
    currentFrame = frameToShow; 
}

function modDecrease(dividend, divisor){
  if ((dividend - 1) < 0) {
    return dividend - 1 + divisor;
  }else{
    return dividend -1;
  }
}


$('#show-frame .right').click(function(){
  moveFrameRight((currentFrame + 1) % numOfFrame);
});

$('#show-frame .left').click(function(){
  moveFrameLeft(modDecrease(currentFrame, numOfFrame));
});




function zoomImgModal(){
  $('#resultImgZoom').html(
    '<img src="/output/result.jpg" class="img-responsive" data-dismiss="modal">');
};

$('.switch-to-scene').click(function(){
    $(this).children('span').toggleClass('rotate');
    $(this).children('span').toggleClass('rotate2');
    $(this).children('p:first').fadeToggle();
    $(this).children('p:last').fadeToggle();

    $("#background-slide").toggle("slide", {direction: "up"}, 500);
    $("#preview-scene").toggle("slide", {direction: "down"}, 500);
    $("#page3 .page-btn-wrapper").toggle("slide", {direction: "down"}, 500);
    $(".scene-carousel-wrapper").removeClass("temp-transition");
    $("#page3 .scene-carousel-wrapper").toggle("slide", {direction: "down"}, 500);
    if ($("#page3 .snap-right").hasClass("expand") && $("#page3 .switch-to-scene span").hasClass("rotate")) {
      $("#page3 .snap-right").toggleClass('expand');
      $("#page3 .snap-right").toggleClass('shrink');
      $("#page3 .snap-right .toggle-horizontal").toggleClass('clicked');
      $("#page3 .snap-right .toggle-horizontal").toggleClass('rotate');
      $("#page3 .snap-right .toggle-horizontal").toggleClass('rotate2');
      $("#page3 #scene-carousel").toggleClass("nomargin");
      // $("#show-frame").toggle("slide", {direction: "up"}, 500);

    }

    $("#page3 .snap-right, #page3 .toggle-horizontal").toggleClass("nomargin");
    $("#bg-wrapper>.navbar").toggle("slide", {direction: "up"}, 300);
});

$(".toggle-scene-carousel span").click(function(){
  $(".toggle-scene-carousel span").toggleClass('rotate');
  $(".toggle-scene-carousel span").toggleClass('rotate2');
  $(".scene-carousel-wrapper").addClass("temp-transition");
  $(".scene-carousel-wrapper").toggleClass('expand');
  $(".scene-carousel-wrapper").toggleClass('shrink');
})

$(document).on('ready', function(){
  $('#frame-carousel').on("click",".frame-thumb-wrapper .thumb", function(){
    var frameToShow = $(this).attr("value");
    if (currentFrame < frameToShow) {
      moveFrameRight(frameToShow);
    }else if(currentFrame > frameToShow){
      moveFrameLeft(frameToShow);
    }
  });
    
});

$(window).on('resize', function(){

  for (var i = 0; i < sceneLocations.length; i++) {
    relocate(sceneLocations[i]);
    $('#location' + sceneLocations[i].value).css({"height":sceneLocations[i].sceneContentHeight+"px", "width":sceneLocations[i].sceneContentWidth+"px", "top": sceneLocations[i].sceneActualPaddingTop+"px", "left": sceneLocations[i].sceneActualPaddingLeft+"px"});
    sceneLocations[i].widerThenWindow = ($(window).width() / $(window).height()) < (scenes[i].resWidth / scenes[i].resHeight);
  }

  console.log("Width" + windowWidth + ":" + $(window).width());
  console.log("Height" + windowHeight + ":" + $(window).height());
  windowHeight = $(window).height();
  windowWidth = $(window).width();
});

zoomImgModal();
setScene();
setFrame();