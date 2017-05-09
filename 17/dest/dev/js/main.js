$(document).ready(function(){

	$('#mobile-nav-toggle').on('click', function(){
		$(this).toggleClass('mobile-nav-toggle--open');
	});

	var nav = '.page-header__nav .wrapper ul',
		navLink = '.page-header__nav .wrapper ul li a',
		navMobile = '#mobile-nav-toggle';
		
	$('.mobile-nav-toggle').click(function(){
		if ($(nav).hasClass('nav--open')) {
			$(nav).removeClass('nav--open');
		} else {
			$(nav).addClass('nav--open');
		}
	});

	$(navLink).click(function(){
		if ($(nav).hasClass('nav--open')) {
			$(nav).removeClass('nav--open')
			$(navMobile).removeClass('mobile-nav-toggle--open');
		} 
	});



});
//# sourceMappingURL=main.js.map
