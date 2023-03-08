package config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

public class TokenCheck {
	
	public static boolean Validate(String token, String ruta){
		
		token = token.replace("Bearer ", "");
		token = token.replace("\"", "");
		try {
			JWTVerifier verifier = JWT
					.require(Algorithm.HMAC256(Config.SECRET_K))
					.build();
			DecodedJWT jwt = verifier.verify(token);
			String rol = jwt.getClaim("rol").asString();
			if(rol.equals("Maestro")) {
				if(ruta == "materias" || ruta == "grupos" || ruta == "validar") {
					return true;
				}
			}
			if(rol.equals("Admin")) {
				if(ruta == "alumnos" || ruta == "maestros" || ruta == "tipos" || ruta == "validar") {
					return true;
				}
			}
			if(rol.equals("Alumno")) {
				if(ruta == "validar" || ruta == "inscripcion") {
					return true;
				}
			}
		}catch(Exception e) {
			System.out.println(e);
		}
		return false;		
	}

}
