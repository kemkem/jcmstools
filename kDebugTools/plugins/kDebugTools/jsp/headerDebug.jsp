<%@ include file='/jcore/doInitPage.jsp' %>
<%@page import="net.kprod.jdt.CStrings"%>

<%
jcmsContext.addCSSHeader("plugins/kDebugTools/css/jdtFrontDebug.css");
jcmsContext.addJavaScript("plugins/kDebugTools/js/jdtFrontDebug.js");

if (Boolean.parseBoolean(channel.getProperty(CStrings.JDT_FRONTDEBUG_ENABLE)))
{
%>
<div class="_jdt_HeaderContainer">

<a id="idJdtDisableButton" href="#">disable</a>
<a id="idJdtVisibleButton" href="#">visible</a>
</div>
<%
}
%>