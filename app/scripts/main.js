$(function(){
  var $body = $('body');
  var $header = $('header');
  var $section_styleboard = $('section.styleboard');
  var $nav = $('nav');

  // Initialize styleboards
  $('.container', $section_styleboard).append('<div class="mask"></div>');

  var testWindowScrollPosition = function() {
      if (
        document.body.scrollTop > $nav.outerHeight(true) * 2 ||
        document.documentElement.scrollTop > $nav.outerHeight(true) * 2
      ) {
          $nav.addClass('collapsed');
      } else {
          $nav.removeClass('collapsed');
      }
  }

  $(window).scroll(function() {
      testWindowScrollPosition();
  });

  testWindowScrollPosition();
});
