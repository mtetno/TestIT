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

function deleteAllTestMethods() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testMethod/deleteAll/" + readCookie("TAuid"),
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
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
			data.map((value) => {
				var str = `<tr>
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
				console.log(str);
				$("table.Testmethodtable tbody").prepend(str);
			 
			});
		}
	});
}
