import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { uploadToCloudinary } from '../services/cloudinary';
import { createCustomOrder } from '../services/supabase';

export default function CustomOrderForm({ prefilledData, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    furniture_type: prefilledData?.furniture_type || 'Bàn Ăn Gia Đình',
    wood_material: prefilledData?.wood_material || 'Gỗ Sồi Nga (Oak)',
    length_cm: prefilledData?.length_cm || 160,
    width_cm: prefilledData?.width_cm || 80,
    height_cm: 75,
    thickness_cm: prefilledData?.thickness_cm || 4,
    estimated_price: prefilledData?.estimated_price || 0,
    note: prefilledData?.note || ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({ ...prev, ...prefilledData }));
    }
  }, [prefilledData]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.customer_name.trim() || !formData.customer_phone.trim()) {
      setErrorMessage('Vui lòng nhập Họ tên và Số điện thoại để xưởng liên hệ.');
      return;
    }

    setIsSubmitting(true);
    let designImageUrl = '';

    try {
      if (imageFile) {
        setIsUploading(true);
        const uploadResult = await uploadToCloudinary(imageFile);
        designImageUrl = uploadResult.url;
        setIsUploading(false);
      }

      const orderPayload = {
        ...formData,
        design_image_url: designImageUrl
      };

      const result = await createCustomOrder(orderPayload);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmitSuccess(result);
      if (onOrderSuccess) onOrderSuccess(result);
    } catch (err) {
      console.error('Lỗi khi gửi đơn đặt đóng:', err);
      setErrorMessage('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại hoặc gọi Hotline xưởng.');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setSubmitSuccess(null);
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <section id="custom-order" className="section-space" style={{ backgroundColor: 'var(--bg-step)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="section-header">
          <h2 className="section-title">Gia Công Riêng Theo Bản Vẽ Thiết Kế</h2>
          <p className="section-desc">
            Gửi hình ảnh mẫu bàn ghế bạn muốn làm. Xưởng bóc tách phôi gỗ, dự toán và cử thợ mộc qua khảo sát đo đạc tận nơi miễn phí.
          </p>
        </div>

        {submitSuccess ? (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-soft)',
            padding: '48px 32px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle size={34} />
            </div>

            <h3 style={{ fontSize: '1.65rem', marginBottom: '8px' }}>
              Xưởng Đã Nhận Yêu Cầu Thành Công
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 24px' }}>
              Mã đơn yêu cầu: <strong style={{ color: 'var(--accent)' }}>{submitSuccess.order_code}</strong>. 
              Kỹ thuật viên xưởng sẽ liên hệ lại qua SĐT <strong>{formData.customer_phone}</strong> để hẹn lịch khảo sát.
            </p>

            <button onClick={resetForm} className="btn btn-primary btn-md">
              Gửi Thêm Yêu Cầu Mới
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-reveal style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-soft)',
            padding: '40px'
          }}>
            {errorMessage && (
              <div style={{
                backgroundColor: '#fef2f2',
                color: '#b91c1c',
                padding: '14px 18px',
                borderRadius: 'var(--radius-soft)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '28px' }}>
              {/* Customer info */}
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>1. Thông Tin Khách Hàng</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Anh Hoàng / Chị Linh..."
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Số Điện Thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912..."
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Địa Chỉ Đo Đạc / Khảo Sát:
                    </label>
                    <input
                      type="text"
                      placeholder="Căn hộ, số nhà, quận huyện..."
                      value={formData.customer_address}
                      onChange={(e) => setFormData({ ...formData, customer_address: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Spec info */}
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>2. Quy Cách Bàn Ghế</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Hạng Mục Cần Đóng:
                    </label>
                    <input
                      type="text"
                      value={formData.furniture_type}
                      onChange={(e) => setFormData({ ...formData, furniture_type: e.target.value })}
                      placeholder="Bàn ăn 6 ghế, sofa gỗ..."
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Chất Liệu Gỗ:
                    </label>
                    <select
                      value={formData.wood_material}
                      onChange={(e) => setFormData({ ...formData, wood_material: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.9rem' }}
                    >
                      <option value="Gỗ Sồi Nga (Oak)">Gỗ Sồi Nga (Oak) Nhập Khẩu</option>
                      <option value="Gỗ Tần Bì (Ash)">Gỗ Tần Bì (Ash)</option>
                      <option value="Gỗ Me Tây">Gỗ Me Tây Nguyên Tấm (Live Edge)</option>
                      <option value="Gỗ Gõ Đỏ Pachy">Gỗ Gõ Đỏ Pachy Cao Cấp</option>
                      <option value="Gỗ Óc Chó (Walnut FAS)">Gỗ Óc Chó (Walnut FAS) Bắc Mỹ</option>
                      <option value="MDF Lõi Xanh An Cường">MDF Lõi Xanh Chống Ẩm An Cường</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '4px' }}>Dài (cm):</label>
                      <input
                        type="number"
                        value={formData.length_cm}
                        onChange={(e) => setFormData({ ...formData, length_cm: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '4px' }}>Rộng (cm):</label>
                      <input
                        type="number"
                        value={formData.width_cm}
                        onChange={(e) => setFormData({ ...formData, width_cm: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '4px' }}>Cao (cm):</label>
                      <input
                        type="number"
                        value={formData.height_cm}
                        onChange={(e) => setFormData({ ...formData, height_cm: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloudinary Upload Area: Flat Surface Tone */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px' }}>
                Ảnh Mẫu / Bản Vẽ 3D Thiết Kế (Tải Trực Tiếp Lên Cloudinary):
              </label>

              <div style={{
                borderRadius: 'var(--radius-soft)',
                padding: '28px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-step)',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                />

                {imagePreview ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={imagePreview}
                      alt="Preview mẫu"
                      style={{ maxHeight: '160px', borderRadius: 'var(--radius-soft)', objectFit: 'contain' }}
                    />
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '700' }}>
                      Nhấp để đổi ảnh ({imageFile?.name})
                    </span>
                  </div>
                ) : (
                  <div>
                    <UploadCloud size={32} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
                    <p style={{ fontWeight: '700', fontSize: '0.92rem', marginBottom: '2px' }}>
                      Nhấp hoặc kéo thả ảnh mẫu vào đây
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                      JPG, PNG, WEBP (Lưu trữ Cloudinary)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Note */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                Yêu Cầu Chi Tiết (Mộng gỗ, bo cong góc, màu sơn PU, thời hạn hoàn thiện):
              </label>
              <textarea
                rows="3"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Ghi chú thêm về yêu cầu gia công..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-soft)', border: 'none', backgroundColor: 'var(--bg-step)', fontSize: '0.9rem', resize: 'vertical' }}
              />
            </div>

            {/* Action */}
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              {isSubmitting || isUploading ? (
                <>
                  <Loader2 size={18} />
                  <span>Đang tải ảnh Cloudinary & Gửi đơn...</span>
                </>
              ) : (
                <span>Gửi Yêu Cầu Cho Xưởng Mộc</span>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
