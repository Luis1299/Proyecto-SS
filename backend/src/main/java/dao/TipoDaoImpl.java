package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import config.Conexion;
import models.Tipo;

public class TipoDaoImpl implements CRUD<Tipo>{
	
	Conexion c = new Conexion();
	Connection con = null;
    PreparedStatement ps;
    ResultSet rs;
    
	@Override
	public List<Tipo> getAll() {
		ArrayList<Tipo> tipos = new ArrayList<Tipo>();
		String query =  "SELECT * FROM Tipo";
		try{
            con = c.getConnection();
            ps = con.prepareStatement(query);
            rs = ps.executeQuery();
            while(rs.next()){
            	Tipo tipo = new Tipo();
            	tipo.setIdTipo(rs.getInt("idTipo"));
            	tipo.setTipo(rs.getString("tipo"));            	
            	tipos.add(tipo);
            }
        }catch(Exception e){
            System.out.println(e);
        }
		return tipos;
	}

	@Override
	public Tipo getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String create(Tipo t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String update(Tipo t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String delete(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
