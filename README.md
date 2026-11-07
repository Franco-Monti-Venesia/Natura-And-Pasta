# Natura & Pasta — sitio web

Landing page responsive desarrollada con React + Vite.

## Requisitos
- Node.js 18 o superior recomendado.
- npm.

## Ejecutar en desarrollo
1. Abrir esta carpeta en Visual Studio Code.
2. Abrir una terminal en la carpeta raíz (donde está `package.json`).
3. Ejecutar `npm install`.
4. Ejecutar `npm run dev`.
5. Abrir la dirección local que muestra Vite (normalmente `http://localhost:5173`).

No ejecutar `index.html` directamente ni utilizar Live Server: React necesita el servidor de Vite para transformar JSX.

## Generar versión de producción
- `npm run build`
- `npm run preview` para revisar localmente la carpeta `dist`.

## Contenido y estructura
- Inicio / Hero con fotografía secundaria de harina y huevos.
- Propuesta de marca.
- Productos: tallarines de harina de almendras y tallarines integrales.
- Elaboración con fotografía real de los envases de Natura & Pasta.
- Ubicación: Av. San Martín 993, Cruz Alta, Córdoba.
- Galería estática con imágenes de la marca y publicaciones visibles en el perfil de Instagram. No se conecta automáticamente a Instagram.
- Contacto por WhatsApp e Instagram.
- Crédito de desarrollo a Franco Venesia.

## Imágenes propias en `src/assets`
Se conservan los nombres de archivo que ya utiliza el código: 
- `logo.png`
- `natura-productos-envasados.webp`
- `natura-etiquetas.webp`

Si se reemplaza la carpeta `src/assets` por otra versión de las fotografías, mantener esos nombres exactos o actualizar los imports de `src/App.jsx`. Las imágenes de la galería y la foto de ingredientes están en `public/images`, por lo que no se pierden al reemplazar `src/assets`.

## Datos comerciales cargados
- WhatsApp: +54 9 3467 41-9630.
- Envases de 250 g.
- Sin conservantes.
- Atención: martes a domingo (horarios exactos a consultar).
- No son productos libres de gluten ni aptos para personas celíacas; se manipula harina de trigo en el establecimiento.

## Personalización
- Contenido y datos de contacto: `src/App.jsx`.
- Estilos y responsive: `src/styles.css`.
- Metadatos, título y favicon: `index.html`.


## Últimos ajustes

- El botón flotante de WhatsApp muestra “Haz tu pedido” y abre un mensaje inicial orientado a realizar un pedido.
- La sección “Elegir distinto. Disfrutar siempre.” utiliza una fotografía real de los tallarines frescos de Natura & Pasta.
- Las secciones y elementos con `data-reveal` aparecen al entrar en pantalla, con movimiento suave y un pequeño retraso escalonado.
- La barra de desplazamiento utiliza los tonos topo y marfil de la identidad visual.
- Se respeta la preferencia del sistema para reducir movimiento (`prefers-reduced-motion`).

## Imágenes principales fáciles de reemplazar
Las dos fotografías principales que antes se cargaban desde Unsplash ahora son archivos locales. Para cambiarlas en el futuro, reemplazá la imagen manteniendo exactamente el mismo nombre y formato WebP:

- `public/images/hero-principal.webp`: fotografía grande de la portada.
- `public/images/propuesta-marca.webp`: fotografía de la sección “La propuesta”.

No hace falta modificar `App.jsx` si conservás esos nombres. También se mantienen en `public/images` las demás fotografías de la galería y del manifiesto.

## Favicon
Los favicons definitivos están en `public/` y se sirven desde la raíz del sitio:
- `public/favicon.ico`
- `public/favicon.png`
- `public/apple-touch-icon.png`

No es necesario mantener copias adicionales en la raíz del proyecto. Vite publica automáticamente los archivos de la carpeta `public`.

## Correcciones responsive (noviembre 2026)
- En teléfonos (hasta 600 px) se ocultan las fotografías del Hero y queda como protagonista el texto.
- El adorno de la sección “La propuesta” usa un SVG para evitar que iOS lo convierta en un emoji verde.
- El crédito “Desarrollado por Franco Venesia” apunta a `https://francovenesia.vercel.app/`.
- Las tarjetas de productos tienen imágenes móviles cuadradas, de igual tamaño y sin recorte agresivo; en escritorio conservan sus imágenes de mayor formato.
- La sección “Elegir distinto. Disfrutar siempre.” usa una toma vertical en teléfonos para reducir el zoom del fondo.
- En teléfonos se muestran cuatro publicaciones en la galería de Instagram; en pantallas grandes siguen apareciendo cinco.

## Publicar actualizaciones en GitHub y Vercel
No hace falta borrar el repositorio. Copiá el contenido de una nueva versión del proyecto sobre la carpeta local que ya tiene tu repositorio Git, sin borrar la carpeta oculta `.git`. Después ejecutá `git add .`, `git commit -m "Ajustes responsive para móviles"` y `git push`. Vercel desplegará automáticamente el nuevo commit si el proyecto sigue conectado a ese repositorio.
