// app2/screens/startbtn_screen.js
import { makeRequest, socket } from "../app.js";

export default function renderStartBtnScreen() {
  const app = document.getElementById("app");

   if (!document.getElementById("startbtn-css")) {
    const style = document.createElement("style");
    style.id = "startbtn-css";
    style.innerHTML = `
      body, #app, .startbtn-screen {
        background: #181818;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }

      .startbtn-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 48px;
        height: 100vh;
        color: #fff;
        font-family: 'Inter', 'Montserrat', Arial, sans-serif;
      }

      .startbtn-logo {
        width: 84px;
        margin-bottom: 32px;
        margin-top: 20px;
      }

      .startbtn-instruccion {
        margin-bottom: 32px;
        font-size: 1.35rem;
        font-weight: 400;
        text-align: center;
      }

      .startbtn-instruccion strong {
        font-weight: 700;
      }

      .startbtn-card {
        background: #303030;
        border-radius: 40px;
        box-shadow: 0 2px 28px 0 rgba(0,0,0,0.16);
        width: 90vw;
        max-width: 400px;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 12px;
        border: none;
        cursor: pointer;
        transition: filter 0.13s;
        padding: 0;
      }

      .startbtn-card:active {
        filter: brightness(0.95);
      }

      .startbtn-trebol {
        width: 110px;
        height: 110px;
        object-fit: contain;
        filter: drop-shadow(0 4px 14px rgba(0,0,0,0.10));
        user-select: none;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  app.innerHTML = `
    <section id="startbtn_screen" class="startbtn-screen">
      <img 
        src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/logos//bershkaLogoLightMode.png"
        alt="Bershka Logo"
        class="startbtn-logo"
      />
      <p class="startbtn-instruccion">Presione el <strong>botón</strong> para continuar</p>
      <button class="startbtn-card" id="btn-comenzar">
        <img 
          src="https://kjuzyqehmpbpoderrumf.supabase.co/storage/v1/object/public/iconos//trebol.png"
          alt="Continuar"
          class="startbtn-trebol"
        />
      </button>
    </section>
  `;

  document.getElementById("btn-comenzar").addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await makeRequest("/api/start/start-game", "POST", { userId });

      if (response?.message) {
        console.log("✅ Juego iniciado");
        // Esperamos que App2 escuche el evento `start-game` y reaccione
      } else {
        alert("⚠️ No se pudo iniciar el juego.");
      }
    } catch (error) {
      console.error("❌ Error al iniciar el juego:", error);
      alert("❌ Error del servidor al iniciar el juego.");
    }
  });
}
