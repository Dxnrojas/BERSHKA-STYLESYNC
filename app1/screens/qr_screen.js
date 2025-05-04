import { makeRequest } from "../app.js";

export default function renderQRScreen() {
  const app = document.getElementById("app");

  const section = document.createElement("section");
  section.id = "qr_screen";
  section.innerHTML = `
    <div class="contenedor-splash" style="padding: 2rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">

      <div class="contenido-izquierda" style="max-width: 400px; text-align: left;">
        <div class="logo" style="margin-bottom: 1rem;">
          <img 
            src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJsb2dvcy9iZXJzaGthU3R5bGVTeW5jLnBuZyIsImlhdCI6MTc0NjMyMzMwMywiZXhwIjoxOTA0MDAzMzAzfQ.LG2yzFcOvUiNddKmSLGE7furiarcZnHKUkfiAG_04Rs"
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
          <p><strong>Escaneá el código QR</strong></p>
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
    const response = await makeRequest("/change-screen", "POST");
    console.log("Respuesta del servidor:", response);
  });
}
