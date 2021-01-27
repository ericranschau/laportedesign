$(function(){
  var $body = $('body');
  var $header = $('header');
  var $section_storyboard = $('section.storyboard');
  var $nav = $('nav');

  // Initialize storyboards
  $('.container', $section_storyboard).append('<div class="mask"></div>');

  var testWindowScrollPosition = function() {
      if (
        document.body.scrollTop > $header.outerHeight(true) - $nav.outerHeight(true) ||
        document.documentElement.scrollTop > $header.outerHeight(true) - $nav.outerHeight(true)
      ) {
          $nav.addClass('collapsed');
      } else {
          $nav.removeClass('collapsed');
      }
  }

  $(window).scroll(function() {
      testWindowScrollPosition();
  });
});
