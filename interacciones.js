/* ==========================================================
   Interacciones (press-to-open)
   Archivo: interacciones.js
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const fold = document.getElementById("fold");
  let pressed = false;

  function setOpen(next) {
    const open = Boolean(next);
    fold.classList.toggle("is-open", open);
    fold.setAttribute("aria-pressed", String(open));  }

  function onPressStart(e) {
    // Evita selección/scroll no deseado en mobile
    e.preventDefault?.();
    pressed = true;
    setOpen(true);
  }

  function onPressEnd() {
    if (!pressed) return;
    pressed = false;
    setOpen(false);
  }

  // Pointer events (mouse + touch + stylus)
  fold.addEventListener("pointerdown", onPressStart);
  fold.addEventListener("pointerup", onPressEnd);
  fold.addEventListener("pointercancel", onPressEnd);
  fold.addEventListener("pointerleave", onPressEnd);

  // Teclado: abrir mientras se mantiene Space/Enter
  fold.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      if (!pressed) onPressStart(e);
    }
  });

  fold.addEventListener("keyup", (e) => {
    if (e.key === " " || e.key === "Enter") {
      onPressEnd();
    }
  });

  // Estado inicial
  setOpen(false);
});
