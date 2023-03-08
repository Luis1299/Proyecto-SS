package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import config.Conexion;
import models.Maestro;
import models.Tipo;

public class MaestroDaoImpl implements CRUD<Maestro>{

	Conexion c = new Conexion();
	Connection con = null;
    PreparedStatement ps;
    ResultSet rs;
	
	@Override
	public List<Maestro> getAll() {
		List<Maestro> maestros = new ArrayList<Maestro>();
		String query = "SELECT * FROM MaestroView;";
		try {			
			con = c.getConnection();
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				Maestro maestro = new Maestro();
				maestro.setNoEmpleado(rs.getInt("noEmpleado"));
				Tipo tipo = new Tipo();
				tipo.setTipo(rs.getString("tipo"));
				tipo.setIdTipo(rs.getInt("idTipo"));
				maestro.setTipo(tipo);
				maestro.setNombre(rs.getString("nombre"));
				maestro.setApellidoPaterno(rs.getString("apellido_paterno"));
				maestro.setApellidoMaterno(rs.getString("apellido_materno"));
				maestro.setUsuario(rs.getString("usuario"));
				maestro.setEstatus(rs.getString("estatus"));
				maestros.add(maestro);
			}
		}catch(Exception e) {
			System.out.println(e);
		}
		return maestros;
	}

	@Override
	public Maestro getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String create(Maestro t) {
		String query =  "CALL InsertMaestro("
				+ "" +t.getNoEmpleado() 
				+ ",'" +t.getNombre()
				+ "','" +t.getApellidoPaterno()
				+ "','" +t.getApellidoMaterno()
				+ "','" +t.getUsuario()
				+ "','" +t.getContrasena()
				+ "'," +t.getEstatusAsInt()
				+ "," +t.getTipo().getIdTipo()
				+ ")";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			return "exito";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	@Override
	public String update(Maestro t) {
		System.out.println("Estatus"+t.getEstatus());
		String query =  "UPDATE Usuario SET " 
				+ "nombre= '" +t.getNombre()
				+ "', apellido_paterno= '" +t.getApellidoPaterno()
				+ "', apellido_materno= '" +t.getApellidoMaterno()
				+ "', idEstatus=" + t.getEstatusAsInt()
				+ ", usuario= '" +t.getUsuario() + "'";
		if(t.getContrasena() != null && t.getContrasena().length() >= 6) {
			query += ", contrasena='"+t.getContrasena() + "'";
		}
		query += " WHERE idUsuario=(SELECT idUsuario FROM Maestro Where noEmpleado="
				+ t.getNoEmpleado() 
				+ " LIMIT 1);";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate(query);
			query = "UPDATE Maestro SET idTipo="+t.getTipo().getIdTipo()+" WHERE noEmpleado="+t.getNoEmpleado()+" ;";
			ps = con.prepareStatement(query); 
			ps.executeUpdate(query);
			return "exito";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

	@Override
	public String delete(int id) {
		System.out.println("borrar: " + id);
		String query =  "CALL DeleteMaestro("+id+");";
		try {
			con = c.getConnection();
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			return "exito";
		}catch(Exception e) {
			return e.getMessage();
		}
	}

}
