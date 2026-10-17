import React from 'react';
import { 
  ShieldCheck, 
  Ruler, 
  Truck, 
  Award, 
  ArrowRight, 
  Calculator, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Hero({ onExploreClick, onEstimateClick }) {
  return (
    <section id="hero" style={{ 
      position: 'relative', 
      padding: '70px 0 90px', 
      overflow: 'hidden',
      background: 'radial-gradient(circle at 10% 20%, rgba(254, 243, 199, 0.45) 0%, rgba(251, 249, 246, 0) 60%)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Column: Headlines & CTA */}
          <div>
            <div className="section-tag" style={{ display: 'inline-flex', marginBottom: '18px' }}>
              <Sparkles size={15} />
              <span>Trực Tiếp Gia Công Tại Xưởng — Không Qua Trung Gian</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
              fontWeight: '800',
              lineHeight: 1.15,
              marginBottom: '20px',
              color: 'var(--wood-900)'
            }}>
              Đóng Bàn Ghế Gỗ <br />
              <span style={{ 
                background: 'linear-gradient(135deg, var(--amber-primary), #92400e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Theo Chuẩn Kích Thước
              </span> & Thiết Kế Của Bạn
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              marginBottom: '32px',
              maxWidth: '540px',
              lineHeight: 1.65
            }}>
              Xưởng mộc gia công bàn ăn gia đình, bàn làm việc, sofa gỗ, bàn ghế cafe & nhà hàng. 
              Sử dụng 100% gỗ Sồi, Gõ Đỏ, Me Tây, Óc Chó sấy chuẩn độ ẩm. 
              <strong style={{ color: 'var(--wood-800)' }}> Tiết kiệm 25% - 35% chi phí</strong> so với mua tại các showroom nội thất trung gian.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
              <button 
                onClick={onExploreClick}
                className="btn btn-primary btn-lg"
              >
                <span>Xem Mẫu Bàn Ghế Xưởng</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={onEstimateClick}
                className="btn btn-outline btn-lg"
              >
                <Calculator size={18} color="var(--amber-primary)" />
                <span>Dự Toán Báo Giá Tức Thì</span>
              </button>
            </div>

            {/* Trust Points */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#059669" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--wood-800)' }}>
                  Gỗ tự nhiên sấy khô 100%
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#059669" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--wood-800)' }}>
                  Bảo hành mối mọt 5 - 10 năm
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#059669" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--wood-800)' }}>
                  Thợ qua đo đạc khảo sát tận nơi
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#059669" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--wood-800)' }}>
                  Sơn PU Inchem Mỹ an toàn
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '4px solid #ffffff'
            }}>
              <img
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"
                alt="Xưởng gia công bàn ghế gỗ"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(28, 25, 23, 0.7) 0%, transparent 40%)'
              }} />

              {/* Floating Caption on image */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                color: '#ffffff'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(180, 83, 9, 0.9)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontWeight: '700'
                }}>
                  Thành Phẩm Thực Tế
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginTop: '8px', marginBottom: '4px' }}>
                  Bộ Bàn Ăn Gỗ Sồi Nga 6 Ghế Tự Nhiên
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#e7e5e4', margin: 0 }}>
                  Gia công theo kích thước phòng ăn nhà phố 1m6 x 80cm
                </p>
              </div>
            </div>

            {/* Floating Floating Stat Badge 1 */}
            <div style={{
              position: 'absolute',
              top: '28px',
              left: '-20px',
              background: '#ffffff',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--border-color)',
              maxWidth: '220px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--amber-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--amber-primary)'
              }}>
                <Award size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--wood-900)' }}>15+ Năm</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nghệ nhân mộc lành nghề</div>
              </div>
            </div>

            {/* Floating Stat Badge 2 */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              right: '-16px',
              background: '#ffffff',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669'
              }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--wood-900)' }}>100% Gỗ Thật</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kiểm định phôi gỗ trước khi xẻ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
