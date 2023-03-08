package models;

public class Estatus {
	private String Estatus = "Activo";
	
	public void setEstatus(String Estatus) {
		this.Estatus = Estatus;
	}
	
	public String getEstatus() {
		return this.Estatus;
	}
	
	public int getEstatusAsInt() {
		if(this.Estatus.equalsIgnoreCase("Activo")) {
			return 1;
		}
		return 2;
	}

}
