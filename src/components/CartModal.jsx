import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getOptimizedImageUrl } from '../services/cloudinary';

export default function CartModal({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    payment_method: 'cod',
    note: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Vui lòng điền Họ tên và Số điện thoại nhận hàng.');
      return;
    }

    const code = `BG-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(code);
    setIsSuccess(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    onClearCart();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(28, 25, 23, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="fade-in"
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '28px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)'
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '18px', right: '18px', color: 'var(--wood-900)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle size={32} />
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--wood-900)' }}>
              Đặt Hàng Thành Công!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Mã đơn hàng: <strong style={{ color: 'var(--amber-primary)' }}>{orderCode}</strong>.
              Quản đốc xưởng mộc sẽ liên hệ xác nhận ngày giờ xuất xưởng và lắp đặt tận nhà cho bạn.
            </p>

            <button onClick={onClose} className="btn btn-primary btn-md">
              Tiếp Tục Xem Mẫu Bàn Ghế
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <ShoppingBag size={22} color="var(--amber-primary)" />
              <h2 style={{ fontSize: '1.35rem', color: 'var(--wood-900)', margin: 0 }}>
                Bàn Ghế Đã Chọn ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
                <p style={{ marginBottom: '16px' }}>Bạn chưa thêm mẫu bàn ghế nào vào danh sách.</p>
                <button onClick={onClose} className="btn btn-outline btn-sm">
                  Khám Phá Các Bộ Bàn Ăn & Sofa
                </button>
              </div>
            ) : (
              <div>
                {/* List items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', maxHeight: '240px', overflowY: 'auto' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--wood-50)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <img
                        src={getOptimizedImageUrl(item.images?.[0], 120)}
                        alt={item.name}
                        style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover' }}
                      />

                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--wood-900)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {item.wood_type}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--amber-primary)' }}>
                          {Number(item.price).toLocaleString('vi-VN')} đ
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '4px',
                            background: '#ffffff',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.88rem', fontWeight: '700', minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '4px',
                            background: '#ffffff',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ color: '#ef4444', padding: '6px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--wood-100)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontWeight: '700', color: 'var(--wood-800)' }}>Tổng Giá Xuất Xưởng:</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--amber-primary)', fontFamily: 'var(--font-heading)' }}>
                    {totalPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>

                {/* Checkout form */}
                <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>
                        Họ và Tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Anh/Chị..."
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>
                        Số Điện Thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx..."
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>
                      Địa Chỉ Nhận Hàng / Khảo Sát:
                    </label>
                    <input
                      type="text"
                      placeholder="Số nhà, đường phố, quận huyện..."
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>
                      Hình Thức Thanh Toán:
                    </label>
                    <select
                      value={customerInfo.payment_method}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, payment_method: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem', background: '#ffffff' }}
                    >
                      <option value="cod">Nhận hàng kiểm tra mộng gỗ & nước sơn rồi thanh toán (COD)</option>
                      <option value="deposit">Đặt cọc 30% xưởng bắt đầu ra phôi gỗ</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: '10px' }}
                  >
                    <span>Gửi Đơn Đặt Hàng Trực Tiếp Tới Xưởng</span>
                    <ArrowRight size={17} />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
