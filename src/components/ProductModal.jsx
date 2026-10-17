import React, { useState } from 'react';
import { X, Check, Ruler, ShoppingBag, Hammer } from 'lucide-react';
import { getOptimizedImageUrl } from '../services/cloudinary';

export default function ProductModal({ product, onClose, onAddToCart, onCustomizeRequest }) {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(24, 21, 19, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflowY: 'auto'
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-soft)',
        maxWidth: '860px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
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
            backgroundColor: 'var(--bg-step)',
            borderRadius: 'var(--radius-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-ink)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left: Gallery */}
          <div style={{ padding: '28px', backgroundColor: 'var(--bg-step)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ borderRadius: 'var(--radius-soft)', overflow: 'hidden', height: '340px', backgroundColor: 'var(--bg-surface)' }}>
              <img
                src={getOptimizedImageUrl(images[activeImageIdx], 800)}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-soft)',
                      overflow: 'hidden',
                      opacity: activeImageIdx === idx ? 1 : 0.6
                    }}
                  >
                    <img src={getOptimizedImageUrl(img, 200)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            <div style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-soft)',
              padding: '16px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div><strong>Bảo hành:</strong> {product.warranty_months || 36} tháng mối mọt, cong vênh</div>
              <div><strong>Xuất xưởng:</strong> {product.lead_time_days ? `${product.lead_time_days} ngày` : 'Sẵn hàng'}</div>
              <div><strong>Công nghệ sơn:</strong> {product.finish || 'Sơn PU Inchem 5 lớp'}</div>
            </div>
          </div>

          {/* Right: Info */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '12px' }}>
              <span className="wood-tag">{product.wood_type}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
              {product.name}
            </h2>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid var(--bg-step)'
            }}>
              <span style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
                {Number(product.price).toLocaleString('vi-VN')} đ
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                backgroundColor: 'var(--bg-step)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-soft)',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Ruler size={16} color="var(--accent)" />
                <span>{product.dimensions}</span>
              </div>
            </div>

            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
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

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <ShoppingBag size={17} />
                <span>Thêm Vào Danh Sách Chọn</span>
              </button>

              <button
                onClick={() => {
                  onCustomizeRequest(product);
                  onClose();
                }}
                className="btn btn-subtle btn-md"
                style={{ width: '100%' }}
              >
                <Hammer size={16} />
                <span>Đặt Kích Thước Hoặc Loại Gỗ Khác</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
