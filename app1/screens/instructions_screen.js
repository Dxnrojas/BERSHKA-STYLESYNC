export default function renderInstructionScreen() {
    const app = document.getElementById("app");
  
    const section = document.createElement("section");
    section.id = "instruction_screen";
    section.style.display = "block";
  
    section.innerHTML = `
      <div class="logo-superior">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png" width="150px" alt="Logo Bershka Style Sync" />
      </div>
  
      <div class="contenido-instrucciones">
        <h2>Instrucciones</h2>
        <p>A continuación, aparecerán preguntas aquí y tú responderás desde el celular con los siguientes símbolos:</p>
        <div class="contenedor-simbolos">
          <img src="https://..." alt="Símbolo 1" />
          <img src="https://..." alt="Símbolo 2" />
          <img src="https://..." alt="Símbolo 3" />
          <img src="https://..." alt="Símbolo 4" />
        </div>
        <p class="instruccion-final">Cuando estés listo, <span class="resaltado">toca el ícono en tu celular para comenzar</span></p>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  }
  