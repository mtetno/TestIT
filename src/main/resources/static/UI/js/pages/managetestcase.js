var testcasesAssignments = {};
var selectedTestCase = {};
// function saveTestMethods(dataObj) {
// 	$.ajax({
// 		type: 'POST',
// 		data: JSON.stringify(dataObj),
// 		contentType: 'application/json',
// 		dataType: 'json',
// 		url: base_url + "/testMethod/save",
// 		beforeSend: function (xhr) {
// 			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
// 		},
// 		success: function () {
// 			$("a.addRowBtn").css("pointer-events", "");
// 			$("a.addRowBtn").css("opacity", "");
// 			$("#deleteRow").attr("disabled", false);
// 			$("#deleteRow1").attr("disabled", false);
// 			$("#deleteRow2").attr("disabled", false);
// 			$("#test_method").val('');
// 			$("#test_method").val('');
// 			$("#test_method").val('');
// 			$("#company_name").val(0);
// 			$("#application").val(0);
// 			$("button.addtestmethodBtn").closest(".addRowData").slideUp();
// 			fetchAllTestMethod();
// 		}
// 	});
// }

 

// function deleteTestMethod(id) {
// 	$.ajax({
// 		type: 'DELETE',
// 		contentType: 'application/json',
// 		dataType: 'json',
// 		url: base_url + "/testMethod/delete/" + id,
// 		beforeSend: function (xhr) {
// 			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
// 		},
// 		success: function () {
// 			fetchAllTestMethod();
// 		}
// 	});
// }

// function fetchAllTestMethod() {
// 	$.ajax({
// 		type: 'GET',
// 		contentType: 'application/json',
// 		dataType: 'json',
// 		url: base_url + "/testMethod/all",
// 		beforeSend: function (xhr) {
// 			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
// 		},
// 		success: function (data) {
// 			var str = "";
// 			data.map((value) => {
// 				str = str + `<tr>
// 				<td scope="col" class="bucketcheck">
// 				<label class="main subCB">
// 				<input data-value="`+value.test_method_id+`" type="checkbox"> 
// 				<span class="geekmark"></span> 
// 				</label>
// 				</td>
// 				<td >`+value.company_name+`</td>
// 				<td >`+value.application_name+`</td>
// 				<td >`+value.test_method+`</td>
// 				<td class="running">`+value.status+`</td>
// 				</tr>`;
// 			});

// 			if(str != ""){
// 			$(".TestmethodtableParent").html($(".Testmethodtable").get(0).outerHTML)
// 			$(".TestmethodtableParent .paging_full_numbers").remove()

// 			$('.Testmethodtable').dataTable().fnClearTable();
//     		$('.Testmethodtable').dataTable().fnDestroy();
			
// 			$(".Testmethodtable tbody").html(str);
// 			$('.Testmethodtable').DataTable({
// 				"lengthChange": false,
// 				"searching": false,   // Search Box will Be Disabled
// 				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
// 				"info": false,
// 				"pagingType": "full_numbers"
// 			});
// 		}else{
// 			$('.Testmethodtable').dataTable().fnClearTable();
// 			$('.Testmethodtable').dataTable().fnDestroy();
// 		}
// 		}
// 	});
// }


function displayTestcases(){
	$.ajax({
		url: base_url + "/testcases/superuser/all",
		method: "GET",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			console.log(data);
			$("#bucketList tbody").html("");
			var rows = "";
			data.map((value) => {
				console.log("value"+value);
				var companies = _.join(_.map(_.filter(testcasesAssignments, { 'testcase_id': value.testcase_id}),'company_name'), [separator=',']);
				//// <td>`+value.environment_name+`</td>
				var savestr = `<tr>
				<td>`+value.testcase_id+`</td>
				<td class="rowTestCase" data-value='`+ JSON.stringify(value) +`'>`+value.test_method+`</td>
				<td>`+value.application_name+`</td>
				<td>`+value.status +`</td>
				<td>`+ companies +`</td>
			  </tr>`
			 rows = rows + savestr;
			});			 

			// $("#bucketList tbody").html(rows);

			if(rows != ""){
			$(".testmanagementAssignmentTableParent").html($(".testmanagementAssignmentTable").get(0).outerHTML)
			$(".testmanagementAssignmentTableParent .paging_full_numbers").remove()
			$('.testmanagementAssignmentTable').dataTable().fnClearTable();
    		$('.testmanagementAssignmentTable').dataTable().fnDestroy();	

			$(".testmanagementAssignmentTable tbody").html(rows);
			$('.testmanagementAssignmentTable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}else{
			$('.testmanagementAssignmentTable').dataTable().fnClearTable();
    		$('.testmanagementAssignmentTable').dataTable().fnDestroy();
		}
		postDisplayTestCases();
		}
	});
}


function fetchTestcasesAssignments(){
	$.ajax({
		url: base_url + "/testcasesAssignments/all",
		method: "GET",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			console.log(data);
			testcasesAssignments = data;
			displayTestcases();     
       		fetchAllCompanies();
		}
	});
}

function postDisplayTestCases(){
	$(".rowTestCase").click(function(){
		var dataValue = JSON.parse($(this).attr("data-value"));
		selectedTestCase = dataValue;
		console.log(dataValue);
		$('option').mousedown(function(e) {
			e.preventDefault();
			var originalScrollTop = $(this).parent().scrollTop();
			console.log(originalScrollTop);
			$(this).prop('selected', $(this).prop('selected') ? false : true);
			var self = this;
			$(this).parent().focus();
			setTimeout(function() {
				$(self).parent().scrollTop(originalScrollTop);
			}, 0);
			
			return false;
		});
		var companiesIds = _.join(_.map(_.filter(testcasesAssignments, { 'testcase_id': dataValue.testcase_id}),'company_id'), [separator=',']);
		companiesIds = companiesIds.split(',');
		console.log("companiesIds")
		console.log(companiesIds)
		$("#selectedTestCaseName").val(dataValue.test_method);
		$("#application").val(dataValue.application_id);
		$("#selectedEnvironment").val(dataValue.environment_name);
		$("#automation_status").val(dataValue.auto_status_id);
		$("#company_name").val(companiesIds);
		$("#updateTestAssignmentsModal").modal();
	});
}

function downloadTestcases(companyId,applicationId){
	$.ajax({
		url: base_url + "/testcases/downloadTestcases/"+companyId+"/"+applicationId,
		method: "GET",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			console.log(data);
			var sheetData = [];
			
			sheetData.push(['testcase_id','test_method','company_name','application_name','class_name']);
			
			//item.testcase_name,
			//	item.descrpition,
			data.map((item)=>{
			sheetData.push([
				item.testcase_id,
				item.test_method,
				item.company_name,
				item.application_name,
				item.class_name
			]);
			});				

			let csvContent = "data:text/csv;charset=utf-8," 
    		+ sheetData.map(e => e.join(",")).join("\n");
			var encodedUri = encodeURI(csvContent);

			var downloadLink = document.createElement("a");
    
			downloadLink.href = encodedUri;
			downloadLink.download = "testcases.csv";

			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			$("#downloadNotification").show();
			setTimeout(function(){ 
			$("#downloadNotification").hide();
			 }, 3000);
		}
	});
}

function uploadTestcases(sheetData,companyId,applicationId){
		var dataObj = {};
		dataObj["data"] = sheetData;
		
		$.ajax({
			url: base_url+"/testcases/uploadTestcases/"+companyId+"/"+applicationId,
			type: "POST",
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(dataObj),
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function(response)
			{
				hideLoader();
				$("#uploadNotification").show();
				setTimeout(function(){ 
				$("#uploadNotification").hide();
				
				 }, 3000);
			}
		});
}


