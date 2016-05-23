$(document).ready(function () {
	$("#login-btn").click(function(){
		console.log("log in");
            var username =$("input[name=username]").val();
            var password = $("input[name=password]").val();

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
                url : '/auth/login',
                type : 'post',
                data : {
                    username: username,
                    password: hex_md5(password)
                },
                dataType : 'json',
                success : function(result) {
                	console.log("scuess");
                    if(result.success){
                        window.location.href="/index";
                    }else{
                        $(".tip div").text(result.msg);
                        $(".tip").show();
                    }
                },
                error : function() {
                    $(".tip div").text("登录请求出错!");
                    $(".tip").show();
                }
            });
    });

    $("#signup-btn").click(function(){
    	console.log("sign up");
            var username =$("input[name=username]").val();
            var password = $("input[name=password]").val();

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
                    if(result.success){
                        window.location.href="/index";
                    }else{
                        $(".tip div").text(result.msg);
                        $(".tip").show();
                    }
                },
                error : function() {
                    $(".tip div").text("登录请求出错!");
                    $(".tip").show();
                }
            });
    });
})