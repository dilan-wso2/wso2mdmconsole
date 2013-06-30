$(document).ready( function () {
	oTable = $('#main-table').dataTable( {
		"sDom": "<'row-fluid'<'tabel-filter-group span8'T><'span4'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
		"iDisplayLength": 6,
		 "bStateSave": false,
		"oTableTools": {
			"aButtons": [
				"copy",
				"print",
				{
					"sExtends":    "collection",
					"sButtonText": 'Save <span class="caret" />',
					"aButtons":    [ "csv", "xls", "pdf" ]
				}
			]
		}
	} );
	
	
	createFilter(oTable, 0, "select-filter-0", "Groups");
	$('#select-filter-0', this).change(function () {
		 oTable.fnFilter( $(this).val(), 0);
	})
	
	
	createFilter(oTable, 1, "select-filter-1", "Groups");
	$('#select-filter-1', this).change(function () {
		 oTable.fnFilter( $(this).val(), 1);
	})
	 
	 
	$('.selectpicker').selectpicker();
	
	
} );



