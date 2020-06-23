<?php
  /*
   * Plugin Name: Number Generator
   */

  /**
   * Запрет прямого доступа
   */
  if (!defined('ABSPATH')) {
    exit;
  }

  /**
   * Подключение скриптов
   */
  function load_scripts() {
    wp_enqueue_script('imask', plugins_url('vendor/imask.js', __FILE__), [], '1.0', true);
    wp_enqueue_script('crc32', plugins_url('vendor/crc32.js', __FILE__), [], '1.0', true);
    wp_enqueue_script('crc8', plugins_url('vendor/crc8js/crc8.js', __FILE__), [], '1.0', true);
    wp_enqueue_script('main-scripts', plugins_url('js/main.js', __FILE__), ['imask'], '1.0', true);
  }

  add_action('wp_enqueue_scripts', 'load_scripts');

  /**
   * Форма ввода
   */
  function generate_form() {
    $form = "<form id='form' action='" . home_url() . "' method='post'>";
    $form .= "<label for='phone'></label>";
    $form .= "<input type='tel' id='phone' name='phone' class='masked-phone' data-phonemask='+7 (___) ___-__-__'>";
    $form .= "</form>";
    $form .= "<div id='log'></div>";

    return $form;
  }

  /**
   * Добавление шорткода
   */
  add_shortcode('number-generator', 'generate_form');
