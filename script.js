$(function () {
    const styles = window.getComputedStyle(document.documentElement);
    const animationTiming = styles.getPropertyValue("--animation-timing");
    const timing = +styles.getPropertyValue("--animation-transition").replace(/[^0-9.,]/g, "") * 1000;
    
    
    
    const $hoverEl = $(".hover-element");
    const lineHeight = +styles.getPropertyValue("--line-size").replace(/[^0-9.,]/g, "");
    const $backGroundEl = $hoverEl.find(".background");
    const $mainMenu = $(".main-nav");
    let settings = [0, 100 + lineHeight];

    $mainMenu.on("mouseenter", "li", function () {
        let self = $(this);
        let selfTop = Math.floor(self.offset().top + self.innerHeight() / 2);
        let hoverElHeight = $hoverEl.height();
        let hoverElTop = Math.floor($hoverEl.offset().top + hoverElHeight / 2 + lineHeight);
        let innerSettings;
        

        if (hoverElTop < selfTop) {
            innerSettings = settings; 
        } 

        if (hoverElTop > selfTop) {
            innerSettings = settings.reverse();
        }

        $hoverEl.css({
          transform: `translate3d(0, ${selfTop + hoverElHeight / 2 - lineHeight}px, 0)`,
        });

        $backGroundEl.css("text-indent", innerSettings[0]);
        $backGroundEl.animate(
          {
            "text-indent": innerSettings[1],
          },
          {
            step: function (now, fx) {
            //   $backGroundEl.css("transform", `translate3d(0, -${now}px, 0)`);
              $backGroundEl.css("top", `-${now}px`);
            },
            duration: timing,
            queue: false,
          },
          animationTiming
        );
    });

    $mainMenu.on("mouseleave", function (e) {
        $hoverEl.css({transform: `translate3d(0, 0, 0)`});
        $backGroundEl.css("text-indent", settings[1]);
        $backGroundEl.animate(
          {
            "text-indent": settings[0],
          },
          {
            step: function (now, fx) {
            //   $backGroundEl.css("transform", `translate3d(0, -${now}px, 0)`);
              $backGroundEl.css("top", `-${now}px`);
            },
            duration: timing,
            queue: false,
          },
          animationTiming
        );
    });
  
  
});
