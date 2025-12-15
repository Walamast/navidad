/* ==========================================================
   Interacciones (press-to-open)
   Archivo: interacciones.js
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const fold = document.getElementById("fold");

  // Ajuste de altura: en móvil el contenido puede requerir más alto que la altura fija.
  // Como la portada/interior están posicionados en absoluto, calculamos la altura necesaria
  // según el scrollHeight del layout interior y la aplicamos al contenedor .fold.
  const insideLayout = fold.querySelector(".inside");
  let lastHeight = 0;

  function parsePx(v, fallback) {
    const n = Number.parseFloat(String(v).replace("px", "").trim());
    return Number.isFinite(n) ? n : fallback;
  }

  function syncFoldHeight() {
    if (!insideLayout) return;

    const minH = parsePx(getComputedStyle(document.documentElement).getPropertyValue("--cardH"), 520);
    const needed = insideLayout.scrollHeight;
    const target = Math.max(minH, needed);

    if (Math.abs(target - lastHeight) > 1) {
      fold.style.height = `${Math.ceil(target)}px`;
      lastHeight = target;
    }
  }

  // Ejecuta al cargar y cuando cambie el tamaño (rotación / teclado móvil / etc.)
  const ro = new ResizeObserver(() => requestAnimationFrame(syncFoldHeight));
  ro.observe(fold);
  ro.observe(document.documentElement);
  if (insideLayout) ro.observe(insideLayout);

  window.addEventListener("resize", () => requestAnimationFrame(syncFoldHeight));
  setTimeout(syncFoldHeight, 50);
  setTimeout(syncFoldHeight, 250);
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
