import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Ruler, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  Hammer, 
  PhoneCall, 
  Layers,
  Sparkles
} from 'lucide-react';
import { getOptimizedImageUrl } from '../services/cloudinary';

export default function ProductModal({ product, onClose, onAddToCart, onCustomizeRequest }) {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'];

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
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div 
        className="fade-in"
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--wood-900)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left: Gallery */}
          <div style={{ padding: '24px', background: 'var(--wood-50)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              height: '340px',
              background: '#e7e5e4'
            }}>
              <img
                src={getOptimizedImageUrl(images[activeImageIdx], 800)}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeImageIdx === idx ? '2px solid var(--amber-primary)' : '1px solid var(--border-color)',
                      opacity: activeImageIdx === idx ? 1 : 0.7
                    }}
                  >
                    <img src={getOptimizedImageUrl(img, 200)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div><strong>Bảo hành kết cấu:</strong> {product.warranty_months || 36} tháng mối mọt, cong vênh</div>
              <div><strong>Thời gian xuất xưởng:</strong> {product.lead_time_days ? `${product.lead_time_days} - ${product.lead_time_days + 3} ngày` : 'Sẵn hàng tại xưởng'}</div>
              <div><strong>Công nghệ sơn:</strong> {product.finish || 'Sơn PU Inchem cao cấp 5 lớp'}</div>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <span className="badge badge-wood">{product.wood_type}</span>
              {product.stock_status === 'available' ? (
                <span className="badge badge-available">Có sẵn tại xưởng</span>
              ) : (
                <span className="badge badge-order">Gia công theo đơn</span>
              )}
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '14px', color: 'var(--wood-900)' }}>
              {product.name}
            </h2>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '18px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--amber-primary)', fontFamily: 'var(--font-heading)' }}>
                {Number(product.price).toLocaleString('vi-VN')} đ
              </span>
              {product.original_price && (
                <span style={{ fontSize: '1rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  {Number(product.original_price).toLocaleString('vi-VN')} đ
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.6 }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', color: 'var(--wood-700)' }}>
                Quy Cách & Kích Thước Chuẩn:
              </h4>
              <div style={{
                background: 'var(--wood-50)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.88rem',
                fontWeight: '600',
                color: 'var(--wood-900)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Ruler size={16} color="var(--amber-primary)" />
                <span>{product.dimensions}</span>
              </div>
            </div>

            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', color: 'var(--wood-700)' }}>
                  Đặc Điểm Nghề Mộc Tinh Xảo:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {product.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Check size={14} color="#059669" strokeWidth={3} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <ShoppingBag size={18} />
                <span>Thêm Vào Danh Sách Chọn Mua</span>
              </button>

              <button
                onClick={() => {
                  onCustomizeRequest(product);
                  onClose();
                }}
                className="btn btn-outline btn-md"
                style={{ width: '100%' }}
              >
                <Hammer size={16} color="var(--amber-primary)" />
                <span>Đặt Kích Thước Hoặc Loại Gỗ Khác Theo Ý Bạn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
