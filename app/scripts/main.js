$(function(){
  var $body = $('body');
  var $header = $('header');
  var $nav = $('nav');

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
