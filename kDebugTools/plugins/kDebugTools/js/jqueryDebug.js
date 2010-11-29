'JCMS.plugin.kdebugtools'.namespace();

// -----------------------------------------------------------------
// 'Static' like object
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

function _jtD_getId(str, prefix)
{
	return(str.substr(prefix.length));
}

// -----------------------------------------------------------------
// Onload Initialization
jQuery(document).ready(function(){
    JCMS.plugin.kdebugtools.KDebugToolsUtils.initKDiv();
		var isPinned = 0;  //div de debug affich� et conserv� jusqua fermeture ou autre debug affich�
		var curPinnedId = ""; //id du debug affich� actuellement
		var _jtD_MainBoxId = "_jtD_MainBoxId";
		var _jtD_DetailBoxCloseButtonId = "_jtD_DetailBoxCloseButtonId";
		
		jQuery("._jtD_HeaderButton").bind("click", function(data){
		  jQuery("._jtD_MainBox").toggle();
		  jQuery("._jtD_HeaderButton").toggleClass("_jtD_HeaderButtonDisabled");
		});
		
		jQuery("._jtD_DetailBoxCloseButton").bind("click", function(data){
			//jQuery("#_jtD_DetailBoxId" + _jtD_getId(jQuery(this).attr("id"), _jtD_DetailBoxCloseButtonId)).hide();
			jQuery("#_jtD_DetailBoxId" + _jtD_getId(jQuery(this).attr("id"), _jtD_DetailBoxCloseButtonId)).hide();

			jQuery("#_jtD_TagTitleId" + curPinnedId).removeClass("_jtD_TagClickedHighlight");
			isPinned = 0;
			jQuery("._jtD_MainBox").bind("mouseover", function(data){
				var id = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
				jQuery("#_jtD_DetailBoxId" + id).show();
				jQuery("#_jtD_TagButtonEditId" + id).show();
				jQuery("#_jtD_TagButtonNewId" + id).show();
			});
			jQuery("._jtD_MainBox").bind("mouseout", function(data){
				var id = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
				jQuery("#_jtD_DetailBoxId" + id).hide();
				jQuery("#_jtD_TagButtonEditId" + id).hide();
				jQuery("#_jtD_TagButtonNewId" + id).hide();
			});
			data.stopPropagation();
			return false;
		});
		
		jQuery("._jtD_MainBox").bind("click", function(data){
			if (isPinned)
			{
				jQuery("#_jtD_DetailBoxId" + curPinnedId).hide();
				jQuery("#_jtD_TagTitleId" + curPinnedId).removeClass("_jtD_TagClickedHighlight");
				
				/*
				curPinnedId = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
				jQuery("#_jtD_DetailBoxId" + curPinnedId).show();
				jQuery("#_jtD_TagTitleId" + curPinnedId).addClass("_jtD_TagClickedHighlight");
				*/
				if(curPinnedId != _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId))
				{
					curPinnedId = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
					jQuery("#_jtD_DetailBoxId" + curPinnedId).show();
					jQuery("#_jtD_TagTitleId" + curPinnedId).addClass("_jtD_TagClickedHighlight");
				}
			}
			else
			{
				jQuery("._jtD_MainBox").unbind("mouseover");
				jQuery("._jtD_MainBox").unbind("mouseout");
				
				jQuery("._jtD_MainBox").bind("mouseover", function(data){
					var id = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
					jQuery("#_jtD_TagTitleId" + id).addClass("_jtD_TagHoverHighlight");
					jQuery("#_jtD_TagButtonEditId" + id).show();
					jQuery("#_jtD_TagButtonNewId" + id).show();
				});
				jQuery("._jtD_MainBox").bind("mouseout", function(data){
					var id = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
					jQuery("#_jtD_TagTitleId" + id).removeClass("_jtD_TagHoverHighlight");
					jQuery("#_jtD_TagButtonEditId" + id).hide();
					jQuery("#_jtD_TagButtonNewId" + id).hide();
				});
				
				isPinned = 1;
				curPinnedId = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
				jQuery("#_jtD_TagTitleId" + curPinnedId).removeClass("_jtD_TagHoverHighlight");
				jQuery("#_jtD_TagButtonEditId" + curPinnedId).hide();
				jQuery("#_jtD_TagButtonNewId" + curPinnedId).hide();
				jQuery("#_jtD_TagTitleId" + curPinnedId).addClass("_jtD_TagClickedHighlight");
			}
		});
		
		jQuery("._jtD_MainBox").bind("mouseover", function(data){
			var id = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
			jQuery("#_jtD_DetailBoxId" + id).show();
			jQuery("#_jtD_TagTitleId" + id).addClass("_jtD_TagHoverHighlight");
			jQuery("#_jtD_TagButtonEditId" + id).show();
			jQuery("#_jtD_TagButtonNewId" + id).show();
		});

		jQuery("._jtD_MainBox").bind("mouseout", function(data){
			var id = _jtD_getId(jQuery(this).attr("id"), _jtD_MainBoxId);
			jQuery("#_jtD_DetailBoxId" + id).hide();
			jQuery("#_jtD_TagTitleId" + id).removeClass("_jtD_TagHoverHighlight");
			jQuery("#_jtD_TagButtonEditId" + id).hide();
			jQuery("#_jtD_TagButtonNewId" + id).hide();
		});
		
		jQuery("._jtD_Button").bind("mouseover", function(data){
		  jQuery(this).addClass("_jtD_ButtonHighlight");
		});
		
		jQuery("._jtD_Button").bind("mouseout", function(data){
		  jQuery(this).removeClass("_jtD_ButtonHighlight");
    });
    
    jQuery("._jtD_TagButtonEdit").bind("click", function(data){
       window.open(jQuery(this).children().first().attr("href")); 
    });
    
    jQuery("._jtD_TagButtonNew").bind("click", function(data){
        window.open(jQuery(this).children().first().attr("href"));
    });
    
    jQuery("._jtD_DetailBoxEditButton").bind("click", function(data){
       window.open(jQuery(this).children().first().attr("href"));
    });
    
    jQuery("._jtD_DetailBoxNewButton").bind("click", function(data){
       window.open(jQuery(this).children().first().attr("href")); 
    });
});