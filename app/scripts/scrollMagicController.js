$(function(){
  var CONSTANTS = {
    offset: 100,
    reverse: false,
    triggerHook: 0.8
  };

  var controller = new ScrollMagic.Controller();

  var $sections = $('section');

  var scene_onEnter = function(event) {
    var $element = $(event.target.triggerElement());

    $element.addClass('visible');
  };

  var scene_onEnter_storyboard = function(event) {
    var $element = $(event.target.triggerElement());
    var $img = $('img', $element);
    var $mask = $('.mask', $element);

    $mask.delay(600).animate({
      height: '100%',
    }, 600, function() {
      $img.css({ opacity: 1 });

      $mask.css({ bottom: 'unset', top: '0px' });

      $mask.delay(1000).animate({
        height: '0%',
      }, 600, function() {
        $img.addClass('shadowed');
      });
    });

    $element.addClass('visible');
  };

  $.each($sections, function(i, section) {
    var scene = new ScrollMagic.Scene({
        offset: CONSTANTS.offset,
        reverse: CONSTANTS.reverse,
        triggerElement: section,
        triggerHook: CONSTANTS.triggerHook
    })
    .addTo(controller)
    .on('enter', function(event) {
      switch(section.className) {
        case 'storyboard':
        case 'storyboard first':
          scene_onEnter_storyboard(event);
          break;

        default:
          scene_onEnter(event);
          break;
      }
    });
  });
});
