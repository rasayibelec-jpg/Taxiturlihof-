<?php
/*
Template Name: React Taxi App
*/
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Taxi Türlihof - React App</title>
    <meta name="description" content="Taxi Türlihof - Professional taxi service with online booking and price calculator">
    
    <!-- React CSS -->
    <link href="<?php echo get_template_directory_uri(); ?>/static/css/main.3622ae45.css" rel="stylesheet">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- React Root Container -->
<div id="root"></div>

<!-- React JavaScript -->
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/static/js/main.040f0c1e.js"></script>

<?php wp_footer(); ?>
</body>
</html>