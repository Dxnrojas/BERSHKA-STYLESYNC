import { makeRequest } from "../app.js";

export default function renderQRScreen() {
  const style = document.createElement("style");
style.textContent = `body, html {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
}

#qr_screen {
  background-image: url('https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/backgrounds//Fondo%20pantalla%201.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.contenedor-splash {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;
  padding: 100%;
  align-items: center;
  justify-content: space-evenly;
  height: 90%;
  width: 100%;
}

.contenido-izquierda {
  color: white;
  flex: 2;
  min-width: 350px;
  max-width: 500px;
}

.contenido-izquierda .resaltado {
  color: #ff914d;
  font-weight: 700;
}

.contenido-izquierda h2 {
  font-size: 2rem;
  margin: 1rem 0 1rem 0;
  font-weight: 600;
}

.contenido-izquierda p {
  font-size: 1rem;
  line-height: 1.6;
  color: #e0e0e0;
}

.contenido-derecha {
  background: white;
  color: #222;
  border-radius: 20px;
  padding: 30px 20px;
  flex: 1.2;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.qr-box h3 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #555;
  align-self: flex-start;
}

.qr-box p {
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #222;
  text-align: left;
}

.qr-box .qr-imagen {
  width: 200px;
  height: 200px;
  margin: 1rem auto;
}

.aviso-politica {
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
}

.aviso-politica a {
  color: #222;
  text-decoration: underline;
}
`;
document.head.appendChild(style);

  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "qr_screen";
  section.innerHTML = `
    <div class="contenedor-splash" style="padding: 2rem; display: flex; flex-wrap: wrap; justify-content: space-evenly; gap: 2rem;">

      <div class="contenido-izquierda" style="max-width: 400px; text-align: left;">
        <div class="logo" style="margin-bottom: 1rem;">
          <img 
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaStyleSync.png"
            width="150"
            alt="Icono Bershka"
          />
        </div>
        <div class="texto">
          <h2>Construyendo el <span class="resaltado">nuevo futuro</span> de la moda...</h2>
          <p>
            ¿Te cuesta elegir outfits o buscar inspiración para armar uno?<br>
            Nuestra solución combina moda y tecnología para recomendarte<br>
            looks personalizados al instante, adaptados a tu estilo único.
          </p>
        </div>
      </div>

      <div class="contenido-derecha" style="text-align: center; max-width: 300px;">
        <div class="qr-box">
          <h3>¡Comencemos!</h3>
          <p><strong>Escanea el código QR</strong></p>
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:5050/app2&size=200x200" 
            alt="Código QR" 
            class="qr-imagen"
            style="margin: 1rem auto;"
          />
          <p class="aviso-politica">
            Al leer el QR confirmo que acepto la 
            <a href="#">política de privacidad</a> y el tratamiento de mis datos personales 
            de acuerdo con los términos establecidos.
          </p>
          <button id="simulate-qr-btn" style="margin-top: 1rem;">Simular escaneo QR</button>
        </div>
      </div>

    </div>
  `;

  app.innerHTML = "";
  app.appendChild(section);

  // Botón de prueba para activar el evento
  document.getElementById("simulate-qr-btn").addEventListener("click", async () => {
    const response = await makeRequest("/api/qr/change-screen", "POST");
    console.log("Respuesta del servidor:", response);
  });
}
