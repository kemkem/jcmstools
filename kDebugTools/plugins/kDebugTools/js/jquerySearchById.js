//'JCMS.plugin.kdebugtools'.namespace();

// -----------------------------------------------------------------
// 'Static' like object

/*
JCMS.plugin.kdebugtools.KDebugToolsUtils = {
  initKDiv : function () {
    var ctxTooltipMenu = $('ctxTooltipMenu');
    if (ctxTooltipMenu) {
      ctxTooltipMenu.insert({
              before: "<div class='_jtD_HeaderContainer'><div class='_jtD_HeaderButton'>k</div></div>"
      });
    }
  }
};
*/

function _jtD_getId(str, prefix)
{
  return(str.substr(prefix.length));
}

function log(str) 
{
  jQuery("#_DEBUG_").html("");
  jQuery("#_DEBUG_").append(str + "<BR/>");
}


// -----------------------------------------------------------------
// Onload Initialization

function displayData()
{
	jQuery.get("plugins/kDebugTools/jsp/ajaxFindById.jsp?id="+jQuery("#idSearchDataById").val(), function(data) {
		alert('Load was performed.'+data);
	});
}

jQuery(document).ready(function(){
	
	jQuery("#idSearchDataById").bind("keypress", function(event) {
		if (event.which == 13) {
			event.preventDefault();
			displayData();
		}
	});
	
	
			
			
	jQuery("#idSearchDataByIdSubmit").bind("click", function(event) {
		//displayData();
		    
		    var callback = function(confirm) {
		      if (!confirm) {
		        // restore the previous value
		        alert("helo");
		        }
		    };
		    
		    var id = jQuery("#idSearchDataById").val();
		    
		    // Prompt for confirmation/comment
		    var parameters = {
		      "id" : id};
		    
		JCMS.window.Modal.showJSP("plugins/kDebugTools/jsp/ajaxFindById.jsp", callback, parameters);
		event.preventDefault();
	});
	
});
