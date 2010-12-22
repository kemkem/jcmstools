<%@include file="/jcore/doInitPage.jsp" %><%@page import="java.util.*"%><%

// jQuery loading must be done in head section 
jcmsContext.addJSHeader("plugins/kDebugTools/js/jquery-1.4.2.min.js");
// specific script is at bottom of page
// lauching is done using jQuery loading when document is ready
jcmsContext.addJavaScript("plugins/kDebugTools/js/jqueryDebug.js");
jcmsContext.addCSSHeader("plugins/kDebugTools/css/jtDebug.css");
	
final String ATTR_DEBUG_ID = "_jDebug_debugIds";
final String ATTR_DEBUG_COUNT = "_jDebug_debugCount";

boolean isDebugActive = channel.getBooleanProperty("kDebugTools.enable", false);

if (!isDebugActive) {
  return;
}    
  Category currentCategory = jcmsContext.getCurrentCategory();
  Category portalCategory = jcmsContext.getPortalCategory();
  Category[] ctxCategories = jcmsContext.getCtxCategories();
  Set<String> hDebugIds = (Set<String>)request.getAttribute(ATTR_DEBUG_ID);
	if (hDebugIds == null) {
		hDebugIds = new HashSet<String>();
		request.setAttribute(ATTR_DEBUG_ID, hDebugIds);
		if(ctxCategories.length > 0) {
			for(int i = 0; i < ctxCategories.length; i++) {
	  		System.out.println("ctx id" + ctxCategories[i]+ "<BR/>");
			}
		}	
	} 
			
	Integer debugCount;
	if (request.getAttribute(ATTR_DEBUG_COUNT) == null) {
		debugCount = 0;
	} else {
		debugCount = ((Integer)request.getAttribute(ATTR_DEBUG_COUNT)) + 1;
	}
  request.setAttribute(ATTR_DEBUG_COUNT, debugCount);

  PortalElement portalElement = jcmsContext.getPortlet();
	if(portalElement != null) {
		//itemPub : l'element actuel est une publication
		Publication itemPub = (Publication)request.getAttribute("publication");

		if (itemPub == null) {
		  if (hDebugIds.contains(portalElement.getId())) {
		    // this portalElement has already been treated : skip
		    return;
		  }
	    itemPub = portalElement;
	    // Not to treat a second time
	    hDebugIds.add(portalElement.getId());
		}
		
	  String itemClass = itemPub.getClass().getSimpleName();
	  String itemTypeLabel = itemPub.getTypeLabel(userLang);
	  String itemId = itemPub.getId();
	  String itemTitle = itemPub.getTitle();
	  String itemTemplatePath = itemPub.getTemplatePath(jcmsContext);

		
		String idD = itemId + debugCount;
		String baseForLink = jcmsContext.getBaseUrl() + "types/" + itemClass + "/edit" + itemClass + ".jsp"; 
		String editLink = baseForLink + "?id=" + itemId;
		String newLink = (itemPub == null) ? baseForLink : baseForLink + "?cids=" + currentCategory.getId();
%>
<div id="_jtD_MainBoxId<%= idD %>" class="_jtD_MainBox"> 
  <div id="_jtD_TagTitleId<%= idD %>" class="_jtD_TagTitle"><%= itemTypeLabel %></div>
  <div id="_jtD_TagButtonEditId<%= idD %>" class="_jtD_TagButtonEdit _jtD_TagButton _jtD_Button"><a href="<%= editLink %>" ></a>E</div>
  <div id="_jtD_TagButtonNewId<%= idD %>" class="_jtD_TagButtonNew _jtD_TagButton _jtD_Button"><a href="<%= newLink %>" ></a>N</div>
  <div id ="_jtD_DetailBoxId<%= idD %>" class="_jtD_DetailBox">
		<div class="_jtD_DetailBoxHeader">
				<div class="_jtD_DetailBoxCloseButton _jtD_DetailBoxButton _jtD_Button" id ="_jtD_DetailBoxCloseButtonId<%= idD %>">X</div>
				<div class="_jtD_DetailBoxEditButton _jtD_DetailBoxButton _jtD_Button" id ="_jtD_DetailBoxEditButtonId<%= idD %>"><a href="<%= editLink %>" ></a>edit</div>
				<div class="_jtD_DetailBoxNewButton _jtD_DetailBoxButton _jtD_Button" id ="_jtD_DetailBoxNewButtonId<%= idD %>"><a href="<%= newLink %>" ></a>new</div>
        <div class="_jtD_DetailBoxHeaderLabel"><%= itemTypeLabel %></div>
    </div>
		<table> 
			<tr><td>class</td><td>: <%= itemClass %></td><td>cat id</td><td>: <%= currentCategory.getId() %></td></tr> 
			<tr><td>id</td><td>: <%= itemId %></td><td>cat name</td><td>: <%= currentCategory.getName() %></td></tr> 
			<tr><td>title</td><td>: <%= itemTitle %></td><td>portal cat id</td><td>: <%= portalCategory.getId() %></td></tr> 
			<tr><td>template</td><td>: <%= itemTemplatePath %></td><td>portal cat name</td><td>: <%= portalCategory.getName() %></td></tr> 
		</table> 
  </div>
</div>
<div style="clear:both;"></div>						
<%
}
%>
