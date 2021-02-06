(function ($) {

  var MagicButton = function($elem) {

    var CONFIG = {
      CLASSES: {
        INBOUNDS: 'in-bounds',
      }
    };

    /*
     * PROPERTIES
     */

    var isMouseIn = false;

    /*
     * EVENT HANDLERS
     */

    var onMouseIn = function() {
      start();

      $elem.addClass(CONFIG.CLASSES.INBOUNDS);

      isMouseIn = true;
    };

    var onMouseMove = function() {};

    var onMouseOut = function() {
      pause();

      $elem.removeClass(CONFIG.CLASSES.INBOUNDS);

      isMouseIn = false;
    };

    /*
     * HELPERS
     */

    var computePath = function() {};
    var makePath = function() {};
    var makeGeom = function() {};
    var makeWide = function() {};
    var start = function() {};
    var pause = function() {};
    var render = function() {};

    /*
     * INIT
     */

    var getElements = function() {};

    var setUp = function() {};

    var attachListeners = function() {
      $elem.on('mouseenter', onMouseIn);
      $elem.on('mouseleave', onMouseOut);
    };

    var init = function() {
      getElements();
      setUp();
      attachListeners();
    };

    return init();
  };

  $('.projects-latest__header__btn').each(function() {
    MagicButton($(this));
  });

})(jQuery);
