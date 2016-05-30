var styleCode;
var numOfFrame;
var frames = [];
var scenes = [];
var sceneLocations = [];
var conetentMaxWidth = Math.min($(window).width()* 0.55, 600);
var conetentMaxHeight = Math.min($(window).height()* 0.55, 400);
var frameHeight = 100000;
var wrapperWidth = 0;
var wrapperHeight = 0;
var currentFrame = 0;
var itemInRow = 4;
var carouselItemHeight = 150;
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var frameOri = false;


//painter functions---------------------------------------------------
//--------------------------------------------------------------------\
var res;
var queueTime;
var resultImg;




if ($(".headline").css("margin-top") == "90px") {
  var uploadThumbSize = 206;
} else{
  var uploadThumbSize = 250;
}

Dropzone.options.uploadImage = {
  url: "painter/upload",
  acceptedFiles: "image/*",
  maxFiles: 1,
  maxFilesize: 8,
  thumbnailWidth: uploadThumbSize,
  thumbnailHeight: uploadThumbSize,
  dictDefaultMessage: "<div class=\"dz-default dz-message\"><span>浏览或者拖拽图片至此以上传</br>或者</span><div class=\"browse-btn\"><span>浏览</span></div></div>",
  dictFallbackMessage: "您的浏览器不支持拖拽上传",
  dictFileTooBig: "您所上传的图片太大 ({{filesize}}MiB)。最大图片大小: {{maxFilesize}}MiB.",
  dictInvalidFileType: "您不能上传这种类型的文件",
  dictResponseError: "服务器回传 {{statusCode}} 错误代码",
  dictCancelUpload: "取消上传",
  dictCancelUploadConfirmation: "您确定要取消这个上传吗？",
  dictRemoveFile: "重新选择",
  dictRemoveFileConfirmation: null,
  dictMaxFilesExceeded: "您不能上传更多文件了",
  addRemoveLinks: true,
  init: function() {

        this.on("success", function(file, response) {
          var vertical = file.height > file.width;
          if (vertical != frameOri) {
            rotateFrame(vertical);
            frameOri = vertical;
          }
          res = JSON.parse(response);
          console.log(res.id);
          if(window.location.hash == '#page1'){
            setTimeout(function(){
              window.location.hash = '#page2'
            }, 500);
          };
        });

        this.on("addedfile",function(file){
          console.log("addedfile");
          res = 'false';
        });

        this.on("canceled",function(file){
          console.log("canceled");
          res = '';
        });

        this.on("removedfile",function(file){
          console.log("removedfile");
          res = '';
        });
  }
};




function submitImg(){

  if ((typeof res === "undefined") || res == '') {
    alert("请上传一张图片！");
  }else if (res == 'false')  {
    alert("图片上传中，请稍等");
  }else if ((typeof styleCode === "undefined") || styleCode == '')  {
    alert("请选择一种美术风格以继续");
  }else{

    $.ajax({
      url: "painter/queue",
      method: "get",
      success: function(qT){
        queueTime = JSON.parse(qT);
        console.log("queue" + queueTime.sec);
        getResult();
      }
    });
  }
};

function getResult(){

  console.log("username: " + username);

  if (username.length) {
    var formdata = {
      id: res.id,
      style: styleCode,
      ext: res.ext
    }
  }else{
    var formdata = {
      id: res.id,
      username:username,
      style: styleCode,
      ext: res.ext
    }
  }

  $.ajax({
      url: "painter/paint",
      method: "post",
      data:JSON.stringify(formdata),
      beforeSend: function(){
        $('.loading.bar').show("fade", 500);
        $('.loading.bar span').html(((queueTime.sec + 1) * 2)+ " ");
        $('.loading.bar .progress-bar').animate({width: "97%"}, (queueTime.sec + 1) * 2000);
      },
      success: function(paintedResponse){
        resultImg = paintedResponse.sourceImg;
        window.location.hash = "#page3";
        $('.result-img').delay(600).css({"visibility":"visible"}).animate({opacity: "1"}, 700, "swing");
        $('.result-img').css({"background-image" : "url(" + resultImg + ")"});
        $('#resultImgZoom img').attr("src", resultImg);
      },
      complete: function(){
        $('.loading.bar .progress-bar').stop(true, false);
        $('.loading.bar .progress-bar').animate({width: "100%"}, 150);
        $('.loading.bar').delay(150).hide("fade", 500, function(){
          $('.loading.bar .progress-bar').css({width: "0"});
        });
      }
  });
}


// submit the for painting
$('.submit').click(submitImg);



function setArtstlye() {

    var showStyle = $('#show-style');
    var styles;

    $.getJSON('data/art-style.json', function (data) {

      console.log(data);

      styles = data.items;
      // for (var i = 0; i < styles.length; i++) {
      //   styles[i]
      // }
      var content = data.items.map(function (item){
        return '<div class="style-item ui-widget-content" value = "' + item.value + '"><div class="style-thumbnail img-thumbnail" style="background-image:' 
        + item.thumbnail 
        + ';"></div><p>' 
        + item.nameCh
        +'</p></div>';
      });

      showStyle.empty();

      if (content.length) {
        showStyle.append    (content);
        $(".style-item:first-child").css({"margin-top": (($("#show-style").height() - $(".style-item:eq(2)").innerHeight()) / 2) + "px"});
        $(".style-item:last-child").css({"margin-bottom": (($("#show-style").height() - $(".style-item:eq(2)").innerHeight()) / 2) + "px"});
      }


    });

    showStyle.text('Loading the JSON file.'); 


    $("#apply-style").click(function(){
      if (!$(this).hasClass("disabled")) {
        styleCode = $(".ui-selected").attr("value");
  

        $("#art-style-modal").modal('hide');
        for (var i = 0; i < styles.length; i++) {
          
          if (styles[i].value == styleCode) {
            $("#page2 .dz-message").html('<div class="zone-img style-thumbnail img-thumbnail" style="background-image:' 
        + styles[i].thumbnail 
        + ';"></div><p>' 
        + styles[i].nameCh
        +'</p>');
          }
        }

      }
    });
};



//--------------------------------------------------------


function setFrame(){

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
          paddingRight: data.items[i].padding.right
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


    });
}

function rotateFrame(vertical){
  // if (vertical) {
  //   for (var i = 0; i < frames.length; i++) {
  //       var proportion = conetentMaxHeight / (frames[i].resWidth - frames[i].paddingLeft - frames[i].paddingRight); 
  //       var contentHeight =  (frames[i].resHeight - frames[i].paddingTop - frames[i].paddingBottom)*proportion;
  //       var displayPaddingLeft = frames[i].padding.left*proportion;
  //       var displayPaddingRight = frames[i].padding.right*proportion;
  //       var displayPaddingTop = frames[i].padding.top*proportion;
  //       var displayPaddingBottom = frames[i].padding.bottom*proportion;


  //       var displayWidth = conetentMaxHeight + displayPaddingLeft + displayPaddingRight;
  //       var displayHeight = contentHeight + displayPaddingTop + displayPaddingBottom;

  //       frames[i].contentHeight = conetentMaxHeight;
  //       frames[i].contentWidth = contentWidth;
  //       frames[i].displayHeight = displayHeight;
  //       frames[i].displayWidth = displayWidth;
        
  //       wrapperHeight = 0;
  //       wrapperWidth = 0;

  //       if (displayWidth > wrapperHeight) {
  //         wrapperHeight = displayWidth;
  //       }

  //       if (displayHeight > wrapperWidth) {
  //         wrapperWidth = displayHeight;
  //       }

  //       $("#frame" + i +" .frame-item").css({ 
  //         width: frames[i].displayWidth + "px", 
  //         height: frames[i].displayHeight + "px"});


  //       $("#frame" + i +" .framebase").css({
  //         "width": (frames[i].contentWidth + 2) + "px", 
  //         "height": (frames[i].contentHeight + 2) + "px"});   
  //   }
  // }
}

function repositionFrame(){
  for (var i = 0; i < frames.length; i++) {

    if (i != currentFrame) {
      $("#frame" + i +" .frame-item").css({
        left: "50%", 
        top: "50%", 
        width: frames[i].displayWidth + "px", 
        height: frames[i].displayHeight + "px"});

      $("#frame" + i +" .frame-item").css({"transform": "translate(-50%, -50%)"});

      $("#frame" + i +" .framebase").css({
        "width": (frames[i].contentWidth + 2) + "px", 
        "height": (frames[i].contentHeight + 2) + "px", 
        "left": "50%", 
        "top": "50%"});
      $("#frame" + i +" .framebase").css({"transform": "translate(-50%, -50%)"});
    }  

  }

  $(".frame-control").animate({
    "width": wrapperWidth + "px", 
    "height": "100%", 
    "left": "0", 
    "top": "0"}, 500, "swing");

  $(".frame-control").css({"position": "relative"});

  $("#frame" + currentFrame +" .frame-item").animate({
    left: "50%", 
    top: "50%", 
    width: frames[currentFrame].displayWidth + "px", 
    height: frames[currentFrame].displayHeight + "px"}, 500, "swing");

  $("#frame" + currentFrame +" .frame-item").css({"transform": "translate(-50%, -50%)"});

  $("#frame" + currentFrame +" .framebase, .result-img, .toggle-result-img").animate({
    "width": (frames[currentFrame].contentWidth + 2) + "px", 
    "height": (frames[currentFrame].contentHeight + 2) + "px", 
    "left": "50%", 
    "top": "50%"}, 500, "swing");

  $("#frame" + currentFrame +" .framebase, .result-img, .toggle-result-img").css({"transform": "translate(-50%, -50%)"});

}

function locateFrame(sceneLocation, frame){
  
  var extraMarginTop;
  var extraMarginLeft;
  var displayHeight;
  var displayWidth;
  var proportion;
  var actualPaddingTop;
  var actualPaddingLeft;
  var frameMarginTop;
  var frameMarginLeft;
  var contentWidth;
  var contentHeight;
  var widerThenLoacation = (sceneLocation.sceneContentWidth / sceneLocation.sceneContentHeight) < (frame.resWidth / frame.resHeight);

  if (widerThenLoacation) {
    proportion = sceneLocation.sceneContentWidth / frame.resWidth;
    displayHeight = proportion*frame.resHeight;
    displayWidth = sceneLocation.sceneContentWidth;
    extraMarginTop = (sceneLocation.sceneContentHeight - displayHeight) / 2;
    extraMarginLeft = 0;
  }else{
    proportion = sceneLocation.sceneContentHeight / frame.resHeight;
    displayWidth = proportion*frame.resWidth;
    displayHeight = sceneLocation.sceneContentHeight;
    extraMarginTop = 0;
    extraMarginLeft = (sceneLocation.sceneContentWidth - displayWidth) / 2;
  }
  contentWidth = proportion*frame.resContentWidth;
  contentHeight = proportion*frame.resContentHeight;
  frameMarginTop =  extraMarginTop + sceneLocation.sceneActualPaddingTop;
  frameMarginLeft = extraMarginLeft + sceneLocation.sceneActualPaddingLeft;
  actualPaddingTop = frameMarginTop + (frame.paddingTop * proportion);
  actualPaddingLeft = frameMarginLeft + (frame.paddingLeft * proportion);

  return {value: frame.value, displayHeight: displayHeight, displayWidth: displayWidth, actualPaddingTop: actualPaddingTop, actualPaddingLeft: actualPaddingLeft, frameMarginTop: frameMarginTop, frameMarginLeft: frameMarginLeft, contentWidth: contentWidth, contentHeight: contentHeight };
}

function relocateFrame(sceneLocation, frameLocation){
  $(".frame-control").animate({
    "width": sceneLocation.sceneContentWidth + "px", 
    "height": sceneLocation.sceneContentHeight + "px", 
    "left": sceneLocation.sceneActualPaddingLeft + "px", 
    "top": sceneLocation.sceneActualPaddingTop + "px"}, 500, "swing");

  $(".frame-control").css({"position": "absolute"});

  $("#frame" + currentFrame +" .frame-item").animate({
    left: frameLocation.frameMarginLeft + "px", 
    top: frameLocation.frameMarginTop + "px", 
    width: frameLocation.displayWidth + "px", 
    height: frameLocation.displayHeight + "px"}, 500, "swing");

  $("#frame" + currentFrame +" .frame-item").css({"transform": "initial"});

  $("#frame" + currentFrame +" .framebase, .result-img, .toggle-result-img").animate({
    "width": (frameLocation.contentWidth + 2) + "px", 
    "height": (frameLocation.contentHeight + 2) + "px", 
    "left": (frameLocation.actualPaddingLeft - 1) + "px", 
    "top": (frameLocation.actualPaddingTop - 1) + "px"}, 500, "swing");

  $("#frame" + currentFrame +" .framebase, .result-img, .toggle-result-img").css({"transform": "initial"});
}

function resizeFrame(sceneLocation, frameLocation, frameID){

  console.log("resizing frame" + frameID);
  $(".frame-control").css({
    "width": sceneLocation.sceneContentWidth + "px", 
    "height": sceneLocation.sceneContentHeight + "px", 
    "left": sceneLocation.sceneActualPaddingLeft + "px", 
    "top": sceneLocation.sceneActualPaddingTop + "px"});
  $(".frame-control").css({"position": "absolute"});

  $("#frame" + frameID +" .frame-item").css({
    left: frameLocation.frameMarginLeft + "px", 
    top: frameLocation.frameMarginTop + "px", 
    width: frameLocation.displayWidth + "px", 
    height: frameLocation.displayHeight + "px"});

  $("#frame" + frameID +" .frame-item").css({"transform": "initial"});

  $("#frame" + frameID +" .framebase, .result-img, .toggle-result-img").css({
    "width": (frameLocation.contentWidth + 2) + "px", 
    "height": (frameLocation.contentHeight + 2) + "px", 
    "left": (frameLocation.actualPaddingLeft - 1) + "px", 
    "top": (frameLocation.actualPaddingTop - 1) + "px"});
  $("#frame" + frameID +" .framebase, .result-img, .toggle-result-img").css({"transform": "initial"});

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

  if ($(".switch-to-scene span").hasClass("rotate")) {
    console.log("not in scene");
    var newFrameLocation = locateFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], frames[frameToShow]);
    resizeFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], newFrameLocation, frameToShow);
  }else{
    $(".toggle-result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
    $(".result-img").animate({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'}, 500, "swing");
  }

  // alert("frameToshow:" + frameToShow);
    // Hide to left / show from left
  $("#frame" + currentFrame).hide("slide", {direction: "right"}, 500);

    // Show from right / hide to right
  $("#frame" + frameToShow).show("slide", {direction: "left"}, 500);
  currentFrame = frameToShow;
}

function moveFrameRight(frameToShow){

  if ($(".switch-to-scene span").hasClass("rotate")) {
    console.log("in scene");
    var newFrameLocation = locateFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], frames[frameToShow]);
    resizeFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], newFrameLocation, frameToShow);
  }else{
    console.log("not in scene");
    $(".toggle-result-img").css({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'});
    $(".result-img").animate({width: (frames[frameToShow].contentWidth+2) + 'px', height: (frames[frameToShow].contentHeight+2) + 'px'}, 500, "swing");
  }
    // Hide to left / show from left
  $("#frame" + currentFrame).hide("slide", {direction: "left"}, 500);

    // Show from right / hide to right
  $("#frame" + frameToShow).show("slide", {direction: "right"}, 500);
  
  currentFrame = frameToShow; 
}


function modDecrease(dividend, divisor){
  if ((dividend - 1) < 0) {
    return dividend - 1 + divisor;
  }else{
    return dividend -1;
  }
}

function restart(){
     window.location.hash = "#page1";
    $(".result-img").delay(400).css({"visibility" : "hidden", "opacity" : "0"});
    Dropzone.forElement("#upload-image").removeAllFiles(true);
    res = '';
    styleCode = '';
    $(".style-item").removeClass("ui-selected");
    console.log("res: " + res + ", styleCode: " + styleCode);

}


$('#show-frame .right').click(function(){
  moveFrameRight((currentFrame + 1) % numOfFrame);
});

$('#show-frame .left').click(function(){
  moveFrameLeft(modDecrease(currentFrame, numOfFrame));
});


function zoomImgModal(){
  $('#resultImgZoom').html(
    '<img class="img-responsive" data-dismiss="modal">');
};



// reset everything
$('.restart').click(restart);


// force removing scene: not usually called
function removeScene(){
  $('.switch-to-scene').children('span').removeClass('rotate');
  $('.switch-to-scene').children('span').addClass('rotate2');
  $('.switch-to-scene').children('p:first').fadeIn();
  $('.switch-to-scene').children('p:last').fadeOut();
  $("#page3 .dz-header").fadeIn();

  $("#background-slide").show("slide", {direction: "up"}, 500);
  $("#preview-scene").hide("slide", {direction: "down"}, 500);
  $("#page3 .page-btn-wrapper").show("slide", {direction: "down"}, 500);
  $(".scene-carousel-wrapper").removeClass("temp-transition");
  $("#page3 .scene-carousel-wrapper").hide("slide", {direction: "down"}, 500);


  $(".frame-wrapper .toggle-result-img, .frame-wrapper .carousel-control").removeClass('in-scene');
  $("#page3 .snap-right, #page3 .toggle-horizontal").removeClass("nomargin");
  $("#bg-wrapper>.navbar").show("slide", {direction: "up"}, 300);

  repositionFrame();
}

function fadeScroll(){
  var nth = 0;
  var itemOutHeight = $(".style-item:eq(2)").innerHeight();


  $(".style-item").each(function(){
    var scrollPos = $("#show-style .mCSB_container").position();
    $(this).css("opacity", 1 -  Math.abs((scrollPos.top * -1) - itemOutHeight * nth ) / (itemOutHeight * 1.2));
    nth++;
  });
  // $(".style-item").css("opacity", 1 - $("#show-style").scrollTop() / $(this).innerHeight(true));
};

// bounce the toggle button
$(window).on('hashchange', function(){
  if(window.location.hash == '#page3'){
    $('.switch-to-scene').delay(500).effect( "bounce", {distance: 70, times:4}, 1200);
  };

  if(window.location.hash == '#page2'){

    $(".style-item:first-child").css({"margin-top": (($("#show-style").height() - $(".style-item:eq(2)").innerHeight()) / 2) + "px"});
    $(".style-item:last-child").css({"margin-bottom": (($("#show-style").height() - $(".style-item:eq(2)").innerHeight()) / 2) + "px"});
    if ($(".style-item").index($(".ui-selected")) == -1) {
    }else{
      $("#show-style .mCSB_container").css({top: $(".style-item:eq(2)").innerHeight() * $(".style-item").index($(".ui-selected")) + "px" });
    }
    fadeScroll();
  };
});


// page functions
var currentPage = '';
// var hideScrollC = $('.hide-scroll-c');
// hideScrollC.style.paddingRight = hideScrollC.offsetWidth - hideScrollC.clientWidth + "px";



function movePage(direction) {

    var pageToShow = "#page" + (parseInt($(currentPage).attr("value")) + direction);
 
    window.location.hash = pageToShow;

    // console.log(currentPage);
    // console.log(pageToShow);
}


function render(url){
    console.log("render");
    var temp = url.split('/')[0];
    // console.log($(currentPage).attr("value"));
    // console.log($(temp).attr("value"));

    if (temp == ''){
        temp = "#page0";
    }

    if (currentPage.length) {
        if ($(currentPage).attr("value") < $(temp).attr("value")){
            $(currentPage).hide("slide", {direction: "left"}, 500);
            $(temp).show("slide", {direction: "right"}, 500);
        }else if ($(currentPage).attr("value") > $(temp).attr("value")) {
            $(currentPage).hide("slide", {direction: "right"}, 500);
            $(temp).show("slide", {direction: "left"}, 500);
        }
    }else{
        $(temp).show();
    }

    showImg();
    if(currentPage == '#page3'){
        removeScene();
    }

    currentPage = temp;
}
    
function showImg() {
    if($('#page0').is(':visible')) {
            var time = 0;
            $('.fadeChain').each(function() {
                $(this)
                    .delay(time)
                    .css({"visibility":"visible"})
                    .animate({opacity: "1", top: "0"}, 500, "swing");
                time += 300;
            });
    }
}

function showOutput() {
    // Hide to left / show from left
    $(this).parents(".page:first").hide("slide", {direction: "left"}, 500);

    // Show from right / hide to right
    $("#page3").show("slide", {direction: "right"}, 500);

    $('.result-img').delay(600).css({"visibility":"visible"}).animate({opacity: "1"}, 700, "swing");
}

$('.next-step').on('click', function(){
    movePage(1);
});
$('.back-step').on('click', function(){
    movePage(-1);
});


$('.back-step').click(showImg);








// toggle scene
$('.switch-to-scene').click(function(){
    $(this).children('span').toggleClass('rotate');
    $(this).children('span').toggleClass('rotate2');
    $(this).children('p:first').fadeToggle();
    $(this).children('p:last').fadeToggle();
    $("#page3 .dz-header").fadeToggle();

    $("#background-slide").toggle("slide", {direction: "up"}, 500);
    $("#preview-scene").toggle("slide", {direction: "down"}, 500);
    $("#page3 .page-btn-wrapper").toggle("slide", {direction: "down"}, 500);
    $(".scene-carousel-wrapper").removeClass("temp-transition");
    $("#page3 .scene-carousel-wrapper").toggle("slide", {direction: "down"}, 500);
    if ($("#page3 .snap-right").hasClass("expand") && $("#page3 .switch-to-scene span").hasClass("rotate")) {
      $("#page3 .snap-right").toggleClass('expand');
      $("#page3 .snap-right").toggleClass('shrink');
      $("#page3 .snap-right .toggle-horizontal").toggleClass('clicked');
      $("#page3 .snap-right .toggle-horizontal").children('span').toggleClass('rotate');
      $("#page3 .snap-right .toggle-horizontal").children('span').toggleClass('rotate2');
      $("#page3 #scene-carousel").toggleClass("nomargin");
      // $("#show-frame").toggle("slide", {direction: "up"}, 500);

    }

    $(".frame-wrapper .toggle-result-img, .frame-wrapper .carousel-control").toggleClass('in-scene');
    $("#page3 .snap-right, #page3 .toggle-horizontal").toggleClass("nomargin");
    $("#bg-wrapper>.navbar").toggle("slide", {direction: "up"}, 300);

    //transform scene
    if ($(".switch-to-scene span").hasClass("rotate")){
      console.log("transform frame");
      var newFrameLocation = locateFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], frames[currentFrame]);
      relocateFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], newFrameLocation);
    }else if($(".switch-to-scene span").hasClass("rotate2")){
      console.log("reposition frame");
      repositionFrame();
    }
});

// toggle scene-carousel
$(".toggle-scene-carousel span").click(function(){
  $(".toggle-scene-carousel span").toggleClass('rotate');
  $(".toggle-scene-carousel span").toggleClass('rotate2');
  $(".scene-carousel-wrapper").addClass("temp-transition");
  $(".scene-carousel-wrapper").toggleClass('expand');
  $(".scene-carousel-wrapper").toggleClass('shrink');
  $('.toggle-btn-plate').fadeToggle(200);
});


// json fuctions
$(document).on('ready', function(){
  $('#frame-carousel').on("click",".frame-thumb-wrapper .thumb", function(){
    var frameToShow = $(this).attr("value");
    if (currentFrame < frameToShow) {
      moveFrameRight(frameToShow);
    }else if(currentFrame > frameToShow){
      moveFrameLeft(frameToShow);
    }
  });

  $('#scene-carousel').on("click", ".thumb", function(){
    var newFrameLocation = locateFrame(sceneLocations[$(this).attr("value")], frames[currentFrame]);
    console.log($(this).attr("value"));
    relocateFrame(sceneLocations[$(this).attr("value")], newFrameLocation);
  });

  $(".frame-wrapper").on("mouseenter", ".in-scene", function(){
    $(".frame-wrapper .carousel-control").toggleClass('transparent');
  }).on("mouseleave", ".in-scene", function(){
    $(".frame-wrapper .carousel-control").toggleClass('transparent');
  });
  

  // Custom scroll bar
});

$(window).load(function(){

  $("#show-style").mCustomScrollbar({
    theme: "minimal",
    autoHideScrollbar: false,
    callbacks:{
      whileScrolling: function(){
        fadeScroll();
      }
    }
  });

  $( "#show-style .mCSB_container" ).selectable({
    selected: function(event, ui) {
      $("#show-style").mCustomScrollbar('scrollTo',  $(".style-item:eq(2)").innerHeight() * $(".style-item").index(ui.selected));
      styleCode = $(ui.selected).attr("value");
    },
    unselected: function() {
      styleCode = '';
    },
    selecting: function(event, ui){
      if( $(".ui-selected, .ui-selecting").length > 1){
        $(ui.selecting).removeClass("ui-selecting");
      }
    }
  });

  fadeScroll();

});


// scene resize functions
$(window).on('resize', function(){
  if ($(".switch-to-scene span").hasClass("rotate")){
    console.log($("#show-scene .active>div").attr("value"));
    for (var i = 0; i < sceneLocations.length; i++) {
      relocate(sceneLocations[i]);
      $('#location' + sceneLocations[i].value).css({"height":sceneLocations[i].sceneContentHeight+"px", "width":sceneLocations[i].sceneContentWidth+"px", "top": sceneLocations[i].sceneActualPaddingTop+"px", "left": sceneLocations[i].sceneActualPaddingLeft+"px"});
      sceneLocations[i].widerThenWindow = ($(window).width() / $(window).height()) < (scenes[i].resWidth / scenes[i].resHeight);
    }

    var newFrameLocation = locateFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], frames[currentFrame]);
    resizeFrame(sceneLocations[$("#preview-scene .item.active").attr("value")], newFrameLocation, currentFrame);
    // console.log("Width" + windowWidth + ":" + $(window).width());
    // console.log("Height" + windowHeight + ":" + $(window).height());
    windowHeight = $(window).height();
    windowWidth = $(window).width();
  }
});


zoomImgModal();
setScene();
setFrame();
setArtstlye();