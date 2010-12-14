<%@ include file='/jcore/doInitPage.jsp' %>
<%
if (Channel.getChannel().getCurrentJcmsContext().isInFrontOffice() && channel.getProperty("kDebugTools.enable").equals("true"))
{
%>
<div class="_jtD_HeaderContainer">
<%
if (channel.getProperty("kDebugTools.using.ffox-toolbar").equals("false"))
{
%>
<div class="_jtD_HeaderButton">k</div>
<%
}
%>
</div>
<%
}
%>