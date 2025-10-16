async function Mago(id){
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const personaje = magos.find(m => m.id === id);

    let data = personaje;
    if(!data){
      try{
        const res = await fetch("https://api.potterdb.com/v1/characters/" + id);
        const json = await res.json();
        const attrs = json.data ? json.data.attributes : {};
        data = {
          id: json.data ? json.data.id : id,
          name: attrs.name || "Sin nombre",
          image: attrs.image || null,
          house: attrs.house || null,
          species: attrs.species || null,
          gender: attrs.gender || null,
          born: attrs.born || null,
          died: attrs.died || null,
          patronus: attrs.patronus || null,
          wiki: attrs.wiki || null
        };
      }catch(e){
        console.error(e);
      }
    }

    let esFavorito = favoritos.some(p => p.id === id);

    var root = document.getElementById("root");
    if(!root) return;
    root.innerHTML = "";

    const image = data.image ? `<img src="${data.image}" alt="${data.name}" height="160">` : "";
    const house = data.house ? `<p><strong>Casa:</strong> ${data.house}</p>` : "";
    const species = data.species ? `<p><strong>Especie:</strong> ${data.species}</p>` : "";
    const gender = data.gender ? `<p><strong>Género:</strong> ${data.gender}</p>` : "";
    const born = data.born ? `<p><strong>Nacimiento:</strong> ${data.born}</p>` : "";
    const died = data.died ? `<p><strong>Fallecimiento:</strong> ${data.died}</p>` : "";
    const patronus = data.patronus ? `<p><strong>Patronus:</strong> ${data.patronus}</p>` : "";
    const wiki = data.wiki ? `<p><a href="${data.wiki}" target="_blank">Ver en Wiki</a></p>` : "";

    const favoritoBtn = esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos';

    root.innerHTML = `
        <div class="detail">
            <button class="volver" onclick="Home()">⬅ Volver</button>
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