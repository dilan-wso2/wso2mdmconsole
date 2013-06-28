
login = function(appController){		
	context = appController.context();
	context.title = context.title + " | Login";		
	context.data = {
		
	}
	return context;	
	
}



dashboard = function(appController){		
	context = appController.context();
	context.title = context.title + " | Dashboard";	
	context.page = "dashboard";
	context.data = {
		
	}
	return context;	
	
}


configuration = function(appController){	
			
	context = appController.context();
	context.title = context.title + " | Configuration";	
	context.page = "configuration";
	context.data = {
		configOption : "mdmsettings"		
	}
	return context;	
	
}


management = function(appController){		
	context = appController.context();
	context.title = context.title + " | Management";
	context.page = "management";	
	context.data = {
		
	}
	return context;	
	
}









