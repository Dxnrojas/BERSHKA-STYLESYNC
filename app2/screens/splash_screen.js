export default function renderSplashScreen() {
    const app = document.getElementById("app");
  
    const splashSection = document.createElement("section");
    splashSection.id = "splash-inicial";
    splashSection.style.display = "block";
  
    splashSection.innerHTML = `
      <div class="splash-container">
        <img
          src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSyncDarkMode.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJsb2dvcy9iZXJzaGthU3R5bGVTeW5jRGFya01vZGUucG5nIiwiaWF0IjoxNzQ2MzI4OTc4LCJleHAiOjE5MDQwMDg5Nzh9.diu46Ffse3Yo4oUhOXldRF66lHIklGatpfcBWZW-Hck"
          width="150px"
          alt="Logo Bershka Style Sync"
          class="logo"
        />
        <img
          src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/splash/splash.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJzcGxhc2gvc3BsYXNoLnBuZyIsImlhdCI6MTc0NjMyNDMwMCwiZXhwIjoxOTA0MDA0MzAwfQ.1He4ukR6EAkVtJaF15SU-xhSzpJWeW8a3b-DmOO9JPI"
          width="200px"
          alt="Personajes estilo"
          class="personajes"
        />
        <h1>
          ¡Únete a nosotros y <br />
          descubre tu estilo perfecto!
        </h1>
        <button id="btn-comenzar" class="btn-naranja">Comenzar</button>
      </div>
    `;
  
    app.appendChild(splashSection);
  
    // Puedes agregar lógica al botón si lo necesitas
    document.getElementById("btn-comenzar").addEventListener("click", () => {
      alert("¡Aquí iría la siguiente pantalla! 🎉");
    });
  }
  