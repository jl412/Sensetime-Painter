	<!DOCTYPE html>
<html lang="en">
<head>
	<title>Semsetime: Style Your Image</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<link rel="stylesheet" href="css/dropzone.css">

	<link rel="stylesheet" href="css/style.css">

	<script src="js/dropzone.js"></script>

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body>
	<div class="container-fluid" id="bg-wrapper">

		<!-- Background Slides -->
		<div id="background-slide" class="carousel slide" data-ride="carousel">
			<!-- Indicators -->
			<!-- <ol class="carousel-indicators hidden-xs">
				<li data-target="#background-slide" data-slide-to="0" class="active"></li>
				<li data-target="#background-slide" data-slide-to="1"></li>
				<li data-target="#background-slide" data-slide-to="2"></li>
				<li data-target="#background-slide" data-slide-to="3"></li>
				<li data-target="#background-slide" data-slide-to="4"></li>
			</ol> -->

			<!-- Wrapper for slides -->
			<div class="carousel-inner" role="listbox">
				<div id="bg1" class="item active"></div>
				<div id="bg2" class="item"></div>
				<div id="bg3" class="item"></div>
				<div id="bg4" class="item"></div>
				<div id="bg5" class="item"></div>

			</div>
		</div>

		<!-- Nav Bar -->
		<nav class="navbar navbar-default">
			<div class="container-fluid">
    			<div class="navbar-header">
    				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse-item" aria-expanded="false">
    					<span class="sr-only">Toggle navigation</span>
    					<span class="icon-bar"></span>
    					<span class="icon-bar"></span>
    					<span class="icon-bar"></span>
    				</button>
      				<a class="navbar-brand" href="#">
       					<img alt="Brand" src="http://sensetime-website.oss-cn-hangzhou.aliyuncs.com/homepage/sensetime-logo.png">
      				</a>
    			</div>
    			<div class="collapse navbar-collapse" id="collapse-item">
    			<ul class="nav navbar-nav navbar-right">
    				<li><div class="menu-underline"></div><a href="#">Create</a></li>
    				<li><div class="menu-underline"></div><a href="#">Purchase</a></li>
    				<li><div class="menu-underline"></div><a href="#">Gallery</a></li>
    				<li><div class="menu-underline"></div><a href="#">About</a></li>
    			</ul>
    			</div>
  			</div>
  		</nav>


  		<!-- main content -->

      <!-- Page 0 -->
  		<div class="page" role="page" id="page0" value="0">
  			<div class="valign-p">
  				<div class="valign-c page-padding container-fluid">
  					<div class="row">
              <div class="headline">
  							<p>Get Started</p>
  						</div>

  					<div class="row">
  						<div class="content-img">
  							<img src="img/content.jpg" class="tiltRight fadeChain">
  							<span class="glyphicon glyphicon-share-alt fadeChain" aria-hidden="true"></span>
  							<br class="mobile-br"/>
  							<img src="img/result.jpg" class="tiltLeft fadeChain">
              </div>
  					</div>
  					<div class="row">
  						<div class="content-text snap-left">
  							<p class="subheadline">Create your own arts with 3 steps!</p> 
  							<ul>
  								<li>First, simply upload a photo you want to get painted.</li>
  								<li>Then choose one among our large collection of predefined art style</li>
  								<li>Click Submit</li>
  							</ul>
  							<p>Our servers will paint the image for you. Just kick back and relax.</p>
  						</div>
  					</div>
  					</div>	
  				</div>
  			</div>

  			<div class="page-btn-wrapper">
  				<div class="centered-md">
  					<div class="row">
  						<a href="#"><div type="button" class="page-btn next-step">Next<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div></a>
  					</div>
  				</div>
  			</div>
  		</div>

  		<!-- page 1 -->
  		<div class="page nodisplay" role="page" id="page1" value="1">
  			<div class="valign-p">
  				<div class="valign-c page-padding contaier-fluid">
  					<div class="centered-md content-wrapper">
  						<div class="row dz-container">
  							<div class="dz-header">
  								<p>Your Photo</p>
  							</div>
  							<form action="parser.php" class="dropzone zone">
  								<div class="fallback">
  									<input name="file" type="file" multiple />
  								</div>
  							</form>
  						</div>
  					</div>
  				</div>
  			</div>
  			<div class="page-btn-wrapper">
  				<div class="centered-md">
  					<div class="row">
  						<div class="left-button">
  							<a href="#"><div type="button" class="page-btn back-step"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>Back</div></a>
  						</div>
  						<div class="right-button clearfloat">
  							<a href="#"><div type="button" class="page-btn next-step">Next<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div></a>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>

  		<!-- page 2 -->
  		<div class="page nodisplay" role="page" id="page2" value="2">
  			<div class="valign-p">
  				<div class="valign-c page-padding contaier-fluid">
  					<div class="centered-md content-wrapper">
  						<div class="row dz-container">
  							<div class="dz-header">
  								<p>Art Styles</p>
  							</div>
  							<form  class="dropzone dz-clickable zone"  data-toggle = "modal" data-target = "#art-style-modal" id="toggle-art-style">
  								<div class="dz-message">
  									<img src="img/art-styles.jpg" class="zone-img">
  									<br/>
  									<span>Choose an art style from our library</span>
  									<div class="browse-btn"><span>browse</span></div>
  								</div>
  							</form>
  						</div>
  					</div>
  				</div>
  			</div>
  			<!-- Modal -->
  			<div class = "modal fade" id = "art-style-modal" tabindex = "-1" role = "dialog" 
  			aria-labelledby = "art-style-modalLabel" aria-hidden = "true">

  			<div class = "modal-dialog">
  				<div class = "modal-content">

  					<div class = "modal-header">
  						<button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">
  						</button>

  						<h4 class = "modal-title" id = "art-style-modalLabel">
  							Art Style Library
  						</h4>
  					</div>

  					<div class = "modal-body" id="art-lib-content">
  						<div id="show-style"></div>
  					</div>

  					<div class = "modal-footer">
  						<button type = "button" class = "btn btn-default" data-dismiss = "modal">
  							Close
  						</button>

  						<button type = "button" class = "btn disabled btn-primary" id="apply-style">
  							Apply
  						</button>
  					</div>
  				</div><!-- /.modal-content -->
  			</div><!-- /.modal-dialog -->

  		</div><!-- /.modal -->
  			<div class="page-btn-wrapper">
  				<div class="centered-md">
  					<div class="row">
  						<div class="left-button">
  							<a href="#"><div type="button" class="page-btn back-step"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>Back</div></a>
  						</div>
  						<div class="right-button clearfloat">
  						<a href="#"><div type="button" class="page-btn sbumit">Submit!</div></a>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>

  		<!-- page 3 -->

  	</div>

    <!-- JQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.0-beta.1/jquery-ui.min.js"   integrity="sha256-WyjlLy3rvVSitHOXMctYkMCOU6GAletPg+qniNKLCQM="   crossorigin="anonymous"></script>
  
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	<script src="js/script.js"></script>
  <script src="js/painter.js"></script>
</body>
</html>