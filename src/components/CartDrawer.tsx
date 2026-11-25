import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Wrench,
  CreditCard,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { formatMXN } from '../data/catalog';
import type { CartItem } from '../services/ecart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onToggleInstall: (index: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onToggleInstall,
  onRemoveItem,
  onProceedCheckout,
}) => {
  const productsSubtotal = items.reduce(
    (sum, item) => sum + item.product.priceMXN * item.quantity,
    0
  );
  const installSubtotal = items.reduce(
    (sum, item) =>
      sum + (item.includeInstallation ? item.product.installationMXN * item.quantity : 0),
    0
  );
  const subtotal = productsSubtotal + installSubtotal;
  const shippingCost = subtotal === 0 || subtotal >= 5000 ? 0 : 290;
  const total = subtotal + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex justify-end bg-[#1C1A17]/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col border-l border-[#C2B8A8] bg-[#F4F1EC] shadow-2xl"
          >
            {/* Header en piedra basalto */}
            <div className="stone-dark-surface relative flex items-center justify-between px-6 py-5 text-[#F4F1EC]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#D4B26E]" />
                <div>
                  <h2 className="font-serif text-xl tracking-wide">Tu Carrito Casa Amara</h2>
                  <p className="text-[11px] text-[#C2B8A8]">
                    Envío local en Hermosillo y a todo México
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar carrito"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C2925] text-[#F4F1EC] transition hover:bg-[#3B3731]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Lista de artículos */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C2B8A8] bg-[#EAE5DD]">
                    <ShoppingBag className="h-7 w-7 text-[#787166]" />
                  </div>
                  <p className="mt-4 font-serif text-2xl text-[#1C1A17]">Tu carrito está vacío</p>
                  <p className="mt-1 max-w-xs text-xs text-[#6B645A]">
                    Explora nuestras 5 puertas de seguridad y 5 cerraduras inteligentes con envío e
                    instalación en Hermosillo.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedVariant || 'std'}-${idx}`}
                      className="rounded-2xl border border-[#D4CCC0] bg-[#FAF8F5] p-3.5"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-20 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 font-serif text-base leading-tight font-semibold text-[#1C1A17]">
                              {item.product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(idx)}
                              aria-label="Eliminar artículo"
                              className="text-[#787166] transition hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {item.selectedVariant && (
                            <p className="mt-0.5 text-[11px] font-medium text-[#7C4D25]">
                              {item.selectedVariant}
                            </p>
                          )}

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-bold text-[#1C1A17]">
                              {formatMXN(item.product.priceMXN * item.quantity)}
                            </span>
                            <div className="flex items-center gap-1.5 rounded-full border border-[#C2B8A8] bg-[#F4F1EC] px-1.5 py-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(idx, -1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-[#1C1A17] hover:bg-[#DBD4C8]"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-4 text-center text-xs font-bold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(idx, 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-[#1C1A17] hover:bg-[#DBD4C8]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <label className="mt-2.5 flex cursor-pointer items-center justify-between border-t border-[#E2DCD2] pt-2 text-[11px] text-[#57524A]">
                        <span className="flex items-center gap-1.5">
                          <input
                            type="checkbox"
                            checked={item.includeInstallation}
                            onChange={() => onToggleInstall(idx)}
                            className="accent-[#7C4D25]"
                          />
                          <Wrench className="h-3 w-3 text-[#7C4D25]" />
                          Instalación en Hermosillo
                        </span>
                        <span className="font-semibold text-[#7C4D25]">
                          +{formatMXN(item.product.installationMXN * item.quantity)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Totales + Checkout Ecart Pay */}
            {items.length > 0 && (
              <div className="border-t border-[#D4CCC0] bg-[#EAE5DD] p-5">
                <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#F4F1EC] px-3 py-2 text-[11px] text-[#46413A]">
                  <Truck className="h-4 w-4 shrink-0 text-[#7C4D25]" />
                  {shippingCost === 0 ? (
                    <span>
                      <strong>¡Envío gratis desbloqueado</strong> en Hermosillo!
                    </span>
                  ) : (
                    <span>
                      Te faltan <strong>{formatMXN(5000 - subtotal)}</strong> para envío gratis en
                      Hermosillo.
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-[#57524A]">
                  <div className="flex justify-between">
                    <span>Productos</span>
                    <span>{formatMXN(productsSubtotal)}</span>
                  </div>
                  {installSubtotal > 0 && (
                    <div className="flex justify-between">
                      <span>Instalación Profesional (Hermosillo)</span>
                      <span>{formatMXN(installSubtotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Envío Asegurado</span>
                    <span>{shippingCost === 0 ? 'GRATIS' : formatMXN(shippingCost)}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-[#C2B8A8] pt-2 text-base font-bold text-[#1C1A17]">
                    <span>Total MXN</span>
                    <span className="font-serif text-2xl">{formatMXN(total)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onProceedCheckout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3.5 text-sm font-semibold text-[#F4F1EC] shadow-lg transition hover:bg-[#2C2925] active:scale-[0.98]"
                >
                  <CreditCard className="h-4 w-4 text-[#D4B26E]" />
                  <span>Finalizar Compra Segura</span>
                  <ArrowRight className="h-4 w-4 text-[#D4B26E]" />
                </button>
                <p className="mt-2 text-center text-[10px] text-[#6B645A]">
                  Acepta Tarjetas Crédito/Débito (hasta 12 MSI), SPEI y Efectivo.
                </p>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
