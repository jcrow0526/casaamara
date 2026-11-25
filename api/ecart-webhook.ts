/**
 * Webhook receptor para notificaciones asíncronas de Ecart Pay
 * (Confirmación de pago con tarjeta / MSI, SPEI o efectivo).
 * Configurar en Ecart Pay como: https://casamaraestudio.com/api/ecart-webhook
 */

interface WebhookRequest {
  method?: string;
  body: {
    id?: string;
    status?: string;
    total?: number;
    currency?: string;
    customer?: { email?: string; first_name?: string };
    metadata?: Record<string, unknown>;
  };
}

interface WebhookResponse {
  status: (code: number) => { json: (data: unknown) => void };
}

export default async function handler(req: WebhookRequest, res: WebhookResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const event = req.body;

  // Aquí puedes guardar el pedido pagado en tu base de datos o disparar
  // un correo/notificación de WhatsApp al equipo de Casa Amara en Hermosillo.
  console.log('[Ecart Pay Webhook] Evento recibido:', {
    orderId: event?.id,
    status: event?.status,
    total: event?.total,
    currency: event?.currency,
  });

  return res.status(200).json({ received: true });
}
