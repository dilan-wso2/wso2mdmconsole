
configuration = function(appController){	
	
	
	var users = JSON.parse(get(appController.getServiceURLs("usersCRUD")).data);
			
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
	
	
	var groups = JSON.parse(get(appController.getServiceURLs("groupsCRUD")).data);
			
	context = appController.context();
	context.title = context.title + " | Add User";	
	context.page = "configuration";	
	context.jsFile= "users/add.js"
	context.data = {
		configOption : "users",
		groups: groups
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

