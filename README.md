# GraduationOS 🎓

> La suite de gestión definitiva para automatizar y coordinar graduaciones universitarias de principio a fin.

**GraduationOS** es una plataforma premium diseñada para digitalizar por completo la logística de ceremonias y eventos académicos universitarios. Este repositorio aloja la landing page interactiva del producto, desarrollada con un diseño minimalista de alta gama estilo Apple, perfecta para la presentación comercial y académica del proyecto.

---

## ✨ Características Principales

*   **El "Mapa Fiel" de Asientos:** Plano visual interactivo y sincronizado en tiempo real. Graduados y acompañantes seleccionan sus butacas del teatro o auditorio de forma autónoma, evitando solapamientos y disputas logísticas.
*   **Control de Pagos y Justificantes:** Gestión digitalizada de cobros y comprobantes de matrícula. Los estudiantes cargan sus documentos de pago de tasas directamente en el portal y los administradores los validan en la consola con un clic.
*   **Tickets Inteligentes con QR:** Generación de entradas dinámicas con firmas de seguridad. Disponibles en formato PDF para impresión y en formato digital integrable con **Apple Wallet / Google Wallet**.
*   **Orla Digital Interactiva:** Directorio y anuario digital interactivo donde los alumnos configuran su foto académica, biografía y perfiles profesionales de redes (LinkedIn, GitHub).
*   **Retransmisión Streaming HD:** Reproductor de vídeo en vivo integrado directamente en el portal del evento para que familiares a distancia sigan la ceremonia con un solo clic.
*   **Consola de Administración Central:** Panel de control para el equipo organizador que proporciona métricas de aforo en vivo, validación por lotes de justificantes, escáner rápido de acceso y reasignación de asientos.

---

## 🛠️ Stack Tecnológico

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) con compilación ultrarrápida mediante Turbopack.
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un desarrollo tipado y seguro.
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS para una interfaz premium minimalista, responsiva y de alto contraste (Dark Mode puro).
*   **Iconos:** [Lucide React](https://lucide.dev/) para recursos visuales vectoriales ligeros.
*   **Notificaciones:** [React Hot Toast](https://react-hot-toast.com/) para micro-animaciones y feedback interactivo del cliente.

---

## 🚀 Despliegue y Ejecución Local

Sigue estos sencillos pasos para levantar y probar la landing page en tu máquina local:

### Requisitos Previos

*   Node.js 18.0 o superior instalado.
*   npm o yarn configurado.

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/javicadev/GraduationOS.git
    cd GraduationOS
    ```

2.  **Instala las dependencias de la aplicación:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la landing page interactiva.

4.  **Compila el sitio para producción:**
    ```bash
    npm run build
    ```

---

## 📦 Estructura del Proyecto

*   `src/app/page.tsx`: Landing page comercial interactiva (cuenta con simuladores en vivo del Mapa Fiel, Wallet y Consola Admin).
*   `src/app/layout.tsx` & `globals.css`: Estilos globales y fuentes optimizadas del sistema Apple.
*   `public/`: Recursos gráficos, iconos y sonidos del proyecto.
*   `graduationos-app-full/` (Excluido mediante `.gitignore`): Respaldo completo y privado con el backend real en Firebase, servicios de correo, generadores de PDF/Wallet y la lógica completa de alumno/administrador.

---

## 🧑‍💻 Desarrollador del Proyecto

*   **Javier &bull; @javicadev**
*   **Email de contacto:** hello@javicadev.com
*   **Telegram:** [@javicadev](https://t.me/javicadev)

---

Desarrollado y mantenido por [@javicadev](https://github.com/javicadev).
