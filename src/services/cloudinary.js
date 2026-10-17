// ===================================================================
// DỊCH VỤ TẢI ẢNH LÊN CLOUDINARY CHO XƯỞNG BÀN GHẾ
// ===================================================================

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Kiểm tra xem cấu hình Cloudinary đã sẵn sàng chưa
 */
export const isCloudinaryConfigured = () => {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET && CLOUD_NAME.trim() !== '' && UPLOAD_PRESET.trim() !== '');
};

/**
 * Upload hình ảnh lên Cloudinary
 * @param {File|Blob} file - Tệp ảnh cần tải lên
 * @param {Function} onProgress - Callback tiến trình (0 -> 100%)
 * @returns {Promise<{url: string, public_id?: string, isLocal?: boolean}>}
 */
export async function uploadToCloudinary(file, onProgress = null) {
  if (!file) {
    throw new Error('Vui lòng chọn tệp hình ảnh hợp lệ.');
  }

  // Nếu đã cấu hình Cloudinary Cloud Name và Upload Preset
  if (isCloudinaryConfigured()) {
    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'xuongbanghe_products');

      // Giả lập tiến trình trước
      if (onProgress) onProgress(30);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.warn('Lỗi Cloudinary API:', errorData);
        throw new Error(errorData.error?.message || 'Không thể tải ảnh lên Cloudinary');
      }

      const data = await response.json();
      if (onProgress) onProgress(100);

      return {
        url: data.secure_url,
        public_id: data.public_id,
        format: data.format,
        width: data.width,
        height: data.height,
        isCloudinary: true
      };
    } catch (err) {
      console.warn('Lỗi khi tải lên Cloudinary, chuyển sang lưu Base64 tạm thời:', err);
      // Fallback về base64 nếu API lỗi mạng
      return readAsDataUrl(file);
    }
  }

  // Chế độ mô phỏng khi chưa nhập Key Cloudinary: Tạo Base64 Data URL để người dùng trải nghiệm ngay
  console.info('Chưa cấu hình Cloudinary trong .env. Sử dụng chế độ ảnh cục bộ tạm thời.');
  if (onProgress) onProgress(50);
  const result = await readAsDataUrl(file);
  if (onProgress) onProgress(100);
  return result;
}

/**
 * Đọc file thành chuỗi Data URL (Base64)
 */
function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result,
        public_id: `local_${Date.now()}`,
        isCloudinary: false
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Tối ưu hoá URL ảnh từ Cloudinary (tự động nén và đổi kích thước)
 * @param {string} url - Link ảnh gốc
 * @param {number} width - Chiều rộng mong muốn
 */
export function getOptimizedImageUrl(url, width = 800) {
  if (!url) return 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80';
  
  if (url.includes('res.cloudinary.com')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
}
