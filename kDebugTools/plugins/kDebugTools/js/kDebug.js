$("idSearchDataByIdSubmit").observe("click", function(data)
{
	var id = $("idSearchDataById").getValue();
	data.preventDefault();

/*	var callback = function(confirm) {
		alert(confirm);
	};*/

	var parameters = {"id" : id};
	JCMS.window.Modal.showJSP("plugins/kDebugTools/jsp/ajaxFindById.jsp", null, parameters);
});
