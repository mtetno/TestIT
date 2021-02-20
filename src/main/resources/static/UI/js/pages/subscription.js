function saveSubscription(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$("a.addRowBtn").css("pointer-events", "");
			$("a.addRowBtn").css("opacity", "");
			$("#deleteRow").attr("disabled", false);
			$("#deleteRow1").attr("disabled", false);
			$("#deleteRow2").attr("disabled", false);
			$("#name").val('');
			$("#username").val('');
			$("#password").val('');
			$("#confirmpassword").val('');
			$("#email").val('');
			$("#startdate").val('');
			$("#enddate").val('');
			$("#testEnvSelect").val(0);
			$("#remind_before").val(0);
			$("#threads").val(0);
			
			$("#myModal1").modal("hide")
			fetchAllSubscriptions();
		}
	});
}



function updateSubscription(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/update",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			 
			fetchAllSubscriptions();
		}
	});
}

function saveApplication(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/save/"+dataObj['companyId'],
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			

			fetchAllApplications();
		}
	});
}

function saveApplicationPaths(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/applicationPaths/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			 
			fetchAllApplicationPaths();
		}
	});
}

function deleteSubscriptions() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
			fetchAllSubscriptions();
		}
	});
}

function deleteSubscription(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllSubscriptions();
		}
	});
}

function deleteApplicationPaths() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/applicationPaths/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
			fetchAllApplicationPaths();
		}
	});
}

function deleteApplicationPath(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/applicationPaths/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllApplicationPaths();
		}
	});
}

function deleteApplications() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
			fetchAllApplications();
		}
	});
}

function deleteApplication(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllApplications();
		}
	});
}

function fetchAllSubscriptions() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$("#subscriptionsList tbody").html("");
			data.map((value) => {
				
				var str = `<tr data='`+JSON.stringify(value)+`'>
				<td scope="col" class="bucketcheck">
				  <label class="main subCB">
					<input data-value="`+value.id+`" type="checkbox"> 
					<span class="geekmark"></span> 
				  </label>
				</td>
				<td data-toggle="modal" data-dismiss="modal" data-target="#editmyModal1">`+value.company_name+`</td>
				<td >`+value.email+`</td>
				<td >`+value.start_date+`</td>
				<td >`+value.end_date+`</td>
			  </tr>`;
 
				$("#subscriptionsList tbody").prepend(str);
			});
			updateRowListener();
		}
	});
}


function fetchAllApplications() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/application/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$(".Apptable tbody").html("");
			data.map((value) => {
				
				var str = ` <tr>
				<td scope="col" class="bucketcheck">
				  <label class="main subCB">
					<input data-value="`+value.application_id+`" type="checkbox"> 
					<span class="geekmark"></span> 
				  </label>
				</td>
				<td >`+value.company_name+`</td>
				<td >`+value.application_name+`</td>
			  </tr>`;
 
				$(".Apptable tbody").prepend(str);
			 
			});
		}
	});
}


function fetchAllApplicationPaths() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/applicationPaths/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$("table.apppathtable tbody").html("");
			data.map((value) => {
				
				var str = `<tr data='`+JSON.stringify(value)+`'>
					<td scope="col" class="bucketcheck">
					<label class="main subCB">
					<input data-value="`+value.application_path_id+`" type="checkbox"> 
					<span class="geekmark"></span> 
					</label>
					</td>
					<td >`+value.company_name+`</td>
					<td >`+value.selenium_home+`</td>
					<td >`+value.test_data_home+`</td>
					</tr>`;
 
				$("table.apppathtable tbody").prepend(str);
			 
			});
		}
	});
}

function updateRowListener(){
	/*---Jquery for Update row---*/

  
  $("table.subscriptionTable tbody tr td:nth-child(2)").click(function(){
	$("#editmyModal1").modal();
		var editData = JSON.parse($($(this).closest("tr")[0]).attr('data'));

		$("#uprowid").val(editData.id);
		$(".updatescriptmodel #name1").val(editData.company_name);
		$(".updatescriptmodel #username1").val(editData.username);
		$(".updatescriptmodel #password1").val(editData.pasword);
		$(".updatescriptmodel #confirmpassword1").val(editData.pasword);
		$(".updatescriptmodel #email1").val(editData.email);
		$(".updatescriptmodel #testing_environment1").val(editData.testing_environment_id);
		$(".updatescriptmodel #startdate1").val(editData.start_date);
		$(".updatescriptmodel #enddate1").val(editData.end_date);
		$(".updatescriptmodel #remind_before1").val(editData.remind_before);
		$(".updatescriptmodel #no_of_threads1").val(editData.threads);  
	});
  } 