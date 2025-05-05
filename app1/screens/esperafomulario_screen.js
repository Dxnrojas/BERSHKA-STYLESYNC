export default function renderEsperaFormularioScreen() {
    const app = document.getElementById("app");
  
    const screen = document.createElement("section");
    screen.id = "esperafomulario_screen";
    screen.style.display = "block";
    screen.innerHTML = `
      <div class="contenedor-momento">
        <h2 class="titulo-momento">
          Tu momento fashion: <span class="resaltado">¡Llénalo y Enciéndelo!</span>
        </h2>
  
        <p class="texto-momento">
          ¡Deja de stalkear outfits y empieza a vivirlos! Tu yo fashionista te está esperando...
          ¡al otro lado de este formulario! No lo hagas esperar
        </p>
  
        <div class="imagen-momento">
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/splash/splash1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJzcGxhc2gvc3BsYXNoMS5wbmciLCJpYXQiOjE3NDY0MTMyNzAsImV4cCI6MTc3Nzk0OTI3MH0._vfqmmL4cyBBUd9VnLVgs7LQc4WZ_-PHv4BTm1akLS8" />
        </div>
  
        <div class="logo-superior">
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJsb2dvcy9iZXJzaGthU3R5bGVTeW5jLnBuZyIsImlhdCI6MTc0NjQxMzMxMCwiZXhwIjoxNzc3OTQ5MzEwfQ.Cri9bAR08JOY3mfQg44pPO88wI8t8fHxZX9kSOD8MXA" />
        </div>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(screen);
  }
  