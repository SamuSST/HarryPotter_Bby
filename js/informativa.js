function Informativa() {
  const contenedor = document.getElementById("la-lista");
  if (!contenedor) return;

  // Esto hace que el contenido llene toda la pantalla
  contenedor.innerHTML = `
    <section class="informativa">
      <div class="info-contenido">
        <h2>✨ Bienvenido a MagosDex ✨</h2>
        <p>
          <strong>MagosDex</strong> es una enciclopedia mágica inspirada en el universo de
          <em>Harry Potter</em>. Aquí podrás explorar información sobre magos, brujas,
          criaturas y personajes emblemáticos del mundo mágico.
        </p>
        <p>
          📚 <strong>Fuente de datos:</strong> PotterDB API<br>
          Esta API gratuita es mantenida por la comunidad de fans de Harry Potter.
        </p>
      </div>
    </section>
  `;
}
