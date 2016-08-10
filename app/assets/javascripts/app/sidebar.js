$(document).on('turbolinks:load', function() {
  (function setupVerticalScrollHandling() {
    var $window = $(window),
        $socialIcons = $('.sidebar .social'),
        $sidebarContent = $('.sidebar .content');

    var triggerHeight = $sidebarContent.height() + parseInt($socialIcons.css('bottom')) + 60;

    var repositionSocialIconsIfUnderneathContent = function(event) {
      var width = $window.width();
      if(width < 768) return false;

      var height = $window.height();

      if(height < triggerHeight){
        $socialIcons.css('position', 'static');
      } else {
        $socialIcons.css('position', 'absolute');
      }
    }

    repositionSocialIconsIfUnderneathContent();
    addResizeListener(repositionSocialIconsIfUnderneathContent);
  })()
});
