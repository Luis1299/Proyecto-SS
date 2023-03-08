package controllers;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import config.TokenCheck;
import dao.TipoDaoImpl;
import models.Tipo;

/**
 * Servlet implementation class TipoController
 */
@WebServlet("/TipoController")
public class TipoController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TipoController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String token = request.getHeader("Authorization");
		if(token != null) {
			if(TokenCheck.Validate(token, "tipos")) {
				List<Tipo> tipos = new TipoDaoImpl().getAll();
				response.getWriter().append(new Gson().toJson(tipos));
			}else {
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
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
