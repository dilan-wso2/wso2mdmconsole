var selectedTab = null;
var selectedDevice = null;

$(document).ready(function() {
	var tabId = $('#device-tab-heading-0').data("tabId");
	var deviceId = $('#device-tab-heading-0').data("deviceId");

	selectedTab = tabId;
	selectedDevice = deviceId;

	loadGeneralInformation(tabId, deviceId);
	loadAppList(tabId, deviceId);

});

$('#devicesTab a').click(function(e) {
	var tabId = $(this).data("tabId");
	var deviceId = $(this).data("deviceId");

	selectedTab = tabId;
	selectedDevice = deviceId;

	loadGeneralInformation(tabId, deviceId);
	loadAppList(tabId, deviceId);

});

$(".btn-refresh").click(function() {
	var command = $(this).data("command");
	if (command == "genInfo") {
		loadGeneralInformation(selectedTab, selectedDevice);
	} else if (command == "appList") {
		loadAppList(selectedTab, selectedDevice);
	}

});

var selectedFeatureText = null;
var selectedFeature = null;
var selectedFeatureTemplate = null;
var selectedDevice = null;

$('.features-device').draggable({
	revert : true,
	cursor : 'move',
	start : function(ev, ui) {
		selectedFeatureText = $(this).html();
		selectedFeature = $(this).data('feature');
		selectedFeatureTemplate = $(this).data('template');
	},
	stop : function() {

	}
});

$('.device-image').droppable({
	tolerance : "pointer",
	drop : function() {
		selectedDevice = $(this).data('deviceId');
		prePerformOperation(selectedDevice, selectedFeature, selectedFeatureTemplate);
	}
});

function prePerformOperation(deviceId, feature, featureTemplate) {

	if (featureTemplate != "") {
		$.get('../client/templates/feature_templates/' + featureTemplate + '.hbs').done(function(templateData) {
			var template = Handlebars.compile(templateData);
			$("#featureModal").html(template({
				feature : feature
			}));
			$('#featureModal').modal('show');

		}).fail(function() {

		});

	} else {
		performOperation(deviceId, feature, {
			data : {}
		});
	}

}


$('#featureModal').on('click', '.feature-command', function(e) {
	var params = {};

	var value = $(this).data('value');
	if (value != "") {
		params['function'] = value;
	}

	$(".feature-input").each(function(index) {
		params[$(this).attr("id")] = $(this).val();
	});

	performOperation(selectedDevice, selectedFeature, {
		data : params
	});

});

function performOperation(deviceId, feature, params) {

	noty({
		text : 'Are you sure you want to perform this operation?',
		buttons : [{
			addClass : 'btn',
			text : 'Cancel',
			onClick : function($noty) {
				$noty.close();

			}
			
			
		}, {
			
			addClass : 'btn btn-orange',
			text : 'Ok',
			onClick : function($noty) {

				jQuery.ajax({
					url : getServiceURLs("performDeviceOperation", deviceId, feature),
					type : "POST",
					async : "false",
					data : JSON.stringify(params),
					contentType : "application/json",
					dataType : "json"

				});

				noty({
					text : 'Operation is sent to the device successfully!',
					'layout' : 'center'
				});

				$noty.close();

			}
			
		}]
	});

}

function loadAppList(tabId, deviceId) {

	$("#app-list-" + tabId).html("");

	jQuery.ajax({
		url : getServiceURLs("getDeviceAppList", deviceId),
		type : "GET",
		dataType : "json",
		success : function(appList) {

			appList.received_data = JSON.parse(appList.received_data);

			$.get('../client/partials/users/applist.hbs', function(templateData) {
				var template = Handlebars.compile(templateData);
				$("#app-list-" + tabId).html(template({
					appList : appList,
					resourcePath : context().resourcePath
				}));

				$('.bxslider').bxSlider({
					minSlides : 5,
					maxSlides : 40,
					slideWidth : 300,
					slideMargin : 10
				});

			});

		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});

}

function loadGeneralInformation(tabId, deviceId) {

	jQuery.ajax({
		url : getServiceURLs("getDeviceGenInfo", deviceId),
		type : "GET",
		dataType : "json",
		success : function(genInfo) {

			genInfo.received_data = JSON.parse(genInfo.received_data);

			$.get('../client/partials/users/geninfo.hbs', function(templateData) {
				var template = Handlebars.compile(templateData);
				$("#gen-info-" + tabId).html(template({
					genInfo : genInfo,
					resourcePath : context().resourcePath
				}));
				// $('.gen-info').tooltip();
				var receivedData = {};
				receivedData.location_obj = {};
				receivedData.location_obj.latitude = "6.9123661";
				receivedData.location_obj.longitude = "79.8525739";
				
				$('#map_canvas').gmap().bind('init', function(ev, map) {
					$('#map_canvas').gmap('addMarker', {'position': receivedData.location_obj.latitude + "," + receivedData.location_obj.longitude, 'bounds': true}).click(function() {
						$('#map_canvas').gmap('openInfoWindow', {'content': 'Location'}, this);
					});
				});
				
			});

		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});

	loadNotifications(tabId, deviceId)

}

function loadNotifications(tabId, deviceId) {

	jQuery.ajax({
		url : getServiceURLs("getDeviceNotifications", deviceId),
		type : "GET",
		dataType : "json",
		success : function(notifications) {

			for ( i = 0; i < notifications.length; i++) {
				notifications[i].received_data = JSON.parse(notifications[i].received_data);
			}

			$.get('../client/partials/users/notifications.hbs', function(teplateData) {
				var template = Handlebars.compile(teplateData);
				$("#notifications-" + tabId).html(template({
					notifications : notifications
				}));
			});

		},
		error : function(jqXHR, textStatus, errorThrown) {

		}
	});

}
