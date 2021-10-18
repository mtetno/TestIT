
//GET BASE URL
var l = window.location;
var base_url = l.protocol + "//" + l.host + "/" + l.pathname.split('/')[1];
var statuscode = {
				403: function() {	
				   // Only if your server returns a 403 status code can it come in this block. :-)
					$('#res').html("<h5><span style='color:red;text-transform:capitalize;font-size:14px'>Invalid login Details.</span></h5>");
				},
				401: function() {
				   // Only if your server returns a 403 status code can it come in this block. :-)
					$('#res').html("<h5><span style='color:green;text-transform:capitalize;font-size:14px'>Booh! You are not authorized..</span></h5>");
				}
			};
var successMsg = "Submitted Successfully";
var errMsg = "* This field is mandatory";
var pwdMsg = "* Passwords do not match";

function showError(pwd=0){
	var msg = errMsg;
	if(pwd){
		$(".pwd").html(pwdMsg).show();
	}
	else {
		$.each($('input,textarea,select').filter('[required]:visible'), function(k,v){
			if($(this).val()=="") { 
				$(this).parent().find("span.errmsg").html(msg).show();
			}
			else {
				$(this).parent().find("span.errmsg").hide();
			}
		});
	}
}
// Cookies
function createCookie(name, value, minutes) {
	if (minutes) {
		var date = new Date();
		date.setTime(date.getTime() + (minutes * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";               

	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function replaceAll(str, replacing, replacewith){
	var i = 0, strLength = str.length;
	for(i; i < strLength; i++) {
		str = str.replace(replacing, replacewith);
	}
	return str;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}
$(document).ready(function() {
	// $("header.navbar").load(base_url+"/ui/includes/header.html", function(responseTxt, statusTxt, xhr){
	// 	$("div#nav-col").load(base_url+"/ui/includes/leftNav.html", function(responseTxt, statusTxt, xhr){
	// 		$("footer#footer-bar").load(base_url+"/ui/includes/footer.html", function(responseTxt, statusTxt, xhr){
	// 			if(readCookie("TAurole")!=null){
	// 				$("."+ readCookie("TAurole").toLowerCase()).show();
	// 			}
	// 			$("span.hidden-xs").html(readCookie("TAuname").toUpperCase());
	// 		});
	// 	});
	// });
	$.ajaxSetup({
		cache: false,
        error: function (x, status, error) {
            if (x.status == 403) {
                showWarningToast("You are not authorized!");
                //window.location.href = "login.html?msg=notauth";
            }
			else if (x.status == 401) {
                showWarningToast("You are not authenticated!");
                window.location.href = "login.html?msg=notauth";
            }
			else if (x.status == 409) {
                showWarningToast("Error: "+ x.responseText);
                //window.location.href = "login.html?msg=notauth";
            }
			else if (x.status == 500) {
                showWarningToast("Error: Serverside error");
                //window.location.href = "login.html?msg=notauth";
            }
			else if (x.status == "") {
            }
			else if (x.status == 304) {
            }
            else {
                //alert("An error occurred: " + status + "nError: " + error);
				showWarningToast("Booh! It seems some error on page. Please contact to administrator");
				//return false;
            }
        }
    });
	
	$('header.navbar').on('click', ".hidden-xxs", function(e) {
        e.preventDefault();
		$.ajax({
			url: base_url+"/secured/users/logout",
			type: 'DELETE',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function(data){
			}
		}).always(function() {
			eraseCookie("TAaccess");
			eraseCookie("TAuid");
			eraseCookie("TAuname");
			eraseCookie("TAurole");
			window.location.href = base_url+"/ui/login.html";
		});
	});
});
function statusError(statusCode, responseText="") {
	if (statusCode == 403) {
		showWarningToast("You are not authorized!");
		//window.location.href = "login.html?msg=notauth";
	}
	else if (statusCode == 401) {
		showWarningToast("You are not authenticated!");
		window.location.href = "login.html?msg=notauth";
	}
	else if (statusCode == 409) {
		// showWarningToast("Error: "+ responseText);
		showWarningToast("Oops, Something went wrong. Please try again.");
		//window.location.href = "login.html?msg=notauth";
	}
	else if (statusCode == 500) {
		showWarningToast("Oops, Something went wrong. Please try again.");
		//window.location.href = "login.html?msg=notauth";
	}
	else if (statusCode == "") {
	}
	else if (statusCode == 304) {
	}
	else {
		//alert("An error occurred: " + status + "nError: " + error);
		alert("Booh! It seems some error on page. Please contact to administrator");
		//return false;
	}
}

 

function fetchAllApplicationsByLogedinCompanyId() {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/allByCompany",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Application</option>';
			data.map((item) => {
				options = options + '<option value="' + item.applicationId + '">' + item.applicationName + '</option>';
			})
			$("#application").html(options);
			$("#application1").html(options);
			$("#application2").html(options);

			$("#application").val("0");
			$("#application1").val("0");
			$("#application2").val("0");
		}
	});
}

function fetchAllApplicationsByCompanyId(id) {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/allByCompany/"+id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Application</option>';
			data.map((item) => {
				options = options + '<option value="' + item.applicationId + '">' + item.applicationName + '</option>';
			})
			$("#application").html(options);
			$("#application1").html(options);
			$("#application2").html(options);

			$("#application").val("0");
			$("#application1").val("0");
			$("#application2").val("0");
		}
	});
}


function fetchAllApplications() {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Application</option>';
			data.map((item) => {
				options = options + '<option value="' + item.application_id + '">' + item.application_name + '</option>';
			})
			$("#application").html(options);
			$("#application").val("0");
		}
	});
}

function fetchAllEnvironments() {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/environment/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Environment</option>';
			data.map((item) => {
				options = options + '<option value="' + item.environmentId + '">' + item.environmentName + '</option>';
			})
			$("#environment").html(options);
			$("#environment").val("0");
		}
	});
}

function fetchAllTestingEnvironments(inputName) {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testingEnvironment/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Browser</option>';
			data.map((item) => {
				options = options + '<option value="' + item.id + '">' + item.name + '</option>';
			})

			console.log(" inputName "+inputName);
			inputName != undefined && inputName != '' ?  $(inputName).html(options)
			: 
			$("#testing_environment").html(options);
			$("#testing_environment").val("0");
		}
	});
}

function fetchAllCompanies() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/allCompany",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0" title="Select Company"   >Select Company</option>';
			data.map((item) => {
				options = options + '<option value="' + item.id + '"   title="'+item.companyName+'" >      ' + item.companyName + '</option>';
			})
			$("#company_name").html(options);
			$("#company_name1").html(options);
			$("#company_name2").html(options);
			$("#company_name1_edit").html(options);

			$("#company_name").val("0");
			$("#company_name1").val("0");
			$("#company_name2").val("0");
			$("#company_name1_edit").val("0");
		}
	});
}

function fetchAllRemindBefore(inputName) {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/remindBefore/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select</option>';
			data.map((item) => {
				options = options + '<option value="' + item.id + '">' + item.value + '</option>';
			})
			 
			inputName != undefined && inputName != '' ?  $(inputName).html(options)
			: 
			$("#remind_before").html(options);
			$("#remind_before").val("0");
		}
	});
}

function fetchAllUsersRoles(inputName) {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/accessRole/allByCompany",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Roles</option>';
			data.map((item) => {
				options = options + '<option value="' + item.executionUserId + '">' + item.name + '</option>';
			})
			 
			inputName != undefined && inputName != '' ?  $(inputName).html(options)
			: 
			$("#user_role").html(options);
			$("#user_role").val("0");
		}
	});
}

function fetchTestType() {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testtype/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Type</option>';
			data.map((item) => {
				options = options + '<option value="' + item.id + '">' + item.type + '</option>';
			})
			$("#type").html(options);
			$("#type").val("0");
		}
	});
}

function fetchAutomationStatus() {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/automationStatus/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Automation Status</option>';
			data.map((item) => {
				options = options + '<option value="' + item.id + '">' + item.status + '</option>';
			})
			$("#automation_status").html(options);
			$("#automation_status").val("0");
		}
	});
}

function fetchAutomationProgress() {
	return $.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/automationProgress/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = '<option value="0">Select Automation Progress</option>';
			data.map((item) => {
				options = options + '<option value="' + item.id + '">' + item.value + '</option>';
			})
			$("#automation_progress").html(options);
			$("#automation_progress").val("0");
		}
	});
}

	function showLoader(){
	$("#loader").addClass("loading");
	}
	
	function hideLoader(){
	$("#loader").removeClass("loading");
	}