const input = document.querySelector(".input-api");
const boton = document.querySelector(".boton-api");
const pokemonContainer = document.querySelector(".pokemon-api");
const pokedex = {};




boton.addEventListener('click', (e)=>{
  e.preventDefault();
  const pokemonName = input.value.toLowerCase();
  console.log(pokedex);
   if (pokedex[pokemonName]) {
    input.classList.add('duplicate');
    setTimeout(() => {
      input.classList.remove('duplicate');
    }, 1000);
  } else {
    getPokemon(pokemonName);
    pokedex[pokemonName] = true;
  }
}

  );


function getPokemon(pokemon){

  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/')
  .then( res => res.json())
  .then( datos => {
    crearPokemon(datos);
    console.log(datos);
  });
}


function crearPokemon(pokemon){

  const img = document.createElement('img');
  img.src = pokemon.sprites.front_default;
  img.addEventListener('click', () => cambiarImagen(img, pokemon.sprites.back_default, pokemon.sprites.front_default));

  img.addEventListener("mouseover", () => {
    img.style.cursor = "pointer";
  });

  img.addEventListener("mouseout", () => {
    img.style.cursor = "default";
  });
  

  const nombre = document.createElement('h3');
  nombre.textContent = pokemon.name;
  

  const div1 = document.createElement('div');
  div1.classList.add('pokemon');

  const div2 = document.createElement('div');
  div2.classList.add('pokemon-info');
  div2.style.display = 'none';
  div2.style.flexDirection = 'column';



  const btnMostrarInfo = document.createElement('button');
  btnMostrarInfo.textContent = 'Mostrar información adicional';
  btnMostrarInfo.classList.add('boton-info');
  btnMostrarInfo.addEventListener('click', () => mostrarInformacionAdicional(div2, pokemon));





  div1.appendChild(img);
  div1.appendChild(nombre);
  div1.appendChild(btnMostrarInfo);
  div1.appendChild(div2);


  pokemonContainer.appendChild(div1);


}

function mostrarInformacionAdicional(contenedor, pokemon) {

  contenedor.innerHTML = '';

  const height = document.createElement('p');
  height.textContent = 'Altura: ' + pokemon.height + "0 cm";

  const habilidades = document.createElement('p');
  habilidades.textContent = "Habilidades: ";
  const habilidadeslista = pokemon.abilities;
  for (let i = 0; i < habilidadeslista.length; i++) {
    const habilidad = habilidadeslista[i].ability;
    const nombreHabilidad = habilidad.name;
    habilidades.textContent += nombreHabilidad + " ";}

  const xp = document.createElement('p');
  xp.textContent = 'Xp: ' + pokemon.base_experience;

  const btnOcultarInfo = document.createElement('button');
  btnOcultarInfo.textContent = 'Ocultar información adicional';
  btnOcultarInfo.classList.add('boton-info');
  btnOcultarInfo.addEventListener('click', () => ocultarInformacionAdicional(contenedor));

  contenedor.appendChild(height);
  contenedor.appendChild(habilidades);
  contenedor.appendChild(xp);
  contenedor.appendChild(btnOcultarInfo);

  contenedor.style.display = 'block';
}

function ocultarInformacionAdicional(contenedor) {
  contenedor.style.display = 'none';
}

function cambiarImagen(img, imagenFrontalUrl, imagenTraseraUrl) {
  if (img.src === imagenFrontalUrl) {
    img.src = imagenTraseraUrl;
  } else {
    img.src = imagenFrontalUrl;
  }
}

