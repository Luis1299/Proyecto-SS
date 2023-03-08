package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import config.Conexion;
import models.Materia;

public class MateriaDaoImpl implements CRUD<Materia>{

	Conexion c = new Conexion();
	Connection con = null;
    PreparedStatement ps;
    ResultSet rs;
	
	@Override
	public List<Materia> getAll() {
		ArrayList<Materia> materias = new ArrayList<Materia>();
		String query =  "SELECT * FROM MateriaView ORDER BY cveMateria;";
		try{
            con = c.getConnection();
            ps = con.prepareStatement(query);
            rs = ps.executeQuery();
            while(rs.next()){
            	Materia materia = new Materia();
            	materia.setClave(rs.getInt("cveMateria"));
            	materia.setNombre(rs.getString("nombre"));
            	materia.setEstatus(rs.getString("estatus"));
            	materias.add(materia);
            }
    		return materias;
        }catch(Exception e){
            System.out.println(e);
        }
		
		return null;
	}

	@Override
	public Materia getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String create(Materia t) {
		String query = "INSERT INTO Materia (idEstatus, cveMateria, nombre) VALUES ("
				+ t.getEstatusAsInt()
				+ ", " + t.getClave()
				+ ", '" + t.getNombre()
				+ "')";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			return "exito";
		}catch(Exception e) {
			System.out.println(e);
		}
		return "";
	}

	@Override
	public String update(Materia t) {
		String query =  "UPDATE Materia SET " 
				+ "nombre= '" + t.getNombre()
				+ "', idEstatus=" + t.getEstatusAsInt() 
				+ " WHERE cveMateria=" + t.getClave();
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate(query);
			return "exito";
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return e.toString();
		}
	}

	@Override
	public String delete(int id) {
		String query = "DELETE FROM Materia WHERE cveMateria="+id+";";	
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			return "exito";
		}catch(Exception e) {
			System.out.println(e);
		}
		return "";
	}
	
		

}
