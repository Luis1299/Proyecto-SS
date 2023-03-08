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
import dao.GrupoDaoImpl;
import models.Alumno;
import models.Grupo;

/**
 * Servlet implementation class InscripcionController
 */
@WebServlet("/InscripcionController")
public class InscripcionController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InscripcionController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "inscripcion")) {
				String param = request.getParameter("usuario");
				if(param != null) {
					AlumnoDaoImpl dao = new AlumnoDaoImpl();
					Alumno alumno = dao.getByUsername(param);
					response.getWriter().append(new Gson().toJson(alumno));
				}else {
					List<Grupo> grupos = new GrupoDaoImpl().getAllCounted();
					response.getWriter().append(new Gson().toJson(grupos));					
				}				
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
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "inscripcion")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				JsonObject json = new Gson().fromJson(body, JsonObject.class);
				JsonElement matriculajson = json.get("Matricula");
				JsonElement idgrupojson = json.get("IdGrupo");
				String result = new AlumnoDaoImpl().inscribirGrupo(matriculajson.getAsInt(), idgrupojson.getAsInt());
				if(result != "exito")
					response.sendError(409, result);
			}
		}
		doGet(request, response);
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "inscripcion")) {
				BufferedReader reader = request.getReader();
				String body = JsonHelper.getString(reader);
				JsonObject json = new Gson().fromJson(body, JsonObject.class);
				JsonElement matriculajson = json.get("Matricula");
				JsonElement idgrupojson = json.get("IdGrupo");
				System.out.println(matriculajson.getAsInt());
				System.out.println(idgrupojson.getAsInt());;
				String result = new AlumnoDaoImpl().quitarGrupo(matriculajson.getAsInt(), idgrupojson.getAsInt());
				if(result != "exito")
					response.sendError(409, result);
			}
		}
		doGet(request, response);
	}

}
