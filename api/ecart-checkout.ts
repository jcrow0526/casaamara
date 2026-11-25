/**
 * Serverless / Node API Route listo para Vercel, Netlify o Express.
 * Conecta directamente el carrito de casamaraestudio.com con Ecart Pay API.
 *
 * Variables de entorno requeridas:
 * - ECART_ENV: "sandbox" | "production"
 * - ECART_PUBLIC_KEY
 * - ECART_PRIVATE_KEY
 */

interface ApiRequest {
  method?: string;
  body: Record<string, unknown>;
}

interface ApiResponse {
  status: (code: number) => { json: (data: unknown) => void };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const publicKey = process.env.ECART_PUBLIC_KEY;
  const privateKey = process.env.ECART_PRIVATE_KEY;
  const isProd = process.env.ECART_ENV === 'production';

  if (!publicKey || !privateKey) {
    return res.status(503).json({
      error: 'ECART_KEYS_MISSING',
      message: 'Configura ECART_PUBLIC_KEY y ECART_PRIVATE_KEY en las variables de entorno.',
    });
  }

  const baseUrl = isProd
    ? 'https://ecartpay.com/api'
    : 'https://sandbox.ecartpay.com/api';

  try {
    // 1. Obtener token Bearer JWT de Ecart Pay usando Public + Private Key
    const basicAuth = Buffer.from(`${publicKey}:${privateKey}`).toString('base64');
    const authRes = await fetch(`${baseUrl}/authorizations/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!authRes.ok) {
      const errText = await authRes.text();
      return res.status(502).json({ error: 'ECART_AUTH_FAILED', details: errText });
    }

    const authData = (await authRes.json()) as { token?: string };

    // 2. Crear la orden en Ecart Pay y obtener `pay_link`
    const orderRes = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...req.body,
        notify_url: process.env.ECART_NOTIFY_URL || 'https://casamaraestudio.com/api/ecart-webhook',
        redirect_url:
          process.env.ECART_REDIRECT_URL || 'https://casamaraestudio.com/checkout/confirmacion',
      }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      return res.status(orderRes.status).json({ error: 'ECART_ORDER_FAILED', details: orderData });
    }

    return res.status(200).json(orderData);
  } catch (error) {
    return res.status(500).json({
      error: 'INTERNAL_ECART_ERROR',
      message: error instanceof Error ? error.message : 'Error conectando con Ecart Pay',
    });
  }
}
