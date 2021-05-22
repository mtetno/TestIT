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
		    var str = "";
			data.map((value) => {
				
				str =  str + `<tr>
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
			 
			});

			if(str != ""){
			$(".emailconfigTableParent .paging_full_numbers").remove();

			$('.emailconfigTable').dataTable().fnClearTable();
    		$('.emailconfigTable').dataTable().fnDestroy();
			
			$(".emailconfigTable tbody").html(str);
			$('.emailconfigTable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}
			
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
			var str = "";
			data.map((value) => {
				str = str + `<tr>
                    <td><i class="`+value.legend+`"></i></td>
                    <td scope="col" class="bucketcheck">
                      <label class="main subCB">
                        <input  data-value="`+value.template_id+`" type="checkbox"> 
                        <span class="geekmark"></span> 
                      </label>
                    </td>
                    <td ><span class="updtRow">`+value.application_name+`</span></td>
                    <td >`+value.template_type+`</td>
                    <td>`+value.content+`</td>
                    <td >-</td>
                    <td >Report Issue</td>
                  </tr>`;
			 
			});

			if(str != ""){
			$(".TempconfigtableParent .paging_full_numbers").remove();

			$('.Tempconfigtable').dataTable().fnClearTable();
    		$('.Tempconfigtable').dataTable().fnDestroy();
			
			$(".Tempconfigtable tbody").html(str);
			$('.Tempconfigtable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}
		}
	});
}
