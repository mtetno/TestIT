function saveTestMethods(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testMethod/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$("a.addRowBtn").css("pointer-events", "");
			$("a.addRowBtn").css("opacity", "");
			$("#deleteRow").attr("disabled", false);
			$("#deleteRow1").attr("disabled", false);
			$("#deleteRow2").attr("disabled", false);
			$("#test_method").val('');
			$("#test_method").val('');
			$("#test_method").val('');
			$("#company_name").val(0);
			$("#application").val(0);
			$("button.addtestmethodBtn").closest(".addRowData").slideUp();
			fetchAllTestMethod();
		}
	});
}

 

function deleteTestMethod(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testMethod/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllTestMethod();
		}
	});
}

function fetchAllTestMethod() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testMethod/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			var str = "";
			data.map((value) => {
				str = str + `<tr>
				<td scope="col" class="bucketcheck">
				<label class="main subCB">
				<input data-value="`+value.test_method_id+`" type="checkbox"> 
				<span class="geekmark"></span> 
				</label>
				</td>
				<td >`+value.company_name+`</td>
				<td >`+value.application_name+`</td>
				<td >`+value.test_method+`</td>
				<td class="running">`+value.status+`</td>
				</tr>`;
			});

			if(str != ""){
			$(".TestmethodtableParent .paging_full_numbers").remove()

			$('.Testmethodtable').dataTable().fnClearTable();
    		$('.Testmethodtable').dataTable().fnDestroy();
			
			$(".Testmethodtable tbody").html(str);
			$('.Testmethodtable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}else{
			$('.Testmethodtable').dataTable().fnClearTable();
			$('.Testmethodtable').dataTable().fnDestroy();
		}
		}
	});
}
