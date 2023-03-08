package models;

public class Grupo extends Materia{
	
	private int IdGrupo;
	private int CantidadAlumnos = 0;
	
	private int AlumnosInscritos = 0;

	public int getCantidadAlumnos() {
		return CantidadAlumnos;
	}

	public void setCantidadAlumnos(int cantidadAlumnos) {
		this.CantidadAlumnos = cantidadAlumnos;
	}

	public int getIdGrupo() {
		return IdGrupo;
	}

	public void setIdGrupo(int idGrupo) {
		IdGrupo = idGrupo;
	}

	public int getAlumnosInscritos() {
		return AlumnosInscritos;
	}

	public void setAlumnosInscritos(int alumnosInscritos) {
		AlumnosInscritos = alumnosInscritos;
	}
	
	
}
