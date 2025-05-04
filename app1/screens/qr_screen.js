import { makeRequest } from "../app.js";

export default function renderQRScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section id="qr_screen"> 
      <div class="contenedor-splash">
        <div class="contenido-izquierda">
          <div class="logo">
            <img 
              src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJsb2dvcy9iZXJzaGthU3R5bGVTeW5jLnBuZyIsImlhdCI6MTc0NjMyMzMwMywiZXhwIjoxOTA0MDAzMzAzfQ.LG2yzFcOvUiNddKmSLGE7furiarcZnHKUkfiAG_04Rs"
              width="150px" 
              alt="Icono Bershka" 
              class="icono-logo"
            />
          </div>
          <div class="texto">
            <h2>Construyendo el <span class="resaltado">nuevo futuro</span> de la moda...</h2>
            <p>¿Te cuesta elegir outfits o buscar inspiración para armar uno?<br>
            Nuestra solución combina moda y tecnología para recomendarte<br>
            looks personalizados al instante, adaptados a tu estilo único.</p>
          </div>
        </div>

        <div class="contenido-derecha">
          <div class="qr">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:5050/app2&size=200x200" 
              alt="QR para escanear"
            />
            <p>Escanea este código QR para comenzar</p>
            <button id="simulate-qr-btn">Simular escaneo QR</button>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById("simulate-qr-btn").addEventListener("click", async () => {
    const response = await makeRequest("/change-screen", "POST");
    console.log("Respuesta del servidor:", response);
  });
}
