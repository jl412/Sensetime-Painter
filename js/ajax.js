
// login and sign up------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
$("#login-btn").click(function(){
	console.log("log in");
	var username =$("input[name=username]").val();
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
			console.log("scuess");
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
      url: "queue",
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
