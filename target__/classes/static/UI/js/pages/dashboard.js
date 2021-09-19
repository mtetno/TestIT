
var bucketData = [];

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
			bucketData = data;
			$("#testBucketSummary tbody").html("");
			data.map((value,position) => {
				if(position < 5){
					var str = `<tr data-value="`+value.id+`">
					<td >`+value.name+`</td>
					<td ><img src="img/visibility-24-px.png" class="viewBucket" data-toggle="modal"   alt="1"></td>
				  </tr>`;
			 
					$("#testBucketSummary  tbody").prepend(str);
				}
			});
			postTestBucketFetch();
		}
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
				$("#myModal2").modal('show')
				$(".test_cases").click(function(){
					$(this).find(".submaindiv").slideToggle();
					$(this).find("i.testDetBtn").toggleClass("caret-rev");
				});
			}
		});

	   
   });

}

 