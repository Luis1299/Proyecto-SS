package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import config.Conexion;
import config.Config;
import models.Login;

public class LoginDaoImpl extends Login{
	
	Conexion c = new Conexion();
	Connection con = null;
    PreparedStatement ps;
    ResultSet rs;
	
	public Login login() {
		String query =  "SELECT Login('"+this.getUsuario()+"', '"+this.getContrasena()+"')";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			if(rs.next()) {
				int result = rs.getInt(1);
				System.out.println(result);
				if(result == 1) {
					this.setRol("Alumno");
					this.setContrasena("");
				}else if(result == 2) {
					this.setRol("Maestro");
					this.setContrasena("");
				}else if(result == 3) {
					this.setRol("Admin");
					this.setContrasena("");
				}else if(result == 0) {
					return new Login();
				}
			}
		}catch(Exception e) {
			System.out.println(e);
			return new Login();
		}
		String token = generarToken(this.getUsuario(), this.getRol());
		if(token == "") {
			return new Login();
		}
		Login login = new Login();
		login.setRol(this.getRol());
		login.setToken(token);
		login.setUsuario(this.getUsuario());
		return login;
	}

	
	public String generarToken(String usuario, String rol) {
		String KEY = Config.SECRET_K;
		long stamp = System.currentTimeMillis();
		String token = "";
		try {
			token = JWT.create()
					.withIssuedAt(new Date(stamp))
					.withExpiresAt(new Date(stamp+15*60*1000))
					.withClaim("rol", rol)
					.sign(Algorithm.HMAC256(KEY));
		} catch (Exception e) {
			System.out.println(e);
		}
		return token;
	}
	
	
}
