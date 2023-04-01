function crearCuenta() {
    
    // Obtener los valores del formulario
    const username = document.getElementById("nombre").value;
    const password = document.getElementById("contraseña").value;

    // Comprobar si el nombre de usuario ya existe
   

   
    
    // Crear un objeto usuario
    const usuario = {
      "nombre": username,
      "contraseña": password
    };
  
    // Realizar una solicitud POST para agregar el usuario
    fetch("/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    })
      .then(response => {
        if (response.ok) {
          // Si la respuesta es exitosa, ocultar el formulario de registro y mostrar el formulario de inicio de sesión
          hideRegistroForm();
        } else {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // El usuario ha sido agregado exitosamente
        console.log(data);
        window.location.href = "./login.html";
      })
      .catch(error => {
        if (error.message === "Failed to fetch") {
          const errorMessage2 = document.getElementById("error-message2");
          errorMessage2.textContent = "¡El servidor está caído!";
          errorMessage2.style.color = "red";
        }
      });
  };


function getUsuarios(){
        fetch('/usuarios')
          .then(response => response.json())
          .then(data => {
            console.log(data); // aquí puedes hacer lo que necesites con la respuesta
          })
          .catch(error => console.error(error));
      
}

function showRegistroForm() {
    // Oculta el formulario de inicio de sesión
    document.querySelector('.form-container').style.display = 'none';
  
    // Muestra el formulario de registro
    document.querySelector('.registro-form').style.display = 'block';
  }

  function hideRegistroForm() {
    document.querySelector(".registro-form").style.display = "none";
    document.querySelector(".form-container").style.display = "block";
  }

  

  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/usuarios")
        .then(response => response.json())
        .then(data => {
            let credentialsValid = false;
            for (const [key, value] of Object.entries(data)) {
                if (key === username && value === password) {
                    credentialsValid = true;
                    break;
                }
            }

            if (credentialsValid) {
                // Las credenciales son correctas, hacer algo aquí
                console.log("Credenciales correctas");
                window.location.href = "./api.html";
            } else {
              console.error("Credenciales incorrectas");
              const passwordInput = document.getElementById("password");
              passwordInput.classList.add("error");
              const errorMessage = document.getElementById("error-message");
              errorMessage.textContent = "¡Algo ha ido mal!";
              errorMessage.style.color = "red";
            }
        })
        .catch(error => {
          console.error(error);
          if (error.message === "Failed to fetch") {
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = "¡El servidor está caído!";
            errorMessage.style.color = "red";
          } else {
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = "¡Algo ha ido mal!";
            errorMessage.style.color = "red";
          } 
        });
}