$(document).ready(function() {

	$( ".span6" ).each(function( index ) {
		templateArea = $(this);
		var templateWidget = $(this).data("chart");
		//alert(templateWidget);
		
		$.get('../client/templates/dashboard_widgets/' + templateWidget + '.hbs').done(function(templateData) {
			var template = Handlebars.compile(templateData);
			$(templateArea).html(template({
				
			}));			

		}).fail(function() {

		});
	});
});