import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';

export default function Hero({ onExploreClick, onEstimateClick }) {
  return (
    <section id="hero" style={{ padding: '48px 0 88px', backgroundColor: 'var(--bg-ground)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '52px',
          alignItems: 'center'
        }}>
          {/* Left Column: Bold two-line headline (Max 2 lines at all widths) */}
          <div>
            <h1 data-rise style={{ '--i': 0, marginBottom: '24px' }}>
              Đóng Bàn Ghế Theo Kích Thước
            </h1>

            <p data-rise style={{
              '--i': 1,
              fontSize: 'var(--type-lead)',
              color: 'var(--text-ink)',
              marginBottom: '36px',
              maxWidth: '520px',
              lineHeight: 1.55
            }}>
              Gia công trực tiếp từ gỗ Sồi Nga, Gõ Đỏ, Me Tây nguyên tấm và Óc Chó sấy chuẩn độ ẩm. 
              Xuất xưởng tại làng nghề Canh Nậu — Thạch Thất không qua trung gian.
            </p>

            <div data-rise style={{ '--i': 2, display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '44px' }}>
              <button onClick={onExploreClick} className="btn btn-primary btn-lg">
                <span>Xem Mẫu Bàn Ghế</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onEstimateClick} className="btn btn-subtle btn-lg">
                <Calculator size={18} />
                <span>Dự Toán Giá Tức Thì</span>
              </button>
            </div>

            <div data-rise style={{
              '--i': 3,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              paddingTop: '28px',
              borderTop: '2px solid var(--bg-step)'
            }}>
              <div>
                <div style={{ fontSize: 'var(--type-heading)', fontWeight: '800', color: 'var(--text-ink)' }}>100%</div>
                <div style={{ fontSize: 'var(--type-small)', color: 'var(--text-muted)' }}>Gỗ thịt tự nhiên</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--type-heading)', fontWeight: '800', color: 'var(--text-ink)' }}>10 Năm</div>
                <div style={{ fontSize: 'var(--type-small)', color: 'var(--text-muted)' }}>Bảo hành kết cấu</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--type-heading)', fontWeight: '800', color: 'var(--text-ink)' }}>-35%</div>
                <div style={{ fontSize: 'var(--type-small)', color: 'var(--text-muted)' }}>Giá gốc tại xưởng</div>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant Focal-point Image */}
          <div data-rise style={{ '--i': 2 }}>
            <div style={{
              backgroundColor: 'var(--bg-step)',
              borderRadius: 'var(--radius-soft)',
              overflow: 'hidden',
              height: '540px'
            }}>
              <img
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"
                alt="Bộ bàn ăn gỗ tự nhiên gia công trực tiếp tại xưởng"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
