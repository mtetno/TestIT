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


function editApplicationPaths(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/applicationPaths/edit",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			 
			fetchAllApplicationPaths();
		}
	});
}
 

function deleteSubscription(id) {
	showLoader();
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			window.location.href = window.location.href;
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
			hideLoader();
			$("#subscriptionTable tbody").html("");

			var str = "";
			data.map((value) => {
				
				str = str + `<tr data='`+JSON.stringify(value)+`'>
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
 
				// $("#subscriptionsList tbody").prepend(str);
			});
			$('.table input[type=checkbox]').prop("checked", false)
			if(str != ""){
				
			$(".subscriptionTableParent .paging_full_numbers").remove()

			$('.subscriptionTable').dataTable().fnClearTable();
    		$('.subscriptionTable').dataTable().fnDestroy();
			
			$(".subscriptionTable tbody").html(str);
			$('.subscriptionTable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}else{
			$('.subscriptionTable').dataTable().fnClearTable();
    		$('.subscriptionTable').dataTable().fnDestroy();
		}

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
			var str = "";
			data.map((value) => {
				
				str = str + ` <tr>
				<td scope="col" class="bucketcheck">
				  <label class="main subCB">
					<input data-value="`+value.application_id+`" type="checkbox"> 
					<span class="geekmark"></span> 
				  </label>
				</td>
				<td >`+value.company_name+`</td>
				<td >`+value.application_name+`</td>
			  </tr>`;
 
				//$(".Apptable tbody").prepend(str);
			});
			$('.table input[type=checkbox]').prop("checked", false)
			if(str != ""){
			
			$(".ApptableParent .paging_full_numbers").remove()

			$('.Apptable').dataTable().fnClearTable();
    		$('.Apptable').dataTable().fnDestroy();
			
			$(".Apptable tbody").html(str);
			$('.Apptable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}else{
			$('.Apptable').dataTable().fnClearTable();
    		$('.Apptable').dataTable().fnDestroy();
		}
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
			var str = "";
			data.map((value) => {
				
				str = str + `<tr data='`+JSON.stringify(value)+`'>
					<td scope="col" class="bucketcheck">
					<label class="main subCB">
					<input data-value="`+value.application_path_id+`" type="checkbox"> 
					<span class="geekmark"></span> 
					</label>
					</td>
					<td data-value=`+JSON.stringify(value)+`  data-toggle="modal" data-dismiss="modal" data-target="#editAppPath">`+value.company_name+`</td>
					<td >`+value.selenium_home+`</td>
					<td >`+value.test_data_home+`</td>
					</tr>`;
			});
			$('.table input[type=checkbox]').prop("checked", false)
			if(str != ""){
			
			$(".apppathtableParent .paging_full_numbers").remove();

			$('.apppathtable').dataTable().fnClearTable();
    		$('.apppathtable').dataTable().fnDestroy();
			
			$(".apppathtable tbody").html(str);
			$('.apppathtable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}else{
			$('.apppathtable').dataTable().fnClearTable();
    		$('.apppathtable').dataTable().fnDestroy();
		}

			$("table.apppathtable tbody tr td:nth-child(2)").click(function(){
				var dataValue = JSON.parse($(this).attr("data-value"));
				console.log(dataValue);
				$("#application_path_id_edit").val(dataValue.application_path_id);
				$("#company_name1_edit").val(dataValue.company_id);
				$("#selenium_home_edit").val(dataValue.selenium_home);
				$("#screen_shot_home_edit").val(dataValue.screenshot_home);
				$("#logs_home_edit").val(dataValue.logs_home);
				$("#test_data_home_edit").val(dataValue.test_data_home);
				$("#batch_file_home_edit").val(dataValue.batch_file_home);
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
		$(".updatescriptmodel #testing_environment1").val(editData.testing_environment_id.split(','));
		$(".updatescriptmodel #startdate1").val(editData.start_date);
		$(".updatescriptmodel #enddate1").val(editData.end_date);
		$(".updatescriptmodel #remind_before1").val(editData.remind_before);
		$(".updatescriptmodel #no_of_threads1").val(editData.threads);  
	});
  } 



  function showLoader(){
	$("#loader").addClass("loading");
	}
	
	function hideLoader(){
	$("#loader").removeClass("loading");
	}
	  
	
