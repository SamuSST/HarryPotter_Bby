function generarLista(arraypokemones) {
    let listaHTML = "";
    for (let i = 0; i < arraypokemones.length; i++) { 
        let id = arraypokemones[i].url.split("/")[6]; //id es igual al numero de la vuelta que da el for
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="Pokemon('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${arraypokemones[i].name}">
            <p>${arraypokemones[i].name}</p>
        </div>`;
    }

    console.log(listaHTML)
    return listaHTML;
}



function buscadorfuncion(sza){
    if(sza.length >= 3){
        const filtrados = [];
        for (let i = 0; i < pokemones.length; i++) {
            const nombre = pokemones[i].name.toLowerCase();
            if (nombre.includes(sza.toLowerCase())) {
                filtrados.push(pokemones[i]);
            }
        }
        let listaHTML = generarLista(filtrados)
        document.getElementById("la-lista").innerHTML = listaHTML;
    }else{
        let listaHTML = generarLista(pokemones)
        document.getElementById("la-lista").innerHTML = listaHTML;
    }
}

function Home(){
  //buscador crear una constante que se va llamar buscador  
    const buscador = document.createElement("input");//agrega una clase
    buscador.classList.add("c-buscador");//agrega un atributo tipo texto
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", () => { //evento de tipo input que si se escribe algo pasa al buscador
            buscadorfuncion(buscador.value);
    });

        //contenedor filtro
    const tipos = [
        "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
        "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice",
        "dragon", "dark", "fairy", "stellar", "unknown"
    ];

    const contenedorFiltro = document.createElement("section");
    contenedorFiltro.classList.add("tipos-container"); 

    for (let i = 0; i < tipos.length; i++) {
        const btn = document.createElement("button");//cree un boton por cada ciclo
        btn.textContent = tipos[i]; 
        
        // Agregar el evento click para filtrar por tipo
        btn.addEventListener("click", () => {
            FiltroConexion(tipos[i]); 
        });

        // Agregar el botón al contenedor
        contenedorFiltro.appendChild(btn);
    }
   

    //contenedor
    const listaHTML = generarLista(pokemones);
    var contenedorPokes = document.createElement("Section")
    contenedorPokes.id = "la-lista"
    contenedorPokes.innerHTML = listaHTML;




    document.getElementById("root").appendChild(buscador)
    document.getElementById("root").appendChild(contenedorFiltro)
    document.getElementById("root").appendChild(contenedorPokes)
};