var magos = [];
async function Conexion(filtrotipo){
    const res = await fetch('https://api.potterdb.com/v1/characters?limit=5000');
    const json = await res.json();
    const items = (json.data || []).map(item => {
        const attrs = item.attributes || {};
        return {
            id: item.id,
            name: attrs.name || attrs.title || "Sin nombre",
            image: attrs.image || null,
            house: attrs.house || null,
            species: attrs.species || null,
            gender: attrs.gender || null,
            born: attrs.born || null,
            died: attrs.died || null,
            patronus: attrs.patronus || null,
            wiki: attrs.wiki || null
        };
    });

    if(filtrotipo == "All"){
        return items;
    } else {
        return items.filter(it => it.house && it.house.toLowerCase() === filtrotipo.toLowerCase());
    }
}

async function General(){
  if (magos.length === 0) {
    magos = await Conexion("All");
  }
  Home();
}

General();

async function FiltroConexion(Elfiltro){
  const listaEl = document.getElementById("la-lista");
  if(listaEl) listaEl.innerHTML = "";
  magos = await Conexion(Elfiltro);
  const listaHTML = generarLista(magos);
  if(listaEl) listaEl.innerHTML = listaHTML;
}