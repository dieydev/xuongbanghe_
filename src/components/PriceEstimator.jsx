import React, { useState, useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const WOOD_TYPES = [
  { id: 'soi-nga', name: 'Gỗ Sồi Nga (Oak)', baseRate: 6500000, desc: 'Vân núi sáng, chống cong vênh' },
  { id: 'tan-bi', name: 'Gỗ Tần Bì (Ash)', baseRate: 7200000, desc: 'Vân lượn sắc, độ uốn nhiệt cao' },
  { id: 'me-tay', name: 'Gỗ Me Tây Nguyên Tấm', baseRate: 9800000, desc: 'Bìa tự nhiên độc bản (Live Edge)' },
  { id: 'go-do', name: 'Gỗ Gõ Đỏ Pachy', baseRate: 14500000, desc: 'Gỗ nhóm 1 siêu đanh chắc, màu đỏ cam' },
  { id: 'oc-cho', name: 'Gỗ Óc Chó (Walnut)', baseRate: 21000000, desc: 'Vân cuộn nâu socola thượng lưu' },
  { id: 'mdf-an-cuong', name: 'MDF Lõi Xanh Chống Ẩm', baseRate: 3800000, desc: 'Kinh tế, phủ veneer sồi hoặc melamine' }
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
  const [legType, setLegType] = useState('wood');

  const calculation = useMemo(() => {
    const areaM2 = (lengthCm * widthCm) / 10000;
    const thicknessMultiplier = 1 + (thicknessCm - 3) * 0.12;
    const legAddon = legType === 'wood' ? 1200000 : 700000;
    const tablePrice = Math.round(areaM2 * selectedWood.baseRate * thicknessMultiplier + legAddon);
    const chairsPrice = chairCount * selectedFurniture.chairRate;
    const totalFactoryPrice = tablePrice + chairsPrice;
    const showroomPrice = Math.round(totalFactoryPrice * 1.35);

    return {
      tablePrice,
      chairsPrice,
      totalFactoryPrice,
      showroomPrice,
      savedAmount: showroomPrice - totalFactoryPrice,
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
      note: `Kèm ${chairCount} ghế, chân ${legType === 'wood' ? 'gỗ tự nhiên' : 'sắt tĩnh điện'}. Dự toán: ${calculation.totalFactoryPrice.toLocaleString('vi-VN')} đ`
    });
  };

  return (
    <section id="estimator" className="section-space" style={{ backgroundColor: 'var(--bg-step)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Dự Toán Giá Xuất Xưởng</h2>
          <p className="section-desc">
            Chọn quy cách, loại gỗ và kích thước mặt bàn. Hệ thống tính giá trực tiếp theo mộng và thể tích gỗ thật.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Controls Column */}
          <div data-reveal style={{
            backgroundColor: 'var(--bg-surface)',
            padding: '32px',
            borderRadius: 'var(--radius-soft)'
          }}>
            {/* Category Select */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: 'var(--type-body)', marginBottom: '8px' }}>
                Hạng Mục Bàn Ghế
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
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
                      borderRadius: 'var(--radius-soft)',
                      backgroundColor: selectedFurniture.id === type.id ? '#181513' : 'var(--bg-step)',
                      color: selectedFurniture.id === type.id ? '#ffffff' : 'var(--text-ink)',
                      fontWeight: '700',
                      fontSize: 'var(--type-small)',
                      textAlign: 'left'
                    }}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Wood Material Select */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: 'var(--type-body)', marginBottom: '8px' }}>
                Chất Liệu Gỗ
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {WOOD_TYPES.map((wood) => {
                  const isSelected = selectedWood.id === wood.id;
                  return (
                    <div
                      key={wood.id}
                      onClick={() => setSelectedWood(wood)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-soft)',
                        backgroundColor: isSelected ? 'var(--accent-subtle)' : 'var(--bg-step)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', fontSize: 'var(--type-body)', color: isSelected ? 'var(--accent)' : 'var(--text-ink)' }}>
                          {wood.name}
                        </div>
                        <div style={{ fontSize: 'var(--type-small)', color: 'var(--text-muted)' }}>
                          {wood.desc}
                        </div>
                      </div>
                      {isSelected && <Check size={16} color="var(--accent)" strokeWidth={3} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sliders */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600', fontSize: 'var(--type-body)' }}>Chiều Dài Mặt Bàn:</span>
                <span style={{ fontWeight: '800', color: 'var(--accent)' }}>{lengthCm} cm</span>
              </div>
              <input
                type="range"
                min="100"
                max="320"
                step="5"
                value={lengthCm}
                onChange={(e) => setLengthCm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600', fontSize: 'var(--type-body)' }}>Chiều Rộng Mặt Bàn:</span>
                <span style={{ fontWeight: '800', color: 'var(--accent)' }}>{widthCm} cm</span>
              </div>
              <input
                type="range"
                min="50"
                max="130"
                step="5"
                value={widthCm}
                onChange={(e) => setWidthCm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600', fontSize: 'var(--type-body)' }}>Độ Dày Mặt Gỗ:</span>
                <span style={{ fontWeight: '800', color: 'var(--accent)' }}>{thicknessCm} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={thicknessCm}
                onChange={(e) => setThicknessCm(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', fontSize: 'var(--type-small)', marginBottom: '4px' }}>
                  Kiểu Chân Bàn:
                </label>
                <select
                  value={legType}
                  onChange={(e) => setLegType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-soft)',
                    backgroundColor: 'var(--bg-step)',
                    fontWeight: '600',
                    fontSize: 'var(--type-small)',
                    color: 'var(--text-ink)'
                  }}
                >
                  <option value="wood">Chân Gỗ Tự Nhiên</option>
                  <option value="metal">Chân Sắt Sơn Tĩnh Điện</option>
                </select>
              </div>

              {selectedFurniture.chairRate > 0 && (
                <div>
                  <label style={{ display: 'block', fontWeight: '700', fontSize: 'var(--type-small)', marginBottom: '4px' }}>
                    Số Ghế Ăn Đi Kèm:
                  </label>
                  <select
                    value={chairCount}
                    onChange={(e) => setChairCount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 'var(--radius-soft)',
                      backgroundColor: 'var(--bg-step)',
                      fontWeight: '600',
                      fontSize: 'var(--type-small)',
                      color: 'var(--text-ink)'
                    }}
                  >
                    <option value={0}>0 Ghế (Chỉ lấy bàn)</option>
                    <option value={4}>4 Ghế tiêu chuẩn</option>
                    <option value={6}>6 Ghế gia đình</option>
                    <option value={8}>8 Ghế phòng lớn</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Result Block: Bold, Flat, High-Contrast (#ffffff text on #181513 ground) */}
          <div data-reveal style={{
            backgroundColor: '#181513',
            color: '#ffffff',
            padding: '36px',
            borderRadius: 'var(--radius-soft)'
          }}>
            <h3 style={{ color: '#ffffff', fontSize: 'var(--type-lead)', marginBottom: '8px' }}>
              {selectedFurniture.name}
            </h3>
            <p style={{ color: '#ece8de', fontSize: 'var(--type-body)', marginBottom: '28px' }}>
              Chất liệu: {selectedWood.name} · Kích thước: {lengthCm} x {widthCm} x 75 cm (Mặt dày {thicknessCm} cm)
            </p>

            <div style={{
              backgroundColor: '#26221e',
              padding: '24px',
              borderRadius: 'var(--radius-soft)',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--type-body)', marginBottom: '10px' }}>
                <span style={{ color: '#ece8de' }}>Bàn gia công hoàn thiện:</span>
                <span style={{ fontWeight: '700', color: '#ffffff' }}>{calculation.tablePrice.toLocaleString('vi-VN')} đ</span>
              </div>

              {chairCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--type-body)', marginBottom: '10px' }}>
                  <span style={{ color: '#ece8de' }}>Ghế ăn ({chairCount} cái):</span>
                  <span style={{ fontWeight: '700', color: '#ffffff' }}>{calculation.chairsPrice.toLocaleString('vi-VN')} đ</span>
                </div>
              )}

              <div style={{ height: '2px', backgroundColor: '#38322c', margin: '14px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--type-body)', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase' }}>
                  Tổng Giá Xuất Xưởng
                </span>
                <span style={{ fontSize: 'var(--type-lead)', fontWeight: '800', color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>
                  {calculation.totalFactoryPrice.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(5, 150, 105, 0.2)',
              padding: '16px',
              borderRadius: 'var(--radius-soft)',
              marginBottom: '28px',
              fontSize: 'var(--type-small)',
              color: '#6ee7b7'
            }}>
              Giá thương mại ngoài showroom: ~ {calculation.showroomPrice.toLocaleString('vi-VN')} đ.
              Tiết kiệm ~ {calculation.savedAmount.toLocaleString('vi-VN')} đ tại xưởng mộc.
            </div>

            <button
              onClick={handleApply}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <span>Gửi Yêu Cầu Đóng Kích Thước Này</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
