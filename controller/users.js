
configuration = function(appController){	
	
	
	var users = [
		{"id": "1", "email": "dilan@dilan.me", "first_name" : "Chatura", "last_name" : "Dilan", "mobile" : "0777266673", "group": "User", "no_of_devices": "0"},
		{"id": "2", "email": "dilan@dilan.me", "first_name" : "Chatura", "last_name" : "Dilan", "mobile" : "0777266673", "group": "User", "no_of_devices": "0"}

	]
			
	context = appController.context();
	context.title = context.title + " | Configuration";	
	context.page = "configuration";
	context.jsFile= "users/configuration.js"
	context.data = {
		configOption : "users",
		users: users		
	}
	return context;	
	
}


add = function(appController){	
			
	context = appController.context();
	context.title = context.title + " | Add User";	
	context.page = "configuration";	
	context.data = {
		configOption : "users"		
	}
	return context;	
	
}


devices = function(appController){	
	
	context = appController.context();	

	var userId = request.getParameter('user');
	if(!userId){
		userId = session.get('mdmConsoleSelectedUser');
	}
	session.put('mdmConsoleSelectedUser', userId)
	
	var user = JSON.parse(get(appController.getServiceURLs("getUserInfo", userId)).data);		
	var devices = JSON.parse(get(appController.getServiceURLs("getUserDevices", userId)).data);
	
	 	
 	for (var i = 0; i < devices.length; i++) {  		
  		devices[i].properties = JSON.parse(devices[i].properties);  		
  		try{
  			featureList = JSON.parse(get(appController.getServiceURLs("getDeviceFeatures", devices[i].id)).data);
  		}catch(e){
  			featureList = [];
  		}  		 
  		devices[i].features = featureList;  			
  			
	}
			
	
	context.title = context.title + " | Add User";	
	context.page = "management";
	context.jsFile = "users/devices.js"	
	context.data = {
		configOption : "users",
		devices: devices,
		user: user		
	}
	return context;	
	
}

