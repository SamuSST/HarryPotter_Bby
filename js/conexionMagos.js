var magos = [];

async function Conexion(filtrotipo) {
  let items = [];
  let page = 1;
  let seguir = true;

  while (seguir) {
    console.log(`📜 Cargando página ${page} de magos...`);
    try {
      const res = await fetch(`https://api.potterdb.com/v1/characters?page[number]=${page}&page[size]=100`);
      const json = await res.json();
      const data = json.data || [];

      // 🛑 Si no hay más personajes, detenemos
      if (data.length === 0) {
        seguir = false;
        break;
      }

      const personajes = data.map(item => {
        const attrs = item.attributes || {};
        return {
          id: item.id,
          name: attrs.name || attrs.title || "Sin nombre",
          image: attrs.image || "https://via.placeholder.com/96x96?text=Sin+imagen",
          house: attrs.house || "Sin casa",
          species: attrs.species || "Desconocida",
          gender: attrs.gender || "No registrado",
          born: attrs.born || "Desconocido",
          died: attrs.died || "",
          patronus: attrs.patronus || "Sin patronus",
          wiki: attrs.wiki || null
        };
      });

      items = items.concat(personajes);
      page++;

      // 🔒 Para evitar loops infinitos si la API falla
      if (page > 20) seguir = false;

    } catch (err) {
      console.error("⚠️ Error cargando página", page, err);
      seguir = false;
    }
  }

  // 🪄 Filtro por casa (si aplica)
  if (filtrotipo === "All") {
    return items;
  } else {
    return items.filter(it => it.house && it.house.toLowerCase() === filtrotipo.toLowerCase());
  }
}

async function General() {
  const contenedor = document.getElementById("la-lista");
  if (contenedor) contenedor.innerHTML = "<p>Cargando magos...</p>";

  if (magos.length === 0) {
    magos = await Conexion("All");
  }

  console.log(`✅ Total de magos cargados: ${magos.length}`);
  Home();
}

General();

async function FiltroConexion(Elfiltro) {
  const listaEl = document.getElementById("la-lista");
  if (listaEl) listaEl.innerHTML = "<p>Cargando...</p>";

  magos = await Conexion(Elfiltro);
  const listaHTML = generarLista(magos);

  if (listaEl) listaEl.innerHTML = listaHTML;
}
