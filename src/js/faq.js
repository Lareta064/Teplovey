jQuery(document).ready(function ($) {
	$('.faq-question').click(function () {
		var response = $(this).next('.faq-response');
		response.slideToggle();
	});
	$('.faq-click-question').click(function (e) {
		e.stopPropagation();
		$(this).closest('.faq-response').slideUp();
	});
});