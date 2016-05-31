
getUserInfo();

function snapContent() {
    if ($('.page-btn-wrapper').css("content") == "") {
        $('#page0 .content-text').addClass("snap snap-left");
    }else{
        $('#page0 .content-text').removeClass("snap-left snap");
    }
}


$(window).on('hashchange', function(){
    // On every hash change the render function is called with the new hash.
    // This is how the navigation of our app happens.
    render(decodeURI(window.location.hash));
});

$(window).trigger('hashchange');


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
$(window).load(function(){
    $('.loading.initial').hide("fade", 1500);
});

$( window ).resize(snapContent);
