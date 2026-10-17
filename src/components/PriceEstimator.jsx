import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Ruler, 
  Check, 
  Info,
  TrendingDown
} from 'lucide-react';

const WOOD_TYPES = [
  { id: 'soi-nga', name: 'Gỗ Sồi Nga (Oak)', baseRate: 6500000, desc: 'Vân núi đều, màu vàng sáng ấm, chống cong vênh tốt' },
  { id: 'tan-bi', name: 'Gỗ Tần Bì (Ash)', baseRate: 7200000, desc: 'Vân gỗ uốn lượn sắc nét, dễ uốn nhiệt định hình' },
  { id: 'me-tay', name: 'Gỗ Me Tây Nguyên Tấm', baseRate: 9800000, desc: 'Vân độc bản hoang dã, giữ trọn bìa tự nhiên (Live Edge)' },
  { id: 'go-do', name: 'Gỗ Gõ Đỏ Pachy', baseRate: 14500000, desc: 'Gỗ nhóm 1 siêu đanh chắc, màu đỏ cam quý phái đẳng cấp' },
  { id: 'oc-cho', name: 'Gỗ Óc Chó (Walnut FAS)', baseRate: 21000000, desc: 'Vân cuộn xoáy ma mị, màu nâu socola thượng lưu' },
  { id: 'mdf-an-cuong', name: 'MDF Lõi Xanh Chống Ẩm', baseRate: 3800000, desc: 'Phủ Melamine / Veneer vân gỗ, giá kinh tế hiện đại' }
];

const FURNITURE_TYPES = [
  { id: 'ban-an', name: 'Bàn Ăn Gia Đình', defaultLen: 160, defaultWid: 80, defaultThick: 4, chairRate: 1200000 },
  { id: 'ban-hop', name: 'Bàn Họp / Làm Việc', defaultLen: 200, defaultWid: 90, defaultThick: 5, chairRate: 1500000 },
  { id: 'ban-tra', name: 'Bàn Trà Sofa', defaultLen: 120, defaultWid: 60, defaultThick: 4, chairRate: 0 },
  { id: 'ban-cafe', name: 'Bàn Ghế Cafe / Quán', defaultLen: 70, defaultWid: 70, defaultThick: 3, chairRate: 850000 }
];

export default function PriceEstimator({ onApplyToCustomOrder }) {
  const [selectedFurniture, setSelectedFurniture] = useState(FURNITURE_TYPES[0]);
  const [selectedWood, setSelectedWood] = useState(WOOD_TYPES[0]);
  const [lengthCm, setLengthCm] = useState(160);
  const [widthCm, setWidthCm] = useState(80);
  const [thicknessCm, setThicknessCm] = useState(4);
  const [chairCount, setChairCount] = useState(6);
  const [legType, setLegType] = useState('wood'); // 'wood' | 'metal'

  // Tính giá xuất xưởng dự tính
  const calculation = useMemo(() => {
    const areaM2 = (lengthCm * widthCm) / 10000;
    const thicknessMultiplier = 1 + (thicknessCm - 3) * 0.12;
    const legAddon = legType === 'wood' ? 1200000 : 700000;
    
    // Giá bàn
    const tablePrice = Math.round(areaM2 * selectedWood.baseRate * thicknessMultiplier + legAddon);
    
    // Giá ghế đi kèm
    const chairsPrice = chairCount * selectedFurniture.chairRate;
    
    // Tổng giá xưởng
    const totalFactoryPrice = tablePrice + chairsPrice;
    
    // Giá tham khảo tại showroom bán lẻ (thường đắt hơn 35%)
    const showroomPrice = Math.round(totalFactoryPrice * 1.35);
    const savedAmount = showroomPrice - totalFactoryPrice;

    return {
      tablePrice,
      chairsPrice,
      totalFactoryPrice,
      showroomPrice,
      savedAmount,
      areaM2: areaM2.toFixed(2)
    };
  }, [lengthCm, widthCm, thicknessCm, chairCount, legType, selectedWood, selectedFurniture]);

  const handleApply = () => {
    onApplyToCustomOrder({
      furniture_type: `${selectedFurniture.name} (${lengthCm}x${widthCm}cm)`,
      wood_material: selectedWood.name,
      length_cm: lengthCm,
      width_cm: widthCm,
      thickness_cm: thicknessCm,
      chair_count: chairCount,
      estimated_price: calculation.totalFactoryPrice,
      note: `Kèm ${chairCount} ghế, chân ${legType === 'wood' ? 'gỗ tự nhiên' : 'sắt tĩnh điện'}. Dự toán xuất xưởng: ${calculation.totalFactoryPrice.toLocaleString('vi-VN')} đ`
    });
  };

  return (
    <section id="estimator" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Calculator size={15} />
            <span>Công Cụ Minh Bạch Giá Xưởng</span>
          </div>
          <h2 className="section-title">Dự Toán Báo Giá Đóng Bàn Ghế Tức Thì</h2>
          <p className="section-desc">
            Chọn kiểu bàn ghế, chất liệu gỗ và kích thước mong muốn. Hệ thống tự động tính giá xuất xưởng chính xác tới 95%.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Settings Column */}
          <div style={{
            background: 'var(--wood-50)',
            padding: '28px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)'
          }}>
            {/* 1. Chọn loại bàn ghế */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', color: 'var(--wood-900)' }}>
                1. Chọn Hạng Mục Bàn Ghế Cần Đóng:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {FURNITURE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedFurniture(type);
                      setLengthCm(type.defaultLen);
                      setWidthCm(type.defaultWid);
                      setThicknessCm(type.defaultThick);
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedFurniture.id === type.id ? '2px solid var(--amber-primary)' : '1px solid var(--border-color)',
                      background: selectedFurniture.id === type.id ? '#ffffff' : '#f5f5f4',
                      color: selectedFurniture.id === type.id ? 'var(--amber-primary)' : 'var(--wood-800)',
                      fontWeight: selectedFurniture.id === type.id ? '700' : '500',
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      transition: 'all 0.15s'
                    }}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Chọn loại gỗ */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', color: 'var(--wood-900)' }}>
                2. Chọn Chất Liệu Gỗ:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {WOOD_TYPES.map((wood) => {
                  const isSelected = selectedWood.id === wood.id;
                  return (
                    <div
                      key={wood.id}
                      onClick={() => setSelectedWood(wood)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '2px solid var(--amber-primary)' : '1px solid var(--border-color)',
                        background: isSelected ? '#ffffff' : '#f5f5f4',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: isSelected ? 'var(--amber-primary)' : 'var(--wood-900)' }}>
                          {wood.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {wood.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--amber-primary)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Tùy chỉnh kích thước */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--wood-900)' }}>
                  3. Chiều Dài Mặt Bàn (cm):
                </label>
                <span style={{ fontWeight: '800', color: 'var(--amber-primary)', fontSize: '1.05rem' }}>
                  {lengthCm} cm
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="320"
                step="5"
                value={lengthCm}
                onChange={(e) => setLengthCm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--amber-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }}>
                <span>100 cm</span>
                <span>Tiêu chuẩn 160-200 cm</span>
                <span>320 cm</span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--wood-900)' }}>
                  4. Chiều Rộng Mặt Bàn (cm):
                </label>
                <span style={{ fontWeight: '800', color: 'var(--amber-primary)', fontSize: '1.05rem' }}>
                  {widthCm} cm
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="130"
                step="5"
                value={widthCm}
                onChange={(e) => setWidthCm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--amber-primary)', cursor: 'pointer' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--wood-900)' }}>
                  5. Độ Dày Mặt Gỗ (cm):
                </label>
                <span style={{ fontWeight: '800', color: 'var(--amber-primary)', fontSize: '1.05rem' }}>
                  {thicknessCm} cm
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={thicknessCm}
                onChange={(e) => setThicknessCm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--amber-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* 6. Chọn chân và số ghế */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
                  Kiểu Chân Bàn:
                </label>
                <select
                  value={legType}
                  onChange={(e) => setLegType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: '#ffffff',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="wood">Chân Gỗ Tự Nhiên</option>
                  <option value="metal">Chân Sắt Sơn Tĩnh Điện</option>
                </select>
              </div>

              {selectedFurniture.chairRate > 0 && (
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>
                    Số Ghế Ăn / Ngồi:
                  </label>
                  <select
                    value={chairCount}
                    onChange={(e) => setChairCount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: '#ffffff',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value={0}>0 Ghế (Chỉ lấy bàn)</option>
                    <option value={4}>4 Ghế tiêu chuẩn</option>
                    <option value={6}>6 Ghế gia đình</option>
                    <option value={8}>8 Ghế phòng lớn</option>
                    <option value={10}>10 Ghế đại tiệc</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Result Column */}
          <div style={{
            background: 'linear-gradient(145deg, #1c1917, #292524)',
            color: '#ffffff',
            padding: '36px',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            position: 'sticky',
            top: '100px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#f59e0b',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              <Sparkles size={14} />
              <span>BẢNG DỰ TOÁN XUẤT XƯỞNG</span>
            </div>

            <h3 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '8px' }}>
              {selectedFurniture.name} {selectedWood.name}
            </h3>
            <p style={{ color: '#a8a29e', fontSize: '0.88rem', marginBottom: '24px' }}>
              Kích thước: {lengthCm} x {widthCm} x 75 cm (Mặt dày {thicknessCm} cm)
            </p>

            {/* Chi tiết giá */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#d6d3d1' }}>Giá gia công mặt bàn + chân:</span>
                <span style={{ fontWeight: '700', color: '#ffffff' }}>
                  {calculation.tablePrice.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {chairCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#d6d3d1' }}>Ghế đóng theo bộ ({chairCount} cái):</span>
                  <span style={{ fontWeight: '700', color: '#ffffff' }}>
                    {calculation.chairsPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              )}

              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.15)', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: '700', textTransform: 'uppercase' }}>
                    Tổng Giá Xuất Xưởng:
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#a8a29e' }}>
                    (Đã gồm hoàn thiện sơn PU 5 lớp)
                  </div>
                </div>
                <div style={{
                  fontSize: '1.85rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  color: '#fbbf24'
                }}>
                  {calculation.totalFactoryPrice.toLocaleString('vi-VN')} đ
                </div>
              </div>
            </div>

            {/* So sánh giá showroom */}
            <div style={{
              background: 'rgba(5, 150, 105, 0.15)',
              border: '1px solid rgba(5, 150, 105, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                flexShrink: 0
              }}>
                <TrendingDown size={20} />
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: '#a7f3d0' }}>Giá thị trường thương mại ~ </span>
                <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>
                  {calculation.showroomPrice.toLocaleString('vi-VN')} đ
                </span>
                <br />
                <strong style={{ color: '#34d399' }}>
                  Tiết kiệm được ~ {calculation.savedAmount.toLocaleString('vi-VN')} đ (35%)
                </strong> khi đóng trực tiếp tại xưởng!
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleApply}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f59e0b, #b45309)',
                color: '#ffffff',
                fontWeight: '700',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)'
              }}
            >
              <span>Gửi Yêu Cầu Đóng Kích Thước Này</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '16px', fontSize: '0.75rem', color: '#a8a29e' }}>
              <Info size={14} />
              <span>Giá chính xác sau khi thợ mộc qua khảo sát đo đạc mặt bằng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
