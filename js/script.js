
// var hideScrollC = $('.hide-scroll-c');
// hideScrollC.style.paddingRight = hideScrollC.offsetWidth - hideScrollC.clientWidth + "px";


function snapContent() {
    if ($('.page-btn-wrapper').css("content") == "") {
        $('#page0 .content-text').addClass("snap snap-left");
    }else{
        $('#page0 .content-text').removeClass("snap-left snap");
    }
}


function moveLeft(pageToShow){
	var pageToShow = "page" + (parseInt($(this).parents(".page:first").attr("value")) - 1);
    // Hide to left / show from left
    $(this).parents(".page:first").hide("slide", {direction: "right"}, 500);

    // Show from right / hide to right
    $("#" + pageToShow).show("slide", {direction: "left"}, 500);
}

function moveRight() {
	var pageToShow = "page" + (parseInt($(this).parents(".page:first").attr("value")) + 1);
    // Hide to left / show from left
    $(this).parents(".page:first").hide("fade", {direction: "left"}, 500);

    // Show from right / hide to right
    $("#" + pageToShow).show("fade", {direction: "right"}, 500);
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

function restart(){
    $(this).parents(".page:first").hide("slide", {direction: "right"}, 80);
    $("#page2").show("slide", {easing: "linear",direction: "left"}, 80);
    $("#page2").delay(80).hide("slide", {easing: "linear", direction: "right"}, 80);
    $("#page1").delay(80).show("slide", {easing: "linear", direction: "left"}, 80);
    $("#page1").delay(240).hide("slide", {easing: "linear", direction: "right"}, 80);
    $("#page0").delay(360).show("slide", {easing: "linear", direction: "left"}, 80);
    $(".result-img").delay(400).css({"visibility" : "hidden", "opacity" : "0"});
}


snapContent();
showImg();


$('.next-step').click(moveRight);
$('.back-step').click(moveLeft);
$('.submit').click(showOutput);
$('.restart').click(restart);
$('.back-step').click(showImg);
$('.toggle-horizontal').click(function () {
    $(this).children('span').toggleClass('rotate');
    $(this).children('span').toggleClass('rotate2');
    $(this).toggleClass('clicked');
    $(this).parents('.snap:first').toggleClass('shrink');
    $(this).parents('.snap:first').toggleClass('expand');
    $("#page3 #scene-carousel").toggleClass("nomargin");
});



$( window ).resize(snapContent);
