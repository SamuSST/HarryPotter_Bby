function generarLista(arrayMagos) {
    let listaHTML = "";
    for (let i = 0; i < arrayMagos.length; i++) {
        let item = arrayMagos[i];
        let id = item.id;
        let img = item.image ? item.image : "https://via.placeholder.com/96x96?text=No+Image";
        listaHTML += `
        <div class="c-lista-mago mago-${id}" onclick="Mago('${id}')">
            <img src="${img}" height="80" loading="lazy" alt="${item.name}">
            <p class="nombre-mago">${item.name}</p>
            ${item.house ? `<p class="casa-mago">${item.house}</p>` : ""}
        </div>`;
    }

    return listaHTML;
}

window.Home = async function Home(){
    const root = document.getElementById("root");
    if(root) root.innerHTML = "";

    // header ambientado
    const header = document.createElement("div");
    header.className = "header";
    header.innerHTML = `<h1>MagosDex</h1><p class="sub">Enciclopedia del mundo mágico</p>`;

    // buscador
    var buscador = document.createElement("div");
    buscador.id = "buscador";
    buscador.innerHTML = `<input id="search" placeholder="Buscar mago..." oninput="FiltrarBusqueda(this.value)" />`;

    // filtro simple por casas
    var contenedorFiltro = document.createElement("div");
    contenedorFiltro.id = "filtros";
    contenedorFiltro.innerHTML = `
        <button onclick="FiltroConexion('All')">All</button>
        <button onclick="FiltroConexion('Gryffindor')">Gryffindor</button>
        <button onclick="FiltroConexion('Slytherin')">Slytherin</button>
        <button onclick="FiltroConexion('Ravenclaw')">Ravenclaw</button>
        <button onclick="FiltroConexion('Hufflepuff')">Hufflepuff</button>
    `;

    //contenedor
    const listaHTML = generarLista(magos);
    var contenedorMagos = document.createElement("section");
    contenedorMagos.id = "la-lista";
    contenedorMagos.innerHTML = listaHTML;

    root.appendChild(header);
    root.appendChild(buscador);
    root.appendChild(contenedorFiltro);
    root.appendChild(contenedorMagos);
};

window.FiltrarBusqueda = function FiltrarBusqueda(q){
    q = q.toLowerCase();
    const results = magos.filter(p => p.name && p.name.toLowerCase().includes(q));
    const listaEl = document.getElementById("la-lista");
    if(listaEl) listaEl.innerHTML = generarLista(results);
};