# 🍣 Ehomakis

Aplicación web para el restaurante **Ehomakis**, especializado en sushi y cocina Nikkei. Permite a los clientes explorar la carta, armar combos personalizados, realizar pedidos en línea y hacer seguimiento en tiempo real del estado de su compra — sin necesidad de crear una cuenta. Incluye un panel administrativo para gestionar los pedidos entrantes desde cocina.

## 🎯 Objetivo

Ofrecer una experiencia de pedido digital rápida, sin fricción y accesible desde cualquier dispositivo, eliminando la barrera del registro obligatorio (modelo *guest-first*) mientras se mantiene trazabilidad completa de cada orden — desde que se arma el carrito hasta que llega a la mesa o puerta del cliente.

## ✨ Características principales

- Catálogo de productos y combos personalizables (Tablas, Rolls, Clásicos, Acevichados)
- Carrito persistente en `localStorage`, sincronizado entre el panel lateral y la página `/carrito`
- Checkout en dos pasos: datos del cliente (nombre, teléfono) → tipo de entrega y método de pago
- Identidad de invitado (`guestId`) generada automáticamente para historial sin login
- Seguimiento del pedido en tiempo real (Supabase Realtime) sin necesidad de recargar la página
- Panel administrativo protegido por login, con vista Kanban de pedidos por estado
- Actualización de estado de pedidos en tiempo real, reflejada instantáneamente en el frontend del cliente
- Filtros de fecha en el panel admin (Hoy / Esta semana / Todos)
- Row Level Security (RLS) en Supabase, con políticas específicas para invitados y administradores
- Diseño responsive, mobile-first, con paleta oscura y acentos dorados

## 🛠️ Tecnologías

| Categoría | Tecnología |
|---|---|
| Framework | Astro |
| UI interactiva | React + TypeScript |
| Estilos | Tailwind CSS |
| Backend / Base de datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth |
| Tiempo real | Supabase Realtime |
| Gestor de paquetes | pnpm |

## 📐 Arquitectura

```
UI (componentes React)
       ↓
Services (src/services/)
       ↓
Supabase (Auth + DB + Realtime)
```

La lógica de negocio y las llamadas a la API viven en la capa de **services**, nunca directamente en los componentes. Esto mantiene la UI enfocada solo en presentación y facilita testear o reemplazar la fuente de datos a futuro.

### Estructura de carpetas

```
src/
├── components/       # Componentes React organizados por dominio (cart, admin, cards, modals)
├── hooks/             # Hooks reutilizables (useCart, etc.)
├── layouts/           # Layouts de Astro
├── lib/               # Cliente de Supabase
├── pages/             # Rutas de Astro
├── services/          # Llamadas a Supabase (order.service.ts, auth.service.ts)
└── types/             # Tipos de dominio (Order, CartItem, etc.)
```

### Modelo de datos

- **orders** — datos del pedido: cliente, teléfono, método de pago, tipo de entrega, ubicación (lat/lng), total y estado
- **order_items** — productos o combos incluidos en el pedido, con precio y nombre denormalizados
- **order_item_details** — variedades elegidas dentro de un combo (ej. piezas de un "Tabla #2")

## 🚀 Cómo correr el proyecto

```bash
pnpm install
pnpm dev
```

Variables de entorno necesarias en `.env`:

```env
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

---

## 📋 TODO — Roadmap hacia una versión más ambiciosa

### Notificaciones
- [ ] Notificación push o por WhatsApp al cliente cuando cambia el estado de su pedido
- [ ] Alerta sonora/visual en el panel admin al recibir un pedido nuevo
- [ ] Email de confirmación automático al crear el pedido

### Cuentas de usuario
- [ ] Login opcional post-compra, asociando el `guestId` a una cuenta real
- [ ] Historial de pedidos persistente entre dispositivos
- [ ] Direcciones guardadas para checkout más rápido

### Operación del restaurante
- [ ] Dashboard de métricas: pedidos del día, ticket promedio, producto más vendido
- [ ] Tiempo estimado de preparación/entrega visible para el cliente
- [ ] Restricción de pedidos fuera de horario de atención
- [ ] Gestión de disponibilidad de productos ("agotado" sin eliminar del catálogo)

### Pagos
- [ ] Integración con pasarela real (Culqi / Niubiz)
- [ ] Verificación automática de pagos Yape/Plin vía webhook

### Delivery
- [ ] Cálculo de costo de envío según distancia (lat/lng ya disponibles)
- [ ] Validación de radio de cobertura antes del checkout
- [ ] Mapa en el panel admin con ubicación de pedidos con delivery pendiente

### Calidad y resiliencia
- [ ] Rate limiting en la creación de pedidos
- [ ] Manejo de reconexión de Supabase Realtime ante pérdida de conexión
- [ ] Tests automatizados del flujo crítico (crear orden → verificar en base de datos)

### SEO y performance
- [ ] `noindex` en rutas `/carrito` y `/admin`
- [ ] Migrar agregaciones de métricas a vistas SQL o funciones de Postgres

---

Proyecto desarrollado por Kal Zambrano.