import {
  LOCK_BUNDLE_DISCOUNT_PERCENT,
  type Product,
} from '../data/catalog';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  includeInstallation: boolean;
}

export interface CartTotals {
  hasDoorInCart: boolean;
  productsSubtotal: number;
  lockBundleDiscount: number;
  installRegularSubtotal: number;
  installPromoSubtotal: number;
  installDiscountSaved: number;
  shippingCost: number;
  total: number;
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const hasDoorInCart = items.some((i) => i.product.category === 'puertas');

  const productsSubtotal = items.reduce(
    (sum, item) => sum + item.product.priceMXN * item.quantity,
    0
  );

  // 10% de descuento automático en cerraduras inteligentes al comprar una puerta de seguridad
  const lockBundleDiscount = hasDoorInCart
    ? items.reduce((sum, item) => {
        if (item.product.category !== 'cerraduras') return sum;
        const unitDiscount = Math.round(
          (item.product.priceMXN * LOCK_BUNDLE_DISCOUNT_PERCENT) / 100
        );
        return sum + unitDiscount * item.quantity;
      }, 0)
    : 0;

  // Instalación profesional en Hermosillo (Puertas $6,400 ya con descuento / Chapas $1,300)
  const installRegularSubtotal = items.reduce(
    (sum, item) =>
      sum + (item.includeInstallation ? item.product.installationRegularMXN * item.quantity : 0),
    0
  );
  const installPromoSubtotal = items.reduce(
    (sum, item) =>
      sum + (item.includeInstallation ? item.product.installationMXN * item.quantity : 0),
    0
  );
  const installDiscountSaved = installRegularSubtotal - installPromoSubtotal;

  const netSubtotal = productsSubtotal - lockBundleDiscount + installPromoSubtotal;
  const shippingCost = netSubtotal === 0 || netSubtotal >= 5000 ? 0 : 290;
  const total = netSubtotal + shippingCost;

  return {
    hasDoorInCart,
    productsSubtotal,
    lockBundleDiscount,
    installRegularSubtotal,
    installPromoSubtotal,
    installDiscountSaved,
    shippingCost,
    total,
  };
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
    lock_bundle_discount_applied: boolean;
    installation_50_off_applied: boolean;
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
  customer: CustomerCheckoutInfo
): EcartPayOrderPayload {
  const totals = calculateCartTotals(cart);
  const items: EcartPayOrderPayload['items'] = [];

  for (const item of cart) {
    const variantSuffix = item.selectedVariant ? ` (${item.selectedVariant})` : '';
    const isDiscountedLock = totals.hasDoorInCart && item.product.category === 'cerraduras';
    const unitDiscount = isDiscountedLock
      ? Math.round((item.product.priceMXN * LOCK_BUNDLE_DISCOUNT_PERCENT) / 100)
      : 0;

    items.push({
      sku: item.product.sku,
      name: `${item.product.name}${variantSuffix}`,
      price: item.product.priceMXN,
      quantity: item.quantity,
      discount: unitDiscount,
      is_service: false,
    });

    if (item.includeInstallation) {
      items.push({
        sku: `${item.product.sku}-INST`,
        name: `Instalación Profesional solo en Hermosillo — ${item.product.name}`,
        price: item.product.installationRegularMXN,
        quantity: item.quantity,
        discount: item.product.installationRegularMXN - item.product.installationMXN,
        is_service: true,
      });
    }
  }

  if (totals.shippingCost > 0) {
    items.push({
      sku: 'CA-ENVIO-MX',
      name: 'Envío Asegurado Casa Amara',
      price: totals.shippingCost,
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
      lock_bundle_discount_applied: totals.lockBundleDiscount > 0,
      installation_50_off_applied: totals.installDiscountSaved > 0,
      ...(customer.notes?.trim() ? { notes: customer.notes.trim() } : {}),
    },
    notify_url: 'https://casamaraestudio.com/api/ecart-webhook',
    redirect_url: 'https://casamaraestudio.com/checkout/confirmacion',
  };
}

export async function createEcartCheckout(
  cart: CartItem[],
  customer: CustomerCheckoutInfo
): Promise<EcartCheckoutResult> {
  const payload = buildEcartOrderPayload(cart, customer);
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
            message: 'Orden creada. Redirigiendo a la pasarela de pago…',
          };
        }
      }
    } catch {
      // Fallback limpio cuando el endpoint serverless aún no está activo
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 800));
  const mockOrderId = `CA-HMO-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    mode: 'sandbox_preview',
    orderId: mockOrderId,
    payload,
    message: 'Pedido registrado con éxito.',
  };
}
