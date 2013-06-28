 
appInfo = function() {

	var appInfo = {
		headerTitle : "WSO2 Mobile Device Management",
		title : "WSO2 Mobile Device Management",
		copyright : "Copyright (c) 2013 - WSO2 Mobile .Inc",
		server_url: "/mdmconsole/",
		mdm_server_url: "http://localhost:9763/mdm/"
	};

	return appInfo;

}


getServiceURLs = function(item){
	
	var serverURL = appInfo().mdm_server_url;
	
	var urls =
		{
			"getGroupsList": "webconsole/devices",
			"getGroupsFeatures": "features",
			"getGroupUsers": "groups/{0}/users",
			"getUserDevices": "users/{0}/devices",
			"getUserInfo": "users/{0}",
			"getDeviceFeatures" : "devices/{0}/features",
			"getUserAuthenticate": "users/authenticate"
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




navigation = function(role) {

	switch(role) {
		case "admin":
			var topNavigation = [{
				name : "Home"
			}]
			break;
		case "manager":

			break;
		default:
			
	};
	
	var topNavigation = [
		{name : "Dashboard"	, link: appInfo().server_url + "console/dashboard", displayPage: "dashboard", icon: "icon-th-large"},
		{name : "Configurations", link: appInfo().server_url + "users/configuration", displayPage: "configuration", icon:"icon-wrench"},
		{name : "Management"	, link: appInfo().server_url + "roles/management", displayPage: "management", icon:"icon-briefcase"},
	];
	
	
	var configNavigation =	[
			//{name : "MDM Settings", link: "/mdm/console/configuration",  displayPage: "mdmsettings", icon: "icon-edit"},
			{name : "Users", link: appInfo().server_url + "users/configuration", displayPage: "users", icon:"icon-user"},
			{name : "Roles", link: appInfo().server_url + "roles/configuration", displayPage: "roles", icon:"icon-globe"},
	];

	return {
		topNavigation : topNavigation,
		configNavigation: configNavigation
	};

}



theme = function() {

	var theme = {
		name : "wso2mobile",
		default_layout : "1-column"
	}

	return theme;

}



context = function() {

	var contextData = {};
	contextData.user = {
		name : "Guest",
		role : "guest"
	};

	var appDefault = {
		layout : this.theme().default_layout,
		title : this.appInfo().title,
		appInfo : this.appInfo(),
		theme : this.theme(),
		resourcePath: "../themes/" + this.theme().name + "/img/",
		contextData : contextData,
		navigation : this.navigation(contextData.user.role),
	}

	return appDefault;
}


