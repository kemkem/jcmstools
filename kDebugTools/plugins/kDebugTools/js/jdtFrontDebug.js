document.observe("dom:loaded", function() {
	$("idJdtDisableButton").observe("click", function(event){
		event.preventDefault();
		new Ajax.Request('plugins/kDebugTools/jsp/ajaxSessionSaveEnableState.jsp', { method:'get' });
	});
	$("idJdtVisibleButton").observe("click", function(event){
		event.preventDefault();
		new Ajax.Request('plugins/kDebugTools/jsp/ajaxSessionSaveVisibleState.jsp', { method:'get' });
	});
});
