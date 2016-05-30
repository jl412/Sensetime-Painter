
// login and sign up------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
$("#login-btn").click(function(){
    console.log("log in");
    var username = $("input[name=username]").val();
    var password = $("input[name=password]").val();


    $.ajax({
        url : '/auth/login',
        type : 'post',
        data : {
            username: username,
            password: hex_md5(password)
        },
        dataType : 'json',
        success : function(result) {
            console.log("scuess: " + result.msg);
            $(".tip div").text(result.msg);
            $(".tip").show();
            if (result.status == "fail") {

            }else{
                $("#loginModal").modal('toggle');
                getUserInfo();
            }
        },
        error : function() {
            $(".tip div").text("Login fail!");
            $(".tip").show();
        }
    });
});


$("#signup-btn").click(function(){
    console.log("sign up");
    var username = $("input[name=username]").val();
    var password = $("input[name=password]").val();

    var pattern = /^[A-Za-z][A-Za-z0-9_]+$/;
    if(!username || username.length<4 || username.length>50 || !username.match(pattern)) {
        $("#tip div").text("unappropriate username!");
        $("#tip").show();
        return;
    }

    if(password!==password_confirm){
        $("#tip div").text("password input does not match!");
        $("#tip").show();
        return;
    }

            // var pattern = /^[A-Za-z][A-Za-z0-9_]+$/;
            // if(!username || username.length<4 || username.length>50 || !username.match(pattern)) {
            //     $(".tip div").text("用户名为4~50位, 只能输入字母、下划线、数字，必须以字母开头.");
            //     $(".tip").show();
            //     return;
            // }

            // if(!password || password.length<6 || password.length>50){
            //     $(".tip div").text("密码长度须为6~50位!");
            //     $(".tip").show();
            //     return;
            // }


    $.ajax({
        url : '/auth/sign_up',
        type : 'post',
        data : {
            username: username,
            password: hex_md5(password)
        },
        dataType : 'json',
        success : function(result) {
            console.log("scuess");
            if (result.status == "fail") {

            }else{
                $("#signupModal").modal('toggle');
                $("#loginModal").modal('toggle');
            }
            $(".tip div").text(result.msg);
            $(".tip").show();
        },
        error : function() {
            $(".tip div").text("Sign up fail!");
            $(".tip").show();
        }
    });
});



//get user info ---------------------------------------------------
//-----------------------------------------------------------------

var username = '';

function getUserInfo(){

    $.ajax({
      url: "/user/info",
      method: "get",
      contentType: "application/json",
      success: function(uInfo){
        var uResponse = uInfo;
        if (uResponse.status == "fail"){
            alert(uResponse.msg);
        }else{
            username = uResponse.username;
            $("#user-login").removeAttr("data-toggle").removeAttr("data-target").html(username);
            console.log(username);
        }
      },
      error: function(){
        console.log("fail to get user info");
      }
    });
}


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
