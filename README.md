# Sistema de Reservas

Una aplicación web moderna para gestionar reservas y servicios con separación de roles entre usuarios y administradores.

## Descripción

Sistema de Reservas es una plataforma completa que permite:
- **Usuarios**: Navegar servicios, reservar horarios disponibles y gestionar sus reservas
- **Administradores**: Gestionar servicios, usuarios, horarios y visualizar todas las reservas

## Características

### Para Usuarios
- 🔐 Autenticación segura con Firebase
- 📅 Calendario interactivo para seleccionar fechas
- ⏰ Selector de horarios disponibles
- 📝 Formulario de reserva simplificado
- 📧 Confirmación de reservas por email
- 👤 Gestión de perfil y mis reservas

### Para Administradores
- 📊 Dashboard con estadísticas de reservas
- 👥 Gestión completa de usuarios
- 🛠️ Creación y edición de servicios
- ⏱️ Configuración de horarios disponibles
- 📅 Visualización de reservas en calendario
- 🔍 Búsqueda y filtrado de reservas

## Stack Tecnológico

- **Frontend**: React 19 + Vite
- **Estilos**: Tailwind CSS
- **Estado Global**: Zustand
- **Formularios**: Formik + Yup
- **Base de Datos**: Firebase
- **Email**: EmailJS
- **Calendario**: FullCalendar + React Calendar
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Enrutamiento**: React Router DOM
- **Tooltips**: Tippy.js

## Instalación

1. Clona el repositorio:
```bash
git clone <https://github.com/vandeson2/Sistema-de-reservas.git>
cd sistema-reservas
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto:
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

## Uso

### Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Build para Producción
```bash
npm run build
```

### Preview de Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── admin/          # Componentes de administrador
│   │   ├── form/       # Formularios de administración
│   │   └── modals/     # Modales de administración
│   └── user/           # Componentes de usuario
├── context/            # Context API para autenticación
├── firebase/           # Configuración de Firebase
├── pages/              # Páginas principales
│   ├── admin/          # Páginas de administrador
│   └── user/           # Páginas de usuario
├── routes/             # Configuración de rutas
├── services/           # Servicios (API, autenticación, email)
├── store/              # Zustand stores (estado global)
└── utils/              # Funciones utilitarias
```

## Flujo de Autenticación

1. Usuario realiza login en la página de Login
2. Se valida con Firebase Authentication
3. Se determina el rol (usuario/admin) desde Firestore
4. Se redirige según el rol a su dashboard correspondiente
5. Las rutas privadas protegen el acceso no autorizado

## Gestión de Estado

La aplicación utiliza **Zustand** para manejar el estado global:
- `authStore`: Información de autenticación y usuario
- `bookingStore`: Datos de reservas en progreso
- `servicesStore`: Lista de servicios disponibles

## Consideraciones de Seguridad

- ✅ Rutas protegidas con PrivateRoute
- ✅ Validación de formularios con Yup
- ✅ Autenticación con Firebase
- ✅ Variables de entorno protegidas
- ✅ Roles y permisos en base de datos

## Funcionalidades Principales

### Reserva de Servicios
1. Usuario selecciona servicio
2. Elige fecha en calendario
3. Selecciona horario disponible
4. Completa formulario de reserva
5. Recibe confirmación por email

### Gestión Administrativa
1. Crear nuevos servicios
2. Asignar horarios disponibles
3. Gestionar usuarios
4. Visualizar todas las reservas
5. Buscar y filtrar información

## Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo licencia MIT.

## Contacto

Para más información o reportar problemas, por favor abre un issue en el repositorio.
