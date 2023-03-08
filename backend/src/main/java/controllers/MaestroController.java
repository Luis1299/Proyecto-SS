package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import config.JsonHelper;
import config.TokenCheck;
import dao.MaestroDaoImpl;
import models.Maestro;

/**
 * Servlet implementation class MaestroController
 */
@WebServlet("/MaestroController")
public class MaestroController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MaestroController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "maestros")) {
				List<Maestro> maestros = new MaestroDaoImpl().getAll();
				response.getWriter().append(new Gson().toJson(maestros));
			} else {
			response.sendError(401, "Token no valido");
			}	
		}else {
			response.sendError(401, "Token no valido");
		}
		//response.getWriter().append(new Gson().toJson(null));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "maestros")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				Maestro maestro = new Gson().fromJson(body, Maestro.class);
				MaestroDaoImpl dao = new MaestroDaoImpl();
				String result = dao.create(maestro);
				if(!result.equals("exito")) {
					response.sendError(409, result);
				}
			}else {
				response.sendError(401, "Token no valido");
			}
		}	
		doGet(request, response);
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "maestros")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				Maestro maestro = new Gson().fromJson(body, Maestro.class);
				MaestroDaoImpl dao = new MaestroDaoImpl();
				String result = dao.update(maestro);
				if(result != "exito")
					response.sendError(409, result);
			}else {
				response.sendError(401, "Token no valido");
			}
		}
		doGet(request, response);
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "maestros")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				JsonObject json = new Gson().fromJson(body, JsonObject.class);
				int cve = json.get("NoEmpleado").getAsInt();
				MaestroDaoImpl dao = new MaestroDaoImpl();
				String result = dao.delete(cve);
				if(result != "exito")
					response.sendError(409, result);
			}else {
				response.sendError(401, "Token no valido");
			}
		}
		doGet(request, response);
	}
	
}
