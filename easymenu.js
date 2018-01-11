(function($) {
  
    var dragging = false;
    var iX, iY;
    $(".easymenu").mousedown(function(e) {
      dragging = true;
      iX = e.clientX - this.offsetLeft;
      iY = e.clientY - this.offsetTop;
      this.setCapture && this.setCapture();
      return false;
    });
    document.onmousemove = function(e) {
      if (dragging) {
        var e = e || window.event;
        var oX = e.clientX - iX;
        var oY = e.clientY - iY;
        $(".easymenu").css({"left":oX + "px", "top":oY + "px"});
        return false;
      }
    };
    $(document).mouseup(function(e) {
      dragging = false;
      e.cancelBubble = true;
    })
		var result = $('h2, h3');
        var count = 0;
		result.each(function(index) {
		    count ++;
            var text = {
                index: count,
                'test': $(this).text(),
                offset: $(this).offset().top,
                type: $(this)[0].localName
            };
            var offset = $(this).offset().top;
            var inter = setInterval(function () {
                var scroll = $(window).scrollTop();
                if (scroll >= offset + 50 && scroll <= offset + 250) {
                    if ($(".easymenu p").text() == text.test) {
                    }else{
                        if( $(".easymenu p:contains('"+text.test+"')").length > 0 )
                        {
                            clearInterval(inter);
                        }else{
                            if (text.type === "h3"){
                                $( ".easymenu" ).append("<p class='box_elmt_text_h3 goToScroll-"+ text.index +"'>"+ text.test +"</p>");
                            $( ".easymenu" ).append("<p class='box_elmt_close goToRemove-"+ text.index +"'><img src='./img/close.svg' width='12'></p>");
                          }else{
                              $( ".easymenu" ).append("<p class='box_elmt_text goToScroll-"+ text.index +"'>"+ text.test +"</p>");
                            $( ".easymenu" ).append("<p class='box_elmt_close goToRemove-"+ text.index +"'><img src='./img/close.svg' width='12'></p>");
                          }
                         count ++;
                        }
                    }
                }else if ($(".goToScroll-"+ text.index).length > 0){
                    $("p.goToScroll-"+ text.index).remove();
                }
            }, 0);
            $("body").delegate('p.goToScroll-'+text.index, 'click', function() {
                if($(".goToScroll-"+ text.index).text() == text.test){
                    $('html, body').animate({
                        scrollTop: text.offset - 100
                    }, 1000);
                }
            });
            $("body").delegate('p.goToRemove-'+text.index, 'click', function() {
                $(".goToScroll-"+ text.index).remove();
                $(".goToRemove-"+ text.index).remove();

            });
        });
})(jQuery);