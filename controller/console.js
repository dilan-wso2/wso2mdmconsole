
login = function(appController){	
	
	if(request.getMethod() == 'POST'){
		username = request.getParameter('username');
		password =  request.getParameter('password');
		
		var data = {'username': username, 'password': password};		
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", appController.getServiceURLs("getUserAuthenticate"));		
		xhr.send(data);
		
		if(xhr.status == '200'){
			session.put("mdmConsoleUserLogin", "true");	
			var currentUser = JSON.parse(xhr.responseText);
			session.put("mdmConsoleUser", currentUser);
			if(currentUser){
				if(currentUser.category_id == 1){
					response.sendRedirect('dashboard');
				}else{
					response.sendRedirect(appController.appInfo().server_url + 'users/devices?user=' + currentUser.id);
				}
			}
			
			
		}
	}
		
	
	context = appController.context();
	context.title = context.title + " | Login";		
	context.data = {
		
	}
	return context;	
	
	
	
}



logout = function(appController){		
	session.put("mdmConsoleUserLogin", null);
	session.put("mdmConsoleUser", null);
	response.sendRedirect('login');
}



dashboard = function(appController){	
	
	
	var tabs = [
		{tab_name: "Home", widgets:[
		      {template: "home_devices_by_os"}                      
		                           
		]}       
	               
	];
	
	context = appController.context();
	context.title = context.title + " | Dashboard";	
	context.page = "dashboard";
	context.data = {
			tabs: tabs
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









