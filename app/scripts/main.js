$(function(){
  var headerImagesLoaded = false;
  var sectionImagesLoaded = false;

  var $body = $('body');
  var $header = $('header');
  var $preloader = $('#preloader');
  var $section = $('section');
  var $section_styleboard = $('section.styleboard');
  var $nav = $('nav');

  // Initialize styleboards
  $('.container', $section_styleboard).append('<div class="mask"></div>');

  var testImagesLoaded = function() {
    if (!headerImagesLoaded || !sectionImagesLoaded) { return; }

    console.log('ALL IMAGES LOADED');

    $body.addClass('imagesLoaded');
    $preloader.addClass('imagesLoaded');
  };

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

  $header.imagesLoaded({ background: true }, function() {
    headerImagesLoaded = true;

    testImagesLoaded();
  });

  $section.imagesLoaded(function() {
    sectionImagesLoaded = true;

    testImagesLoaded();
  });

  $(window).scroll(function() {
      testWindowScrollPosition();
  });

  // Fire on load in the event the initial scroll position is not TOP/0px.
  testWindowScrollPosition();
});
