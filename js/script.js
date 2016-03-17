// function moveRight() {
//     // Hide to left / show from left
//     $("#page1").hide("slide", {direction: "left"}, 500);

//     // Show from right / hide to right
//     $("#page2").show("slide", {direction: "right"}, 500);
// }

function moveLeft(){
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


$('.next-step').click(moveRight);
$('.back-step').click(moveLeft);

$('#page0').load($('.content-img')).show("slide", {direction: "right"}, 500);