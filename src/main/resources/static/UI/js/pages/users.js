var specialKeys = new Array();
var chkArr = [];
var isAllChecked = false;

specialKeys.push(8); //Backspace
specialKeys.push(9); //Tab
specialKeys.push(46); //Delete
specialKeys.push(36); //Home
specialKeys.push(35); //End
specialKeys.push(37); //Left
specialKeys.push(39); //Right
function IsAlphaNumeric(e) {
	var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
	var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
	//document.getElementById("username_error").style.display = ret ? "none" : "inline";
	$("#username_error").html("* Special symbols and spaces not allowed").show();
	return ret;
}

function showUpdateModal(url)
{
	// SHOW AJAX RESPONSE ON REQUEST SUCCESS
	$.ajax({
		url: url,
		type: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(response)
		{
			$('#update_modal .modal-body input[name=firstname]').val(response.fName);
			$('#update_modal .modal-body input[name=lastname]').val(response.lName);
			$('#update_modal .modal-body input[name=contact]').val(response.contact);
			//$('#update_modal .modal-body select[name=user_type] option[value='+response.userType+']').attr('selected', 'selected');
			$('#update_modal .modal-body input[name=email]').val(response.email);
			$('#update_modal .modal-body input[name=loginid]').val(response.userName);
			$('#update_modal .modal-body textarea[name=address]').val(response.address);
			$('#update_modal .modal-body input[name=button]').attr("onclick","updateUser("+response.userId+")");
			
			// LOADING THE AJAX MODAL
			$('#update_modal').modal('show', {backdrop: 'true'});
		}
	});
}
function showAjaxModal(url)
{	
	$('#modal_ajax input').val('');
	$('#modal_ajax textarea').val('');
	// LOADING THE AJAX MODAL
	$('#modal_ajax').modal('show', {backdrop: 'true'});
	
	// SHOW AJAX RESPONSE ON REQUEST SUCCESS
	$.ajax({
		url: url,
		type: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(response)
		{
			$('#modal_ajax .modal-body').html(response);
		}
	});
}
function showTestImage(url)
{
	// SHOWING AJAX PRELOADER IMAGE
	$('#image_ajax .modal-body').html('<div style="text-align:center;margin-top:200px;"><img src="Libraries/img/loader.GIF" style="height:50px;" /></div>');
	
	// LOADING THE AJAX MODAL
	$('#image_ajax').modal('show', {backdrop: 'true'});
	
	// SHOW AJAX RESPONSE ON REQUEST SUCCESS
	$.ajax({
		url: url,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		type: "get",
		success: function(response)
		{
			$('#image_ajax .modal-body').html(response);
		}
	});
}

//Normal AJAX
function confirm_modal(delete_url , post_refresh_url)
{
	$('#preloader-delete').html('');
	$('#modal_delete').modal('show', {backdrop: 'static'});
	document.getElementById('delete_link').setAttribute("onClick" , "delete_data('" + delete_url + "' , '" + post_refresh_url + "')" );
	document.getElementById('delete_link').focus();
}

function checkDelete(url)
{
	var chk=confirm("Are You Sure To Delete This !");
	if(chk)
	{
		$.ajax({
			url: url,
			type: 'DELETE',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function(response)
			{
				//window.location.href= window.location.href;
				//fetchUsers();
			}
		});
	  //return true;  
	}
	else{
		return false;
	}
}

function deleteuser(userId)
{
		$.ajax({
			url: base_url+"/user/"+userId,
			type: 'DELETE',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function(response)
			{
				fetchUsers();
			}
		});
}


function updateUser(userId=0){	
	$(".errmsg").hide();
	if(userId==0){
		$firstname = $('.addusermodel input[name=firstname]').val();
		$lastname = $('.addusermodel input[name=lastname]').val();
		$user_type = $('#f4').val();
		$loginid = $('.addusermodel input[name=username]').val();
		$useremail = $('.addusermodel input[name=email]').val();
		$password = $('.addusermodel input[name=password]').val();
		$confirm = $('.addusermodel input[name=confirmpassword]').val();
		$Address = $usercontact = "";
		
		/*$firstname = $('input[name=fName]:visible').val();
		$lastname = $('input[name=lName]:visible').val();
		$user_type = $("select[name=userType] option:selected").val();
		$useremail = $('input[name=email]:visible').val();
		$Address = $('textarea[name=address]:visible').val();
		$usercontact = $('input[name=contact]:visible').val();
		$password = $('input[name=password]:visible').val();
		$loginid = $('input[name=loginid]:visible').val();
		$confirm = $('input[name=confirm]:visible').val();*/
	}
	else {
		$firstname = $('.updateusermodel input[name=firstname1]').val();
		$lastname = $('.updateusermodel input[name=lastname1]').val();
		$user_type = $('.updateusermodel input[name=role1]').val();
		$loginid = $('.updateusermodel input[name=username1]').val();
		$useremail = $('.updateusermodel input[name=email1]').val();
		$password = $('.updateusermodel input[name=password1]').val();
		$confirm = $('.updateusermodel input[name=confirmpassword1]').val();
		$Address = $usercontact = "";
		
		/*$firstname = $('#update_modal .modal-body input[name=firstname]').val();
		$lastname = $('#update_modal .modal-body input[name=lastname]').val();
		$usercontact = $('#update_modal .modal-body input[name=contact]').val();
		$user_type = $("#update_modal .modal-body select[name=user_type] option:selected").val();
		$useremail = $('#update_modal .modal-body input[name=email]').val();
		$Address = $('#update_modal .modal-body textarea[name=address]').val();
		$loginid = $('#update_modal .modal-body input[name=loginid]:visible').val();
		$password="";*/
	}
	if($firstname == '' || $lastname == '' || $useremail == '' || $loginid == '' )
	{
		alert("Please enter valid fields");
		return false;
	}
	if($('input[name=password]:visible').val() != $('input[name=confirmpassword]:visible').val()){
		alert("Password did not matched");
		return false;
	}
	else if($('input[name=password1]:visible').val() != $('input[name=confirmpassword1]:visible').val()){
		alert("Password did not matched");
		return false;
	}
	if(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($('input[name=email]:visible').val())) {
	   console.log('passed');
	}
	else if(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($('input[name=email1]:visible').val())) {
	   console.log('passed');
	}
	else {
		alert("Enter valid email address");
		return false;
	}
	var dataObj = {};
	dataObj["email"]= $useremail;
	dataObj["address"]= $Address;
	dataObj["contact"]= $usercontact;

	dataObj["fName"] = $firstname;
	dataObj["lName"] = $lastname;
	dataObj["userName"] = $loginid;
	dataObj["password"] = $password;
	dataObj["userType"] = $user_type;
	if(userId!=0){
		dataObj["userId"] = userId;
	}
	
	//**************************HARD CODED VALUES***************************//
	dataObj["description"] = "";
	dataObj["designation"] = "";
	dataObj["status"] = 1;
	dataObj["passStatus"] = 1;
	//dataObj["addedBy"] = 1;
	
	dataObj["profileImg"] = "";
	//dataObj["companyId"] = 1;
	//dataObj["refUserId"] = 1;
	dataObj["addedByName"] = "";
	//**************************HARD CODED VALUES***************************//
	//alert(JSON.stringify(dataObj));
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		url: base_url+"/user/update",
			success: function(msg){
				$('#myModal1').modal('hide');
				$('#modal_ajax').modal('hide');
				$("#myModalSucess1").modal();
				
				fetchUsers();
				

		 $('.addusermodel input[name=firstname]').val("");
		 $('.addusermodel input[name=lastname]').val("");
		 $('#f4').val("");
		 $('.addusermodel input[name=username]').val("");
		 $('.addusermodel input[name=email]').val("");
		 $('.addusermodel input[name=password]').val("");
		 $('.addusermodel input[name=confirmpassword]').val("");

			},error: function(jqXHR, textStatus, errorThrown){
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
				alert(jqXHR.responseJSON.errorMessage);
			}
	});
}




function addUser(userId=0){	
	$(".errmsg").hide();
	if(userId==0){
		$firstname = $('.addusermodel input[name=firstname]').val();
		$lastname = $('.addusermodel input[name=lastname]').val();
		$user_type = $('#f4').val();
		$loginid = $('.addusermodel input[name=username]').val();
		$useremail = $('.addusermodel input[name=email]').val();
		$password = $('.addusermodel input[name=password]').val();
		$confirm = $('.addusermodel input[name=confirmpassword]').val();
		$Address = $usercontact = "";
		
		
	}
	else {
		$firstname = $('.updateusermodel input[name=firstname1]').val();
		$lastname = $('.updateusermodel input[name=lastname1]').val();
		$user_type = $('.updateusermodel input[name=role1]').val();
		$loginid = $('.updateusermodel input[name=username1]').val();
		$useremail = $('.updateusermodel input[name=email1]').val();
		$password = $('.updateusermodel input[name=password1]').val();
		$confirm = $('.updateusermodel input[name=confirmpassword1]').val();
		$Address = $usercontact = "";
		
		
	}
	if($firstname == '' || $lastname == '' || $useremail == '' || $loginid == '' )
	{
		alert("Please enter valid fields");
		return false;
	}
	if($('input[name=password]:visible').val() != $('input[name=confirmpassword]:visible').val()){
		alert("Password did not matched");
		return false;
	}
	else if($('input[name=password1]:visible').val() != $('input[name=confirmpassword1]:visible').val()){
		alert("Password did not matched");
		return false;
	}
	if(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($('input[name=email]:visible').val())) {
	   console.log('passed');
	}
	else if(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($('input[name=email1]:visible').val())) {
	   console.log('passed');
	}
	else {
		alert("Enter valid email address");
		return false;
	}
	var dataObj = {};
	dataObj["email"]= $useremail;
	dataObj["address"]= $Address;
	dataObj["contact"]= $usercontact;

	dataObj["fName"] = $firstname;
	dataObj["lName"] = $lastname;
	dataObj["userName"] = $loginid;
	dataObj["password"] = $password;
	dataObj["userType"] = $user_type;
	if(userId!=0){
		dataObj["userId"] = userId;
	}
	
	//**************************HARD CODED VALUES***************************//
	dataObj["description"] = "";
	dataObj["designation"] = "";
	dataObj["status"] = 1;
	dataObj["passStatus"] = 1;
	//dataObj["addedBy"] = 1;
	
	dataObj["profileImg"] = "";
	//dataObj["companyId"] = 1;
	//dataObj["refUserId"] = 1;
	dataObj["addedByName"] = "";
	//**************************HARD CODED VALUES***************************//
	//alert(JSON.stringify(dataObj));
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		url: base_url+"/user/save",
			success: function(msg){
				$('#myModal1').modal('hide');
				$('#modal_ajax').modal('hide');
				$("#myModalSucess1").modal();
				
				fetchUsers();
		

		 $('.addusermodel input[name=firstname]').val("");
		 $('.addusermodel input[name=lastname]').val("");
		 $('#f4').val("");
		 $('.addusermodel input[name=username]').val("");
		 $('.addusermodel input[name=email]').val("");
		 $('.addusermodel input[name=password]').val("");
		 $('.addusermodel input[name=confirmpassword]').val("");

			},error: function(jqXHR, textStatus, errorThrown){
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
				alert(jqXHR.responseJSON.errorMessage);
			}
	});
}

$(document).ready(function() {	

	var uname = readCookie("TAuname");
	$("#userMenu span").text(uname);

	fetchUsers();

	$(".selectAll").click(function(){
		var isCheckedAll =$(".selectAll").find("input[type=checkbox]").prop("checked");
		chkArr=[];
		
		if(!isCheckedAll){
			$('.table input[type=checkbox]').map((i,val)=>{
				isAllChecked=true;
				if($(val).attr("data-value")!=undefined){chkArr.push($(val).attr("data-value"))}
		});
		}

		$('.table input[type=checkbox]').prop("checked", !(isCheckedAll));
	})

	function fetchUsers(){
	$.ajax({
		url: base_url+"/user/allByCompany",
		type: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(data)
		{ 
			var payload = "";
			var num = 1;
			$("#bucketList tbody").html("");
			$.each(data, function(index, value) {				
				if(readCookie("TAuid") != parseInt(value.userId)) {
					var dateArray = value.createdAt.split(".");
					var role = "";
					switch(value.userType){
						case 1: role = "Administrator"; break;
						case 2: role = "Company"; break;
						case 3: role = "Tester"; break;
					}
		
					
					payload += '<tr>';
					payload += '<td scope="col" class="bucketcheck">';
					payload += '<label class="main subCB">';
					payload += '<input type="checkbox" data-value='+value.userId+'>';
					payload += '<span class="geekmark"></span> ';
					payload += '</label>';
					payload += '</td>';
					payload += '<td>'+value.fName+' '+value.lName+'</td>';
					payload += "<td>"+value.userName+"</td>";
					payload += '<td>'+value.email+'</td>';
					payload += '<td>'+dateArray[0].replace("T", " ")+'</td>';
					payload += '<input type="hidden" name="role" class="role" value="'+value.userType+'" />';
					payload += '</tr>';
				}
			});
			$("#bucketList tbody").html(payload);
			$('#bucketList').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers" 
			});
		},
		complete: function(){
			$(".mainCB input[type=checkbox]").click(function(){
				if($(this).prop("checked")==true)
				{	$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", true);	}
				else
				{	$(this).closest(".selectdiv1").find(".subCB input[type=checkbox]").prop("checked", false);	}
			});
			
			
			$('.table input[type=checkbox]').change(function() {
				if(this.checked && $(this).attr("data-value")!=undefined) {
					chkArr.push($(this).attr("data-value"));
				}
				else {
					if(isAllChecked == false){
						chkArr.pop($(this).attr("data-value"));
						isAllChecked=false;
					}
				}
			});

			/*---Jquery for save row---*/
			//$(document).on("click", "#saveRec", function(){
			$(document).on("click", "#saveRec", function(){
				if(addUser()){
					var dt = new Date();
					var date = dt.getDate()+"-"+('0'+(dt.getMonth()+1)).slice(-2)+"-"+dt.getFullYear();
					var time = dt.getHours()+":"+dt.getMinutes();
					var savestr = '<tr>';
					savestr += '<td scope="col" class="bucketcheck">';
					savestr += '<label class="main subCB">';
					savestr += '<input type="checkbox">';
					savestr += '<span class="geekmark"></span>';
					savestr += '</label>';
					savestr += '</td>';
					savestr += '<td>'+$("#f1").val()+'</td>';
					savestr += '<td>'+$("#f2").val()+'</td>';
					savestr += '<td>'+$("#f3").val()+'</td>';
					savestr += '<td >'+date+' '+time+'</td>';
					savestr += '</tr>';
					// $("#bucketList tbody tr:first-child").before();
					$("#bucketList tbody tr:first-child").before(savestr);
				}
			});

			/*---Jquery for update row---*/

			$("table.usertable tbody tr td:nth-child(3)").click(function(){
			$("#editmyModal1").modal();
				var lname="";
				var fname = ($(this).closest("tr").find("td:nth-child(2)").text()).split(" ");
				if(fname[1]!="" || fname[1]!=undefined) lname = fname[1];
		      $(".updateusermodel input[type=checkbox]").attr("data-value", )
		      $(".updateusermodel #uprowid").attr("data-value", $(this).closest("tr").find("td:nth-child(1) input[type=checkbox]").attr("data-value"));
		      $(".updateusermodel #uprowid").val($(this).closest("tr").index()+1);
			  $(".updateusermodel #firstname1").val(fname[0]);
		      $(".updateusermodel #lastname1").val(lname); 
		      $(".updateusermodel #role1").val($(this).closest("tr").find("input[name=role]").val()); 
		      $(".updateusermodel #username1").val($(this).closest("tr").find("td:nth-child(3)").text());
		      $(".updateusermodel #email1").val($(this).closest("tr").find("td:nth-child(4)").text());    

		    });

		    /*---Jquery for Update Save---*/

		    $("button.updateuserBtn").click(function(){
				if(updateUser($("#uprowid").attr("data-value"))){
					var rowIndx = $("#uprowid").val();
					var dataFname = $("#firstname1").val()+" "+$("#lastname1").val();
					var dataUsername = $("#username1").val();
					var dataEmail = $("#email1").val();

					var dt = new Date();
					var date = ('0'+dt.getDate()).slice(-2)+"-"+('0'+(dt.getMonth()+1)).slice(-2)+"-"+dt.getFullYear();
					var time = dt.getHours()+":"+dt.getMinutes();

					$(".usertable tbody tr:nth-child("+rowIndx+")").find("td:nth-child(2)").html('<span class="updtRow">'+dataFname+'</span>');
					$(".usertable tbody tr:nth-child("+rowIndx+")").find("td:nth-child(3)").text(dataUsername);
					$(".usertable tbody tr:nth-child("+rowIndx+")").find("td:nth-child(4)").text(dataEmail);
					$(".usertable tbody tr:nth-child("+rowIndx+")").find("td:last-child").text(date+" "+time);

					$("#editmyModal1").modal();
				}
		    });

			/*---Jquery for delete row---*/

			var str = '';
			var deleteId = 0;
			$("#deleteRow").click(function(e){
				e.preventDefault();
				str = '';
				$("table tbody .subCB input:checked").each(function(){
					deleteId = $(this).attr('data-value');
				if(str!='')
					str += ", "+$(this).closest("tr").find("td:nth-child(2)").text();
				else
					str += $(this).closest("tr").find("td:nth-child(2)").text();
				});

				$("#deletedItem").text(str);

				if($("table  tbody .subCB input:checked").length > 0){
					$("#myModal").modal();
				 }
			});

			$(document).on("click", "#yesbtn", function(){
				chkArr.forEach(function(index, val){
						deleteuser(index);
				});
		
			});
            
            
		}
	});
}
	
	$(".successmod").on('hidden.bs.modal', function () {
		location.reload();
	})
	
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
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
	
});