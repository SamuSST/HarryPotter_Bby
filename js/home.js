function generarLista(arraypokemones) {
    let listaHTML = "";
    for (let i = 0; i < arraypokemones.length; i++) {
        let item = arraypokemones[i];
        let id = item.id;
        let img = item.image ? item.image : "https://via.placeholder.com/96x96?text=No+Image";
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="Pokemon('${id}')">
            <p>#${id}</p>
            <img src="${img}" height="60" loading="lazy" alt="${item.name}">
            <p>${item.name}</p>
        </div>`;
    }

    console.log(listaHTML)
    return listaHTML;
}

window.Home = async function Home(){
    document.getElementById("root").innerHTML = ""
    // buscador
    var buscador = document.createElement("div")
    buscador.id = "buscador"
    buscador.innerHTML = `<input id="search" placeholder="Buscar personaje..." oninput="FiltrarBusqueda(this.value)" />`

    // filtro simple por casas
    var contenedorFiltro = document.createElement("div")
    contenedorFiltro.id = "filtros"
    contenedorFiltro.innerHTML = `
        <button onclick="FiltroConexion('All')">All</button>
        <button onclick="FiltroConexion('Gryffindor')">Gryffindor</button>
        <button onclick="FiltroConexion('Slytherin')">Slytherin</button>
        <button onclick="FiltroConexion('Ravenclaw')">Ravenclaw</button>
        <button onclick="FiltroConexion('Hufflepuff')">Hufflepuff</button>
    `

    //contenedor
    const listaHTML = generarLista(pokemones);
    var contenedorPokes = document.createElement("Section")
    contenedorPokes.id = "la-lista"
    contenedorPokes.innerHTML = listaHTML;

    document.getElementById("root").appendChild(buscador)
    document.getElementById("root").appendChild(contenedorFiltro)
    document.getElementById("root").appendChild(contenedorPokes)
};

window.FiltrarBusqueda = function FiltrarBusqueda(q){
    q = q.toLowerCase();
    const results = pokemones.filter(p => p.name && p.name.toLowerCase().includes(q));
    document.getElementById("la-lista").innerHTML = generarLista(results);
}