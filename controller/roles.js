
configuration = function(appController){	
			
	context = appController.context();
	context.title = context.title + " | Configuration";	
	context.page = "configuration";
	context.jsFile= "roles/configuration.js";
	context.data = {
		configOption : "roles"		
	}
	return context;	
	
}


management = function(appController){
	
	context = appController.context();	
	
		
	var groups = JSON.parse(get(appController.getServiceURLs("getGroupsList")).data);
	
	var features = JSON.parse(get(appController.getServiceURLs("getGroupsFeatures")).data);
				
	
	context.title = context.title + " | Management";	
	context.page = "management";
	context.jsFile= "roles/management.js";
	context.data = {
		configOption : "roles",
		groups: groups,
		features: features		
	}
	return context;	
	
}


users = function(appController){	
	
	context = appController.context();
	
	var role = request.getParameter('role');
	if(!role){
		role = session.get('mdmConsoleSelectedRole');
	}
	session.put('mdmConsoleSelectedRole', role)
	
	
	var users = JSON.parse(get(appController.getServiceURLs("getGroupUsers", role)).data);
	
	var features = JSON.parse(get(appController.getServiceURLs("getGroupsFeatures")).data);
			
	
	context.title = context.title + " | Users";	
	context.page = "management";
	context.jsFile= "roles/users.js";
	context.data = {
		configOption : "roles",
		users: users,
		features: features	
	}
	return context;	
	
}

