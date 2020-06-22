<?php
	/*
	 * Plugin Name: Number Generator
	 */

	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}

	/* Scripts */
	function load_scripts() {
//		wp_enqueue_script( 'input-mask', plugins_url( 'js/input-mask.js', __FILE__ ), [], '1.0', true );
		wp_enqueue_script( 'imask', plugins_url( 'js/imask.js', __FILE__ ), [], '1.0', true );
		wp_enqueue_script( 'main-scripts', plugins_url( 'js/main.js', __FILE__ ), ['imask'], '1.0', true );
	}

	add_action( 'wp_enqueue_scripts', 'load_scripts' );

	/* Main part */
	function generate_number() {
		$form = "<form action='" . home_url() . "' method='post'>";
		$form .= "<label for='phone'></label>";
		$form .= "<input type='tel' id='phone' name='phone' class='masked-phone' data-phonemask='+7 (___) ___-__-__'>";
		$form .= "</form>";
		$form .= "<div id='log'></div>";

		return $form;
	}

	add_shortcode( 'number-generator', 'generate_number' );
