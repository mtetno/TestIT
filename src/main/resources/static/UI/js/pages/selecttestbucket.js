 
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
			$("table.bucketListTable tbody").html("");
			$("#executeSummary.bucketListTable tbody").html("");
			var str="",summaryStr="";
			data.map((value) => {
                str += `
                <tr>
                    <td scope="col" class="bucketcheck">
                    <label class="main subCB">
                        <input data-value="`+value.id+`" type="checkbox"> 
                        <span class="geekmark"></span> 
                    </label>
                    </td>
                    <td>`+value.name+`</td>
                    <td data-value="`+value.environment_id+`">`+value.environment_name+`</td>
                    <td data-value="`+value.user_role_id+`"> `+value.username+`</td>
                    <td><img src="img/flip.png" class="addrow" alt="3" title="Clone"> <img src="img/visibility-24-px.png" alt="3" data-toggle="modal" class="viewBucket" title="View"></td>
				</tr>`;
				
				summaryStr += `
                <tr>
                    <td scope="col" class="bucketcheck">
                    <label class="main subCB">
                        <input data-value="`+value.id+`" type="checkbox"> 
                        <span class="geekmark"></span> 
                    </label>
                    </td>
                    <td>`+value.name+`</td>
                    <td data-value="`+value.environment_id+`">`+value.environment_name+`</td>
                    <td data-value="`+value.user_role_id+`"> `+value.username+`</td>
					<td><img src="img/visibility-24-px.png" alt="3" data-toggle="modal" class="viewBucket" title="View"></td>
                </tr>`;
 
				// $("#mainContainer .bucketListTable tbody").prepend(str);

			// $("#mainContainer .bucketListTableParent .paging_full_numbers").remove()
		
				
			});
			if(str != ""){
			$('#mainContainer .bucketListTable').dataTable().fnClearTable();
    		$('#mainContainer .bucketListTable').dataTable().fnDestroy();
			$("#mainContainer .bucketListTable tbody").html(str);
			$('#mainContainer .bucketListTable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
		}else{
			$('#mainContainer .bucketListTable').dataTable().fnClearTable();
    		$('#mainContainer .bucketListTable').dataTable().fnDestroy();
		}
			$("#executeSummary .bucketListTable tbody").prepend(summaryStr);

			postTestBucketFetch();
		}
	});
}


function createExecution(payload){
    $.ajax({
            type: 'POST',
            data: JSON.stringify(payload),
            contentType: 'application/json',
            dataType: 'json',
            url: base_url + "/executionDetails/save",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
            },
            success: function (data) {
            }
        });
    }

function postTestBucketFetch(){
	/*---Jquery for add row---*/


	
	$(".addrow").click(function(e){
		e.preventDefault();
		var closestTr = $(this).closest('tr')[0]
		var cloneBucketSourceId = $($(closestTr).find('input')).attr('data-value');
		saveItem("cloneBucketSourceId",cloneBucketSourceId);
		var str = `<tr>
		<td></td>
		<td><input type="text" id="cloneBucketName" class="form-control border" name="" placeholder="Enter Bucket Name"></td>
		<td><select id="environment" class="form-control border" name="">
			</select></td>
		<td><select id="user_role" class="form-control border" name="">
			</select></td>
		<td><img src="img/save-24-px.png" alt="1" id="saveRec"> <img src="img/cancel-24-px.png" alt="1" id="cancelRec"></td>
		</tr>`;				
		$("#bucketList tbody").prepend(str);

		fetchAllEnvironments();
		fetchAllUsersRoles();

		/*---Jquery for save row---*/
			$("#saveRec").click(function(){
				var bucketName = $("#cloneBucketName").val();
				var bucketId = getItem("cloneBucketSourceId");
				var environment = $("#environment").val();
				var userRole =  $("#user_role").val();

				$.ajax({
				type: 'GET',
				contentType: 'application/json',
				dataType: 'json',
				url: base_url + "/testBucket/cloneTestBucket/"+bucketId + "/" + bucketName + "/" + environment + "/" +userRole ,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
				},
				success: function () {
					fetchAllTestBucket();
				}
			});
		});
	});
	
	
	
	/*---Jquery for cancel row---*/

	$(document).on("click", "#cancelRec", function(){
		$(this).closest("tr").remove();		    
	});

	$('.viewBucket').click(function(){
		
		var closestTr = $(this).closest('tr')[0]
		var bucketName = $($(closestTr).find('td:nth-child(2)')).html();
		var env = $($(closestTr).find('td:nth-child(3)')).html();
		var role = $($(closestTr).find('td:nth-child(4)')).html();
		var bucketId = $($(closestTr).find('input')).attr('data-value');

		$("#modalBucketName").text(bucketName);
		$("#modalEnvironment").text(env);
		$("#modalRole").text(role);
		
		$.ajax({
			type: 'GET',
			contentType: 'application/json',
			dataType: 'json',
			url: base_url + "/testBucket/fetchTestBucketDetails/"+bucketId,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function (data) {
				
				var applications = _.groupBy(data, 'application_name');


				var header = `
				<div class="col-md-12 Testheading">
		          				<h5>Test Cases</h5>
							  </div>`;
				$(".Testcasemodel").html("");
				$(".Testcasemodel").append(header);			  


				$.each( applications, function(i, n){
					var testList = "";
					n.map((item) => {
						testList = testList +
						`<li>
							<label>`+item.testcase_name+`</label>
						</li>`;
					})

					 var str = `<div class="col-md-12 test_cases">
									<label>`+i+`</label>
								<i class="fa fa-angle-down testDetBtn" aria-hidden="true"></i>
								<div class="col-md-12 col-sm-12 col-xs-12 submaindiv">
										<ul>
										`+testList
										+	
										`</ul>
								</div>
								</div>`;

 
					   $(".Testcasemodel").append(str);
				});
				$("#myModal1").modal('show')
				$(".test_cases").click(function(){
					$(this).find(".submaindiv").slideToggle();
					$(this).find("i.testDetBtn").toggleClass("caret-rev");
				});
			}
		});

	   
   });
}

