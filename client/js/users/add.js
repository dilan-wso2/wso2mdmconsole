$("#btn-add").click(function() {

	var firstname= $('#inputFirstName').val();
	var lastname= $('#inputLastName').val();
	var username = $('#inputEmail').val();
	var password =$('#inputPassword').val();
	var mobileNo =$('#inputMobile').val();
	jso ={"tenant_id" : 1, "username" : username, "password" : password, "first_name" : firstname, "last_name" : lastname, "mobile_no" : mobileNo, "created_date" : "2013/2/11",  "usercategory_id" : 2};
	
	
	jQuery.ajax({
		url : getServiceURLs("userCRUD"),
		type : "PUT",
		async : "false",
		data : JSON.stringify(jso),
		contentType : "application/json",
		dataType : "json"

	});
	
});