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
			displayTestcases();	
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
			  $("#bucketList tbody").html(savestr);
			});			 
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