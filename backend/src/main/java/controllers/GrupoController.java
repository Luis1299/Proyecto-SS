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
import dao.GrupoDaoImpl;
import models.Grupo;

/**
 * Servlet implementation class GrupoController
 */
@WebServlet("/GrupoController")
public class GrupoController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GrupoController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "grupos")) {
				List<Grupo> grupos = new GrupoDaoImpl().getAll();
				response.getWriter().append(new Gson().toJson(grupos));
			}else {
				response.sendError(401, "Token no valido");
			}
		}else {
			response.sendError(401, "Token no valido");
		}
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "grupos")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				Grupo json = new Gson().fromJson(body, Grupo.class);
				GrupoDaoImpl dao = new GrupoDaoImpl();
				String result = dao.create(json);
				if(result != "exito") 
					response.sendError(409, result);
			}else {
				response.sendError(401, "Token no valido");
			}
		}
		doGet(request, response);
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "grupos")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				Grupo json = new Gson().fromJson(body, Grupo.class);
				GrupoDaoImpl dao = new GrupoDaoImpl();
				String result = dao.update(json);
				if(result != "exito") 
					response.sendError(409, result);
			}
		}
		doGet(request, response);
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "grupos")) {		
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				JsonObject json = new Gson().fromJson(body, JsonObject.class);
				int cve = json.get("IdGrupo").getAsInt();
				GrupoDaoImpl dao = new GrupoDaoImpl();
				String result = dao.delete(cve);
				if(result != "exito") 
					response.sendError(409, result);
			}
		}
		doGet(request, response);
	}

}
