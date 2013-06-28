
login = function(appController){	
	
	if(request.getMethod() == 'POST'){
		username = request.getParameter('username');
		password =  request.getParameter('password');
		
		var data = {'username': username, 'password': password};
		
		print(username + password);
		
		//var result = post(appController.getServiceURLs("getUserAuthenticate"), data, {}, 'json');
		
		print(appController.getServiceURLs("getUserAuthenticate"));
		 var xhr = new XMLHttpRequest();
		 xhr.open("POST", appController.getServiceURLs("getUserAuthenticate"));		
		xhr.send(data);
		
		if(xhr.status == '200'){
			response.sendRedirect('dashboard');
		}
	}
	
	//print(request.getMethod());
	
	
	
	
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









