/* ==========================================================
   Interacciones (tap-to-open con animación)
   Archivo: interacciones.js
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const fold = document.getElementById("fold");

  let isOpen = false;
  let animLock = false;

  function setOpen(next) {
    const open = Boolean(next);
    isOpen = open;

    // Animación de estado: agregamos clases auxiliares para suavizar el “feel”
    fold.classList.remove("is-opening", "is-closing");
    fold.classList.toggle("is-open", open);

    // Marca ARIA
    fold.setAttribute("aria-pressed", String(open));

    // Dispara una clase corta para enfatizar apertura/cierre
    animLock = true;
    fold.classList.add(open ? "is-opening" : "is-closing");
    window.setTimeout(() => {
      fold.classList.remove("is-opening", "is-closing");
      animLock = false;
    }, 520);
  }

  function toggleOpen() {
    if (animLock) return;
    setOpen(!isOpen);
  }

  // Tap/click
  fold.addEventListener("click", () => {
    toggleOpen();
  });

  // Teclado
  fold.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleOpen();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  });

  // Estado inicial
  setOpen(false);
});
