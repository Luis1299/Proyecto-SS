package models;

import java.util.List;

public class Alumno extends Usuario{
	
	private int Matricula;
	private List<AlumnoGrupo> Grupos;

	public int getMatricula() {
		return Matricula;
	}

	public void setMatricula(int matricula) {
		this.Matricula = matricula;
	}

	public List<AlumnoGrupo> getGrupos() {
		return Grupos;
	}

	public void setGrupos(List<AlumnoGrupo> grupos) {
		this.Grupos = grupos;
	}
	
	

}
