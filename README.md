# 🪑 XƯỞNG BÀN GHẾ GỖ TINH HOA WOOD
> **Nền tảng Web Xưởng Mộc & Gia Công Bàn Ghế Theo Kích Thước Riêng**  
> Frontend: **React + Vite** | Backend: **React Admin CMS** | Database: **Supabase (PostgreSQL)** | Lưu trữ ảnh: **Cloudinary**  
> GitHub Repository: [https://github.com/dieydev/xuongbanghe_.git](https://github.com/dieydev/xuongbanghe_.git)

---

## 🌟 1. Tính Năng Chính

### 🏠 Phía Khách Hàng (Storefront)
- **Hero & Cam Kết Xưởng Mộc**: Giới thiệu năng lực gia công trực tiếp tại làng nghề Canh Nậu - Thạch Thất, tiết kiệm 25% - 35% chi phí so với mua qua showroom trung gian.
- **Công Cụ Dự Toán Báo Giá Trực Tuyến**: Khách hàng chọn loại bàn ghế, loại gỗ (*Sồi Nga, Gõ Đỏ, Me Tây, Óc Chó, MDF An Cường*), kéo thanh trượt kích thước (*Dài x Rộng x Độ Dày*) và số ghế -> Hệ thống tự động tính ra **Giá Xuất Xưởng** chính xác tới 95% và số tiền tiết kiệm được!
- **Bộ Sưu Tập Bàn Ghế**: Lọc theo danh mục (*Bàn ăn, Sofa gỗ, Bàn làm việc, Ghế cafe, Bàn me tây nguyên tấm*), lọc theo mức giá và tìm kiếm từ khóa.
- **Chi Tiết Sản Phẩm**: Xem ảnh chất lượng cao tối ưu qua Cloudinary, thông số quy cách, công nghệ sơn PU Inchem 5 lớp, chính sách bảo hành mối mọt 5 - 10 năm.
- **Đặt Đóng Bàn Ghế Theo Bản Vẽ Riêng**: Cho phép khách nhập thông số tùy chỉnh và **tải ảnh mẫu / bản vẽ thiết kế 3D trực tiếp lên Cloudinary** (tự động lưu URL vào Supabase).
- **Giỏ Hàng & Khảo Sát Tận Nhà**: Đặt lịch hẹn để thợ mộc mang thước laser và mẫu phôi gỗ qua đo đạc khảo sát thực tế.

### ⚙️ Phía Quản Trị Xưởng (Backend React Admin CMS)
- Truy cập tức thì qua nút **"Quản Trị Xưởng (Admin)"** trên thanh Header.
- **Quản lý sản phẩm (CRUD)**: Thêm mới mẫu bàn ghế, sửa quy cách, xóa sản phẩm và **Tải ảnh sản phẩm lên Cloudinary** trực tiếp từ giao diện quản trị.
- **Quản lý đơn đặt đóng của khách**: Xem thông tin khách hàng, xem ảnh bản vẽ mẫu Cloudinary khách gửi, cập nhật tiến độ gia công (*Chờ duyệt -> Đang ra phôi gỗ -> Đang chà nhám/sơn PU -> Đang giao -> Hoàn tất*).
- **Kiểm tra trạng thái kết nối**: Theo dõi trực quan trạng thái kết nối giữa Supabase và Cloudinary, có sẵn chế độ **Mock Data thông minh** (lưu trên LocalStorage) giúp web hoạt động mượt mà ngay cả khi chưa kịp cấu hình API Keys!

---

## 🚀 2. Cài Đặt & Chạy Trên Máy Cục Bộ

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi động môi trường phát triển (Dev Server)
npm run dev
```

Mở trình duyệt tại địa chỉ hiển thị trong terminal (thường là `http://localhost:5173`).

---

## 🗄️ 3. Hướng Dẫn Kết Nối Supabase (Cơ Sở Dữ Liệu SQL)

1. Đăng nhập vào [Supabase.com](https://supabase.com) và tạo một Project mới.
2. Tại thanh điều hướng bên trái, chọn **SQL Editor** -> **New query**.
3. Mở file [supabase/schema.sql](file:///d:/XuongBanGhe/supabase/schema.sql), sao chép toàn bộ nội dung, dán vào và nhấn **RUN**.
4. Vào **Project Settings** -> **API**, sao chép:
   - **Project URL**
   - **anon / public key**
5. Mở file `.env` trong thư mục gốc và dán thông tin vào:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## ☁️ 4. Hướng Dẫn Cấu Hình Cloudinary (Lưu Trữ Ảnh)

1. Đăng ký tài khoản miễn phí tại [Cloudinary.com](https://cloudinary.com).
2. Lấy **Cloud Name** trên màn hình Dashboard.
3. Vào **Settings (Bánh răng)** -> **Upload** -> Kéo xuống mục **Upload presets** -> Chọn **Add upload preset**:
   - Đặt tên Preset (ví dụ: `xuongbanghe_preset`)
   - Tại mục **Signing Mode**, chọn: **Unsigned**
   - Bấm **Save**.
4. Mở file `.env` và điền:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=xuongbanghe_preset
   ```

---

## 🌿 5. Kết Nối & Đẩy Code Lên GitHub

Kho lưu trữ remote đã được kết nối sẵn với `https://github.com/dieydev/xuongbanghe_.git`.

Để đẩy toàn bộ mã nguồn lên nhánh chính (`main`):

```bash
git add .
git commit -m "feat: Xây dựng hoàn chỉnh web xưởng bàn ghế React + Vite + Backend React + Supabase + Cloudinary"
git push -u origin main
```
