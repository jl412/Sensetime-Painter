<?php

if(!empty($_FILES))
{

	echo "this php";
	// START // CREATE DESTINATION FOLDER
	
	$m_unique_id = $_GET["directory"]; // Expects a get argument from the form like "parser.php?directory=uploadFolder"
	define('DESTINATION_FOLDER','../download/'.$m_unique_id.'/');
	
	if (!@file_exists(DESTINATION_FOLDER)) {
		if (!mkdir(DESTINATION_FOLDER, 0777, true))
		{
			$errors[] = "Destination folder does not exist or no permissions to see it.";
			break;
		}
	
	// END // CREATE DESTINATION FOLDER


	$temp = $_FILES['file']['tmp_name'];
	$dir_seperator = DIRECTORY_SEPARATOR;
	
	//$destination_path = dirname(__FILE__).$dir_seperator.$folder.$dir_seperator;
	$destination_path = DESTINATION_FOLDER.$dir_seperator;
	
	
	$target_path = $destination_path.(rand(10000, 99999)."_".$_FILES['file']['name']); // Enables iPhone/iPad uploads, as normally there would be an error because, when you upload multiple files in an Apple device, every file uploaded is "image.jpg" and so the same image is overwritten everytime a new one is uploaded, so this adds a random number in front of the original filename to fix it.
	move_uploaded_file($temp, $target_path);
}

?> 
