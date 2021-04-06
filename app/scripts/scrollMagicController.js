$(function(){
  var CONSTANTS = {
    classes: {
      backgroundStyleboard: 'background-styleboard',
      styleboard: 'styleboard', 
    },
    offset: 0,
    reverse: true,
    scene: 'section',
    toggleClass: 'visible',
    triggerHook: 0.60,
  };

  var controller = new ScrollMagic.Controller();

  var $scenes = $(CONSTANTS.scene);

  var scene_onEnter = function(event) {
    var element = event.target.triggerElement();
    var $element = $(element);

    // console.log(element.className, event);

    $element.addClass(CONSTANTS.toggleClass);
  };

  var scene_onEnter_clients = function(event) {
    var $body = $('body');

    $body.removeClass(CONSTANTS.classes.backgroundStyleboard);
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

  var scene_onEnter_styleboard = function(event) {
    var $element = $(event.target.triggerElement());

    if ($element.hasClass(CONSTANTS.toggleClass)) { return; }

    var $img = $('img', $element);
    var $body = $('body');
    var $mask = $('.mask', $element);

    $body.addClass(CONSTANTS.classes.backgroundStyleboard);

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

  var scene_onLeave = function(event) {
    // var element = event.target.triggerElement();

    // console.log(element.className, event);
  };

  var scene_onLeave_clients = function(event) {
    console.log('foo');
    var $body = $('body');

    $body.addClass(CONSTANTS.classes.backgroundStyleboard);
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
    .on('leave', function(event) {
      switch(section.className) {
        case 'clients first':
        case 'clients first visible':
          scene_onLeave_clients(event);
          scene_onLeave(event);
          break;
        default:
          scene_onLeave(event);
      }
    })
    .on('start', function(event) {
      switch(section.className) {
        case 'clients first':
        case 'clients first visible':
          scene_onEnter_clients(event);
          scene_onEnter(event);
          break;
        case 'hero':
          scene_onEnter_hero(event);
          scene_onEnter(event);
          break;
        case 'styleboard':
        case 'styleboard first':
        case 'styleboard last':
        case 'styleboard visible':
        case 'styleboard first visible':
        case 'styleboard last visible':
          scene_onEnter_styleboard(event);
          scene_onEnter(event);
          break;
        default:
          scene_onEnter(event);
          break;
      }
    })
    .addTo(controller);
  });
});
