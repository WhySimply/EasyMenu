(function($) {
  
  	// FONCTION PERMETTANT LE DEPLACEMENT DU MENU SUR L'ECRAN
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
	
	var result = $('h2, h3');
	var count = 0;
	// PARCOURS LA PAGE EST RENSEIGNE LES ELEMENTS (H2 & H3)
	result.each(function(index) {
		count ++;
		// CREER UN OBJET TEXT AVEC CE DONT ONT A BESOIN POUR LA SUITE
		var text = {
			index: count,
			'test': $(this).text(),
			offset: $(this).offset().top,
			type: $(this)[0].localName
		};
		
		// OFFSET TOP DES ELEMENTS PARCOURUT
		var offset = $(this).offset().top;
		
		// REFRESH DE LA FONCTION POUR CONNAITRE LA POSITION EN TEMPS REEL
		var inter = setInterval(function () {
			var scroll = $(window).scrollTop();
			
			// SI UN UTILISATEUR PASSE DEVANT UN ELEMENT H2 / H3
			if (scroll >= offset + 50 && scroll <= offset + 250) {
				
				// VERIFICATION SI IL N'A PAS ETE DEJA RENSEIGNE
				if ($(".easymenu p").text() == text.test) {
				}else{
					// DEUXIEME VERIFICATION 
					if( $(".easymenu p:contains('"+text.test+"')").length > 0 )
					{
						// ON ARRETE LE REFRESH
						clearInterval(inter);
					}else{
						// SI ELEMENT = H3
						if (text.type === "h3"){
							// ON AJOUTE L'ELEMENT H3 AU MENU AVEC SA CROSS POUR LE SUPPRIMER
							$( ".easymenu" ).append("<p class='box_elmt_text_h3 goToScroll-"+ text.index +"'>"+ text.test +"</p>");
						$( ".easymenu" ).append("<p class='box_elmt_close goToRemove-"+ text.index +"'><img src='./img/close.svg' width='12'></p>");
					  }else{
						  // ON AJOUTE L'ELEMENT AU MENU AVEC SA CROSS POUR LE SUPPRIMER
						  $( ".easymenu" ).append("<p class='box_elmt_text goToScroll-"+ text.index +"'>"+ text.test +"</p>");
						$( ".easymenu" ).append("<p class='box_elmt_close goToRemove-"+ text.index +"'><img src='./img/close.svg' width='12'></p>");
					  }
					  // ON INCREMENTE NOTRE NB COUNT
					 count ++;
					}
				}
				
			
			}else if ($(".goToScroll-"+ text.index).length > 0){
				$("p.goToScroll-"+ text.index).remove();
			}
			
		}, 0);
		
		
		// FONCTION LORS DU CLIQUE SUR UN ELEMENT DANS LE MENU
		$("body").delegate('p.goToScroll-'+text.index, 'click', function() {
			if($(".goToScroll-"+ text.index).text() == text.test){
				$('html, body').animate({
					scrollTop: text.offset - 100
				}, 1000);
			}
		});
		// FONCTION POUR SUPPRIMER L'ELEMENT DU MENU
		$("body").delegate('p.goToRemove-'+text.index, 'click', function() {
			$(".goToScroll-"+ text.index).remove();
			$(".goToRemove-"+ text.index).remove();

		});
	});
})(jQuery);