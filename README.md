# 🚀 BetDay Lite - Reto Técnico

Solución para el reto **BetDay Lite** enfocada en rendimiento móvil, SEO avanzado y arquitectura escalable utilizando **Next.js 16**.

## 💡 Decisiones y Valor Agregado

- **Arquitectura de Componentes (Storybook)**: Implementé un sistema de diseño atómico aislado en **Storybook**. Esto permitió desarrollar y documentar componentes base (`Box`, `Typography`, `Ticket`) de forma independiente, asegurando consistencia visual y reutilización.
- **SSR & SEO Dinámico**: Utilicé el App Router para manejar metadatos dinámicos, **Sitemap.xml** y **Robots.txt** generados al vuelo. Incluí datos estructurados (**JSON-LD**) para optimizar la indexación de perfiles y tickets de apuesta.
- **Integración con Supabase**: Gestión eficiente del historial de apuestas y estados en tiempo real (Pending, Won, Lost).
- **PWA Ready**: Configuración completa de manifiesto e iconografía para una experiencia nativa en Android e iOS.

## 🛠️ Tecnologías utilizadas

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack)
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/) (Credentials Provider)
- **Base de Datos**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Estilos**: Tailwind CSS & Lucide Icons
- **SEO & Metadatos**: Metadata API, JSON-LD estructurado, Sitemap dinámico y Robots.txt.
- **Notificaciones**: Sonner

---

## 📦 Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone -b main git@github.com:Rencas1207/betday-lite.git
    cd betday-lite
    ```

2.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3.  **Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz y configura las siguientes claves:

    ```env
    # Base de Datos (Supabase)
    NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=tu_key_anonima

    # Autenticación
    NEXTAUTH_SECRET=tu_secreto_para_tokens
    NEXTAUTH_URL=http://localhost:3000

    # SEO
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

4.  **Ejecutar en desarrollo:**
    ```bash
    pnpm dev
    ```

---

## 🔑 Credenciales de Acceso (Prueba)

| Usuario    | Contraseña       | Perfil                                    |
| :--------- | :--------------- | :---------------------------------------- |
| `user_01`  | `1234BetDayLite` | Cuenta con historial de apuestas activas. |
| `new_user` | `1234BetDayLite` | Cuenta nueva sin apuestas registradas.    |

---

## 🎯 Características Implementadas

- **Página Principal (/)**: Cartelera de partidos en tiempo real con sistema de selección de cuotas dinámico.
- **Historial de Apuestas (/profile)**: Gestión de estados (PENDING, WON, LOST) mediante integración con Supabase y paginación optimizada.
- **Comprobante Digital (/bets/[betId])**: Vista detallada de apuestas con diseño de ticket físico, incluyendo cuotas finales y premios potenciales.
- **SEO Avanzado**:
  - Generación automática de `sitemap.xml` mediante rutas dinámicas de Next.js.
  - Implementación de **JSON-LD** para mejorar la indexación de la WebApp y los perfiles de usuario.
  - Configuración completa de Favicons y Web Manifest para soporte PWA.
- **Rendimiento**: Configurado con **Turbopack** para tiempos de compilación y respuesta ultra rápidos.

---

## 🚀 Despliegue en Producción

La aplicación se encuentra desplegada y optimizada en **Vercel**:

- **URL del Proyecto**: [https://betday-lite.vercel.app](https://betday-lite.vercel.app)
- **Sitemap**: [https://betday-lite.vercel.app/sitemap.xml](https://betday-lite.vercel.app/sitemap.xml)
- **Robots**: [https://betday-lite.vercel.app/robots.txt](https://betday-lite.vercel.app/robots.txt)

---

## 📸 Screenshots
<img width="2369" height="1288" alt="image" src="https://github.com/user-attachments/assets/3edf6653-d100-4786-9c98-b66fa61ab15a" />

<img width="3064" height="1287" alt="image" src="https://github.com/user-attachments/assets/bc0018a0-5679-4a9c-85d7-39ac449eebe9" />

<img width="2360" height="1270" alt="image" src="https://github.com/user-attachments/assets/5cce8b8e-c162-4c34-8ebf-a61b6687934b" />
<img width="2265" height="1253" alt="image" src="https://github.com/user-attachments/assets/a4ed2377-84b6-48a9-9830-b860d5dcafc4" />


<img width="1895" height="1273" alt="image" src="https://github.com/user-attachments/assets/a5e96b86-e859-4d11-b182-2977c0422a16" />


