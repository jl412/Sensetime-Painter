var currentPage = '';

$("#login .tip a").click(function(){
	window.location.hash = '#signup';
});

$("#signup .tip a").click(function(){
	window.location.hash = '#login';
});

function render(url){
    console.log("render/login");
    var temp = url.split('/')[0];
    // console.log($(currentPage).attr("value"));
    // console.log($(temp).attr("value"));

    if (temp == ''){
        temp = "#login";
    }

    if (currentPage.length) {
        if (currentPage == '#login'){
            $("#login").hide("slide", {easing:"easeInOutQuart", direction:"up"}, 750);
            $("#signup").show("slide", {easing:"easeInOutQuart", direction:"down"}, 750);
        }else if (currentPage == '#signup') {
            $("#login").show("slide", {easing:"easeInOutQuart", direction:"up"}, 750);
			$("#signup").hide("slide", {easing:"easeInOutQuart", direction:"down"}, 750);
		}
    }else{
        $(temp).show();
    }

    currentPage = temp;
}

function activePage(){
}   