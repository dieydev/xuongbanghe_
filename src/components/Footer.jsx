import React from 'react';
import { 
  Hammer, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Heart
} from 'lucide-react';

export default function Footer({ onNavClick, onOpenAdmin }) {
  return (
    <footer style={{ background: '#161413', color: '#a8a29e', paddingTop: '70px', paddingBottom: '36px', borderTop: '1px solid #292524' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #b45309, #78350f)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Hammer size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                TINH HOA <span style={{ color: 'var(--amber-bright)' }}>WOOD</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '20px', color: '#a8a29e' }}>
              Xưởng sản xuất trực tiếp và gia công bàn ghế gỗ tự nhiên theo kích thước yêu cầu. 
              Mang nét đẹp nghệ nhân mộc truyền thống kết hợp xu hướng nội thất tinh gọn hiện đại.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>Cam kết 100% gỗ tự nhiên chuẩn kiểm định</span>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '18px' }}>
              Địa Chỉ Xưởng Sản Xuất
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--amber-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Xưởng 1: Km 18, Làng Nghề Mộc Canh Nậu, Thạch Thất, Hà Nội</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--amber-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Showroom: KĐT Sala, An Lợi Đông, TP. Thủ Đức, TP. Hồ Chí Minh</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <PhoneCall size={18} color="var(--amber-bright)" style={{ flexShrink: 0 }} />
                <a href="tel:0987654321" style={{ color: '#ffffff', fontWeight: '700' }}>Hotline / Zalo: 0987.654.321</a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={18} color="var(--amber-bright)" style={{ flexShrink: 0 }} />
                <span>Mở cửa: 7:30 - 18:30 (Cả Thứ 7 & CN)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '18px' }}>
              Dịch Vụ & Gia Công
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <button onClick={() => onNavClick('estimator')} style={{ textAlign: 'left', color: '#a8a29e', background: 'none', border: 'none', cursor: 'pointer' }}>
                › Dự toán báo giá đóng bàn ghế online
              </button>
              <button onClick={() => onNavClick('custom-order')} style={{ textAlign: 'left', color: '#a8a29e', background: 'none', border: 'none', cursor: 'pointer' }}>
                › Đặt đóng theo bản vẽ 3D thiết kế
              </button>
              <button onClick={() => onNavClick('products')} style={{ textAlign: 'left', color: '#a8a29e', background: 'none', border: 'none', cursor: 'pointer' }}>
                › Bàn ăn gỗ sồi & gõ đỏ nguyên khối
              </button>
              <button onClick={() => onNavClick('products')} style={{ textAlign: 'left', color: '#a8a29e', background: 'none', border: 'none', cursor: 'pointer' }}>
                › Bàn trà & bàn làm việc me tây nguyên tấm
              </button>
              <button onClick={onOpenAdmin} style={{ textAlign: 'left', color: 'var(--amber-bright)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700' }}>
                ⚙ Đăng nhập Quản Trị Xưởng (Admin)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid #292524',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          fontSize: '0.82rem'
        }}>
          <div>
            © 2026 Xưởng Bàn Ghế Tinh Hoa Wood. Tất cả các quyền được bảo lưu.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a 
              href="https://github.com/dieydev/xuongbanghe_.git" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d6d3d1' }}
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
