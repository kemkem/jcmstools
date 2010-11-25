<%@ include file="/jcore/doInitCtxMenu.jsp" %><jalios:include target="EMPTY_HEADER_START" targetContext="empty" /><% 
  
  // Set Http Name headers
	String channelKeyWords = channel.getProperty("channel.keywords","");
	String publicationKeyWords = (String)request.getAttribute("metakeywords");
	String strKeyWords = Util.notEmpty(channelKeyWords) && Util.notEmpty(publicationKeyWords) ? 
	                       XmlUtil.normalize(channelKeyWords) + ", " + XmlUtil.normalize(publicationKeyWords) : 
	                       XmlUtil.normalize(channelKeyWords) + "" + XmlUtil.normalize(publicationKeyWords);

	String channelDescription = channel.getProperty("channel.description","");
  String publicationDescription = (String)request.getAttribute("metadescription");
	String strDescription = Util.notEmpty(channelDescription) && Util.notEmpty(publicationDescription) ? 
                         XmlUtil.normalize(channelDescription) + " " + XmlUtil.normalize(publicationDescription) : 
                         XmlUtil.normalize(channelDescription) + "" + XmlUtil.normalize(publicationDescription);
	
	jcmsContext.addHttpNameHeader("keywords",    strKeyWords);
	jcmsContext.addHttpNameHeader("description", strDescription);

  // Set Title / DotType / Zone
	String titleOfThePage = jcmsContext.getPageTitle("");
	String docType        = jcmsContext.getDocType("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
	
	jcmsContext.setPageTitle(titleOfThePage);
	jcmsContext.setPageZone(jcmsContext.getPageZone("Public"));
	
  if (trace != null) {
    trace.put("title", titleOfThePage);
  }
  
  // Setup Headers
  jcmsContext.internalSetupEmptyHeader();
  
  // Setup Request I
  if (Util.toBoolean(request.getAttribute("RegiserAjaxContext"),true)){
	  AjaxManager.getInstance().registerContext(jcmsContext);
	}
  
%><%= docType %>
<html <%= JcmsUtil.getLangAttributes(userLang) %> xmlns="http://www.w3.org/1999/xhtml" <%= debug ? "debug='true'" : "" %>>
<head>
  <base href="<%= ServletUtil.getBaseUrl(request) %>" <% if (Util.notEmpty(request.getParameter("basetarget"))) { %>target="<%= request.getParameter("basetarget") %>"<% } %> />
  
  <% for (Iterator it = jcmsContext.getHttpEquivHeaders().entrySet().iterator() ; it.hasNext() ; ) { Map.Entry itHeader = (Map.Entry) it.next(); %>
  <%= JcmsUtil.getXHtmlMetaHttpEquivTag(String.valueOf(itHeader.getKey()), String.valueOf(itHeader.getValue())) %><% } %>
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta http-equiv="Content-Script-Type" content="text/javascript" />
  
  <% for (Iterator it = jcmsContext.getHttpNameHeaders().entrySet().iterator() ; it.hasNext() ; ) {  Map.Entry itHeader = (Map.Entry) it.next(); %>
  <%= JcmsUtil.getXHtmlMetaTag(String.valueOf(itHeader.getKey()), String.valueOf(itHeader.getValue())) %><% } %>
  
  <title><%= channel.getName() %> - <%= Util.html2Ascii(titleOfThePage) %></title>

  <% for (Iterator it = jcmsContext.getFinalCSSMap().entrySet().iterator() ; it.hasNext() ; ) { Map.Entry itHeader = (Map.Entry) it.next();%>
  <link rel="stylesheet" href="<%= itHeader.getKey() %>" type="text/css" media="<%= Util.getString(itHeader.getValue(), "all") %>" /><% } %>

  
  <% for (Iterator it = jcmsContext.getJSHeaders().entrySet().iterator() ; it.hasNext() ; ) { 
       Map.Entry itHeader = (Map.Entry) it.next(); 
       String    language = Util.getString(itHeader.getValue(), "JavaScript"); %>
  <script src="<%= itHeader.getKey() %>" type="text/<%= language %>" language="<%= language %>"></script><% } %>


  <% if (Util.notEmpty(request.getAttribute("rssLinks"))) { %>
  <%= request.getAttribute("rssLinks") %><% } %>
  
  <style type="text/css" media="all">
    <!--  <% if (Util.notEmpty(jcmsContext.getStyleHeaders())) { for (Iterator it = jcmsContext.getStyleHeaders().entrySet().iterator() ; it.hasNext() ; ) { Map.Entry itHeader = (Map.Entry) it.next(); %>
	  <%= itHeader.getKey() %><% }} %>
	  
	  .js .wdglang-<%= channel.getLanguage() %> { display: block; }
    -->
  </style>
  <% String favIcon = jcmsContext.workaroundBrowserBaseHrefBug(channel.getProperty("channel.favicon"));
     if (Util.notEmpty(favIcon)){ %><link rel="shortcut icon" href='<%= favIcon %>' /><% } %>
  
  <% for (Iterator it = jcmsContext.getCustomHeaders().iterator() ; it.hasNext() ; ) { %>
  <%= Util.getString(it.next(),"") %><% } %>
     
  <%@ include file="/custom/jcms/doCustomHeader.jsp" %>
  
  <%-- *** PLUGINS *************** --%>
  <jalios:include target="EMPTY_HEADER" targetContext="header" />
</head>
<%
{
  String classValues = Util.getString(jcmsContext.getBodyAttributes().get("class"), "");
  classValues = classValues + " browser-" + jcmsContext.getBrowser().getBrowserShortName();
  jcmsContext.addBodyAttributes("class", classValues);
}
%>
<body <% for (Iterator it = jcmsContext.getBodyAttributes().entrySet().iterator() ; it.hasNext() ; ) { Map.Entry itHeader = (Map.Entry) it.next(); %> <%= itHeader.getKey() %>="<%= itHeader.getValue() %>"<%}%>><script language="javascript" type="text/javascript">document.body.className = document.body.className + ' js'</script><%
  boolean jcmsShieldEnabled = Util.toBoolean(request.getAttribute("com.jalios.jcms.JCMS_JS_SHIELD"), false);
  if (jcmsShieldEnabled) { %>
<div id="jcmsShield" style="position: absolute; background: url('s.gif'); z-index: 4000; width:3500px; height:3500px;"><img src="images/jalios/icons/progress.gif" alt="<%= glp("ui.work.form.txt.wait") %>"/></div><%
  }
%>
<a name="top"></a>
<% 
  int pubCtxMenuCounter = Util.toInt(request.getAttribute("pubCtxMenuCounter"),-1);
  if (pubCtxMenuCounter >= 0){ %>
<ul class='ctxMenu cached click'         id='ctxPubMenu'     style='display: none;' onclick="return CtxMenuManager.ajaxCallback('PublicationCtxMenu<%= pubCtxMenuCounter %>.getCtxMenu','\'<%= channel.getProperty("ctxmenu.pub") %>\'',CtxMenuManager.fillElmClassesHook);"><li>&nbsp;</li></ul>
<ul class='ctxMenu cached click'         id='ctxMbrMenu'     style='display: none;' onclick="return CtxMenuManager.ajaxCallback('MemberCtxMenu<%= pubCtxMenuCounter %>.getCtxMenu','\'<%= channel.getProperty("ctxmenu.mbr") %>\'');"><li>&nbsp;</li></ul>
<ul class='ctxMenu cached rightclick'    id='ctxCatMenu'     style='display: none;' onclick="return CtxMenuManager.ajaxCallback('CategoryCtxMenu<%= pubCtxMenuCounter %>.getCtxMenu','\'<%= channel.getProperty("ctxmenu.cat") %>\'',Ajax.Tree.getAjaxSuffix);"><li>&nbsp;</li></ul>
<ul class='ctxMenu click'                id='ctxWidgetMenu'  style='display: none;' onclick="return CtxMenuManager.ajaxCallback('WidgetCtxMenu<%= pubCtxMenuCounter %>.getCtxMenu',false,JCMS.form.Widget.fillCtxMenuHook);"><li>&nbsp;</li></ul>
<% if (isPortalMode && isLogged) { %>
<ul class='ctxMenu cached click' id='ctxPortletMenu' style='display: none;' onclick="return CtxMenuManager.ajaxCallback('PortletCtxMenu<%= pubCtxMenuCounter %>.getCtxMenu','\'<%= channel.getProperty("ctxmenu.por") %>\'');"><li>&nbsp;</li></ul>
<% } %>
<% } %>
<%= com.jalios.jcms.taglib.LangTag.getLangFormMenu() %>
<ul class='ctxTooltip cached click idle' id='ctxTooltipMenu' style='display: none;' onclick="return CtxMenuManager.handleTooltip();"><li>&nbsp;</li></ul>
<%@ include file="/jcore/doWikiToolbar.jspf" %>
<div class="_jtD_HeaderContainer"><div class="_jtD_HeaderButton">k</div></div>