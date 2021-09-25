var isEditTestCases = false;
var selectedTestCase = {};

function saveTestcases(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testcases/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			showSuccessToast("The Test Case Saved Successfully.");
			displayTestcases();	
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			showWarningToast(jqXHR.responseJSON.errorMessage);
		}
	});
}

function editTestcases(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testcases/edit",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			showSuccessToast("The Test Case Updated Successfully.");
			displayTestcases();	
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			showWarningToast(jqXHR.responseJSON.errorMessage);
		}
	});
}

function displayTestcases(){
	$.ajax({
		url: base_url + "/testcases/all",
		method: "GET",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			console.log(data);
			$("#bucketList tbody").html("");

			var rows = "";
			data.map((value) => {
				var dataValue = "data-value="+JSON.stringify(value);
				console.log(dataValue);
				var savestr = `<tr>
				<td scope='col' class='bucketcheck'>
					<label class='main subCB'>
					  <input type='checkbox' data-value=` + value.testcase_id + `> 
					  <span class='geekmark'></span> 
				  </label>
				</td>
				<td class='rowTestCase' ${dataValue} >`+value.testcase_name+`</td>
				<td>`+value.application_name+`</td>
				<td>`+value.environment_name+`</td>
				<td>`+value.status +`</td>
			  </tr>`
			 rows = rows + savestr;
			});			 

			// $("#bucketList tbody").html(rows);

			if(rows != ""){
			$(".testmanagementtableParent").html($(".testmanagementtable").get(0).outerHTML)
			$(".testmanagementtableParent .paging_full_numbers").remove()
			$('.testmanagementtable').dataTable().fnClearTable();
    		$('.testmanagementtable').dataTable().fnDestroy();	

			$(".testmanagementtable tbody").html(rows);
			$('.testmanagementtable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}else{
			$('.testmanagementtable').dataTable().fnClearTable();
    		$('.testmanagementtable').dataTable().fnDestroy();
		}
			// $(".selectdiv").css("padding-left","4rem")
			// $(".bucketList_wrapper").css("padding-left","4rem")	
			// $(".testmanagementtable").css("margin-left","2rem")	

		postDisplayTestCases();	

		}
	});
}

function postDisplayTestCases(){
	$(".rowTestCase").click(function(){
		isEditTestCases = true;
		var dataValue = JSON.parse($(this).attr("data-value"));
		selectedTestCase = dataValue;
		$("#myModal1").modal('show');
		 $("#test_case_name").val(dataValue.testcase_name);
		 $("#description").val(dataValue.description);
		 $("#classname").val(dataValue.class_name);
		 $("#test_method").val(dataValue.test_method);
		 $("#environment").val(dataValue.environment_id);
		 $("#application").val(dataValue.application_id);
		 $("#type").val(dataValue.testtype_id);
		 $("#expected").val(dataValue.expected);
		 $("#found_in_build").val(dataValue.foundin_build);
		 $("#automation_status").val(dataValue.auto_status_id);
		 $("#automation_progress").val(dataValue.auto_progress_id);
	});
}



function deleteAllTestcases() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testcases/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			showSuccessToast("Test Case deleted Successfully.");
			$("#bucketList").find(".mainCB input[type=checkbox]").prop("checked", false);
			displayTestcases();	
		}
	});
}

function deleteTestcase(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testcases/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			
			displayTestcases();
		}
	});
}

function showMessage(message) {
	$("#valiationModel .model_body").html('<p>' + message + '</p>');
	$("#valiationModel").modal('toggle');
}



