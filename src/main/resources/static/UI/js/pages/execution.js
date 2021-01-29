var optiontc = [];
var appId = new Array(); 
var tcId = new Array(); 
var tcNames = new Array(); 
var appNames = new Array(); 
var selectedTestCases = new Array();
var selectedApplications = new Array();
var selectedTestCasesName = new Array();
var selectedApplicationsName = new Array();
var comEnvURL;


function addApplicationId(obj){
	var allCheckedBoxesInGroup = obj.closest('.submaindiv').find('input[type=checkbox]:checked');
	var allBoxesInGroup = obj.closest('.submaindiv').find('input[type=checkbox]');
	var selectedApp = obj.closest('.selectdiv ').find('input[type=checkbox]')[0];
	var applicationId = $(selectedApp).attr('data-id');
	var applicationName = $(selectedApp).attr('data-value');
	if(selectedApplications.includes(applicationId) == false){
		$(selectedApp).prop("checked",true);
		selectedApplications.push(applicationId);
		selectedApplicationsName.push(applicationName);
	}

	if(allCheckedBoxesInGroup.length == allBoxesInGroup.length){
		$(selectedApp).attr("checked","checked");
	}
}

function removeApplicationId(obj){
	var allCheckedBoxesInGroup = obj.closest('.submaindiv').find('input[type=checkbox]:checked');
	var selectedApp = obj.closest('.selectdiv ').find('input[type=checkbox]')[0];
	var applicationId = $(selectedApp).attr('data-id');
	var applicationName = $(selectedApp).attr('data-value');

	if(allCheckedBoxesInGroup.length == 0){
		$(selectedApp).prop("checked",false)
		if(selectedApplications.includes(applicationId)){
			_.remove(selectedApplications, (e)=>e == applicationId);
			_.remove(selectedApplicationsName, (e)=>e == applicationName);
		}
	}
}


function attachClickListeners(){
	$(".subCB input[type=checkbox]").click(function(e){
		console.log("inside attachClickListeners");
		if($(this).prop("checked")==true)
		{	
			selectedTestCases.push($(this).attr('data-id'));
			selectedTestCasesName.push($(this).attr('data-value'));
			console.log(selectedTestCases);
			addApplicationId($(this));
		}
		else{	
			_.remove(selectedTestCases, (e)=>e == $(this).attr('data-id'));
			_.remove(selectedTestCasesName, (e)=>e == $(this).attr('data-value'));
			console.log(selectedTestCases);
			removeApplicationId($(this));
		}
	});

	$(".mainCB input[type=checkbox]").click(function(e){
		e.stopPropagation();
		if($(this).prop("checked")==true)
		{
			console.log("selected")	;
			selectedApplications.push($(this).attr('data-id'));
			selectedApplicationsName.push($(this).attr('data-value'));
			$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", true);	
			$(this).closest(".selectdiv1").find(".submaindiv input[type=checkbox]").each((i,obj)=> {
				selectedTestCases.push($(obj).attr('data-id'));
				selectedTestCasesName.push($(obj).attr('data-value'));
				}
			);

		}
		else
		{	
			console.log("not selected")	;
			_.remove(selectedApplications, (e)=>e == $(this).attr('data-id'));
			_.remove(selectedApplicationsName, (e)=>e == $(this).attr('data-value'));
			$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", false);	
			$(this).closest(".selectdiv1").find(".submaindiv input[type=checkbox]").each((i,obj)=> {
				_.remove(selectedTestCases, (e)=>e == $(obj).attr('data-id'));
				_.remove(selectedTestCasesName, (e)=>e == $(obj).attr('data-value'));
				}
			);
		}
	});

	$(".filetest").click(function(e){
		e.stopPropagation();
		$('.subdiv').hide();
		$(this).closest(".selectdiv1").find(".subdiv").show();
		$(this).closest(".selectdiv").find(".submaindiv").slideUp();
	});
   
   /*---Jquery for section display none on click icon cancel---*/

	$('.btncancel').click(function(e){
		e.stopPropagation();
	  $(this).closest('.subdiv').hide();
	});
	
	/*---Jquery for toggle section on click angle-down icon---*/

	$(".selectdiv i.showdet").click(function(e){
		e.stopPropagation();
		$(this).closest(".selectdiv").find(".submaindiv").slideToggle();
		$(this).toggleClass("caret-rev");
	});

	// $(".selectdiv1").click(function(){
	// 	$(this).find(".submaindiv").slideToggle();
	// 	$(this).find("i.showdet").toggleClass("caret-rev");
	// });

	$(".selectdiv").click(function(){
		$(this).find(".submaindiv").slideToggle();
		$(this).find("i.showdet").toggleClass("caret-rev");
	});
	
	/*---Jquery for toggle section on click caret-down icon---*/

	$(".submaindiv i.showbtndiv").click(function(e){
		e.stopPropagation();
		$(this).closest("li").find(".hidediv").slideToggle();
		$(this).toggleClass("caret-rev");
	});

	$("aside.sidebar").height($("#main-content").height() + $("#footer").height() + 30);

	$(window).resize(function(){
		$("aside.sidebar").height($("#main-content").height() + $("#footer").height() + 30);
	});

	// For sidebar toggle
	if($(window).width() < 730)
	{
		$("#sidebarToggle").click(function(e){
			e.preventDefault();
			$("aside.sidebar").toggleClass("showSB");
			$(this).toggleClass("toggleIcon");
		});
	}

}


$(document).ready(function() {
	var today = new Date().toLocaleString();
	today = today.substring(0,today.length-3).replace("/","_").replace("/","_").replace(", ","_");
	today = replaceAll(today, "-", "_");
	today = replaceAll(today, ":", "_");
	today = readCookie("TAuname")+"_"+today;
	$("input[name=execution_name]").val(today);
	// $.ajax({
	// 	url: base_url+"/browser/allByCompany", 
	// 	method: "get",
	// 	beforeSend: function (xhr) {
	// 		xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
	// 	},
	// 	success: function(dataBrowser) {
	// 		var appOptions = "";
	// 		$.each(dataBrowser, function(key, value) {	
	// 			appOptions += '<option value="'+value.browserId+'">'+value.browserName+'</option>';
	// 		});
	// 		$("select[name=browser_id]").append(appOptions);			
	// 	}
	// });	
	$.ajax({
		url: base_url+"/environment/all", 
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(data) {
			var envOptions = "";
			$.each(data, function(key, value) {	
				envOptions += '<option value="'+value.environmentId+'">'+value.environmentName+'</option>';
			});
			$("select[name=environment_id]").append(envOptions);
			$("select[name=select_environment_id]").append(envOptions);
		}
	});	
	$.ajax({
		url: base_url+"/companyEnvironUrl/findAllByCompanyId", 
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success:function(data) {
			comEnvURL = data.map;
		}
	});
	$.ajax({
		url: base_url+"/application/allByCompany", 
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(applicationData) {
			var appOptions = "";
			var options = "";
			var appData = [];
			
			
			$.ajax({
				url: base_url+"/testcases/allByComapny", 
				method: "get",
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
				},
				success: function(data) {

					console.log("execution data",data);

					$.each(applicationData, function(key, value) {
						var applicationId = value.applicationId;
						var filteredApps = _.filter(data,(i)=>i.applicationId == applicationId)
						if(filteredApps.length > 0){
						
						var applicationName = value.applicationName;
						options += '<option value="'+applicationId+'">'+applicationName+'</option>';
						appData[applicationId] = applicationName;
						
						appOptions += '<div class="row selectdiv app'+applicationId+'">';
						appOptions += '<div class="col-md-12 col-sm-12 col-xs-12 selectdiv1">';
						appOptions += '<label class="main mainCB">'+applicationName;
						appOptions += '<input type="checkbox" value="0" class="selectcheck" onclick="onCheckSelect('+applicationId+')" data-id="'+applicationId+'" data-value="'+applicationName+'" name="_'+applicationId+'">'; 
						appOptions += '<span class="geekmark"></span>';
						appOptions += '</label>';
						appOptions += '<i class="fa fa-angle-down showdet" aria-hidden="true"></i>';
						appOptions += '<i class="fa fa-file-text filetest" aria-hidden="true"></i>';
						
						
						appOptions += '<div class="subdiv">';
						appOptions += '<p><i class="fa fa-times btncancel"></i></p>';
						appOptions += '<p>https://cdn.zeplin.io/5e2aef5289c3b99a5f0ac5eb/screens/FD35F34D-5F0E-444F-98EA-72594957D9B3.png</p>';
						appOptions += '<i class="fa fa-download" aria-hidden="true"></i>';
						appOptions += '<a href="#">Download Master Plan</a>';
						appOptions += '<a href="#">User Test Plan</a>';
						appOptions += '<a href="#" class="btncancel">Cancel</a>';
						appOptions += '</div>';
						appOptions += '<div class="col-md-12 col-sm-12 col-xs-12 submaindiv"><ul></ul></div></div></div>';
						}
					});
					
					$("div.sel-content").append(appOptions);


					$.each(data, function(key, value) {
						var tcData = "";
						if(optiontc.length == 0){
							optiontc[String(value.applicationId)] = "";
						}

							tcData +='<li>'
							tcData += '<label class="main subCB">'+value.testcaseName;
							tcData += '<input class="checkes subSelection'+value.applicationId+'" name="sub_category'+value.applicationId+'[]" data-id="'+value.testcasesId+'" data-value="'+value.testcaseName+'" value="'+value.className+'" type="checkbox">';
							tcData += '<span class="geekmark"></span> ';
							tcData += '</label>';
							tcData += '<i class="fa fa-caret-down showbtndiv caret" aria-hidden="true"></i>';
							tcData += '<div class="hidediv">';
							tcData += '<button class="btn btn-primary btn-sm"><i class="fa fa-download" aria-hidden="true"></i> Master Test Case</button><button class="btn btn-primary btn-sm"><i class="fa fa-download" aria-hidden="true"></i> User Test Case</button><button class="btn btn-primary btn-sm"><i class="fa fa-folder" aria-hidden="true"></i> Browse</button><button class="btn btn-primary btn-sm"><i class="fa fa-upload" aria-hidden="true"></i> Upload</button>';
							tcData += '</div>';
							tcData += '</li>';
							$(".selectdiv.app"+value.applicationId+" .selectdiv1 .submaindiv ul").append(tcData)
						
					});

					attachClickListeners();					
				}
			});
		},
		complete: function(data) {
			
			$('#btNext').click(()=>{
				if(selectedTestCases.length == 0){
					alert(MESSAGE_ENTER_VALID_TESTCASES);
					return false;
				}
				console.log(selectedTestCases);
				saveItem(RUNTESTS_SELECTED_TESTCASES_ID,JSON.stringify(selectedTestCases));
				saveItem(RUNTESTS_SELECTED_APPLICATIONS_ID,JSON.stringify(selectedApplications));
				saveItem(RUNTESTS_SELECTED_TESTCASES_NAME,JSON.stringify(selectedTestCasesName));
				saveItem(RUNTESTS_SELECTED_APPLICATIONS_NAME,JSON.stringify(selectedApplicationsName));
				window.open("finalizeexecution.html","_self");
			})


			 
			/*---Jquery for section display none/block on click icon file-text---*/
		}
		
		
		
		
	});
	
	
	

	
	
	

	//serialize object function
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	
	$.delete = function(url, data, callback, type){
	 
	  if ( $.isFunction(data) ){
		type = type || callback,
			callback = data,
			data = {}
	  }
	 
	  return $.ajax({
		url: url,
		type: 'DELETE',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: callback,
		data: data,
		contentType: type
	  });
	}
    var tableFixed = $('#table-example-fixed').dataTable({
        'info': false,
        'pageLength': 50
    });

    //new $.fn.dataTable.FixedHeader(tableFixed);
	//$(".icons span").tooltip();
});
function onCheckSelect(appId)
{
	/*if($("input[name='_"+appId+"']").prop("checked")) {
		$("input[name='sub_category"+appId+"[]']").prop("checked", true);
	}
	else {
		$("input[name='sub_category"+appId+"[]']").prop("checked", false);
	}*/
	if($("#collapseOne"+appId+" input[type=checkbox]").prop("checked")) {
		$("#collapseOne"+appId+" input[type=checkbox]").prop("checked", true);
	}
	else {
		$("#collapseOne"+appId+" input[type=checkbox]").prop("checked", false);
	}
}
function populateUrls(id) {
	$.each(comEnvURL, function(key, value){
		//a[href="#collapseOne69"]
		$.each(value.environmentList, function(k,v){
			if(v.environment.environmentId == id) {
				$('a[href="#collapseOne'+key+'"] .value_show1').html('(<b style="font-size:13px;">'+v.environment.environmentName+'</b>:<span style="font-size:11px;"> '+v.envUrl+' </span> )');
			}
		});
	});
}
function gettestcases(id)
{
	$("select[name=selectTestCase]").html('<option value="" selected="selected" disabled="">---Select Test Case---</option>');
	$("select[name=selectTestCase]").append(optiontc[String(id)]);
}
function getZipLinks(id)
{
	if($("select[name=application_id] option:selected").val()==""){
		alert("Please select application");
		return false;
	}
	else {
		if(id==""){
			$(".zipLinks").hide();
			alert("Please select environment");
			return false;
		}
		else {
			$(".zipLinks").show();
		}
	}
}
function downloadUTP()
{
	var downloadType = base_url+"/executionResults/downloadTestcasesZip/"+$("select[name=application_id] option:selected").text()+"/"+$("select[name=select_environment_id] option:selected").text()+"/false";
	var ext = 'UserTestPlan.zip';
	var contentType = "application/octet-stream";
	var hrefContentType = 'data:application/octet-stream;base64,';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', downloadType, true);
	var token = "Bearer " + readCookie("TAaccess");
	xhr.responseType = 'arraybuffer';
	xhr.setRequestHeader('Authorization', token);
	xhr.setRequestHeader('Content-type', contentType);
	xhr.onload = function(e) {
	  if (this.status == 200) {
		var uInt8Array = new Uint8Array(this.response);
		var i = uInt8Array.length;
		var binaryString = new Array(i);
		while (i--)
		{
		  binaryString[i] = String.fromCharCode(uInt8Array[i]);
		}
		var data = binaryString.join('');

		var base64 = window.btoa(data);

		var anchorElement = document.createElement('a');
		anchorElement.setAttribute('download', ext);
		anchorElement.href = hrefContentType + base64;
		document.body.appendChild(anchorElement);
		var mouseEvent = document.createEvent('MouseEvents');
		mouseEvent.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		anchorElement.dispatchEvent(mouseEvent);		
	  }
	  else {
		  statusError(this.status, this.responseText);;
	  }
	};

	xhr.send();
}
function downloadMTP()
{
	var downloadType = base_url+"/executionResults/downloadTestcasesZip/"+$("select[name=application_id] option:selected").text()+"/"+$("select[name=select_environment_id] option:selected").text()+"/true";
	var ext = 'MasterTestPlan.zip';
	var contentType = "application/octet-stream";
	var hrefContentType = 'data:application/octet-stream;base64,';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', downloadType, true);
	var token = "Bearer " + readCookie("TAaccess");
	xhr.responseType = 'arraybuffer';
	xhr.setRequestHeader('Authorization', token);
	xhr.setRequestHeader('Content-type', contentType);
	xhr.onload = function(e) {
	  if (this.status == 200) {
		var uInt8Array = new Uint8Array(this.response);
		var i = uInt8Array.length;
		var binaryString = new Array(i);
		while (i--)
		{
		  binaryString[i] = String.fromCharCode(uInt8Array[i]);
		}
		var data = binaryString.join('');

		var base64 = window.btoa(data);

		var anchorElement = document.createElement('a');
		anchorElement.setAttribute('download', ext);
		anchorElement.href = hrefContentType + base64;
		document.body.appendChild(anchorElement);
		var mouseEvent = document.createEvent('MouseEvents');
		mouseEvent.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		anchorElement.dispatchEvent(mouseEvent);		
	  }
	  else {
		  statusError(this.status, this.responseText);;
	  }
	};

	xhr.send();
}
function show_TestCase_data(tcid)
{
	var file_name = "<button type='button' name='masterFile' class='btn btn-primary mar10'><i class='fa fa-download'></i>&nbsp;&nbsp;Master TestCase</button>";
	file_name += "<button type='button' name='downloadFile' class='btn btn-primary mar10'><i class='fa fa-download'></i>&nbsp;&nbsp;User TestCase</button>";
	file_name += '<label class="btn btn-primary mar10"><i class="fa fa-file-excel-o"></i>&nbsp;&nbsp;Browse<input type="file" name="testData" style="display: none;"></label>';
	file_name += "<button type='button' name='saveFile' class='btn btn-primary'><i class='fa fa-upload'></i>&nbsp;&nbsp;Upload</button>";
	$("#filenameshow").html(file_name);
	$("#filenameshow").show();
	$("button[name=masterFile]").on("click", function(){
		var downloadType = base_url+"/testcases/downloadTestCase?applicationName="+$("select[name=application_id] option:selected").text()+"&testCaseName="+$("select[name=selectTestCase] option:selected").text()+"&isMasterFile=true&environmentName="+$("select[name=select_environment_id] option:selected").text();
		var ext = $("select[name=selectTestCase] option:selected").text()+".xlsx";
		var contentType = "application/octet-stream";
		var hrefContentType = 'data:application/octet-stream;base64,';
		var xhr = new XMLHttpRequest();
		xhr.open('GET', downloadType, true);
		var token = "Bearer " + readCookie("TAaccess");
		xhr.responseType = 'arraybuffer';
		xhr.setRequestHeader('Authorization', token);
		xhr.setRequestHeader('Content-type', contentType);
		xhr.onload = function(e) {
		  if (this.status == 200) {
			var uInt8Array = new Uint8Array(this.response);
			var i = uInt8Array.length;
			var binaryString = new Array(i);
			while (i--)
			{
			  binaryString[i] = String.fromCharCode(uInt8Array[i]);
			}
			var data = binaryString.join('');

			var base64 = window.btoa(data);

			var anchorElement = document.createElement('a');
			anchorElement.setAttribute('download', ext);
			anchorElement.href = hrefContentType + base64;
			document.body.appendChild(anchorElement);
			var mouseEvent = document.createEvent('MouseEvents');
			mouseEvent.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			anchorElement.dispatchEvent(mouseEvent);		
		  }
		  else {
			  statusError(this.status, this.responseText);;
		  }
		};

		xhr.send();
	});
	$("button[name=downloadFile]").on("click", function(){
		var downloadType = base_url+"/testcases/downloadTestCase?applicationName="+$("select[name=application_id] option:selected").text()+"&testCaseName="+$("select[name=selectTestCase] option:selected").text()+"&isMasterFile=false&environmentName="+$("select[name=select_environment_id] option:selected").text();
		var ext = $("select[name=selectTestCase] option:selected").text()+".xlsx";
		var contentType = "application/octet-stream";
		var hrefContentType = 'data:application/octet-stream;base64,';
		var xhr = new XMLHttpRequest();
		xhr.open('GET', downloadType, true);
		var token = "Bearer " + readCookie("TAaccess");
		xhr.responseType = 'arraybuffer';
		xhr.setRequestHeader('Authorization', token);
		xhr.setRequestHeader('Content-type', contentType);
		xhr.onload = function(e) {
		  if (this.status == 200) {
			var uInt8Array = new Uint8Array(this.response);
			var i = uInt8Array.length;
			var binaryString = new Array(i);
			while (i--)
			{
			  binaryString[i] = String.fromCharCode(uInt8Array[i]);
			}
			var data = binaryString.join('');

			var base64 = window.btoa(data);

			var anchorElement = document.createElement('a');
			anchorElement.setAttribute('download', ext);
			anchorElement.href = hrefContentType + base64;
			document.body.appendChild(anchorElement);
			var mouseEvent = document.createEvent('MouseEvents');
			mouseEvent.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			anchorElement.dispatchEvent(mouseEvent);		
		  }
		  else {
			  statusError(this.status, this.responseText);;
		  }
		};

		xhr.send();
	});
	$("button[name=saveFile]").on("click", function(){
		var form = $('#uploadFile form')[0];
        var data = new FormData(form);
		data.append('testData', $('input[type=file]')[0].files[0]); 
		data.append('applicationName', $("select[name=application_id] option:selected").text()); 
		data.append('environmentName', $("select[name=select_environment_id] option:selected").text()); 
		data.append('testCaseName', $("select[name=selectTestCase] option:selected").text()); 
		$.ajax({
			type: "POST",
            contentType: false,
			enctype: 'multipart/form-data',
            processData: false,
            cache: false,
            timeout: 600000,
			url: base_url+"/testcases/uploadTestCaseFile",
			data: data,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function(data) {
				$("#filemsg p").html("File uploaded successfully!");
				$("#filemsg").fadeIn().fadeOut(3000);
			}
		});
	});
}