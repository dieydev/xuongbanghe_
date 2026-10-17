import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  Sparkles, 
  Ruler, 
  Image as ImageIcon, 
  Phone, 
  User, 
  MapPin, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { uploadToCloudinary, isCloudinaryConfigured } from '../services/cloudinary';
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

  // Cập nhật khi có prefilledData từ công cụ Dự toán
  React.useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        ...prefilledData
      }));
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
      // 1. Tải ảnh mẫu / bản vẽ lên Cloudinary (nếu có chọn ảnh)
      if (imageFile) {
        setIsUploading(true);
        const uploadResult = await uploadToCloudinary(imageFile);
        designImageUrl = uploadResult.url;
        setIsUploading(false);
      }

      // 2. Lưu thông tin đơn vào Supabase (hoặc mock store)
      const orderPayload = {
        ...formData,
        design_image_url: designImageUrl
      };

      const result = await createCustomOrder(orderPayload);

      // 3. Hiệu ứng ăn mừng bằng pháo hoa
      confetti({
        particleCount: 100,
        spread: 70,
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
    setFormData({
      customer_name: '',
      customer_phone: '',
      customer_address: '',
      furniture_type: 'Bàn Ăn Gia Đình',
      wood_material: 'Gỗ Sồi Nga (Oak)',
      length_cm: 160,
      width_cm: 80,
      height_cm: 75,
      thickness_cm: 4,
      estimated_price: 0,
      note: ''
    });
  };

  return (
    <section id="custom-order" className="section-padding" style={{ backgroundColor: 'var(--wood-50)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="section-header">
          <div className="section-tag">
            <FileText size={15} />
            <span>Gia Công Riêng Theo Bản Vẽ</span>
          </div>
          <h2 className="section-title">Gửi Yêu Cầu Đóng Bàn Ghế Theo Kích Thước Riêng</h2>
          <p className="section-desc">
            Bạn có bản vẽ thiết kế 3D hoặc hình ảnh mẫu bàn ghế ưng ý trên mạng? 
            Hãy gửi cho xưởng mộc, nghệ nhân sẽ bóc tách khối lượng và thợ mộc qua khảo sát đo đạc tận nơi miễn phí.
          </p>
        </div>

        {submitSuccess ? (
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid #a7f3d0'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '10px', color: 'var(--wood-900)' }}>
              Xưởng Đã Nhận Yêu Cầu Thành Công!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 24px' }}>
              Mã đơn yêu cầu của bạn là <strong style={{ color: 'var(--amber-primary)' }}>{submitSuccess.order_code}</strong>. 
              Kỹ thuật viên mộc sẽ liên hệ lại qua SĐT <strong>{formData.customer_phone}</strong> trong vòng 15-30 phút để chốt lịch hẹn qua đo đạc khảo sát.
            </p>

            <div style={{
              background: 'var(--wood-50)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              maxWidth: '480px',
              margin: '0 auto 28px',
              textAlign: 'left',
              fontSize: '0.88rem',
              border: '1px solid var(--border-color)'
            }}>
              <div><strong>Hạng mục:</strong> {formData.furniture_type}</div>
              <div><strong>Loại gỗ:</strong> {formData.wood_material}</div>
              <div><strong>Kích thước:</strong> {formData.length_cm} x {formData.width_cm} x {formData.height_cm} cm</div>
              {formData.estimated_price > 0 && (
                <div style={{ marginTop: '6px', color: 'var(--amber-primary)', fontWeight: '700' }}>
                  Dự toán xuất xưởng: {Number(formData.estimated_price).toLocaleString('vi-VN')} đ
                </div>
              )}
            </div>

            <button onClick={resetForm} className="btn btn-primary btn-md">
              Gửi Thêm Yêu Cầu Mới
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)'
          }}>
            {errorMessage && (
              <div style={{
                background: '#fef2f2',
                color: '#b91c1c',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '28px' }}>
              {/* Thông tin khách hàng */}
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={18} color="var(--amber-primary)" />
                  Thông Tin Khách Hàng
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      Họ và Tên <span style={{ color: '#ef4444' }}>*</span>:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Hoàng / Chị Linh"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      Số Điện Thoại / Zalo <span style={{ color: '#ef4444' }}>*</span>:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912 345 678"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      Địa Chỉ Khảo Sát / Giao Hàng:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Căn 1205, Tòa S2, Vinhomes Smart City, Hà Nội"
                      value={formData.customer_address}
                      onChange={(e) => setFormData({ ...formData, customer_address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Thông số kỹ thuật sản phẩm */}
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ruler size={18} color="var(--amber-primary)" />
                  Quy Cách Đóng Bàn Ghế
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      Hạng Mục Cần Đóng:
                    </label>
                    <input
                      type="text"
                      value={formData.furniture_type}
                      onChange={(e) => setFormData({ ...formData, furniture_type: e.target.value })}
                      placeholder="Bàn ăn 6 ghế, Sofa gỗ, Bàn làm việc..."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                      Chất Liệu Gỗ Mong Muốn:
                    </label>
                    <select
                      value={formData.wood_material}
                      onChange={(e) => setFormData({ ...formData, wood_material: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem',
                        background: '#ffffff'
                      }}
                    >
                      <option value="Gỗ Sồi Nga (Oak)">Gỗ Sồi Nga (Oak) Nhập Khẩu</option>
                      <option value="Gỗ Tần Bì (Ash)">Gỗ Tần Bì (Ash)</option>
                      <option value="Gỗ Me Tây">Gỗ Me Tây Nguyên Tấm (Live Edge)</option>
                      <option value="Gỗ Gõ Đỏ Pachy">Gỗ Gõ Đỏ Pachy Cao Cấp</option>
                      <option value="Gỗ Óc Chó (Walnut FAS)">Gỗ Óc Chó (Walnut FAS) Bắc Mỹ</option>
                      <option value="MDF Lõi Xanh An Cường">MDF Lõi Xanh Chống Ẩm An Cường</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '4px' }}>
                        Dài (cm):
                      </label>
                      <input
                        type="number"
                        value={formData.length_cm}
                        onChange={(e) => setFormData({ ...formData, length_cm: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '4px' }}>
                        Rộng (cm):
                      </label>
                      <input
                        type="number"
                        value={formData.width_cm}
                        onChange={(e) => setFormData({ ...formData, width_cm: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', marginBottom: '4px' }}>
                        Cao (cm):
                      </label>
                      <input
                        type="number"
                        value={formData.height_cm}
                        onChange={(e) => setFormData({ ...formData, height_cm: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload ảnh mẫu Cloudinary */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>
                Đính Kèm Ảnh Mẫu / Bản Vẽ 3D Thiết Kế (Tự động tải lên Cloudinary):
              </label>

              <div style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: 'var(--wood-50)',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%'
                  }}
                />

                {imagePreview ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={imagePreview}
                      alt="Preview mẫu bàn ghế"
                      style={{ maxHeight: '160px', borderRadius: '8px', objectFit: 'contain' }}
                    />
                    <span style={{ fontSize: '0.85rem', color: 'var(--amber-primary)', fontWeight: '600' }}>
                      Nhấp để chọn ảnh khác ({imageFile?.name})
                    </span>
                  </div>
                ) : (
                  <div>
                    <UploadCloud size={36} color="var(--amber-primary)" style={{ margin: '0 auto 10px' }} />
                    <p style={{ fontWeight: '600', fontSize: '0.92rem', marginBottom: '4px', color: 'var(--wood-900)' }}>
                      Kéo thả hoặc nhấp để tải ảnh mẫu lên
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', margin: 0 }}>
                      Hỗ trợ JPG, PNG, WEBP (Lưu trữ bảo mật trên Cloudinary)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Ghi chú thêm */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                Yêu Cầu Chi Tiết Khác (Mộng gỗ, bo cong góc, màu sơn PU, thời hạn hoàn thiện):
              </label>
              <textarea
                rows="3"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Ví dụ: Bàn ăn bo vát 4 góc cho trẻ con, mặt bàn dày 5cm nguyên tấm, sơn màu hạt dẻ óc chó..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting || isUploading ? (
                <>
                  <Loader2 size={20} className="pulse-glow" />
                  <span>Đang tải ảnh lên Cloudinary & Gửi đơn...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Xác Nhận Gửi Yêu Cầu Cho Xưởng Mộc</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
