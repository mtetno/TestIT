function deleteAllTestBuckets() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testBucket/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
			fetchAllTestBucket();
		}
	});
}

function deleteTestBucket(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testBucket/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllTestBucket();
		}
	});
}

function fetchAllTestBucket() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testBucket/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			data.map((value) => {
                var str = `
                <tr>
                    <td scope="col" class="bucketcheck">
                    <label class="main subCB">
                        <input data-value="`+value.id+`" type="checkbox"> 
                        <span class="geekmark"></span> 
                    </label>
                    </td>
                    <td>`+value.name+`</td>
                    <td>`+value.environment_name+`</td>
                    <td>`+value.role+`</td>
                    <td><img src="img/flip.png" class="addrow" alt="3" title="Clone"> <img src="img/visibility-24-px.png" alt="3" data-toggle="modal" data-target="#myModal1" title="View"></td>
                </tr>`;
 
				$("table.bucketListTable tbody").prepend(str);
			 
			});
		}
	});
}
