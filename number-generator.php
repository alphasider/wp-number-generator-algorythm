<?php
  /*
   * Plugin Name: Number Generator
   * Description: При вводе номера в поле, ниже появляются числа от 1 до 30 000 000. Всего 20 чисел. Эти числа выводятся по специальному алгоритму использующую алгоритм хеширования crc8. Для каждого номера выводятся всегда одни и те же числа. Алгоритм не использует рандома, кеша и базу данных. Если этот инпут заполняют с телефона, то к каждому числу прибавляется 100 000 000. Основная задача: от номера к номеру эти числа должны быть максимально уникальными. Например при воде номера +7 (999) 999-99-99 выводятся одни числа, а при воде номера +7 (999) 999-99-98 выводятся максимально другие числа.
   * Author: Rustam
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
    wp_enqueue_script('crc8', plugins_url('vendor/crc8js/crc8.js', __FILE__), [], '1.0', true);
    wp_enqueue_script('main-scripts', plugins_url('js/main.js', __FILE__), ['imask', 'crc8'], '1.0', true);
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
