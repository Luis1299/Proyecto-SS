package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import config.JsonHelper;
import config.TokenCheck;
import dao.LoginDaoImpl;
import models.Login;

/**
 * Servlet implementation class LoginController
 */
@WebServlet("/LoginController")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BufferedReader reader = request.getReader();
		String body = JsonHelper.getString(reader);
		String token = new Gson().fromJson(body, JsonObject.class).get("token").toString();
		boolean result = TokenCheck.Validate(token, "validar");
		response.getWriter().append("" + result);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BufferedReader reader = request.getReader();
		String body = JsonHelper.getString(reader);
		JsonObject login = new Gson().fromJson(body, JsonObject.class);
		LoginDaoImpl dao = new LoginDaoImpl();
		dao.setUsuario(login.get("Usuario").getAsString());
		dao.setContrasena(login.get("Contrasena").getAsString());
		Login result = dao.login();
		if(result.getRol() == "") {
			response.sendError(403, "No hay usuario con esas credenciales");
		}else {
			response.getWriter().append(new Gson().toJson(result));
		}
	}

}
