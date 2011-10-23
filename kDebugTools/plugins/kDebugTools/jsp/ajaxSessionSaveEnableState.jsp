<%@page import="net.kprod.jdt.CStrings"%>
<%@ include file='/jcore/doInitPage.jsp' %>
<%
	Boolean stateObject = Boolean.parseBoolean(channel.getProperty(CStrings.JDT_FRONTDEBUG_ENABLE));
	Boolean newStateObject = new Boolean(!stateObject.booleanValue());
	channel.setProperty(CStrings.JDT_FRONTDEBUG_ENABLE, newStateObject.toString());
	out.println(channel.getProperty(CStrings.JDT_FRONTDEBUG_ENABLE));
%>
<%--
	Boolean stateObject = (Boolean)channel.getCurrentJcmsContext().getRequest().getSession().getAttribute(CStrings.SESSION_JDT_HIDE);
	boolean state = stateObject != null ? stateObject.booleanValue() : true;
	channel.getCurrentJcmsContext().getRequest().getSession().setAttribute(CStrings.SESSION_JDT_HIDE, !state);
	out.println(state);
--%>