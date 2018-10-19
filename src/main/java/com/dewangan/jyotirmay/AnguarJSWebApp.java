package com.dewangan.jyotirmay;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ErrorPageErrorHandler;
import org.eclipse.jetty.webapp.WebAppContext;

import javax.servlet.DispatcherType;

import java.util.EnumSet;
import java.util.Iterator;

import static javax.servlet.DispatcherType.*;

/**
 * This class launches the web application in an embedded Jetty container.
 * This is the entry point to your application. The Java command that is used for
 * launching should fire this main method.
 */
public class AnguarJSWebApp {
    public static void main(String[] args) throws Exception {
        // The simple Jetty config here will serve static content from the webapp directory
        String webappDirLocation = "src/main/webapp/";

        // The port that we should run on can be set into an environment variable
        // Look for that variable and default to 8080 if it isn't there.
        String webPort = System.getenv("PORT");
        if (webPort == null || webPort.isEmpty()) {
            webPort = "9090";
        }
        Server server = new Server(Integer.valueOf(webPort));

        WebAppContext webapp = new WebAppContext();
        webapp.setContextPath("/");
        webapp.setDescriptor(webappDirLocation + "/WEB-INF/web.xml");
        webapp.setResourceBase(webappDirLocation);

        PageErrorHandler pageErrorHandler = new PageErrorHandler();
        pageErrorHandler.addErrorPage(404, "/");
        webapp.setErrorHandler(pageErrorHandler);


        server.setHandler(webapp);
        server.start();
        server.join();
    }
}
