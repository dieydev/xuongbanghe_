import React from 'react';
import { Layers, Hammer, Sparkles, Paintbrush, Truck, PhoneCall } from 'lucide-react';

const STEPS = [
  {
    icon: Layers,
    title: 'Tuyển Chọn & Sấy Khô',
    desc: 'Gỗ Sồi, Gõ Đỏ, Me Tây được tẩm sấy nhiệt chân không đạt độ ẩm dưới 12%, triệt tiêu co ngót, nứt nẻ và mối mọt trọn đời.'
  },
  {
    icon: Hammer,
    title: 'Đục Mộng Cổ Truyền',
    desc: 'Kỹ thuật ghép mộng đinh gỗ âm truyền thống, kết cấu bàn ghế siêu vững chãi chịu tải trên 300kg không lung lay.'
  },
  {
    icon: Sparkles,
    title: 'Chà Nhám 4 Lượt',
    desc: 'Từ nhám thô P180 đến siêu mịn P400, bo vát cạnh mép mềm mại, chạm tay mát mịn không dằm gỗ.'
  },
  {
    icon: Paintbrush,
    title: 'Sơn PU Inchem 5 Lớp',
    desc: 'Sơn lót chống ẩm, dặm màu giữ vân và phủ 2 lớp bóng mờ Inchem cao cấp kháng nước nóng, cà phê, trà tràn mặt bàn.'
  },
  {
    icon: Truck,
    title: 'Bọc & Giao Lắp Tận Nhà',
    desc: 'Bọc màng chống xước khi di chuyển, đội thợ xưởng vận chuyển và căn chỉnh chân bàn ghế vững chãi ngay tại phòng của bạn.'
  }
];

export default function WorkshopProcess({ onConsultClick }) {
  return (
    <section id="process" className="section-space" style={{ backgroundColor: 'var(--bg-ground)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Quy Trình Gia Công Tại Xưởng Mộc</h2>
          <p className="section-desc">
            Từ khối gỗ thô mộc đến bộ bàn ghế tinh xảo trong ngôi nhà bạn. Giám sát bởi nghệ nhân hơn 15 năm kinh nghiệm làng nghề.
          </p>
        </div>

        {/* Craftsmanship Video Clip */}
        <div data-reveal style={{
          backgroundColor: 'var(--bg-step)',
          borderRadius: 'var(--radius-soft)',
          overflow: 'hidden',
          marginBottom: '56px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'center'
        }}>
          <div style={{ padding: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <img src="/logo-round.png" alt="DIEY WOOD" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Dấu Ấn Nghề Mộc DIEY WOOD
              </span>
            </div>
            <h3 style={{ fontSize: 'var(--type-lead)', fontWeight: '700', marginBottom: '12px' }}>
              Bàn Tay Người Thợ Mộc Canh Nậu
            </h3>
            <p style={{ fontSize: 'var(--type-body)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              Mỗi khớp mộng, từng nét đục và đường chà nhám đều được thực hiện thủ công với sự chuẩn xác của người thợ lành nghề.
            </p>
            <div style={{ fontSize: 'var(--type-small)', color: '#181513', fontWeight: '500' }}>
              Tư liệu chế tác mộng gỗ truyền thống · Giấy phép CC BY-SA 3.0 (Wikimedia Commons)
            </div>
          </div>
          <div style={{ height: '320px', backgroundColor: '#000000' }}>
            <video
              src="https://upload.wikimedia.org/wikipedia/commons/transcoded/6/60/Tools_of_a_wood_graft_workers.ogv/Tools_of_a_wood_graft_workers.ogv.480p.vp9.webm"
              poster="https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Tools_of_a_wood_graft_workers.ogv/1280px--Tools_of_a_wood_graft_workers.ogv.jpg"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Narrative Craftsmanship Sequence (No Icon Cards) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '56px'
        }}>
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              data-reveal
              style={{
                backgroundColor: 'var(--bg-step)',
                borderRadius: 'var(--radius-soft)',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                fontSize: 'var(--type-small)',
                fontWeight: '700',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '10px'
              }}>
                Tiêu chuẩn xưởng
              </div>

              <h3 style={{ fontSize: 'var(--type-lead)', fontWeight: '700', marginBottom: '8px', color: 'var(--text-ink)' }}>
                {s.title}
              </h3>

              <p style={{ fontSize: 'var(--type-body)', color: 'var(--text-ink)', lineHeight: 1.6, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Survey Banner: Flat Tone, High Contrast */}
        <div data-reveal style={{
          backgroundColor: '#181513',
          borderRadius: 'var(--radius-soft)',
          padding: '40px 48px',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div style={{ maxWidth: '580px' }}>
            <h3 style={{ color: '#ffffff', fontSize: 'var(--type-lead)', marginBottom: '8px' }}>
              Khảo Sát Đo Đạc Tận Nhà
            </h3>
            <p style={{ color: '#ece8de', fontSize: 'var(--type-body)', margin: 0 }}>
              Xưởng cử thợ mộc mang thước laser và mẫu phôi gỗ thực tế qua tận nhà để tư vấn kích thước vừa vặn nhất với mặt bằng của bạn.
            </p>
          </div>

          <a
            href="tel:0987654321"
            className="btn btn-primary btn-lg"
          >
            <PhoneCall size={16} />
            <span>Gọi Thợ Mộc Tư Vấn Ngay</span>
          </a>
        </div>
      </div>
    </section>
  );
}
