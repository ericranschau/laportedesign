$(function(){
  var controller = new ScrollMagic.Controller();

  var $sections = $('section');

  var scene_onEnter = function(event) {
    var $element = $(event.target.triggerElement());

    $element.addClass('visible');
  };

  $.each($sections, function(i, section) {
    var scene = new ScrollMagic.Scene({
        offset: 100,
        reverse: false,
        triggerElement: section,
        triggerHook: 0.9
    })
    .addTo(controller)
    .on('enter', scene_onEnter);
  });
});
