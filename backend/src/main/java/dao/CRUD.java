package dao;

import java.util.List;

public interface CRUD<T> {
    
    List<T> getAll();
    T getById(int id);
    String create(T t);
    String update(T t);
    String delete(int id);
    
	
}
