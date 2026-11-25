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
  Tag,
  Fingerprint,
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  LOCK_BUNDLE_DISCOUNT_PERCENT,
  formatMXN,
  type Product,
} from '../data/catalog';
import { calculateCartTotals, type CartItem } from '../services/ecart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onToggleInstall: (index: number) => void;
  onRemoveItem: (index: number) => void;
  onQuickAddLock: (product: Product) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onToggleInstall,
  onRemoveItem,
  onQuickAddLock,
  onProceedCheckout,
}) => {
  const totals = calculateCartTotals(items);
  const hasLockInCart = items.some((i) => i.product.category === 'cerraduras');
  const smartLocks = CATALOG_PRODUCTS.filter((p) => p.category === 'cerraduras');

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
            {/* Header */}
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
                    Explora nuestras puertas de seguridad y cerraduras inteligentes con opción de
                    instalación en Hermosillo (puertas $6,400 · chapas $1,300).
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => {
                    const isDiscountedLock =
                      totals.hasDoorInCart && item.product.category === 'cerraduras';
                    const unitFinalPrice = isDiscountedLock
                      ? Math.round(
                          item.product.priceMXN * (1 - LOCK_BUNDLE_DISCOUNT_PERCENT / 100)
                        )
                      : item.product.priceMXN;

                    return (
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

                            {isDiscountedLock && (
                              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#2F6B48]/15 px-2 py-0.5 text-[10px] font-bold text-[#2F6B48]">
                                <Tag className="h-2.5 w-2.5" />
                                10% OFF Combo Puerta
                              </span>
                            )}

                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm font-bold text-[#1C1A17]">
                                  {formatMXN(unitFinalPrice * item.quantity)}
                                </span>
                                {isDiscountedLock && (
                                  <span className="text-[11px] text-[#787166] line-through">
                                    {formatMXN(item.product.priceMXN * item.quantity)}
                                  </span>
                                )}
                              </div>
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

                        {/* Agregado de instalación: Puertas $6,400 (con descuento) / Chapas $1,300 · Solo Hermosillo */}
                        <div className="mt-2.5 border-t border-[#E2DCD2] pt-2">
                          <label className="flex cursor-pointer items-center justify-between gap-2 text-[11px] text-[#57524A]">
                            <span className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={item.includeInstallation}
                                onChange={() => onToggleInstall(idx)}
                                className="accent-[#7C4D25]"
                              />
                              <Wrench className="h-3 w-3 text-[#7C4D25]" />
                              <span>
                                {item.product.category === 'puertas'
                                  ? 'Instalación puerta'
                                  : 'Instalación chapa'}
                              </span>
                              <span className="rounded-full bg-[#2F6B48] px-1.5 py-0.5 text-[9px] font-bold text-white">
                                50% OFF
                              </span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="text-[10px] text-[#787166] line-through">
                                {formatMXN(item.product.installationRegularMXN * item.quantity)}
                              </span>
                              <span className="font-bold text-[#7C4D25]">
                                +{formatMXN(item.product.installationMXN * item.quantity)}
                              </span>
                            </span>
                          </label>
                          <p className="mt-1 pl-5 text-[10px] font-medium text-[#7C4D25]">
                            Aviso: Instalación solo válida en Hermosillo, Sonora.
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* UPSELL AUTOMÁTICO: 10% OFF en cerraduras al comprar una puerta */}
                  {totals.hasDoorInCart && !hasLockInCart && (
                    <div className="rounded-2xl border border-[#B89047]/60 bg-[#EAE5DD] p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1C1A17]">
                        <Fingerprint className="h-4 w-4 text-[#7C4D25]" />
                        <span>¡Desbloqueaste 10% OFF en Cerraduras Inteligentes!</span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#57524A]">
                        Complementa tu puerta de seguridad agregando cualquiera de estas cerraduras
                        con descuento automático:
                      </p>

                      <div className="mt-3 space-y-2">
                        {smartLocks.map((lock) => {
                          const discounted = Math.round(
                            lock.priceMXN * (1 - LOCK_BUNDLE_DISCOUNT_PERCENT / 100)
                          );
                          return (
                            <div
                              key={lock.id}
                              className="flex items-center justify-between gap-2.5 rounded-xl border border-[#D4CCC0] bg-[#FAF8F5] p-2"
                            >
                              <div className="flex min-w-0 items-center gap-2.5">
                                <img
                                  src={lock.image}
                                  alt={lock.name}
                                  className="h-11 w-10 shrink-0 rounded-lg object-cover"
                                />
                                <div className="min-w-0">
                                  <p className="truncate text-xs font-semibold text-[#1C1A17]">
                                    {lock.name}
                                  </p>
                                  <div className="flex items-baseline gap-1.5 text-[11px]">
                                    <span className="font-bold text-[#2F6B48]">
                                      {formatMXN(discounted)}
                                    </span>
                                    <span className="text-[#787166] line-through">
                                      {formatMXN(lock.priceMXN)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => onQuickAddLock(lock)}
                                className="shrink-0 rounded-full bg-[#1C1A17] px-3 py-1.5 text-[10px] font-semibold text-[#F4F1EC] hover:bg-[#2C2925]"
                              >
                                + Agregar
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Totales */}
            {items.length > 0 && (
              <div className="border-t border-[#D4CCC0] bg-[#EAE5DD] p-5">
                <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#F4F1EC] px-3 py-2 text-[11px] text-[#46413A]">
                  <Truck className="h-4 w-4 shrink-0 text-[#7C4D25]" />
                  {totals.shippingCost === 0 ? (
                    <span>
                      <strong>¡Envío gratis desbloqueado</strong> en Hermosillo!
                    </span>
                  ) : (
                    <span>
                      Te faltan{' '}
                      <strong>
                        {formatMXN(
                          5000 -
                            (totals.productsSubtotal -
                              totals.lockBundleDiscount +
                              totals.installPromoSubtotal)
                        )}
                      </strong>{' '}
                      para envío gratis en Hermosillo.
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-[#57524A]">
                  <div className="flex justify-between">
                    <span>Productos</span>
                    <span>{formatMXN(totals.productsSubtotal)}</span>
                  </div>
                  {totals.lockBundleDiscount > 0 && (
                    <div className="flex justify-between font-semibold text-[#2F6B48]">
                      <span>Descuento Combo Puerta (10% en cerraduras)</span>
                      <span>-{formatMXN(totals.lockBundleDiscount)}</span>
                    </div>
                  )}
                  {totals.installPromoSubtotal > 0 && (
                    <div className="flex justify-between">
                      <span>Instalación Profesional (50% OFF)</span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#787166] line-through">
                          {formatMXN(totals.installRegularSubtotal)}
                        </span>
                        <span className="font-semibold text-[#1C1A17]">
                          {formatMXN(totals.installPromoSubtotal)}
                        </span>
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Envío Asegurado</span>
                    <span>
                      {totals.shippingCost === 0 ? 'GRATIS' : formatMXN(totals.shippingCost)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-[#C2B8A8] pt-2 text-base font-bold text-[#1C1A17]">
                    <span>Total MXN</span>
                    <span className="font-serif text-2xl">{formatMXN(totals.total)}</span>
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
