var uploadedImageBase64 = undefined;
var specialKeys = new Array();
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
	$("#username_error").html("* Special symbols and spaces not allowed").show();
	return ret;
}	
function addUser(userId=0){
	$(".errmsg").hide();
	$firstname = $('.updateusermodel input[name=firstname]').val();
	$lastname = $('.updateusermodel input[name=lastname]').val();
	$user_type = $(".updateusermodel input[name=role]").val();
	$useremail = $('.updateusermodel input[name=email]').val();
	$Address = "TestAddress";
	$loginid = $('.updateusermodel input[name=username]:visible').val();
	$password = $('.updateusermodel input[name=password]:visible').val();
	if($('.updateusermodel input[name=password]:visible').val() != $('.updateusermodel input[name=confirmpassword]:visible').val()){
		showWarningToast("Password entered does not match")
		return false;
	}
	if($useremail == '' || $firstname == '' || $lastname == '' || $useremail == '')
	{
		showWarningToast("Please enter valid form data")
	   return false;
	}
	$("#editmyModalSucess1").modal('hide');
	var dataObj = {};
	dataObj["fName"]= $firstname;
	dataObj["lName"]= $lastname;
	dataObj["email"]= $useremail;
	dataObj["address"]= $Address;
	dataObj["contact"]= "";
	dataObj["userName"] = $loginid;
	if($password.trim().length >  0){
		dataObj["password"] = $password;
	}	
	if(uploadedImageBase64 != undefined){
		dataObj["profileImage"] = uploadedImageBase64;
		saveItem('profileImage', uploadedImageBase64);
	}
	
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		url: base_url+"/user/updateProfile",
			success: function(msg){
				showSuccessToast("The User Profile Updated Successfully.");
				$('#res').html("<span style='color:red;text-transform:capitalize;font-size:14px'>Profile updated successfully..!</span>").show();
				$('#res span').fadeIn().fadeOut(3000);
				window.location.href= window.location.href;
			}
	});
}

$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});

	$(".saveBtn").click(function(){
		addUser(readCookie("TAuid"));
	});

	$(".successmod").on('hidden.bs.modal', function () {
		$("#editmyModalSucess1").modal('hide');
	})

	fetchUserProfile();

 
	 

});


 


function fetchUserProfile(){
	$.ajax({
		url: base_url+"/user/"+readCookie("TAuid"), 
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(response) {
			var role="";
			switch(response.userType){
				case 1: role = "Administrator"; break;
				case 2: role = "Company"; break;
				case 3: role = "Tester"; break;
			}
	
			$('input[name=name]').val(response.fName+" "+response.lName);
			$('input[name=firstname]').val(response.fName);
			$('input[name=lastname]').val(response.lName);
			$('input[name=role]').val(role);
			$('input[name=email]').val(response.email);
			$('input[name=username]').val(response.userName);
			// $('input[name=password]').val(response.password);			
			// $('input[name=confirmpassword]').val(response.password);			
			if(response.profileImage!=undefined)
			document.getElementById('profileImage').setAttribute(
				'src', response.profileImage
			);
		}
	});
}


function onProfileImageSelected(){
	var file = document.querySelector('input[type=file]')['files'][0];
	var reader = new FileReader();
	var baseString;
	reader.onloadend = function () {
		uploadedImageBase64 = reader.result;
		document.getElementById('profileImage').setAttribute(
			'src', uploadedImageBase64
		);
	};
	reader.readAsDataURL(file);
}


$("#addusetbtn").click(function(){
	$("#myImage").val("")
	$('input[name=password]').val("");			
	$('input[name=confirmpassword]').val("");		
});