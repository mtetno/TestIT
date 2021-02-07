function saveEmailConfiguration(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailConfigurations/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$("a.addRowBtn").css("pointer-events", "");
			$("a.addRowBtn").css("opacity", "");
			$("#deleteRow").attr("disabled", false);
			$("#deleteRow1").attr("disabled", false);
			$("#deleteRow2").attr("disabled", false);
			$("#company_name").val('');
			$("#hostname").val('');
			$("#email").val('');
			$("#port").val('');
			$("#security_protocol").val('');
			
			 
			fetchAllEmailConfiguration();
		}
	});
}

function deleteEmailConfiguration() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailConfigurations/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
			fetchAllEmailConfiguration();
		}
	});
}

function deleteEmailConfigurations(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailConfigurations/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllEmailConfiguration();
		}
	});
}

function fetchAllEmailConfiguration() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailConfigurations/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$(".emailconfigTable  tbody").html("");
			data.map((value) => {
				
				var str = `<tr>
				<td scope="col" class="bucketcheck">
				  <label class="main subCB">
					<input data-value="`+value.id+`" type="checkbox"> 
					<span class="geekmark"></span> 
				  </label>
				</td>
				<td ><span class="updtRow">`+value.company_name+`</span></td>
				<td >`+value.hostname+`</td>
				<td >`+value.email+`</td>
				<td>`+value.port+`</td>
			  </tr>`;
 
				$(".emailconfigTable  tbody").prepend(str);
			 
			});
		}
	});
}
