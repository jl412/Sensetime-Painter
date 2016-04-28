var currentPage = '';
// var hideScrollC = $('.hide-scroll-c');
// hideScrollC.style.paddingRight = hideScrollC.offsetWidth - hideScrollC.clientWidth + "px";



function snapContent() {
    if ($('.page-btn-wrapper').css("content") == "") {
        $('#page0 .content-text').addClass("snap snap-left");
    }else{
        $('#page0 .content-text').removeClass("snap-left snap");
    }
}

function movePage(direction) {

    var pageToShow = "#page" + (parseInt($(currentPage).attr("value")) + direction);
 
    window.location.hash = pageToShow;

    console.log(currentPage);
    console.log(pageToShow);
}


function render(url){
    console.log("render");
    var temp = url.split('/')[0];
    console.log($(currentPage).attr("value"));
    console.log($(temp).attr("value"));
    if (temp == ''){
        $("#page0").show();
    }else if(temp.length && !currentPage.length){
        $(temp).show();
    }else{
        if ($(currentPage).attr("value") < $(temp).attr("value")){
            $(currentPage).hide("slide", {direction: "left"}, 500);
            $(temp).show("slide", {direction: "right"}, 500);
        }else if ($(currentPage).attr("value") > $(temp).attr("value")) {
            $(currentPage).hide("slide", {direction: "right"}, 500);
            $(temp).show("slide", {direction: "left"}, 500);
        }
    }

    showImg();
    if(currentPage == '#page3'){
        removeScene();
    }

    var url = decodeURI(window.location.hash);
    currentPage = url.split('/')[0];
    if (currentPage == '') {
        currentPage = "#page0";
    }
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



$(window).on('hashchange', function(){
    // On every hash change the render function is called with the new hash.
    // This is how the navigation of our app happens.
    render(decodeURI(window.location.hash));
});

$(window).trigger('hashchange');

$('.next-step').on('click', function(){
    movePage(1);
});
$('.back-step').on('click', function(){
    movePage(-1);
});


$('.back-step').click(showImg);
$('.toggle-horizontal').click(function () {
    $(this).children('span').toggleClass('rotate');
    $(this).children('span').toggleClass('rotate2');
    $(this).toggleClass('clicked');
    $(this).parents('.snap:first').toggleClass('shrink');
    $(this).parents('.snap:first').toggleClass('expand');
    $("#page3 #scene-carousel").toggleClass("nomargin");
});

snapContent();
// showImg();


$( window ).resize(snapContent);
