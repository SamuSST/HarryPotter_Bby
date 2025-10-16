async function Pokemon(id){
    // Revisar si este personaje ya está en favoritos
    favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Fetch character details
    const res = await fetch("https://api.potterdb.com/v1/characters/" + id);
    const json = await res.json();
    const data = (json.data && json.data.attributes) ? json.data.attributes : {};

    esFavorito = favoritos.some(p => p.id === id);

    var root = document.getElementById("root");
    root.innerHTML = "";

    const image = data.image ? `<img src="${data.image}" alt="${data.name}" height="120">` : "";
    const house = data.house ? `<p><strong>House:</strong> ${data.house}</p>` : "";
    const species = data.species ? `<p><strong>Species:</strong> ${data.species}</p>` : "";
    const gender = data.gender ? `<p><strong>Gender:</strong> ${data.gender}</p>` : "";
    const born = data.born ? `<p><strong>Born:</strong> ${data.born}</p>` : "";
    const died = data.died ? `<p><strong>Died:</strong> ${data.died}</p>` : "";
    const patronus = data.patronus ? `<p><strong>Patronus:</strong> ${data.patronus}</p>` : "";
    const wiki = data.wiki ? `<p><a href="${data.wiki}" target="_blank">Wiki</a></p>` : "";

    const favoritoBtn = esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos';

    root.innerHTML = `
        <div class="detail">
            <h2>${data.name || 'Sin nombre'}</h2>
            ${image}
            ${house}
            ${species}
            ${gender}
            ${born}
            ${died}
            ${patronus}
            ${wiki}
            <button id="favBtn">${favoritoBtn}</button>
            <button onclick="Home()">Volver</button>
        </div>
    `;

    document.getElementById("favBtn").addEventListener("click", function(){
        let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
        if(esFavorito){
            favs = favs.filter(f => f.id !== id);
            localStorage.setItem("favoritos", JSON.stringify(favs));
            alert("Eliminado de favoritos");
            esFavorito = false;
            this.textContent = "Agregar a favoritos";
        } else {
            favs.push({id: id, name: data.name, image: data.image});
            localStorage.setItem("favoritos", JSON.stringify(favs));
            alert("Agregado a favoritos");
            esFavorito = true;
            this.textContent = "Quitar de favoritos";
        }
    });
}