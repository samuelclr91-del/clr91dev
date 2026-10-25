# clr91dev

Portfolio de Samuel y páginas de Trackle y Bezly. Sitio estático publicado con GitHub Pages desde la rama `main`, sin dependencias ni proceso de compilación.

## Vista previa

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Abre `http://127.0.0.1:4173` en tu navegador.

## Contenido

- `index.html`: portada, galería de apps, presentación y contacto.
- `trackle/index.html` y `bezly/index.html`: páginas de producto.
- `assets/studio.css`: diseño compartido y adaptaciones para móvil.
- `assets/studio.js`: idioma, menú y galería.
- `assets/studio/`: versiones WebP optimizadas de los mockups actuales del repositorio; los archivos originales se conservan en sus carpetas.
- `assets/studio-legal.css`: apariencia de las páginas legales y de soporte, con su contenido original.

Los textos en inglés y español se editan en los atributos `data-en` y `data-es`. Las descripciones de imágenes usan `data-alt-en` y `data-alt-es`. El sitio usa el idioma del navegador y recuerda la selección del visitante. Las capturas muestran los idiomas de los mockups originales.

El diseño utiliza DM Sans y Caveat de Google Fonts, con fuentes locales de respaldo. El menú se cierra con Escape; la galería admite flechas, teclado y desplazamiento táctil. Se respeta la preferencia de movimiento reducido.
