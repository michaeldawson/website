$(document).on('turbolinks:load', function() {
  var $window = $(window),
      $socialIcons = $('.sidebar .social'),
      $sidebarContent = $('.sidebar .content');

  var triggerHeight = $sidebarContent.height() + parseInt($socialIcons.css('bottom')) + 60;

  var repositionSocialIconsIfUnderneathContent = function(event) {
    var height = $window.height();

    console.log('window height: ' + height);
    console.log('Trigger height: ' + triggerHeight);
    console.log('----------------------------------------');

    if(height < triggerHeight){
      $socialIcons.css('position', 'static');
    } else {
      $socialIcons.css('position', 'absolute');
    }
  }

  repositionSocialIconsIfUnderneathContent();
  addResizeListener(repositionSocialIconsIfUnderneathContent);
});