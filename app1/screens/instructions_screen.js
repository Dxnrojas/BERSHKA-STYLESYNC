export default function renderInstructionScreen() {

  const style = document.createElement("style");
style.textContent = `body, html {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #1b1b1b;
  color: white;
  height: 100%;
  width: 100%;
}

#instruction_screen {
  display: flex;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin-left: 23rem;
}

.logo-superior {
  position: absolute;
  top: 20px;
  right: 20px;
}

.logo-superior img {
  width: 120px;
}

.contenido-instrucciones {
  max-width: 700px;
}

.contenido-instrucciones h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.contenido-instrucciones p {
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 30px;
}

.contenido-instrucciones p span {
  font-weight: bold;
}

.contenedor-simbolos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 20px 30px;
  border-radius: 15px;
  background-color: #2b2b2b;
  margin-bottom: 30px;
}

.contenedor-simbolos img {
  height: 40px;
  width: 40px;
}

.instruccion-final {
  font-size: 1rem;
  margin-top: 10px;
}

.instruccion-final .resaltado {
  color: #ff914d;
  font-weight: bold;
}
`;
document.head.appendChild(style);

    const app = document.getElementById("app");
  
    const section = document.createElement("section");
    section.id = "instruction_screen";
    section.style.display = "block";
  
    section.innerHTML = `
      <div class="logo-superior">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSync.png" width="150px" alt="Logo Bershka Style Sync" />
      </div>
  
      <div class="contenido-instrucciones">
        <h2>Instrucciones</h2>
        <p>A continuación, aparecerán preguntas aquí y tú responderás desde el celular con los siguientes símbolos:</p>
        <div class="contenedor-simbolos">
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png" alt="Símbolo 1" />
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//rectanguloredondo.png" alt="Símbolo 2" />
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//bolitas.png" alt="Símbolo 3" />
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//polygon.png" alt="Símbolo 4" />
        </div>
        <p class="instruccion-final">Cuando estés listo, <span class="resaltado">toca el ícono en tu celular para comenzar</span></p>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  }
  