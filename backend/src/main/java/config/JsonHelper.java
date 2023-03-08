package config;

import java.io.BufferedReader;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class JsonHelper<T> {
	
	public static String getString(BufferedReader reader){
		String line = null;
		String body = "";
		try {
			while((line=reader.readLine()) != null) {
				body += line;
			}
		} catch (IOException e) {
			return body;
		}
		return body;
	}
	
	public static JsonObject getJsonObject(BufferedReader reader) {
		String body = getString(reader);
		return new Gson().fromJson(body, JsonObject.class);
	}
	
}
