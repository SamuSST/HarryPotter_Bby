var pokemones = []
async function Conexion(filtrotipo){
    // Fetch characters from PotterDB. We'll request a large limit to get many entries.
    const res = await fetch('https://api.potterdb.com/v1/characters?limit=5000');
    const json = await res.json();
    // JSON:API format: { data: [ { id, type, attributes: {...} }, ... ] }
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
        // simple client-side filter by house (case-insensitive)
        return items.filter(it => it.house && it.house.toLowerCase() === filtrotipo.toLowerCase());
    }
}

async function General(){
  if (pokemones.length === 0) {
    pokemones = await Conexion("All");
  }
  Home();
}

General()

async function FiltroConexion(Elfiltro){
  document.getElementById("la-lista").innerHTML = "";
  pokemones = await Conexion(Elfiltro);
  const listaHTML = generarLista(pokemones);
  document.getElementById("la-lista").innerHTML = listaHTML;
}