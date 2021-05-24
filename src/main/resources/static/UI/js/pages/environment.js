isExecutionEnvironmentDataTableAssigned = false;

function fetchAllEnvironment(){
	$.ajax({
		url: base_url+"/environment/findAllByUserId", 
		method: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(data) {
			var payload = "";
			$("#bucketList tbody").html("");
			$.each(data, function(index, value) {
				var dateArray = value.createdAt.split(".");
				var role = "";
				switch (value.userType) {
					case 1:
						role = "Administrator";
						break;
					case 2:
						role = "Company";
						break;
					case 3:
						role = "Tester";
						break;
				}
				
				payload += '<tr>';
				payload += '<td scope="col" class="bucketcheck">';
				payload += '<label class="main subCB">';
				payload += '<input type="checkbox" data-value="'+value.environmentId+'">';
				payload += '<span class="geekmark"></span>';
				payload += '</label>';
				payload += '</td>';
				payload += '<td>'+value.environmentName+'</td>';
				payload += '<td>'+dateArray[0].replace("T", " ")+'</td>';
				payload += '<td>'+readCookie("TAuname")+'</td>';
				payload += '</tr>';
			});
			
			if(payload != ""){
			$(".envTableParent .paging_full_numbers").remove()

			$('.envTable').dataTable().fnClearTable();
    		$('.envTable').dataTable().fnDestroy();
			
			$(".envTable tbody").html(payload);
			$('.envTable').DataTable({
				"lengthChange": false,
				"searching": false,   // Search Box will Be Disabled
				"ordering": true,    // Ordering (Sorting on Each Column)will Be Disabled
				"info": false,
				"pagingType": "full_numbers"
			});
			$(".selectdiv").css("padding-left","4rem")
			$(".bucketList_wrapper").css("padding-left","4rem")	
			$(".envTable").css("margin-left","2rem")	
		}else{
			$('.envTable').dataTable().fnClearTable();
			$('.envTable').dataTable().fnDestroy();
		}
			
		}
	});
}

$(document).ready(function() {

	
 
	fetchAllEnvironment();


	
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

});
function addEnv(environmentId=0){
	$environmentName = $('input[name=environment]:visible').val();
	if($environmentName == '')
	{
	   showError();
	   return false;
	}
	$("button:visible").attr('disabled','disabled');

	var dataObj = {};
	dataObj["environmentName"]= $environmentName;
	if(environmentId!==0){
		dataObj["environmentId"] = environmentId;
	}
	
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		url: base_url+"/environment/save",
		success: function(msg){
			$('.modal').modal('hide');
			$("button:visible").removeAttr('disabled');
			// if(!alert(successMsg)) {
			// 	window.location.href= window.location.href;
			// }
			fetchAllEnvironment();
		},
		complete: function(){
			$("button:visible").removeAttr('disabled');
		}
	});
}
function showUpdateModal(url)
{
	// SHOW AJAX RESPONSE ON REQUEST SUCCESS
	$.ajax({
		url: url,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function(response)
		{
			$('#update_modal .modal-body input[name=environment]').val(response.environmentName);
			$('#update_modal .modal-body input[name=update_button]').attr("onclick","addEnv("+response.environmentId+")");
			// LOADING THE AJAX MODAL
			$('#update_modal').modal('show', {backdrop: 'true'});
		}
	});
}
function showAddModal(url) {
	jQuery('#modal_ajax input').val('');
    // LOADING THE AJAX MODAL
    jQuery('#modal_ajax').modal('show', {
        backdrop: 'true'
    });

}
function showAjaxModal(url) {
    // SHOWING AJAX PRELOADER IMAGE
    jQuery('#modal_ajax .modal-body').html('<div style="text-align:center;margin-top:200px;"><img src="Libraries/img/loader.GIF" style="height:50px;" /></div>');

    // LOADING THE AJAX MODAL
    jQuery('#modal_ajax').modal('show', {
        backdrop: 'true'
    });

    // SHOW AJAX RESPONSE ON REQUEST SUCCESS
    $.ajax({
        url: url,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
        success: function(response) {
            jQuery('#modal_ajax .modal-body').html(response);
        }
    });
}

function showTestImage(url) {
    // SHOWING AJAX PRELOADER IMAGE
    jQuery('#image_ajax .modal-body').html('<div style="text-align:center;margin-top:200px;"><img src="Libraries/img/loader.GIF" style="height:50px;" /></div>');

    // LOADING THE AJAX MODAL
    jQuery('#image_ajax').modal('show', {
        backdrop: 'true'
    });

    // SHOW AJAX RESPONSE ON REQUEST SUCCESS
    $.ajax({
        url: url,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
        success: function(response) {
            jQuery('#image_ajax .modal-body').html(response);
        }
    });
}

function confirm_modal(delete_url, post_refresh_url) {
    $('#preloader-delete').html('');
    jQuery('#modal_delete').modal('show', {
        backdrop: 'static'
    });
    document.getElementById('delete_link').setAttribute("onClick", "delete_data('" + delete_url + "' , '" + post_refresh_url + "')");
    document.getElementById('delete_link').focus();
}

function checkDelete(url) {
    var chk = confirm("Are You Sure To Delete This !");
    if (chk) {
		$.ajax({
			url: url,
			type: 'DELETE',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
			},
			success: function(response)
			{
				window.location.href= window.location.href;
			}
		});
        return true;
    } else {
        return false;
    }
}