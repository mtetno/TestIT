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
			$('#myModalSucess1').modal('show'); 
			displayTestcases();	
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			alert(jqXHR.responseJSON.errorMessage);
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
				console.log("value"+value);
				var savestr = `<tr>
				<td scope="col" class="bucketcheck">
					<label class="main subCB">
					  <input type="checkbox" data-value=` + value.testcase_id + `> 
					  <span class="geekmark"></span> 
				  </label>
				</td>
				<td>`+value.testcase_name+`</td>
				<td>`+value.application_name+`</td>
				<td>`+value.environment_name+`</td>
				<td>`+value.status+`</td>
			  </tr>`
			 rows = rows + savestr;
			});			 

			// $("#bucketList tbody").html(rows);

			if(rows != ""){
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

		}
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
