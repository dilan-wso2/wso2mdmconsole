 
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
			"performUserOperation" : "user/{0}/operations/{1}"
			
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
		speed: 500 // opening & closing animation speed
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

