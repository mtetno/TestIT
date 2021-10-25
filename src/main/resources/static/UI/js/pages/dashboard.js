
var bucketData = [];
var executionDetails = {};

function fetchAllTestBucket() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testBucket/allByCompany",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			bucketData = data;
			
			$("#testBucketSummary tbody").html("");
			var str = "" ;
			data.map((value,position) => {
				if(position < 5){
					str += `<tr data-value="`+value.id+`">
					<td >`+value.name+`</td>
					<td ><img  src="img/visibility-24-px.png" data-toggle="modal"   alt="1"></td>
				  </tr>`;
			 
					
				}
			});
			$("#testBucketSummary  tbody").append(str);
			postTestBucketFetch();
		}
	});
}

function fetchAllExecutions() {
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/executionDetails/allByCompany",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			bucketData = data;
			executionDetails = data;
			data = _.uniqBy(data, 'execution_id');
			$("#executionSummary tbody").html("");
			var str = "" ;
			data.map((value,position) => {
				if(position < 5){
					str += `<tr data-value="`+value.id+`">
					<td >`+value.execution_name+`</td>
					<td >`+value.triggered_when.substring(0,10)+`</td>
		            <td ><img data-value="`+value.execution_id+`" class="viewExecutionBucket" src="img/visibility-24-px.png"  alt="1">  </td>
		            </tr>`;
					//<img src="img/shape.svg" alt="1" class="deletedataBtn">
				}
			});
			$("#executionSummary  tbody").append(str);
			postExecutionFetch();
		}
	});
}

function postExecutionFetch(){
	$(".viewExecutionBucket").click(function(){
		$("#myModal").modal();
		var exeId = $(this).attr('data-value');
		var popUpData = _.filter(executionDetails, 
			{ 'execution_id': parseInt(exeId) }
		);
		$("#selectedExecutionName").html("<strong>Execution Result :"+popUpData[0].execution_name+"</strong>");
		$("#totalExecution").text(popUpData.length)
		$("#passedExecution").text("0")
		$("#failedExecution").text("0")
		$("#queuesExecution").text(popUpData.length);

		$(".selectedExecutionModel tbody").html("");
		var str = "" ;
		popUpData.map((value,position) => {
				str += `<tr><td scope="col">`+position+`</td>
						  <td>`+value.test_method+`</td>
						  <td class="passed">Queued</td>
						  <td>-</td></tr>`;
				//<img src="img/shape.svg" alt="1" class="deletedataBtn">
		});
		$(".selectedExecutionModel  tbody").append(str);

		new Chart(document.getElementById("pie-chart"), {
		    type: 'pie',
		    data: {
		      // labels: ["TOTAL", "PASSED", "FAILED", "QUEQUD"],
		      datasets: [{
		        // label: "Population (millions)",
		        backgroundColor: ["#2e8009", "#dbaf11","#bb2424"],
		        data: [0,popUpData.length,0]
		      }]
		    }
		});


	});
}


function postTestBucketFetch(){

	$('.viewBucket').click(function(){
		
		var closestTr = $(this).closest('tr')[0]
		var bucketId = $(closestTr).attr('data-value');
		var selectedBucket = _.find(bucketData,{id: parseInt(bucketId)});
		console.log(selectedBucket);


		$("#modalBucketName").text(selectedBucket.name);
		$("#modalEnvironment").text(selectedBucket.environment_name);
		$("#modalRole").text(selectedBucket.username);
		
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
							<label>`+item.test_method+`</label>
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
				$("#myModal2").modal('show')
				$(".test_cases").click(function(){
					$(this).find(".submaindiv").slideToggle();
					$(this).find("i.testDetBtn").toggleClass("caret-rev");
				});
			}
		});

	   
   });

}

 