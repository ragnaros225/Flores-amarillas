# 🌻 Flores Amarillas · 21 de Marzo

> Una experiencia digital especial, pensada para sorprender. Un regalo virtual hecho con cariño, elegancia y flores amarillas.

---

## 🎨 Stack elegido: HTML/CSS/JS + Nginx + Docker

### ¿Por qué esta opción?

| Criterio | Puntuación |
|---|---|
| Belleza visual | ✅ Total control del CSS, animaciones nativas en canvas |
| Facilidad de despliegue | ✅ Imagen Docker de ~22 MB, listo en segundos |
| Rendimiento | ✅ Sin build step, carga instantánea, 100/100 Lighthouse |
| Mantenimiento | ✅ Sin dependencias npm, sin frameworks, sin actualizaciones críticas |

Una landing page emocional como esta no necesita React. HTML + CSS + JS vanilla con animaciones cuidadas produce el resultado más rápido, más ligero y más hermoso.

---

## 📁 Estructura del proyecto

```
flores-amarillas/
│
├── src/                       ← Código fuente del sitio
│   ├── index.html             ← Estructura completa de la página
│   ├── styles.css             ← Todo el CSS premium (tokens, animaciones, responsive)
│   ├── main.js                ← Canvas de pétalos, intro, scroll effects, sparkles
│   └── images/
│       └── hero_flowers.png   ← Imagen hero generada con IA
│
├── nginx/
│   └── nginx.conf             ← Configuración nginx (gzip, cache, headers)
│
├── Dockerfile                 ← Build multistep: nginx:alpine + sitio estático
├── .dockerignore              ← Exclusiones para la imagen Docker
├── .gitignore                 ← Exclusiones para Git
├── render.yaml                ← Configuración de deploy automático en Render.com
└── README.md                  ← Este archivo
```

---

## 🐳 Correrlo localmente con Docker

### Requisitos
- Docker Desktop instalado y corriendo

### Pasos

```bash
# 1. Clonar o ubicarte en el directorio del proyecto
cd "Flores amarillas"

# 2. Construir la imagen Docker
docker build -t flores-amarillas .

# 3. Correr el contenedor
docker run -d -p 8080:80 --name flores-amarillas flores-amarillas

# 4. Abrir en el navegador
# → http://localhost:8080
```

### Parar el contenedor

```bash
docker stop flores-amarillas
docker rm flores-amarillas
```

### Ver logs

```bash
docker logs flores-amarillas
```

---

## 📤 Subir a GitHub

```bash
# 1. Inicializar repositorio (si aún no existe)
cd "Flores amarillas"
git init

# 2. Agregar todos los archivos
git add .

# 3. Primer commit
git commit -m "✨ Flores Amarillas - Landing page especial 21 de Marzo"

# 4. Crear repositorio en GitHub (puedes hacerlo desde github.com)
#    o con GitHub CLI:
gh repo create flores-amarillas --public --source=. --push

# 5. Si lo hiciste manual desde github.com:
git remote add origin https://github.com/TU_USUARIO/flores-amarillas.git
git branch -M main
git push -u origin main
```

---

## 🚀 Desplegar en Render.com

### Opción A: Auto-deploy con render.yaml (recomendado)

El archivo `render.yaml` ya está configurado. Solo:

1. Sube el proyecto a GitHub (ver sección anterior)
2. Entra a [render.com](https://render.com) y crea una cuenta
3. Haz clic en **"New +"** → **"Blueprint"**
4. Conecta tu repositorio de GitHub
5. Render detectará el `render.yaml` automáticamente
6. Confirma y despliega 🎉

### Opción B: Deploy manual desde Render

1. Ve a [render.com](https://render.com) → **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Branch**: `main`
4. Haz clic en **"Create Web Service"**
5. Espera ~2 minutos y tu URL estará lista ✅

### 📌 Notas de Render

- El plan **Free** tiene un tiempo de "cold start" de ~30s si no hay tráfico reciente
- Para tiempo de respuesta instantáneo, usa el plan **Starter** ($7/mes)
- Render asigna una URL del tipo: `https://flores-amarillas.onrender.com`

---

## ✨ Características de la web

| Sección | Descripción |
|---|---|
| **Intro screen** | Pantalla de bienvenida animada con flor giratoria y botón de entrada |
| **Canvas de pétalos** | 35 pétalos dorados cayendo suavemente en toda la pantalla |
| **Hero section** | Título poético, imagen flotante con luz dorada, blobs animados |
| **Phrase cards** | 6 tarjetas con frases emotivas sobre flores, luz y ternura |
| **Mosaico floral** | 4 flores SVG animadas (girasol, rosa, mimosa, tulipán) con sparkles al hover |
| **Carta emotional** | Mensaje personal universal dentro de una tarjeta glassmorphism |
| **Light phrases** | 4 bloques con icono floral, título y mensaje corto |
| **Cierre** | Frase final memorable con destellos animados |
| **Footer** | Discreto y elegante con flor animada |

### Animaciones incluidas

- 🌸 **Pétalos en canvas** — 35 pétalos cayendo con física suave y wobble
- 🌺 **Flores flotantes** — SVGs animados con float continuo y stagger
- 💫 **Sparkles** — Partículas doradas al hacer hover en el mosaico floral
- 🌟 **Fade on scroll** — Secciones aparecen suavemente con IntersectionObserver
- ✨ **Destellos** — 5 estrellitas animadas en el cierre
- 🌀 **Intro flower** — Pétalos girando suavemente en la pantalla de bienvenida
- 📜 **Parallax** — Blobs del hero se mueven levemente al hacer scroll

---

## 📱 Responsive

| Pantalla | Comportamiento |
|---|---|
| Desktop (>1024px) | Grid 3 columnas, mosaico 4 columnas, carta amplia |
| Tablet (640–1024px) | Grid 2 columnas, mosaico 2x2 |
| Mobile (<640px) | Todo en columna única, mosaico 2x2 compacto |

---

## 🎨 Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--yellow` | `#f5c842` | Color principal, pétalos, acentos |
| `--yellow-light` | `#fde06e` | Versión suave del amarillo |
| `--yellow-pale` | `#fef6d0` | Fondos de secciones |
| `--gold` | `#e6a817` | Dorado cálido, bordes |
| `--gold-deep` | `#c9890d` | Énfasis, itálicas |
| `--cream` | `#fdf8ed` | Fondo base |
| `--cream-dark` | `#f5edd8` | Fondos alternativos |
| `--green-soft` | `#7ab648` | Tallos de flores SVG |
| `--text-dark` | `#2c1f0a` | Texto principal |
| `--text-mid` | `#5a4220` | Texto secundario |

---

Hecho con 💛 para el 21 de Marzo
