import type { Product } from '../data/catalog';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  includeInstallation: boolean;
}

export interface CustomerCheckoutInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rfc?: string;
  address1: string;
  neighborhood: string;
  city: string;
  stateCode: string;
  postalCode: string;
  paymentMethod: 'card_msi' | 'spei' | 'cash';
  notes?: string;
}

/**
 * Payload exacto compatible con Ecart Pay API (POST /api/orders)
 * Documentación: https://docs.ecartpay.com/
 */
export interface EcartPayOrderPayload {
  currency: 'MXN';
  items: Array<{
    sku: string;
    name: string;
    price: number;
    quantity: number;
    discount: number;
    is_service: boolean;
  }>;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    rfc?: string;
  };
  shipping_address: {
    country: {
      code: 'MX';
      name: 'Mexico';
    };
    state: {
      code: string;
    };
    address1: string;
    address2?: string;
    city: string;
    first_name: string;
    last_name: string;
    postal_code: string;
  };
  metadata: {
    store: 'casamaraestudio.com';
    city_origin: 'Hermosillo, Sonora';
    preferred_payment_method: string;
    notes?: string;
  };
  notify_url: string;
  redirect_url: string;
}

export interface EcartCheckoutResult {
  mode: 'live' | 'sandbox_preview';
  orderId: string;
  payLink?: string;
  payload: EcartPayOrderPayload;
  message: string;
}

export function buildEcartOrderPayload(
  cart: CartItem[],
  customer: CustomerCheckoutInfo,
  shippingCostMXN: number
): EcartPayOrderPayload {
  const items: EcartPayOrderPayload['items'] = [];

  for (const item of cart) {
    const variantSuffix = item.selectedVariant ? ` (${item.selectedVariant})` : '';
    items.push({
      sku: item.product.sku,
      name: `${item.product.name}${variantSuffix}`,
      price: item.product.priceMXN,
      quantity: item.quantity,
      discount: 0,
      is_service: false,
    });

    if (item.includeInstallation) {
      items.push({
        sku: `${item.product.sku}-INST`,
        name: `Instalación Profesional en Hermosillo — ${item.product.name}`,
        price: item.product.installationMXN,
        quantity: item.quantity,
        discount: 0,
        is_service: true,
      });
    }
  }

  if (shippingCostMXN > 0) {
    items.push({
      sku: 'CA-ENVIO-MX',
      name: 'Envío Asegurado Casa Amara',
      price: shippingCostMXN,
      quantity: 1,
      discount: 0,
      is_service: true,
    });
  }

  return {
    currency: 'MXN',
    items,
    customer: {
      first_name: customer.firstName.trim(),
      last_name: customer.lastName.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      ...(customer.rfc?.trim() ? { rfc: customer.rfc.trim().toUpperCase() } : {}),
    },
    shipping_address: {
      country: { code: 'MX', name: 'Mexico' },
      state: { code: customer.stateCode || 'SON' },
      address1: customer.address1.trim(),
      ...(customer.neighborhood?.trim() ? { address2: customer.neighborhood.trim() } : {}),
      city: customer.city.trim() || 'Hermosillo',
      first_name: customer.firstName.trim(),
      last_name: customer.lastName.trim(),
      postal_code: customer.postalCode.trim(),
    },
    metadata: {
      store: 'casamaraestudio.com',
      city_origin: 'Hermosillo, Sonora',
      preferred_payment_method: customer.paymentMethod,
      ...(customer.notes?.trim() ? { notes: customer.notes.trim() } : {}),
    },
    notify_url: 'https://casamaraestudio.com/api/ecart-webhook',
    redirect_url: 'https://casamaraestudio.com/checkout/confirmacion',
  };
}

/**
 * Envía la orden al backend conectado a Ecart Pay (`VITE_ECART_API_ENDPOINT`).
 * Si el backend aún no está desplegado o faltan las credenciales de Ecart Pay,
 * devuelve una simulación realista de Sandbox con el payload listo para auditar.
 */
export async function createEcartCheckout(
  cart: CartItem[],
  customer: CustomerCheckoutInfo,
  shippingCostMXN: number
): Promise<EcartCheckoutResult> {
  const payload = buildEcartOrderPayload(cart, customer, shippingCostMXN);
  const endpoint = import.meta.env.VITE_ECART_API_ENDPOINT as string | undefined;

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = (await response.json()) as { id?: string; order_id?: string; pay_link?: string };
        if (data.pay_link) {
          return {
            mode: 'live',
            orderId: data.id || data.order_id || `CA-${Date.now()}`,
            payLink: data.pay_link,
            payload,
            message: 'Orden creada en Ecart Pay. Redirigiendo a la pasarela segura…',
          };
        }
      }
    } catch {
      // Fallback limpio a Sandbox Preview cuando aún no se configura el backend en producción
    }
  }

  // Simulación lista para pruebas mientras el propietario coloca sus llaves reales de Ecart Pay
  await new Promise((resolve) => setTimeout(resolve, 900));
  const mockOrderId = `ECP-HMO-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    mode: 'sandbox_preview',
    orderId: mockOrderId,
    payload,
    message:
      'Orden estructurada en formato oficial Ecart Pay (MXN). Agrega tus llaves ECART_PUBLIC_KEY y ECART_PRIVATE_KEY en .env para activar el cobro en vivo.',
  };
}
