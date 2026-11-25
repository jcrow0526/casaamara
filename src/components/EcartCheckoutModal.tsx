import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CreditCard,
  Building2,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { formatMXN } from '../data/catalog';
import {
  calculateCartTotals,
  createEcartCheckout,
  type CartItem,
  type CustomerCheckoutInfo,
  type EcartCheckoutResult,
} from '../services/ecart';

interface EcartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const EcartCheckoutModal: React.FC<EcartCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [form, setForm] = useState<CustomerCheckoutInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rfc: '',
    address1: '',
    neighborhood: '',
    city: 'Hermosillo',
    stateCode: 'SON',
    postalCode: '83000',
    paymentMethod: 'card_msi',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EcartCheckoutResult | null>(null);

  const { total } = calculateCartTotals(items);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createEcartCheckout(items, form);
      setResult(res);
      if (res.mode === 'live' && res.payLink) {
        window.location.href = res.payLink;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (result) {
      onOrderCompleted();
      setResult(null);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-end justify-center bg-[#1C1A17]/75 p-0 backdrop-blur-md sm:items-center sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-[#C2B8A8] bg-[#F4F1EC] shadow-2xl sm:rounded-2xl"
          >
            {/* Header en piedra basalto */}
            <div className="stone-dark-surface relative flex items-center justify-between px-6 py-5 text-[#F4F1EC]">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.24em] text-[#D4B26E] uppercase">
                  Pago Seguro · Tarjetas, MSI y SPEI
                </p>
                <h2 className="font-serif text-2xl">Finalizar Pedido — Casa Amara</h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar checkout"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C2925] text-[#F4F1EC]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#D4CCC0] bg-[#EAE5DD] px-4 py-3 text-xs">
                    <span className="font-medium text-[#46413A]">
                      {items.reduce((s, i) => s + i.quantity, 0)} artículo(s) en tu pedido
                    </span>
                    <span className="font-serif text-xl font-bold text-[#1C1A17]">
                      Total: {formatMXN(total)} MXN
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">Nombre *</label>
                      <input
                        required
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="Carlos"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">Apellidos *</label>
                      <input
                        required
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        placeholder="Mendoza"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">
                        Correo electrónico *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="cliente@correo.com"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">Teléfono *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="662 123 4567"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label className="text-xs font-semibold text-[#46413A]">
                        Calle y Número *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.address1}
                        onChange={(e) => setForm({ ...form, address1: e.target.value })}
                        placeholder="Blvd. Kino #145"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#46413A]">
                        Código Postal *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                        placeholder="83010"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#46413A]">Colonia</label>
                      <input
                        type="text"
                        value={form.neighborhood}
                        onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                        placeholder="Pitic"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#46413A]">Ciudad *</label>
                      <input
                        required
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#46413A]">
                        RFC (Opcional)
                      </label>
                      <input
                        type="text"
                        value={form.rfc}
                        onChange={(e) => setForm({ ...form, rfc: e.target.value })}
                        placeholder="Para factura"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-white px-3.5 py-2 text-sm uppercase focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#46413A]">
                      Método de Pago Preferido
                    </label>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {[
                        {
                          id: 'card_msi',
                          label: 'Tarjeta / MSI',
                          sub: 'Hasta 12 MSI',
                          icon: CreditCard,
                        },
                        {
                          id: 'spei',
                          label: 'Transferencia SPEI',
                          sub: 'Confirmación rápida',
                          icon: Building2,
                        },
                        {
                          id: 'cash',
                          label: 'Pago en Efectivo',
                          sub: 'OXXO / Tiendas',
                          icon: Banknote,
                        },
                      ].map((m) => {
                        const Icon = m.icon;
                        const active = form.paymentMethod === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() =>
                              setForm({
                                ...form,
                                paymentMethod: m.id as CustomerCheckoutInfo['paymentMethod'],
                              })
                            }
                            className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition ${
                              active
                                ? 'border-[#1C1A17] bg-[#1C1A17] text-[#F4F1EC]'
                                : 'border-[#C2B8A8] bg-white text-[#1C1A17] hover:border-[#787166]'
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 shrink-0 ${
                                active ? 'text-[#D4B26E]' : 'text-[#7C4D25]'
                              }`}
                            />
                            <div>
                              <p className="text-xs font-bold">{m.label}</p>
                              <p
                                className={`text-[10px] ${
                                  active ? 'text-[#C2B8A8]' : 'text-[#6B645A]'
                                }`}
                              >
                                {m.sub}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3.5 text-sm font-semibold text-[#F4F1EC] shadow-lg transition hover:bg-[#2C2925] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#D4B26E]" />
                        <span>Procesando tu pedido…</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4 text-[#D4B26E]" />
                        <span>Confirmar y Continuar al Pago · {formatMXN(total)}</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-xl border border-[#2F6B48]/30 bg-[#2F6B48]/10 p-4">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#2F6B48]" />
                    <div>
                      <p className="font-serif text-xl font-semibold text-[#1C1A17]">
                        ¡Pedido Registrado! Folio {result.orderId}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#46413A]">
                        Hemos recibido los detalles de tu compra en Hermosillo. Nuestro equipo te
                        compartirá tu enlace de pago y coordinará tu entrega o instalación.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '526624284304'}?text=${encodeURIComponent(
                        `Hola Casa Amara, acabo de registrar mi pedido ${result.orderId} por ${formatMXN(total)} MXN a nombre de ${form.firstName} ${form.lastName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#2F6B48]/40 bg-[#2F6B48]/10 px-4 py-2 text-xs font-semibold text-[#2F6B48] hover:bg-[#2F6B48]/20"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Confirmar por WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1A17] px-5 py-2 text-xs font-semibold text-[#F4F1EC]"
                    >
                      <span>Volver a la tienda</span>
                      <ExternalLink className="h-3.5 w-3.5 text-[#D4B26E]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
