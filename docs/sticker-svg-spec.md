# Spec: SVGs para stickers

Todo SVG que se agregue como sticker en `public/` debe seguir este formato para funcionar correctamente con el componente `<Sticker shape="png">`.

---

## Estructura requerida

```xml
<?xml version="1.0" encoding="utf-8" ?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="1024"
  height="1024"
  viewBox="X Y W H"
  preserveAspectRatio="xMidYMid meet"
>
  <path fill="#COLOR" d="..." />
  <!-- más paths si es necesario -->
</svg>
```

---

## Propiedades obligatorias

| Propiedad | Valor |
|---|---|
| `width` / `height` | Siempre `1024` × `1024` |
| `viewBox` | Ajustado al bounding box real del contenido |
| `preserveAspectRatio` | `xMidYMid meet` |
| `fill` en los paths | ✅ Conservar los colores originales |

### Cómo calcular el `viewBox`

El `viewBox` debe encuadrar el contenido real, no el tamaño del artboard original. Si los paths tienen coordenadas entre `x=1200` y `x=2600`, y entre `y=500` y `y=2400`:

```
viewBox="1200 500 1400 1900"
         ↑    ↑   ↑    ↑
        minX minY  W    H
```

Agregar ~2% de padding a cada lado para que el contorno blanco no se corte.

---

## Lo que hay que eliminar

| Elemento | Motivo |
|---|---|
| `<metadata>` / bloques c2pa | Peso muerto, no aporta nada visual |
| `<defs>` con filtros (`sticker-outline`, etc.) | El componente aplica su propio filtro en runtime |
| `<g filter="url(...)">` wrappers | Interfiere con el filtro del componente |
| Paths de fondo (blanco, crema, relleno sólido) | El sticker debe ser transparente para que el die-cut blanco se vea bien |
| `stroke` en los paths | El componente no lo usa para pngs |

---

## Lo que hace el componente automáticamente

El componente `<Sticker shape="png">` ya se encarga de:

- **Contorno blanco** (die-cut) vía SVG filter `feMorphology + feFlood`
- **Drop shadow** vía CSS `filter drop-shadow-md`
- **Hover scale** y **drag** vía Framer Motion

No hay que agregar ninguno de estos efectos al archivo SVG.

---

## Cómo usarlo en el sandbox

```tsx
{ x: 50, y: 30, r: -5, config: { 
    shape: 'png', 
    pngUrl: '/nombre-archivo.svg', 
    w: 200, 
    h: 200, 
    dieCut: 3, 
    fold: false 
}}
```

| Prop | Descripción |
|---|---|
| `pngUrl` | Ruta desde `public/`, ej. `'/mi-logo.svg'` |
| `w` / `h` | Tamaño en px del sticker en el canvas |
| `dieCut` | Grosor del contorno blanco en px |
| `fold` | `false` para SVGs (el fold es para stickers de forma geométrica) |

---

## Checklist antes de agregar un SVG

- [ ] Fondo transparente — sin `<rect fill="white">` ni paths de fondo
- [ ] `viewBox` ajustado al bounding box real del contenido
- [ ] Sin `<metadata>`, `<defs>` con filtros, ni wrappers `<g filter>`
- [ ] `width="1024" height="1024"`
- [ ] `preserveAspectRatio="xMidYMid meet"`
- [ ] Los paths conservan sus `fill` originales

---

## Script de normalización

Si el SVG viene de Illustrator, Figma, o una herramienta de autotracing (como VTracer), correr el script `normalize_svgs.py` en la raíz del proyecto:

```powershell
py normalize_svgs.py
```

El script hace automáticamente:
1. Elimina `<metadata>` y bloques c2pa
2. Elimina `<defs>` con filtros inyectados
3. Quita wrappers `<g filter="...">`
4. Detecta el bounding box real de los paths
5. Setea `width="1024" height="1024"` con `viewBox` y `preserveAspectRatio` correctos
