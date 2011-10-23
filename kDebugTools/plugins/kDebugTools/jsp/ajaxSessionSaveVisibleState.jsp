<%@page import="net.kprod.jdt.CStrings"%>
<%@ include file='/jcore/doInitPage.jsp' %>
<%
	Boolean stateObject = Boolean.parseBoolean(channel.getProperty(CStrings.JDT_FRONTDEBUG_VISIBLE));
	Boolean newStateObject = new Boolean(!stateObject.booleanValue());
	channel.setProperty(CStrings.JDT_FRONTDEBUG_VISIBLE, newStateObject.toString());
	out.println(channel.getProperty(CStrings.JDT_FRONTDEBUG_VISIBLE));
%>
