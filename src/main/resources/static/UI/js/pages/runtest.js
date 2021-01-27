function saveRunTests(dataObj) {
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		dataType: 'json',
		url: base_url + "/testcases/save",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', "Bearer " + readCookie("TAaccess"));
		},
		success: function (data) {
			displayTestcases();	
		}
	});
}

function clearRunTestPageData(){
	removeItem(RUNTESTS_NAME);
	removeItem(RUNTESTS_ENVIRONMENT_ID);
	removeItem(RUNTESTS_ENVIRONMENT_NAME);
	removeItem(RUNTESTS_TESTING_ENVIRONMENT_ID);
	removeItem(RUNTESTS_TESTING_ENVIRONMENT_NAME);
	removeItem(RUNTESTS_USER_ROLE_ID);
	removeItem(RUNTESTS_USER_ROLE_NAME);
	removeItem(RUNTESTS_THREAD);
	removeItem(RUNTESTS_DATE);
	removeItem(RUNTESTS_TIME);
	removeItem(RUNTESTS_SELECTED_TESTCASES_ID);
	removeItem(RUNTESTS_SELECTED_APPLICATIONS_ID);
	removeItem(RUNTESTS_SELECTED_TESTCASES_NAME);
	removeItem(RUNTESTS_SELECTED_APPLICATIONS_NAME);
}