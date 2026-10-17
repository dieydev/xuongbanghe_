import React from 'react';
import { MapPin, PhoneCall, Clock, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavClick, onOpenAdmin }) {
  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        {/* Large Architectural Wordmark Construction */}
        <div style={{
          fontSize: 'clamp(1.75rem, 6.5vw, 6rem)',
          fontWeight: '800',
          fontFamily: 'var(--font-heading)',
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          marginBottom: '48px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          Tinh Hoa Wood
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Brand Col */}
          <div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px', color: '#a8a29e' }}>
              Xưởng sản xuất trực tiếp và gia công bàn ghế gỗ tự nhiên theo kích thước yêu cầu. 
              Gỗ Sồi, Gõ Đỏ, Me Tây nguyên tấm sấy chuẩn độ ẩm dưới 12%.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.85rem' }}>
              <ShieldCheck size={17} />
              <span>Cam kết 100% gỗ tự nhiên chuẩn kiểm định</span>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>
              Địa Chỉ Xưởng & Showroom
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Xưởng 1: Km 18, Làng Nghề Mộc Canh Nậu, Thạch Thất, Hà Nội</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Showroom: KĐT Sala, An Lợi Đông, TP. Thủ Đức, TP. Hồ Chí Minh</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <PhoneCall size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                <a href="tel:0987654321" style={{ color: '#ffffff', fontWeight: '700' }}>Hotline / Zalo: 0987.654.321</a>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                <span>Mở cửa: 7:30 - 18:30 (Cả Thứ 7 & Chủ Nhật)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>
              Dịch Vụ Xưởng Mộc
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <button onClick={() => onNavClick('estimator')} style={{ textAlign: 'left', color: '#a8a29e' }}>
                Dự toán báo giá đóng bàn ghế online
              </button>
              <button onClick={() => onNavClick('custom-order')} style={{ textAlign: 'left', color: '#a8a29e' }}>
                Đặt đóng theo bản vẽ 3D thiết kế
              </button>
              <button onClick={() => onNavClick('products')} style={{ textAlign: 'left', color: '#a8a29e' }}>
                Bàn ăn gỗ sồi & gõ đỏ nguyên khối
              </button>
              <button onClick={() => onNavClick('products')} style={{ textAlign: 'left', color: '#a8a29e' }}>
                Bàn trà & bàn làm việc me tây nguyên tấm
              </button>
              <button onClick={onOpenAdmin} style={{ textAlign: 'left', color: 'var(--accent)', fontWeight: '700', marginTop: '6px' }}>
                Quản Trị Xưởng (Admin CMS)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          fontSize: '0.82rem',
          color: '#78716c'
        }}>
          <div>
            © 2026 Xưởng Bàn Ghế Tinh Hoa Wood. Tất cả các quyền được bảo lưu.
          </div>
          <div>
            <a 
              href="https://github.com/dieydev/xuongbanghe_.git" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a8a29e' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub: dieydev/xuongbanghe_</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
