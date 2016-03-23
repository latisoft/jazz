<?php



	if(isset($_POST['action']) && !empty($_POST['action']))
	{
		$action = $_POST['action'];
		switch($action) {
        
		case 'showByPHP' :
			include("php_file_tree.php");		
			echo php_file_tree("../../msg/", "javascript:alert('You clicked on [link]');");
			break;
        
		case 'showFileTree' :
			include("jqueryFileTree.php");
			echo jquery_file_tree($_POST['dir']);
			break;

		case 'printMessage' :
			echo printMessage($_POST['msgPath']);
        // ...etc...
		}
	}
	
	function printMessage($path)
	{
		$path = urldecode($path);

		if( file_exists($root . $directory) ) 
		{
			$files = scandir($root . $directory);
			natcasesort($files);
			if( count($files) > 2 ) // (IF NOT EMPTY: The 2 accounts for . and .. )
			{
				echo "<ul class=\"jqueryFileTree\" style=\"display: none;\">";
				// All dirs
				foreach( $files as $file ) {
					if( file_exists($root . $directory . $file) && $file != '.' && $file != '..' && is_dir($root . $directory . $file) ) {
						echo "<li class=\"directory collapsed\"><a href=\"#\" rel=\"" . htmlentities($directory . $file) . "/\">" . htmlentities($file) . "</a></li>";
					}
				}
				
				// All files
				foreach( $files as $file ) {
					if( file_exists($root . $directory . $file) && $file != '.' && $file != '..' && !is_dir($root . $directory . $file) ) {
						$ext = preg_replace('/^.*\./', '', $file);
						echo "<li class=\"file ext_$ext\"><a href=\"#\" rel=\"" . htmlentities($directory . $file) . "\">" . htmlentities($file) . "</a></li>";
					}
				}
				echo "</ul>";	
			}
		}

	}
		
?>