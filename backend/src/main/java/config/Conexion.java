package config;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {
	
	Connection con = null;
    private String url = "//localhost:3306/";
    private String database = "SSTEST";
    private String sqlString = "jdbc:mysql:"+url+database;
    private String user = "root";
    private String password = "147852";
    
    public Conexion(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(sqlString, user, password);
        }catch(Exception e){
            System.out.println(e);
        }
    }
    
    public Connection getConnection(){
        return con;
    }

}
