$(document).ready(function(){
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('#returnToTop').fadeIn(200);
			$('#nav').addClass('navScroll');
		} else {
			$('#returnToTop').fadeOut(200);
			$('#nav').removeClass('navScroll');

		}
	});

	$('#returnToTop').click(function(){
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	});


});