 
context = function() {
	var appDefault = {				
		resourcePath: "/mdmconsole/themes/wso2mobile/img/",
		serverURL: "/mdm/"		
	}
	return appDefault;
}


getServiceURLs = function(item){
	
	var serverURL = context().serverURL;
	
	var urls =
		{
			"getDeviceAppList": "refresh/devices/{0}/502A",
			"getDeviceGenInfo": "refresh/devices/{0}/500A",
			"getDeviceNotifications": "notifications/devices/{0}",
			"performDeviceOperation" : "devices/{0}/operations/{1}",
			"performGroupOperation" : "group/{0}/operations/{1}",
			"performUserOperation" : "user/{0}/operations/{1}",
			"userCRUD": "users"	
			
		};
	
	arguments[0] = urls[item];		
	return serverURL + String.format.apply(this, arguments);
	
}



String.format = function() {
  var s = arguments[0]; 
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}




$.noty.defaults = {
	layout: 'center',
	theme: 'defaultTheme',
	type: 'alert',
	text: '',	
	dismissQueue: true, // If you want to use queue feature set this true
	template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
	animation: {
		open: {height: 'toggle'},
		close: {height: 'toggle'},
		easing: 'swing',
		speed: 100 // opening & closing animation speed
	},
	timeout: 1000, // delay for closing event. Set false for sticky notifications
	force: false, // adds notification to the beginning of queue when set to true
	modal: true,
	closeWith: ['click'], // ['click', 'button', 'hover']
	callback: {
		onShow: function() {},
		afterShow: function() {},
		onClose: function() {},
		afterClose: function() {}
	},
	buttons: false // an array of buttons
};





$('.selectpicker').selectpicker();
$('.duallistbox').bootstrapDualListbox();

$('.nav-tabs a').click(function(e) {
	e.preventDefault();
	$(this).tab('show');
});


Handlebars.registerHelper('elipsis', function(maxLength, context, options) {
  if(context.length > maxLength) {
    context = context.substring(0, maxLength)+"...";
  }
  
  return context;
});


Handlebars.registerHelper('batteryLevel', function(level, options) {
 if(level < 20){
 	return "20";
 }else if(level < 40){
 	return "40";
 }else if(level < 60){
 	return "60";
 }else if(level < 80){
 	return "80";
 }else if(level < 100){
 	return "100";
 }
 
});




//DATA TABLES

function createFilter(oTable, rowId, selectId, heading){
	$('.tabel-filter-group').append('<span class="select-filter">' + fnCreateSelect( oTable.fnGetColumnData(rowId), selectId, heading) + '</span>');	
}



(function($) {
	/*
	 * Function: fnGetColumnData
	 * Purpose:  Return an array of table values from a particular column.
	 * Returns:  array string: 1d data array
	 * Inputs:   object:oSettings - dataTable settings object. This is always the last argument past to the function
	 *           int:iColumn - the id of the column to extract the data from
	 *           bool:bUnique - optional - if set to false duplicated values are not filtered out
	 *           bool:bFiltered - optional - if set to false all the table data is used (not only the filtered)
	 *           bool:bIgnoreEmpty - optional - if set to false empty values are not filtered from the result array
	 * Author:   Benedikt Forchhammer <b.forchhammer /AT\ mind2.de>
	 */
	$.fn.dataTableExt.oApi.fnGetColumnData = function ( oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty ) {
	    // check that we have a column id
	    if ( typeof iColumn == "undefined" ) return new Array();
	     
	    // by default we only want unique data
	    if ( typeof bUnique == "undefined" ) bUnique = true;
	     
	    // by default we do want to only look at filtered data
	    if ( typeof bFiltered == "undefined" ) bFiltered = true;
	     
	    // by default we do not want to include empty values
	    if ( typeof bIgnoreEmpty == "undefined" ) bIgnoreEmpty = true;
	     
	    // list of rows which we're going to loop through
	    var aiRows;
	     
	    // use only filtered rows
	    if (bFiltered == true) aiRows = oSettings.aiDisplay;
	    // use all rows
	    else aiRows = oSettings.aiDisplayMaster; // all row numbers
	 
	    // set up data array   
	    var asResultData = new Array();
	     
	    for (var i=0,c=aiRows.length; i<c; i++) {
	        iRow = aiRows[i];
	        var aData = this.fnGetData(iRow);
	        var sValue = aData[iColumn];
	         
	        // ignore empty values?
	        if (bIgnoreEmpty == true && sValue.length == 0) continue;
	 
	        // ignore unique values?
	        else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;
	         
	        // else push the value onto the result data array
	        else asResultData.push(sValue);
	    }
	     
	    return asResultData;
	}}(jQuery));


function fnCreateSelect( aData, selectId, heading )
{
    var r= heading+ ': <select id="'+selectId+'" class="selectpicker"><option value="">-- All --</option>', i, iLen=aData.length;
    for ( i=0 ; i<iLen ; i++ )
    {
        r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
    }
    return r+'</optgroup>';
    return r+'</select>';
}


