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
			$("#deleteRow1").attr("disabled", false);
			$("#deleteRow").attr("disabled", false);
			$(this).closest(".addRowData").slideUp();
			
			 
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


function saveEmailTemplate(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailtemplate/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {		 
			fetchAllEmailTemplates();
		}
	});
}

function deleteEmailTemplates() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailtemplate/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
			fetchAllEmailTemplates();
		}
	});
}

function deleteEmailTemplate(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailtemplate/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllEmailTemplates();
		}
	});
}

function fetchAllEmailTemplates() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/emailtemplate/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$(".Tempconfigtable  tbody").html("");
			data.map((value) => {
				var str = `<tr>
                    <td><i class="`+value.legend+`"></i></td>
                    <td scope="col" class="bucketcheck">
                      <label class="main subCB">
                        <input type="checkbox"> 
                        <span class="geekmark"></span> 
                      </label>
                    </td>
                    <td ><span class="updtRow">`+value.company_name+`</span></td>
                    <td >`+value.template_type+`</td>
                    <td >Execution Inprogress</td>
                    <td >-</td>
                    <td >Report Issue</td>
                  </tr>`;
 
				$(".Tempconfigtable  tbody").prepend(str);
			 
			});
		}
	});
}
