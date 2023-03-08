package models;

public class Maestro extends Usuario{
	
	private int NoEmpleado;
	private Tipo Tipo;
	
	public int getNoEmpleado() {
		return NoEmpleado;
	}
	
	public void setNoEmpleado(int noEmpleado) {
		NoEmpleado = noEmpleado;
	}
	
	public Tipo getTipo() {
		return Tipo;
	}
	
	public void setTipo(Tipo tipo) {
		this.Tipo = tipo;
	}
	
}
