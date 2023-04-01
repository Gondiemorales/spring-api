package com.gonzalodie.apidie.Controller;



import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gonzalodie.apidie.Model.Usuario;
import com.gonzalodie.apidie.Service.LoginServiceInterface;

@RestController
public class LoginController {

    @Autowired
    private LoginServiceInterface loginService;

    @GetMapping("/usuarios")
    public ResponseEntity<HashMap<String, String>> getUsuarios(){
        HashMap<String, String> usuarios = loginService.getUsuarios();
        return new ResponseEntity<HashMap<String, String>>(usuarios, HttpStatus.OK);
    }

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> postTasks(@RequestBody Usuario u){
        if(loginService.crearUsuario(u)){
            return new ResponseEntity<Usuario>(u, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Usuario>(u, HttpStatus.BAD_REQUEST);
        }
    }
}