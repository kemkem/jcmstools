<%--
  @Summary: Initialize JCMS jsp page
  @Category: Internal
  @Author: Oliver Dedieu, Jean-Philippe Encausse, Olivier Jaquemet
  @Copyright: Jalios SA
  @Customizable: False
  @Requestable: False
  @Deprecated: False
  @Since: jcms-2.0 
--%><%--
--%><%@ page import="custom.*,generated.*, com.jalios.jcms.*, com.jalios.jcms.policy.*, com.jalios.jcms.rest.*, com.jalios.jcms.accessibility.*, com.jalios.jcms.db.*, com.jalios.jcms.dbmember.*, com.jalios.jcms.plugin.*, com.jalios.jcms.caddy.*, com.jalios.jcms.widget.*, com.jalios.jcms.context.*, com.jalios.jcms.stat.*, com.jalios.jcms.stat.listener.*, com.jalios.jcms.stat.beautifier.*, com.jalios.jcms.workspace.*, com.jalios.jcms.ajax.*, com.jalios.jcms.archive.*, com.jalios.jcms.portlet.*, com.jalios.util.*, com.jalios.util.diff.*, java.io.*, java.util.*, java.text.*, java.net.*,org.apache.log4j.Logger,org.apache.log4j.Level,org.apache.log4j.NDC,org.jabsorb.*" %><%--
--%><%@ page autoFlush="true" isThreadSafe="true"  %><%-- @ page errorPage="front/error.jsp" --%><%--
--%><%@ taglib uri="jcms.tld" prefix="jalios" %><%--
--%><%!
  Channel channel;
  Logger logger;

  public void jspInit() {
   ServletContext context = getServletConfig().getServletContext();
   channel = Channel.getChannel();
    org.apache.log4j.MDC.put("ChannelName", (channel != null) ? channel.getName(): "JCMS");
   // logger name: /subdir/my.jsp ==> jsp.subdir.my_jsp
   // on some application server (oracle, resin3, getServletName() is not available and/or getServletConfig().getServletName() returns "jsp", so check this to initialize a logger anyway
   String loggerName = getServletConfig().getServletName();
   if (Util.isEmpty(loggerName) || loggerName.equals("jsp")) {
     loggerName = "jsp." + Util.getClassShortName(this);
   } else {
     loggerName = "jsp" + loggerName.replace('.', '_').replace('/', '.');
   }
   logger = Logger.getLogger(loggerName);
   logger.debug("jsp initialized");
  }
  public void jspDestroy() {
    NDC.remove(); // won't be needed with log4j 1.3
  }
  
%><%-- ------------------------------------------------------- --%><%

  final boolean initDone = Util.toBoolean(request.getAttribute("initDone"), false);
  AjaxRequestWrapper.useFakeRequest(true); // Do not set Attributes !!!
  
  // Configuring Logging
  if (!initDone) {
    if (logger.isDebugEnabled()) {
      logger.debug("==> " + ServletUtil.getUrl(request, false));
    }
    // Servlet 2.4 only use setContentType instead allow the content type
    // to be modified using the request attribute "ContentType"
    //   response.setCharacterEncoding("UTF-8");
    response.setContentType(Util.getString(request.getAttribute("ContentType"), "text/html; charset=UTF-8"));
    request.setCharacterEncoding("UTF-8");
  }

%><%@ include file='/jcore/profiler/doInitProfiler.jsp' %><%

  // Find the JSONRPCBridge for this session initialised in InitFilter
  JSONRPCBridge json_bridge = (JSONRPCBridge) request.getSession().getAttribute("JSONRPCBridge");

  // Register JcmsJSONUtil
  if (json_bridge != null && request.getAttribute("loggedMember") != null) {
    json_bridge.registerClass("JcmsJSONUtil", com.jalios.jcms.ajax.JcmsJSONUtil.class);
  }

  final long  startPageRequest   = System.currentTimeMillis(); 

%><%@ include file="/jcore/doInitFunc.jsp" %><%
%><%@ include file="/jcore/doInitMember.jsp" %><%

  if (!initDone) {
    request.setAttribute("JALIOS_STATTHISPAGE", "true");
  }
  
  String  contextPath         = ServletUtil.getContextPath(request);
  String  requestUrl          = ServletUtil.getUrl(request);
  boolean debug               = (request.getParameter("debug") != null);
  boolean inFO                = Util.toBoolean(request.getAttribute("inFO"),false);
  
%><%@ include file="/work/workspace/doInitWorkspace.jsp" %><%

  final JcmsJspContext jcmsContext;
  if (!initDone) {
    jcmsContext = new JcmsJspContext(pageContext);
    request.setAttribute("jcmsContext",jcmsContext); 
    channel.setCurrentServletRequest(request);
  }
  else{
    jcmsContext = (JcmsJspContext) request.getAttribute("jcmsContext");
  }
  Browser clientBrowser  = jcmsContext.getBrowser();
  
%><%@ include file="/jcore/portal/doInitPortal.jsp" %><%
%><%@ include file="/jcore/doInitAjax.jspf"         %><%
%><%@ include file="/custom/jcms/doInitCustom.jsp"  %><%

  if (!initDone) {
    request.setAttribute("initDone", Boolean.TRUE);
  }
	
	
%>

<%-- This includes kDebugTools, can be deleted --%>
<%@ include file="/plugins/kDebugTools/jsp/debug.jsp" %>
<%-- ------------------------------------------ --%>