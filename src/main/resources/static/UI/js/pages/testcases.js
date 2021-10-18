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
			window.location.href = "testmanagement.html"
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
			window.location.href = "testmanagement.html"
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			showWarningToast(jqXHR.responseJSON.errorMessage);
		}
	});
}


function fetchTestSteps() {
	var ediTTestcase = JSON.parse(getItem(EDIT_TESTCASE));
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testcases/getTestcaseSteps/"+ediTTestcase.testcase_id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {

			var steps = [];
			data.map((item)=>{
			 steps.push({"step": item.step, "expected" : item.expected })
			})
			var editValue = JSON.parse(getItem(EDIT_TESTCASE));
			$("#objective").val(editValue.objective);
			$("#test_method").val(editValue.test_method);
			$("#application").val(editValue.application_id);
			$("#type").val(editValue.testtype_id);
			$("#classname").val(editValue.class_name);
			$("#automation_status").val(editValue.auto_status_id);
			$("#automation_progress").val(editValue.auto_progress_id);
			$("#comments").val(editValue.comment);
			testCaseSteps = steps;
			showStepsGrid();
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			showWarningToast(jqXHR.responseJSON.errorMessage);
		}
	});
}

function showStepsGrid(){
	var rows = "";
	if(testCaseSteps.length > 0){
	testCaseSteps.map((value,index) => {
			var savestr = `<tr>
			<td scope='col' class='bucketcheck'>
				<label class='main subCB'>
				<input type='checkbox' data-value=` + index + `> 
				<span class='geekmark'></span> 
			</label>
			</td>
			<td>`+value.step+`</td>
			<td>`+value.expected +`</td>
		</tr>`
		rows = rows + savestr;
		});			 

		if(rows != ""){
		$(".addTestParent").html($(".addTest").get(0).outerHTML)
		$(".addTestParent .paging_full_numbers").remove();

		$(".addTest tbody").html(rows);
		$('.addTest').DataTable({
			"lengthChange": false,
			"searching": false,   // Search Box will Be Disabled
			"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
			"info": false,
			"pagingType": "full_numbers"
		});
	}else{
		$('.addTest').dataTable().fnClearTable();
		$('.addTest').dataTable().fnDestroy();
	}
	}


	$(".mainCB input[type=checkbox]").click(function(){
	if($(this).prop("checked")==true)
	{	$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", true);	}
	else
	{	$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", false);	}
	});

	hideLoader();
}



function displayTestcases(){
	$.ajax({
		url: base_url + "/testcases/allByComapny",
		method: "GET",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			console.log(data);
			$("#bucketList tbody").html("");

			var rows = "";
			data.map((value) => {
				var dataValue = "data-value='"+JSON.stringify(value)+"'";
				console.log(dataValue);
				var savestr = `<tr>
				<td scope='col' class='bucketcheck'>
					<label class='main subCB'>
					  <input type='checkbox' data-value=` + value.testcase_id + `> 
					  <span class='geekmark'></span> 
				  </label>
				</td>
				<td class='rowTestCase' ${dataValue} >`+value.test_method+`</td>
				<td>`+value.objective+`</td>
				<td>`+value.application_name+`</td>
				<td>`+ value.status +`</td>
			  </tr>`
			 rows = rows + savestr;
			});			 

			// $("#bucketList tbody").html(rows);

			if(rows != ""){
			if($(".testmanagementtable").get(0)!=undefined)
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
		var dataVal = $(this).attr("data-value");
		saveItem(EDIT_TESTCASE,dataVal)
		window.location.href = "editTest.html"


		// isEditTestCases = true;
		// var dataValue = JSON.parse($(this).attr("data-value"));
		// selectedTestCase = dataValue;
		// $("#myModal1").modal('show');
		//  $("#test_case_name").val(dataValue.testcase_name);
		//  $("#description").val(dataValue.description);
		//  $("#classname").val(dataValue.class_name);
		//  $("#test_method").val(dataValue.test_method);
		//  $("#environment").val(dataValue.environment_id);
		//  $("#application").val(dataValue.application_id);
		//  $("#type").val(dataValue.testtype_id);
		//  $("#expected").val(dataValue.expected);
		//  $("#found_in_build").val(dataValue.foundin_build);
		//  $("#automation_status").val(dataValue.auto_status_id);
		//  $("#automation_progress").val(dataValue.auto_progress_id);
	});

	$(".mainCB input[type=checkbox]").click(function(){
		if($(this).prop("checked")==true)
		{	$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", true);	}
		else
		{	$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", false);	}
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



