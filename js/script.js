
function snapContent() {
    if ($('.page-btn-wrapper').css("content") == "") {
        $('#page0 .content-text').addClass("snap-left");
    }else{
        $('#page0 .content-text').removeClass("snap-left");
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
    $(this).parents(".page:first").hide("slide", {direction: "left"}, 500);

    // Show from right / hide to right
    $("#" + pageToShow).show("slide", {direction: "right"}, 500);
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

snapContent();
showImg();


$('.next-step').click(moveRight);
$('.back-step').click(moveLeft);
$('.back-step').click(showImg);

$( window ).resize(snapContent);
