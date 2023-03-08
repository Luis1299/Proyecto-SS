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
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import config.JsonHelper;
import config.TokenCheck;
import dao.AlumnoDaoImpl;
import models.Alumno;

/**
 * Servlet implementation class AlumnosController
 */
@WebServlet("/AlumnosController")
public class AlumnosController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public AlumnosController() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "alumnos")) {		
				AlumnoDaoImpl daoimpl = new AlumnoDaoImpl();
				if(request.getParameter("matricula") != null) {
					Alumno alumno = daoimpl.getById(Integer.parseInt(request.getParameter("matricula")));
					response.getWriter().append(new Gson().toJson(alumno));
				}else {
					List<Alumno> alumnos = daoimpl.getAll();
					response.getWriter().append(new Gson().toJson(alumnos));
				}
			}else {
				response.sendError(401, "Token no valido");
			}
		}else {
			response.sendError(401, "Token no valido");
		}
		// response.getWriter().append(new Gson().toJson(null));
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "alumnos")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				Alumno json = new Gson().fromJson(body, Alumno.class);
				AlumnoDaoImpl alumnodao = new AlumnoDaoImpl();
				String result = alumnodao.create(json);
				if(result != "exito") {
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
			if(TokenCheck.Validate(token, "alumnos")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				Alumno json = new Gson().fromJson(body, Alumno.class);
				AlumnoDaoImpl alumnodao = new AlumnoDaoImpl();
				String result = alumnodao.update(json);
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
			if(TokenCheck.Validate(token, "alumnos")) {		
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				JsonObject json = new Gson().fromJson(body, JsonObject.class);
				JsonElement matriculajson = json.get("Matricula");
				int matricula = matriculajson.getAsInt();
				AlumnoDaoImpl alumnodao = new AlumnoDaoImpl();
				String result = alumnodao.delete(matricula);
				if(result != "exito")
					response.sendError(409, result);
			}else {
				response.sendError(401, "Token no valido");
			}
		}
		doGet(request, response);

	}
	
}
