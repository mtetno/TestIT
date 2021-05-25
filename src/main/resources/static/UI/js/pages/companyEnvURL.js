var comEnvURL, aldta = {}, envData = {};
$(document).ready(function () {

	displayAllEnvironmentUrls();

	 

	$.ajax({
		url: base_url + "/application/allByCompany",
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var options = "";
			$.each(data, function (key, value) {
				options += '<option value="' + value.applicationId + '">' + value.applicationName + '</option>';
			});
			$("select[name=application_id]").append(options);
		}
	});

	$.ajax({
		url: base_url + "/environment/all",
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			envData = data;
			var payload = "";
			$.each(data, function (key, value) {
				payload += '<div class="form-group">';
				payload += '<label for="exampleInputEmail1">' + value.environmentName + '</label>';
				payload += '<input class="form-control" data-envurl-id="" data-env-id="' + value.environmentId + '" name="' + value.environmentName + '" placeholder="' + value.environmentName + '" type="text">';
				payload += '</div>';
			});
			$('#modal_ajax .panel-body .modal-body .col-md-12').append(payload);
			$("select[name=application_id]").on("change", function () {
				$('#modal_ajax input').val('');
				$('#modal_ajax textarea').val('');
				if (this.value != "") {
					$.ajax({
						url: base_url + "/companyEnvironUrl/getAllByCompanyId/" + $("select[name=application_id]").val(),
						method: "get",
						beforeSend: function (xhr) {
							xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
						},
						success: function (data) {
							aldta = data;
							var payload = "";
							$.each(data.companyEnvironUrls, function (key, value) {
								$('#modal_ajax .panel-body .modal-body .col-md-12 input[name=' + value.environment.environmentName + ']').val(value.envUrl);
								$('#modal_ajax .panel-body .modal-body .col-md-12 input[name=' + value.environment.environmentName + ']').attr("data-envurl-id", value.companyEnvironUrlId);
							});
						}
					});
				}
			});
		}
	});


	//serialize object function
	$.fn.serializeObject = function () {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	$.delete = function (url, data, callback, type) {

		if ($.isFunction(data)) {
			type = type || callback,
				callback = data,
				data = {}
		}

		return $.ajax({
			url: url,
			type: 'DELETE',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: callback,
			data: data,
			contentType: type
		});
	}
	var tableFixed = $('#table-example-fixed').dataTable({
		'info': false,
		'pageLength': 50
	});

	//new $.fn.dataTable.FixedHeader(tableFixed);
});
function addCompanyEnvironUrlId(companyEnvironUrlId = 0) {
	if ($("select[name=application_id]:visible").val() == "") {
		showError();
		return false;
	}
	/*var data = {};
	if(aldta.companyEnvironUrls.length > 0) {
		$.each(aldta.companyEnvironUrls, function(k,v){
			v.envUrl = $('input[name='+v.environment.environmentName+']:visible').val();
			v.environment.environmentId = $('input[name='+v.environment.environmentName+']:visible').attr("data-env-id");
		});
	}
	else {*/
	//data = envData;
	//aldta.companyEnvironUrls = [];
	$.each(envData, function (k, v) {
		if (aldta.companyEnvironUrls[k] == undefined) {
			aldta.companyEnvironUrls[k] = {};
		}
		aldta.companyEnvironUrls[k].envUrl = $('input[name=' + v.environmentName + ']:visible').val();
		aldta.companyEnvironUrls[k].environment = {};
		aldta.companyEnvironUrls[k].environment.environmentId = $('input[name=' + v.environmentName + ']:visible').attr("data-env-id");
	});
	//}
	$.ajax({
		type: 'POST',
		data: JSON.stringify(aldta),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/companyEnvironUrl/saveAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (msg) {
			$('.modal').modal('hide');
			displayAllEnvironmentUrls();
			// window.location.href = window.location.href;
			// if (!alert(successMsg)) {
			// 	window.location.href = window.location.href;
			// }
		}
	});

	return false;
}
/*function addCompanyEnvironUrlId(companyEnvironUrlId=0){
	$applicationId = $('select[name=application_id]:visible').val();
	$environmentName = $('input[name=environment]:visible').val();
	if($environmentName == '')
	{
	   $('#res').html("<span style='color:red;text-transform:capitalize;font-size:14px'>Enter Environment Name..!</span>");
	   return false;
	}
	var dataObj = {};
	dataObj["environmentName"]= $environmentName;
	dataObj["applicationId"]= $applicationId;
	if(companyEnvironUrlId!==0){
		dataObj["companyEnvironUrlId"] = companyEnvironUrlId;
	}
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url+"/companyEnvironUrl/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(msg){
			$('.modal').modal('hide');
			window.location.href= window.location.href;
		}
	});

	return false;
}
*/
function showViewModal(id) {
	$.ajax({
		url: base_url + "/companyEnvironUrl/getAllByCompanyId/" + id,
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var payload = "";
			$.each(data.companyEnvironUrls, function (index, value) {
				payload += '<tr>';
				payload += '<td>' + (index + 1) + '</td>';
				payload += '<td>' + value.environment.environmentName + '</td>';
				payload += '<td>' + value.envUrl + '</td>';
				payload += '</tr>';
			});
			$(".panel-title h5 b").html("Application Name : " + comEnvURL[id].applicationName);
			$('#view_modal table#viewTabale tbody').html(payload);
			$('#view_modal').modal('show', { backdrop: 'true' });
		}
	});
}
function showUpdateModal(url) {
	$('#modal_ajax').modal('show', { backdrop: 'true' });
	$("select[name=application_id]").val(url).change();
}
function showAddModal(url) {
	jQuery('#modal_ajax input').val('');
	// LOADING THE AJAX MODAL
	jQuery('#modal_ajax').modal('show', {
		backdrop: 'true'
	});

}
function showAjaxModal() {
	// LOADING THE AJAX MODAL
	jQuery('#modal_ajax').modal('show', {
		backdrop: 'true'
	});
}

function showTestImage(url) {
	// SHOWING AJAX PRELOADER IMAGE
	jQuery('#image_ajax .modal-body').html('<div style="text-align:center;margin-top:200px;"><img src="Libraries/img/loader.GIF" style="height:50px;" /></div>');

	// LOADING THE AJAX MODAL
	jQuery('#image_ajax').modal('show', {
		backdrop: 'true'
	});

	// SHOW AJAX RESPONSE ON REQUEST SUCCESS
	$.ajax({
		url: url,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (response) {
			jQuery('#image_ajax .modal-body').html(response);
		}
	});
}

function confirm_modal(delete_url, post_refresh_url) {
	$('#preloader-delete').html('');
	jQuery('#modal_delete').modal('show', {
		backdrop: 'static'
	});
	document.getElementById('delete_link').setAttribute("onClick", "delete_data('" + delete_url + "' , '" + post_refresh_url + "')");
	document.getElementById('delete_link').focus();
}

function checkDelete(applicationId) {
	var chk = confirm("Are You Sure To Delete This !");
	if (chk) {
		$.ajax({
			url: base_url + "/companyEnvironUrl/byApplication/" + applicationId,
			type: 'DELETE',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function (response) {
				window.location.href = window.location.href;
			}
		});
		return true;
	} else {
		return false;
	}
}

function saveEnvironment(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/environment/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$("a.addRowBtn").css("pointer-events", "");
			$("a.addRowBtn").css("opacity", "");
			$("#deleteRow").attr("disabled", false);
			$("#deleteRow1").attr("disabled", false);
			$("#deleteRow2").attr("disabled", false);
			$("#execution_environment").val('');
			$("button.addEnvBtn").closest(".addRowData").slideUp();
			$("#executionEnvironmentAddition").modal();
			fetchAllEnvironment();
		}
	});
}

 

function deleteSelectedEnvironment(environmentName) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		async: false,
		url: base_url + "/environment/" + readCookie("TAuid") + "/" + environmentName,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
		}
	});
}

function fetchAllApplications() {
	$.ajax({
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
		}
	});
}

function fetchAllEnvironments() {
	$.ajax({
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
			$("#url_environment").html(options);
		}
	});
}

function saveEnvironmentUrl(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/companyEnvironUrl/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$("#savedEnvironmentUrl").modal();
			closeEnvironmentUrlInput();
			displayAllEnvironmentUrls();
			// window.location.href= window.location.href;
		}
	});
}

function closeEnvironmentUrlInput() {
	$("#execution_environment").val("");
	$("#url_environment").val("0");
	$("#application").val("0");
	$("#url").val("");
	$("#username").val("");
	$("#password").val("");
	$("#confirm_password").val("");
	$("#role").val("");

	$("a.addRowBtn").css("pointer-events", "");
	$("a.addRowBtn").css("opacity", "");
	$("#deleteRow").attr("disabled", false);
	$("#deleteRow1").attr("disabled", false);
	$("#deleteRow2").attr("disabled", false);
	$("button.cancelRow").closest(".addRowData").slideUp();
}

function displayAllEnvironmentUrls() {
    
	$.ajax({
		url: base_url + "/companyEnvironUrl/findAllByCompanyId",
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var payload = "";
			var appOptions = "";
			comEnvURL = data.map;
			$.each(data.map, function (key, value) {

				$.each(value.environmentList, function (k, v) {
					payload += '<tr>';
					payload += '<td scope="col" class="bucketcheck">';
					payload += '<label class="main subCB">';
					payload += '<input type="checkbox" data-value=' + v.companyEnvironUrlId + '>';
					payload += '<span class="geekmark"></span>';
					payload += '</label>';
					payload += '</td>';
					payload += '<td>' + value.applicationName + '</td>';
					payload += '<td>' + v.environment.environmentName + '</td>';
					payload += '<td>' + v.envUrl + '</td>';
					payload += '</tr>';
				});
			});
		
			
			
			if(payload != ""){
			$(".UrltableParent .paging_full_numbers").remove()

			$('.Urltable').dataTable().fnClearTable();
    		$('.Urltable').dataTable().fnDestroy();

			
			$(".Urltable tbody").html(payload);
				$('.Urltable').DataTable({
					"lengthChange": false,
					"searching": false,   // Search Box will Be Disabled
					"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
					"info": false,
					"pagingType": "full_numbers"
				});
				$(".selectdiv").css("padding-left","4rem")
				$(".bucketList_wrapper").css("padding-left","4rem")	
				$(".Urltable").css("margin-left","2rem")	
			}else{
				$('.Urltable').dataTable().fnClearTable();
				$('.Urltable').dataTable().fnDestroy();
			}
				 
		}
	});
}

 
function deleteSelectedEnvironmentUrl(environmentURLId) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/companyEnvironUrl/" + environmentURLId,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
		}
	});
}

function displayAllAccessRoles() {
	$.ajax({
		url: base_url + "/accessRole/allByCompany",
		method: "GET",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var payload = "";

			data.map((value) => {
				console.log(value);
				var Val = value.name;
				payload += '<tr>';
				payload += '<td scope="col" class="bucketcheck">';
				payload += '<label class="main subCB">';
				payload += '<input type="checkbox" data-value=' + value.executionUserId + '>';
				payload += '<span class="geekmark"></span>';
				payload += '</label>';
				payload += '</td>';
				payload += '<td>' + Val + '</td>';
				payload += '<td>' + value.role + '</td>';
				payload += '</tr>';
			});
			
			if(payload != ""){
			$(".RoletableParent .paging_full_numbers").remove()
			$('.Roletable').dataTable().fnClearTable();
    		$('.Roletable').dataTable().fnDestroy();

			$(".Roletable tbody").html(payload);
			$('.Roletable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
			$(".selectdiv").css("padding-left","4rem")
			$(".bucketList_wrapper").css("padding-left","4rem")	
			$(".Roletable").css("margin-left","2rem")	
		}else{
			$('.Roletable').dataTable().fnClearTable();
			$('.Roletable').dataTable().fnDestroy();
		}

		}
	});
}

function saveAccessRoles(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/accessRole/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$("#addRoleModal").modal();
			closeAccessRoleInput();
			displayAllAccessRoles();
		}
	});
}

function closeAccessRoleInput() {
	$("a.addRowBtn").css("pointer-events", "");
	$("a.addRowBtn").css("opacity", "");
	$("#deleteRow").attr("disabled", false);
	$("#deleteRow1").attr("disabled", false);
	$("#deleteRow2").attr("disabled", false);
	$("button.addroleBtn").closest(".addRowData").slideUp();

	$("#username").val("");
    $("#password").val("");
    $("#confirm_password").val("");
    $("#role").val("");
}

function deleteSelectedAccessRole(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/accessRole/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			displayAllAccessRoles();
		}
	});
}

function showLoader(){
	$("#loader").addClass("loading");
	}
	
	function hideLoader(){
	$("#loader").removeClass("loading");
	}
		  
