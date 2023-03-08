package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import config.Conexion;
import models.Grupo;

public class GrupoDaoImpl implements CRUD<Grupo>{

	Conexion c = new Conexion();
	Connection con = null;
    PreparedStatement ps;
    ResultSet rs;
    
	@Override
	public List<Grupo> getAll() {
		ArrayList<Grupo> grupos = new ArrayList<Grupo>();
		String query =  "SELECT * FROM GrupoView";
		try{
            con = c.getConnection();
            ps = con.prepareStatement(query);
            rs = ps.executeQuery();
            while(rs.next()){
            	Grupo grupo = new Grupo();
            	grupo.setIdGrupo(rs.getInt("idGrupo"));
            	grupo.setClave(rs.getInt("cveMateria"));
            	grupo.setEstatus(rs.getString("estatus"));
            	grupo.setCantidadAlumnos(rs.getInt("cantidadAlumnos"));
            	grupo.setNombre(rs.getString("nombre"));
            	grupos.add(grupo);
            }
        }catch(Exception e){
            System.out.println(e);
        }
        return grupos;
	}

	public List<Grupo> getAllCounted() {
		List<Grupo> grupos = new ArrayList<Grupo>();
		String query =  "SELECT * FROM CantidadAlumnosGrupo";
		try{
            con = c.getConnection();
            ps = con.prepareStatement(query);
            rs = ps.executeQuery();
            while(rs.next()){
            	Grupo grupo = new Grupo();
            	grupo.setIdGrupo(rs.getInt("idGrupo"));
            	grupo.setClave(rs.getInt("cveMateria"));
            	grupo.setEstatus(rs.getString("estatus"));
            	grupo.setCantidadAlumnos(rs.getInt("limite"));
            	grupo.setNombre(rs.getString("nombre"));
            	grupo.setAlumnosInscritos(rs.getInt("AlumnosInscritos"));
            	grupos.add(grupo);
            }
        }catch(Exception e){
            System.out.println(e);
        }
		return grupos;
	}
	
	
	@Override
	public Grupo getById(int id) {
		return null;
	}

	@Override
	public String create(Grupo t) {
		String query = "INSERT INTO Grupo (cveMateria, cantidadAlumnos, idEstatus) VALUES("
				+ t.getClave()
				+ ", " + t.getCantidadAlumnos()
				+ ", " + t.getEstatusAsInt()
				+ ")";
		try{
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			return "exito";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	@Override
	public String update(Grupo t) {
		String query = "UPDATE Grupo SET "
				+ "cveMateria = " + t.getClave()
				+ ", cantidadAlumnos = " + t.getCantidadAlumnos()
				+ ", idEstatus = " + t.getEstatusAsInt()
				+ " WHERE idGrupo=" + t.getIdGrupo() + ";";
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
		String query = "DELETE FROM Grupo WHERE idGrupo="+id+";";
		try{
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			return "exito";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

}
