var username = '';

// login and sign up------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

function login(){
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
};

function signup(){
	console.log("sign up");
	var username =$("input[name=username]").val();
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
};

function logout(){

	$.ajax({
		url:"/auth/logout",
		method: "get",
		error: function(){
			console.log("fail to log out");
		}
	});
}


//get user info ---------------------------------------------------
//-----------------------------------------------------------------

function getUserInfo(){

    $.ajax({
      url: "/user/account/info",
      method: "get",
      contentType: "application/json",
      success: function(uInfo){
        var uResponse = uInfo;
        if (uResponse.status == "fail"){
            alert(uResponse.msg);
        }else{
        	console.log(uResponse.status);
            username = uResponse.username;
            $("#user-login").removeAttr("data-target").html(username).attr({"data-toggle":"dropdown", "aria-haspopup":"true", "aria-expanded":"false"}).addClass("dropdown-toggle");
            $("#user-login").parent().addClass("dropdown");	
            console.log(username);

            $('.dropdown').on('show.bs.dropdown', function(e){
            	$(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
            });

            $('.dropdown').on('hide.bs.dropdown', function(e){
            	$(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
            });
        }
      },
      error: function(){
      	console.log("fail to get user info");
      }
    });
}

console.log("username: " + username);

// $(".nav-container").click(function(){
// 	username = 'Michael';
// })