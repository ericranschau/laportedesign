$(function(){
  var CONSTANTS = {
    addIndicators: true,
    offset: 0,
    reverse: true,
    scene: 'section',
    toggleClass: 'visible',
    triggerHook: 0.60,
  };

  var controller = new ScrollMagic.Controller({ addIndicators: CONSTANTS.addIndicators });

  var $scenes = $(CONSTANTS.scene);

  var scene_onEnter = function(event) {
    var $element = $(event.target.triggerElement());

    $element.addClass(CONSTANTS.toggleClass);
  };

  var scene_onEnter_clients = function(event) {
    var $body = $('body');
    var $element = $(event.target.triggerElement());

    $body.removeClass('background-storyboards');

    if ($element.hasClass(CONSTANTS.toggleClass)) { return; }

    var delay = 100;

    var $listElements = $('.list > li', $element);

    $listElements.each(function(idx, el) {
      var $el = $(el);

      setTimeout(function() {
        $el.addClass('visible');
      }, delay * idx);
    });
  };

  var scene_onEnter_hero = function(event) {
    var $element = $(event.target.triggerElement());

    if ($element.hasClass(CONSTANTS.toggleClass)) { return; }

    var delay = 300;
    var offset = 600;

    var $span = $('span.font-italic', $element);

    $span.each(function(idx, el) {
      var $el = $(el);

      setTimeout(function() {
        $el.addClass('visible');
      }, offset + delay * idx);
    });
  };

  var scene_onEnter_storyboard = function(event) {
    var $body = $('body');
    var $element = $(event.target.triggerElement());

    $body.addClass('background-storyboards');

    if ($element.hasClass(CONSTANTS.toggleClass)) { return; }

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
  };

  var scene_onStart = function(event) {

    if (event.scrollDirection !== 'REVERSE') { return; }

    var $body = $('body');
    var $element = $(event.target.triggerElement());
    var $previousElement = $element.prev();

    if ($element.hasClass('storyboard') && $previousElement.hasClass('hero')) {
      $body.removeClass('background-storyboards');
    }

    if ($element.hasClass('clients') && $previousElement.hasClass('storyboard')) {
      $body.addClass('background-storyboards');
    }
  };

  $.each($scenes, function(i, section) {
    var scene = new ScrollMagic.Scene({
      offset: CONSTANTS.offset,
      reverse: CONSTANTS.reverse,
      triggerElement: section,
      triggerHook: CONSTANTS.triggerHook
    })
    .addIndicators({
      name: section.className,
      indent: 520,
      colorEnd: 'blue',
      colorStart: 'red',
      colorTrigger: 'red',
    })
    .on('enter', function(event) {
      switch(section.className) {
        case 'clients':
        case 'clients visible':
          scene_onEnter_clients(event);
          scene_onEnter(event);
          break;
        case 'hero':
          scene_onEnter_hero(event);
          scene_onEnter(event);
          break;
        case 'storyboard':
        case 'storyboard visible':
          scene_onEnter_storyboard(event);
          scene_onEnter(event);
          break;
        default:
          scene_onEnter(event);
          break;
      }
    })
    .on('start', function(event) {
      scene_onStart(event);
    })
    .addTo(controller);
  });
});
