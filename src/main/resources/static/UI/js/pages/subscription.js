function saveSubscription(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$("a.addRowBtn").css("pointer-events", "");
			$("a.addRowBtn").css("opacity", "");
			$("#deleteRow").attr("disabled", false);
			$("#deleteRow1").attr("disabled", false);
			$("#deleteRow2").attr("disabled", false);
			$("#name").val('');
			$("#username").val('');
			$("#password").val('');
			$("#confirmpassword").val('');
			$("#email").val('');
			$("#startdate").val('');
			$("#enddate").val('');
			$("#testEnvSelect").val(0);
			$("#remind_before").val(0);
			$("#threads").val(0);
			
			$("#myModal1").modal("hide")
			fetchAllSubscriptions();
		}
	});
}

function deleteSubscriptions() {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/deleteAll",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			$(this).closest("tr").remove();
			$(".selectdiv").find(".mainCB input[type=checkbox]").prop("checked", false);
			fetchAllSubscriptions();
		}
	});
}

function deleteSubscription(id) {
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/delete/" + id,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function () {
			fetchAllSubscriptions();
		}
	});
}

function fetchAllSubscriptions() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/subscriptions/all",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			$("#subscriptionsList tbody").html("");
			data.map((value) => {
				
				var str = `<tr>
				<td scope="col" class="bucketcheck">
				  <label class="main subCB">
					<input data-value="`+value.id+`" type="checkbox"> 
					<span class="geekmark"></span> 
				  </label>
				</td>
				<td data-toggle="modal" data-dismiss="modal" data-target="#editmyModal1">`+value.username+`</td>
				<td >`+value.email+`</td>
				<td >`+value.start_date+`</td>
				<td >`+value.end_date+`</td>
			  </tr>`;
 
				$("#subscriptionsList tbody").prepend(str);
			 
			});
		}
	});
}
