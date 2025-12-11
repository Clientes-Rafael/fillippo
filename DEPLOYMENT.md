# 🚀 Guía de Deployment en Netlify

## Resumen del Proyecto

**Fillipo** es un sitio web de restaurante construido con Next.js 16 (static export) y Firebase/Firestore para el backend. Incluye un panel de administración para gestionar el menú.

---

## 📋 Pre-requisitos

- Cuenta de Netlify
- Proyecto Firebase configurado (ludlow-cc1df)
- Node.js 20.11.0 o superior
- Firebase CLI instalado globalmente: `npm install -g firebase-tools`

---

## 🔧 Configuración Inicial

### 1. Deploy de Reglas de Firestore

Antes del primer deploy, asegúrate de que las reglas de seguridad estén activas:

```bash
cd fillipo
firebase login
firebase use ludlow-cc1df
firebase deploy --only firestore:rules
```

**Reglas actuales:** Lectura pública, escritura solo para usuarios autenticados.

### 2. Verificación de Datos

Confirma que Firestore tiene los datos del menú:

```bash
npm run init-data
```

Este comando carga las 12 categorías y 71 productos en Firestore.

---

## 🌐 Configuración en Netlify

### 1. Conectar Repositorio

1. Ir a Netlify Dashboard
2. Click en "Add new site" > "Import an existing project"
3. Conectar con GitHub/GitLab/Bitbucket
4. Seleccionar el repositorio

### 2. Build Settings

**Configuración automática (detectada desde netlify.toml):**
- **Base directory:** `code`
- **Build command:** `npm ci --legacy-peer-deps && npm run build`
- **Publish directory:** `out`
- **Node version:** 20.11.0

✅ No necesitas cambiar nada manualmente.

### 3. Variables de Entorno (Opcional)

**Método 1: Valores hardcoded (actual)**
- Los valores de Firebase están en el código con fallbacks
- Funciona inmediatamente sin configuración

**Método 2: Variables de entorno (recomendado para producción)**

Ir a: Site settings > Environment variables > Add a variable

Copiar valores desde `.env.example`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCV2Hy1zHQTMf0Z7fl5DaSARjrHlkrFIOk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ludlow-cc1df.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ludlow-cc1df
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ludlow-cc1df.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=606767458308
NEXT_PUBLIC_FIREBASE_APP_ID=1:606767458308:web:0787971a4bd1bb86f7ad51
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-H59H9PBK4Y
```

---

## 🚢 Deploy

### Primera vez:

1. Push del código a GitHub:
```bash
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

2. Netlify detectará el push y hará el build automáticamente

3. Esperar 2-3 minutos para el build

4. Visitar la URL asignada: `https://random-name.netlify.app`

### Deploys posteriores:

Cada push a `main` dispara un deploy automático.

---

## 🔐 Acceso al Panel de Administración

**URL:** `https://tu-sitio.netlify.app/admin`

**Credenciales:**
- Email: `fillippo@fillippo.com`
- Password: `123456789`

**Nota:** El panel de admin está configurado como página estática en `/admin/index.html`. Los redirects en `netlify.toml` aseguran el acceso correcto.

---

## ✅ Verificación Post-Deploy

### 1. Verificar Homepage
- Ir a `https://tu-sitio.netlify.app`
- Confirmar que el hero, menú, galería y footer cargan correctamente
- Verificar que las categorías del menú muestran productos

### 2. Verificar Panel de Admin
- Ir a `https://tu-sitio.netlify.app/admin`
- Iniciar sesión con credenciales
- Confirmar que las 12 categorías aparecen con productos
- Probar agregar/editar un producto de prueba

### 3. Verificar Firebase
- Ir a Firebase Console > Firestore Database
- Confirmar que los cambios desde el admin se reflejan en la base de datos

---

## 🛠️ Troubleshooting

### Error: "Admin panel shows 404"

**Causa:** Redirects mal configurados en netlify.toml

**Solución:** Verificar que los redirects de `/admin` estén **antes** del catch-all:
```toml
[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200

[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

### Error: "Build fails with peer dependency errors"

**Causa:** React 19 + Next.js 16 tienen conflictos de dependencias

**Solución:** Ya está resuelto con `--legacy-peer-deps` en el build command.

### Error: "Menu doesn't load / shows empty"

**Causa:** Datos no inicializados en Firestore

**Solución:**
```bash
cd fillipo
npm run init-data
```

### Error: "Admin can't save products"

**Causa:** Reglas de Firestore no deployadas o usuario no autenticado

**Solución:**
1. Deploy de reglas: `firebase deploy --only firestore:rules`
2. Verificar login en el admin panel
3. Verificar en Firebase Console > Authentication que el usuario existe

---

## 📊 Estructura del Proyecto

```
fillipo/
├── netlify.toml               # Configuración Netlify
├── firebase.json              # Configuración Firebase
├── firestore.rules            # Reglas de seguridad
├── firestore-init-data-fillipo.js  # Script de inicialización
├── .env.example               # Ejemplo de variables de entorno
└── code/                      # Código Next.js
    ├── app/                   # App Router
    ├── components/            # Componentes React
    ├── lib/                   # Utilidades
    └── public/
        └── admin/             # Panel de admin standalone
            ├── index.html
            ├── script.js
            ├── style.css
            └── firebase-config.js
```

---

## 🔄 Workflow de Desarrollo

### Local:
```bash
cd fillipo/code
npm run dev
```

**Admin local:** `http://localhost:3000/admin`

### Staging:
- Crear branch `staging`
- Netlify auto-deploy a URL de preview

### Producción:
- Merge a `main`
- Deploy automático a URL principal

---

## 📝 Mantenimiento

### Actualizar el menú:

1. Opción A: Desde el admin panel (recomendado)
   - Ir a `/admin`
   - Agregar/editar productos directamente

2. Opción B: Script de inicialización (para cambios masivos)
   - Editar `firestore-init-data-fillipo.js`
   - Ejecutar `npm run clean-data` (elimina todo)
   - Ejecutar `npm run init-data` (recarga datos)

### Agregar una nueva categoría:

1. Editar `firestore-init-data-fillipo.js`:
   - Agregar entrada en `categoriesMetadata`
   - Agregar colección en `initialData`

2. Ejecutar reinicialización:
```bash
npm run clean-data
npm run init-data
```

3. Editar `fillipo/code/components/menu.tsx` si necesitas estilos específicos

---

## 🎨 Personalización

### Colores:
- Editar `fillipo/code/app/globals.css`
- Color principal: Verde Fillipo `#74b354`
- Sistema de colores: OKLCH

### Imágenes:
- Logo: `fillipo/code/public/images/logo-fillipo.png`
- Hero: `fillipo/code/public/images/hero.jpg`
- Galería: `fillipo/code/public/images/gallery/*.jpg`

### Textos:
- Hero: `fillipo/code/components/hero.tsx`
- About: `fillipo/code/components/about.tsx`
- Footer: `fillipo/code/components/footer.tsx`

---

## 📞 Soporte

**Documentación relevante:**
- [PROYECTO-COMPLETADO.md](../PROYECTO-COMPLETADO.md) - Resumen técnico del proyecto
- [MIGRACION-COMPLETADA.md](./MIGRACION-COMPLETADA.md) - Detalles de la migración Firebase
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) - Guía para AI agents

**Recursos externos:**
- [Netlify Docs](https://docs.netlify.com/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

---

## ✨ Deploy Checklist

- [ ] Firestore rules deployadas (`firebase deploy --only firestore:rules`)
- [ ] Datos inicializados en Firestore (`npm run init-data`)
- [ ] Variables de entorno configuradas en Netlify (opcional)
- [ ] Código pusheado a GitHub
- [ ] Build exitoso en Netlify
- [ ] Homepage carga correctamente
- [ ] Menú muestra categorías y productos
- [ ] Admin panel accesible en `/admin`
- [ ] Admin puede crear/editar productos
- [ ] Imágenes cargan correctamente
- [ ] Responsive funciona en móvil/tablet/desktop

---

**¡Listo para producción! 🎉**
