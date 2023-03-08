package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import config.Conexion;
import models.Alumno;
import models.AlumnoGrupo;

public class AlumnoDaoImpl implements CRUD<Alumno>{

	Conexion c = new Conexion();
	Connection con = null;
    PreparedStatement ps;
    ResultSet rs;

	@Override
	public List<Alumno> getAll() {
		ArrayList<Alumno> alumnos = new ArrayList<Alumno>();
		String query =  "SELECT * FROM AlumnoView";
		try{
            con = c.getConnection();
            ps = con.prepareStatement(query);
            rs = ps.executeQuery();
            while(rs.next()){
            	Alumno alumno = new Alumno();
            	alumno.setMatricula(rs.getInt("matricula"));
            	alumno.setNombre(rs.getString("nombre"));
            	alumno.setApellidoPaterno(rs.getString("apellido_paterno"));
            	alumno.setApellidoMaterno(rs.getString("apellido_materno"));
            	alumno.setUsuario(rs.getString("usuario"));
            	alumno.setEstatus(rs.getString("estatus"));
            	alumnos.add(alumno);
            }
        }catch(Exception e){
            System.out.println(e);
        }
		return alumnos;
	}

	@Override
	public Alumno getById(int id) {
		Alumno alumno = new Alumno();
		String query1 = "SELECT * FROM AlumnoView WHERE matricula="+id+";";
		String query2 = "SELECT * FROM AlumnoGrupoView WHERE matricula="+id+";";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query1);
			rs = ps.executeQuery();
			while(rs.next()){
            	alumno.setMatricula(rs.getInt("matricula"));
            	alumno.setNombre(rs.getString("nombre"));
            	alumno.setApellidoPaterno(rs.getString("apellido_paterno"));
            	alumno.setApellidoMaterno(rs.getString("apellido_materno"));
            	alumno.setUsuario(rs.getString("usuario"));
            	alumno.setEstatus(rs.getString("estatus"));
        	}
			ps = con.prepareStatement(query2);
			rs = ps.executeQuery();
			List<AlumnoGrupo> grupos = new ArrayList<AlumnoGrupo>();
            while(rs.next()){
            	AlumnoGrupo grupo = new AlumnoGrupo();
            	grupo.setCalificacion(rs.getInt("calificacion"));
            	grupo.setClave(rs.getInt("cveMateria"));
            	grupo.setIdGrupo(rs.getInt("idGrupo"));
            	grupos.add(grupo);
            }
            alumno.setGrupos(grupos);
		}catch(Exception e) {
			System.out.println(e);
		}
		return alumno;
	}
	
	public Alumno getByUsername(String usuario) {
		Alumno alumno = new Alumno();
		String query1 = "SELECT * FROM AlumnoView WHERE usuario='"+usuario+"';";
		String query2 = "SELECT * FROM AlumnoGrupoView WHERE matricula=(SELECT matricula FROM AlumnoView WHERE usuario='"+usuario+"' LIMIT 1);";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query1);
			rs = ps.executeQuery();
			while(rs.next()){
            	alumno.setMatricula(rs.getInt("matricula"));
            	alumno.setNombre(rs.getString("nombre"));
            	alumno.setApellidoPaterno(rs.getString("apellido_paterno"));
            	alumno.setApellidoMaterno(rs.getString("apellido_materno"));
            	alumno.setUsuario(rs.getString("usuario"));
            	alumno.setEstatus(rs.getString("estatus"));
        	}
			ps = con.prepareStatement(query2);
			rs = ps.executeQuery();
			List<AlumnoGrupo> grupos = new ArrayList<AlumnoGrupo>();
            while(rs.next()){
            	AlumnoGrupo grupo = new AlumnoGrupo();
            	grupo.setCalificacion(rs.getInt("calificacion"));
            	grupo.setClave(rs.getInt("cveMateria"));
            	grupo.setIdGrupo(rs.getInt("idGrupo"));
            	grupos.add(grupo);
            }
            alumno.setGrupos(grupos);
		}catch(Exception e) {
			System.out.println(e);
		}
		return alumno;
	}
	
	@Override
	public String create(Alumno alumno) {
		String query =  "CALL InsertAlumno("
						+ "" +alumno.getMatricula() 
						+ ",'" +alumno.getNombre()
						+ "','" +alumno.getApellidoPaterno()
						+ "','" +alumno.getApellidoMaterno()
						+ "','" +alumno.getUsuario()
						+ "','" +alumno.getContrasena()
						+ "'," +alumno.getEstatusAsInt()
						+ ")";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			return "exito";
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return e.getMessage();
		}
	}

	@Override
	public String update(Alumno alumno) {
		System.out.println("Estatus"+alumno.getEstatus());
		String query =  "UPDATE Usuario SET " 
				+ "nombre= '" +alumno.getNombre()
				+ "', apellido_paterno= '" +alumno.getApellidoPaterno()
				+ "', apellido_materno= '" +alumno.getApellidoMaterno()
				+ "', idEstatus=" + alumno.getEstatusAsInt()
				+ ", usuario= '" +alumno.getUsuario() + "'";
		if(alumno.getContrasena().length() >= 6) {
			query += ", contrasena='"+alumno.getContrasena() + "'";
		}
		query += " WHERE idUsuario=(SELECT idUsuario FROM Alumno Where matricula="
				+ alumno.getMatricula() 
				+ " LIMIT 1);";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate(query);
			return "exito";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	@Override
	public String delete(int id) {
		String query =  "DELETE FROM Usuario WHERE idUsuario=(SELECT idUsuario FROM Alumno WHERE matricula="+id+" LIMIT 1);";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			return "exito";
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return e.getMessage();
		}
	}
	
	
	public String inscribirGrupo(int matricula, int idGrupo) {
		String query =  "INSERT INTO AlumnoGrupo (matricula, idGrupo, calificacion) VALUES ("+matricula+","+idGrupo+", 0)";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate(query);
			return "exito";
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return "";
	}

	public String quitarGrupo(int matricula, int idGrupo) {
		String query =  "DELETE FROM AlumnoGrupo WHERE matricula="+matricula+" AND idGrupo="+idGrupo+";";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate(query);
			return "exito";
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return "";
	}
	
}