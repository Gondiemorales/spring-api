package com.gonzalodie.apidie.Service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.gonzalodie.apidie.Model.Usuario;

@Service
public class LoginServiceInterface {

    private HashMap<String, String> usuarios = new HashMap<>();

  
    public boolean crearUsuario(Usuario u) {
        if(usuarios.containsKey(u.getNombre())){
            return false;
        }
        else{
            usuarios.put(u.getNombre(), u.getContraseña());
            return true;
        }
    }

  
    public boolean verificarCredenciales(String nombre, String contraseña) {
        if(!usuarios.containsKey(nombre)){
            return false;
        }
        else{
            String contraseñaGuardada = usuarios.get(nombre);
            if(!contraseñaGuardada.equals(contraseña)){
                return false;
            }
            else{
                return true;
            }
        }
    }
    
    
    public HashMap<String, String> getUsuarios() {
        return usuarios;
    }
}