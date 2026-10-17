import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
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
      backgroundColor: 'rgba(24, 21, 19, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-soft)',
        maxWidth: '620px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '36px'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            backgroundColor: 'var(--bg-step)',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle size={32} />
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              Đặt Hàng Thành Công
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
              Mã đơn hàng: <strong style={{ color: 'var(--accent)' }}>{orderCode}</strong>.
              Quản đốc xưởng mộc sẽ liên hệ xác nhận ngày xuất xưởng và giao lắp tận phòng cho bạn.
            </p>

            <button onClick={onClose} className="btn btn-primary btn-md">
              Tiếp Tục Xem Mẫu Bàn Ghế
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '20px' }}>
              Đơn Bàn Ghế Đã Chọn ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
                <p style={{ marginBottom: '16px' }}>Bạn chưa thêm mẫu bàn ghế nào vào danh sách.</p>
                <button onClick={onClose} className="btn btn-subtle btn-sm">
                  Khám Phá Các Bộ Bàn Ăn & Sofa
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', maxHeight: '240px', overflowY: 'auto' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-soft)',
                        backgroundColor: 'var(--bg-step)'
                      }}
                    >
                      <img
                        src={getOptimizedImageUrl(item.images?.[0], 120)}
                        alt={item.name}
                        style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-soft)', objectFit: 'cover' }}
                      />

                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.wood_type}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--accent)' }}>
                          {Number(item.price).toLocaleString('vi-VN')} đ
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-soft)', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.88rem', fontWeight: '700', minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-soft)', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button onClick={() => onRemoveItem(item.id)} style={{ color: '#ef4444', padding: '6px' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-soft)',
                  backgroundColor: 'var(--bg-step)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <span style={{ fontWeight: '700' }}>Tổng Giá Xuất Xưởng:</span>
                  <span style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
                    {totalPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>

                <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>Họ và Tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Anh/Chị..."
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>Số Điện Thoại *</label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx..."
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>Địa Chỉ Giao / Khảo Sát:</label>
                    <input
                      type="text"
                      placeholder="Số nhà, đường phố, quận huyện..."
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '4px' }}>Hình Thức Thanh Toán:</label>
                    <select
                      value={customerInfo.payment_method}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, payment_method: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.88rem' }}
                    >
                      <option value="cod">Nhận hàng kiểm tra mộng gỗ & nước sơn rồi thanh toán (COD)</option>
                      <option value="deposit">Đặt cọc 30% xưởng bắt đầu ra phôi gỗ</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '6px' }}>
                    <span>Gửi Đơn Trực Tiếp Tới Xưởng</span>
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
