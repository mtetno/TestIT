

function fetchCompany(){

    var selectedApplicationIds = JSON.parse(getItem(RUNTESTS_SELECTED_DATA)).map(item => item.applicationId);
    var selectedTestcasesIds = JSON.parse(getItem(RUNTESTS_SELECTED_DATA)).map(item => item.testCase);

$.ajax({
    url: base_url+"/application/allByCompany", 
    method: "get",
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
    },
    success: function(applicationData) {
        
        // $.each(data, function(key, value) {            
        // });
        
        $.ajax({
            url: base_url+"/testcases/allByComapny", 
            method: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
            },
            success: function(data) {
                $.each(applicationData, function(key, value) {          
                    var appId = value.applicationId;

                    if(selectedApplicationIds.includes(appId.toString())){

                            var testCase =  _.filter(data, (item) => item.application_id == appId);
                            console.log("appId",appId);
                            console.log("testCase",testCase);
                            console.log("data",data);
                            console.log("applicationData",applicationData);

                            var allTests = '';
                            $.each(testCase, function(key, test) {      
                                if(selectedTestcasesIds.includes(test.testcase_id.toString())){
                                        var eachTest = `<li>
                                        <label class="main subCB">`+test.test_method+` 
                                         
                                    </label>
                                    </li>`;
                                    allTests = allTests + eachTest;
                                }
                        })

                            var row = `<div class="col-md-12 test_cases">
                        <label class="main mainCB">`+value.applicationName+` 
                       
                    </label>
                    <i class="fa fa-angle-down testDetBtn" aria-hidden="true"></i>
                    <div class="col-md-12 col-sm-12 col-xs-12 submaindiv">
                        <ul>`+
                        allTests
                        +`</ul>
                    </div>
                    </div>`;

                    $('#testBucketSummary').append(row);
                }
                });

                $(".test_cases").click(function(){
                    $(this).find(".submaindiv").slideToggle();
                    $(this).find("i.testDetBtn").toggleClass("caret-rev");
                });
                
                            }
        });
    },
    complete: function(data) {     
    }
});
}


function creatTestBucket(payload,executionBucketPayload){
$.ajax({
		type: 'POST',
		data: JSON.stringify(payload),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testBucket/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
            console.log("Inside creatTestBucket")
            showSuccessToast("The Logical Group Created Successfully.");
            console.log("Inside createExecution")
            
            setTimeout(function(){ window.location.href = "runtest.html"; }, 2500);

            // createExecution(executionBucketPayload);
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
                showSuccessToast("The Logical Group Executed Successfully.");
                console.log("Inside createExecution")

                setTimeout(function(){ window.location.href = "runtest.html"; }, 2500);
            }
        });
}

function createTestBucketAndExecution(testBucketPayload,executionBucketPayload){
    console.log("Inside creatTestBucket")
    creatTestBucket(testBucketPayload,executionBucketPayload);
}
