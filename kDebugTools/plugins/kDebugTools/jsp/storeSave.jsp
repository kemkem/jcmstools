<%@ page import="net.kprod.kdebug.storeReader"%>

<a href="jcms/WEB-INF/data/store.xml">here</a>

<%
	storeReader reader = new storeReader();
	reader.read(out);
%>