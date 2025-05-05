export default function renderInstructionScreen() {
    const app = document.getElementById("app");
  
    const section = document.createElement("section");
    section.id = "instruction_screen";
    section.style.display = "block";
  
    section.innerHTML = `
      <div class="logo-superior">
        <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/logos/bershkaStyleSync.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJsb2dvcy9iZXJzaGthU3R5bGVTeW5jLnBuZyIsImlhdCI6MTc0NjQxMzMxMCwiZXhwIjoxNzc3OTQ5MzEwfQ.Cri9bAR08JOY3mfQg44pPO88wI8t8fHxZX9kSOD8MXA" width="150px" alt="Logo Bershka Style Sync" />
      </div>
  
      <div class="contenido-instrucciones">
        <h2>Instrucciones</h2>
        <p>A continuación, aparecerán preguntas aquí y tú responderás desde el celular con los siguientes símbolos:</p>
        <div class="contenedor-simbolos">
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/trebol.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvdHJlYm9sLnBuZyIsImlhdCI6MTc0NjQxOTU4NCwiZXhwIjoxNzc3OTU1NTg0fQ.45jJBQwopMG8cpOVjp0G4PqeA4kyjzCzBncuz76_zqs" alt="Símbolo 1" />
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/rectanguloredondo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvcmVjdGFuZ3Vsb3JlZG9uZG8ucG5nIiwiaWF0IjoxNzQ2NDE5NjE0LCJleHAiOjE3Nzc5NTU2MTR9.H0d_RDT2teD1NpLqNXzQBtKh7vpn8nppaF5aKpx0c80" alt="Símbolo 2" />
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/bolitas.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvYm9saXRhcy5wbmciLCJpYXQiOjE3NDY0MTk2MzEsImV4cCI6MTc3Nzk1NTYzMX0.8SL2JODZfWat-zdQAJyitKZW_BK3SWqn5TACNR_Wudg" alt="Símbolo 3" />
          <img src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/sign/iconos/polygon.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2FlNWFiNTQ0LWFiMGEtNDE0ZC1hNWNjLWY2MmMwYWJlMTlmYiJ9.eyJ1cmwiOiJpY29ub3MvcG9seWdvbi5wbmciLCJpYXQiOjE3NDY0MTk2NTIsImV4cCI6MTc3Nzk1NTY1Mn0.QftnGuYXJ5ln6IR3zUYglRMnLdVKmcHsYO3JzF6PJyU" alt="Símbolo 4" />
        </div>
        <p class="instruccion-final">Cuando estés listo, <span class="resaltado">toca el ícono en tu celular para comenzar</span></p>
      </div>
    `;
  
    app.innerHTML = "";
    app.appendChild(section);
  }
  