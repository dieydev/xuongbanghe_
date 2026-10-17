import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Hammer, 
  Paintbrush, 
  Truck, 
  CheckCircle,
  PhoneCall
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Layers,
    title: 'Tuyển Chọn & Sấy Khô Phôi Gỗ',
    desc: 'Gỗ Sồi, Gõ Đỏ, Me Tây được tẩm sấy nhiệt chân không đạt độ ẩm tiêu chuẩn dưới 12%, triệt tiêu co ngót, nứt nẻ và mối mọt trọn đời.'
  },
  {
    step: '02',
    icon: Hammer,
    title: 'Đục Mộng Ghép Cổ Truyền',
    desc: 'Kết hợp máy cắt CNC chính xác từng milimet với kỹ thuật ghép mộng đinh gỗ âm truyền thống, giúp kết cấu bàn ghế siêu vững chãi chịu tải trên 300kg.'
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Chà Nhám 4 Cấp Độ Mịn Lụa',
    desc: 'Qua 4 lần chà nhám từ nhám thô P180 đến siêu mịn P400, bo vát cạnh mép mềm mại, chạm tay mát mịn không một dằm gỗ li ti.'
  },
  {
    step: '04',
    icon: Paintbrush,
    title: 'Sơn PU Inchem Mỹ 5 Lớp',
    desc: 'Sơn lót chống hút ẩm, dặm màu giữ trọn vân gỗ tự nhiên và phủ 2 lớp bóng mờ Inchem cao cấp kháng nước nóng, cà phê, trà tràn mặt bàn.'
  },
  {
    step: '05',
    icon: Truck,
    title: 'Bọc Chống Xước & Giao Lắp Tận Nhà',
    desc: 'Bọc màng PE 3 lớp chống xước khi di chuyển, đội thợ xưởng vận chuyển và căn chỉnh chân bàn ghế vững chãi ngay tại phòng khách của bạn.'
  }
];

export default function WorkshopProcess({ onConsultClick }) {
  return (
    <section id="process" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={15} />
            <span>Minh Bạch Chất Lượng</span>
          </div>
          <h2 className="section-title">Quy Trình 5 Bước Sản Xuất Tại Xưởng Mộc</h2>
          <p className="section-desc">
            Từ khối gỗ thô mộc đến bộ bàn ghế tinh xảo trong ngôi nhà bạn. 
            Mỗi công đoạn đều được giám sát kỹ lưỡng bởi nghệ nhân thợ mộc hơn 15 năm kinh nghiệm.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '56px'
        }}>
          {STEPS.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--wood-50)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 22px',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--amber-border)',
                  lineHeight: 1,
                  marginBottom: '14px'
                }}>
                  {s.step}
                </div>

                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--amber-soft)',
                  color: 'var(--amber-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <IconComponent size={22} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--wood-900)' }}>
                  {s.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Survey Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1c1917, #292524)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 40px',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#f59e0b',
              fontSize: '0.78rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '10px'
            }}>
              DỊCH VỤ TẬN NƠI
            </span>
            <h3 style={{ color: '#ffffff', fontSize: '1.45rem', marginBottom: '8px' }}>
              Bạn Chưa Rõ Kích Thước Bàn Ghế Vừa Vặn Không Gian?
            </h3>
            <p style={{ color: '#a8a29e', fontSize: '0.92rem', margin: 0 }}>
              Đừng lo, xưởng sẽ cử thợ mộc mang thước laser và mẫu gỗ thực tế qua tận nhà để đo đạc và tư vấn hoàn toàn miễn phí!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="tel:0987654321"
              className="btn btn-primary btn-md"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)', color: '#ffffff' }}
            >
              <PhoneCall size={16} />
              <span>Gọi Thợ Mộc Tư Vấn Ngay</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
