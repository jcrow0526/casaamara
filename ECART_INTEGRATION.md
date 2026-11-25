# Conexión de Casa Amara (`casamaraestudio.com`) con Ecart Pay

La tienda ya está completamente estructurada para cobrar en **MXN** con **Tarjetas (hasta 12 MSI)**, **SPEI** y **Efectivo** mediante **Ecart Pay**.

## Archivos clave incluidos
- `src/data/catalog.ts`: Catálogo con las 5 mejores puertas de seguridad y 5 mejores cerraduras inteligentes de MercadoLibre México, ya calculadas con **+50% de utilidad** (`mercadoLibreBaseMXN * 1.50`).
- `src/services/ecart.ts`: Construye el payload oficial `POST /api/orders` de Ecart Pay (productos, SKU, instalación opcional en Hermosillo, dirección MX, RFC, `notify_url` y `redirect_url`).
- `api/ecart-checkout.ts`: Endpoint serverless (Vercel / Netlify / Node) que autentica con tus llaves de Ecart Pay y devuelve el `pay_link` seguro.
- `api/ecart-webhook.ts`: Receptor de webhooks de confirmación de pago en `https://casamaraestudio.com/api/ecart-webhook`.
- `.env.example`: Plantilla de variables de entorno.

## Pasos para activar cobros en vivo
1. Ingresa a tu panel de **Ecart Pay → Integraciones → API** y obtén tu `Public Key` y `Private Key`.
2. Despliega el proyecto en **Vercel** (o tu servidor Node) apuntando tu dominio `casamaraestudio.com`.
3. Agrega estas variables de entorno en tu plataforma de hosting:
   - `VITE_ECART_API_ENDPOINT=/api/ecart-checkout`
   - `ECART_ENV=production` *(usa `sandbox` para pruebas)*
   - `ECART_PUBLIC_KEY=tu_public_key`
   - `ECART_PRIVATE_KEY=tu_private_key`
   - `ECART_REDIRECT_URL=https://casamaraestudio.com/checkout/confirmacion`
   - `ECART_NOTIFY_URL=https://casamaraestudio.com/api/ecart-webhook`
   - `VITE_WHATSAPP_NUMBER=52662XXXXXXX` *(tu número real de WhatsApp en Hermosillo)*
4. En el panel de Ecart Pay, registra el webhook: `https://casamaraestudio.com/api/ecart-webhook`.
