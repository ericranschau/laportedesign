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
    var $body = $('body');
    var $element = $(element);

    // console.log(element.className, event);

    $element.addClass(CONSTANTS.toggleClass);

    if (element.className.split(/\s+/).indexOf(CONSTANTS.classes.styleboard) !== -1) {
      $body.addClass(CONSTANTS.classes.backgroundStyleboard);
    } else {
      $body.removeClass(CONSTANTS.classes.backgroundStyleboard);
    }
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
      $body.removeClass('background-styleboards');
    }

    if ($element.hasClass('clients') && $previousElement.hasClass('storyboard')) {
      $body.addClass('background-styleboards');
    }
  };

  $.each($scenes, function(i, section) {
    var scene = new ScrollMagic.Scene({
      offset: CONSTANTS.offset,
      reverse: CONSTANTS.reverse,
      triggerElement: section,
      triggerHook: CONSTANTS.triggerHook
    })
    // .addIndicators({
    //   name: section.className,
    //   indent: 520,
    //   colorEnd: 'blue',
    //   colorStart: 'red',
    //   colorTrigger: 'red',
    // })
    .on('start', function(event) {
      switch(section.className) {
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
    .on('start', function(event) {
      scene_onStart(event);
    })
    .addTo(controller);
  });
});
