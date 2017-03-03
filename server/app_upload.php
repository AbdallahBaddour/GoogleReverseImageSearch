<?php
error_reporting(0);
require_once __DIR__ . '/access_control.php';
include_once __DIR__.'/GoogleImageSearch.php';

$imageSearch = new GoogleImageSearch();

$target_path = "images/";
$target_path = $target_path . basename( $_FILES['file']['name']);
$check = getimagesize($_FILES['file']['tmp_name']);
if($check != FALSE){
if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
$json = array();
if($results = $imageSearch->search($target_path, 2)) {
	
	//Fetch Best Guess - Start
    if($results['search_results']) {
	 $bestguess = array(
        'title' => $results['best_guess'][0],
        'link' => $results['best_guess'][1]
    );
    array_push($json, $bestguess);
	header('Content-Type: application/json');
	$jsonstring = json_encode($json);
	echo $jsonstring;
           } else {
        echo 'Nothing found';
    }
//Fetch Best Guess - End

   /* Fetch All results - Start
   if($results['search_results']) {
	$allres = array(
        'desc' => $results['best_guess'][0],
        'link' => $results['best_guess'][1],
		'image' => null
    );
	array_push($jsons, $allres);
        foreach($results['search_results'] as $k => $r) {
		$allres = array(
        'desc' => $r[0],
        'link' => $r[1],
        'image' => $r[2]
		);
		array_push($jsons, $allres);
		}
		$jsonres = json_encode($jsons, JSON_PRETTY_PRINT);
		echo $jsonres;
    } else {
        echo 'Nothing found';
    } Fetch All results - End */
}
} else{
echo $target_path;
    echo "There was an error uploading the file, please try again!";
}
}else{
echo "Problem with image.";
}
?>