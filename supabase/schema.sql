-- ===================================================================
-- SQL SCHEMA CHO WEB XƯỞNG BÀN GHẾ (SUPABASE POSTGRESQL)
-- Hướng dẫn: Copy toàn bộ nội dung file này dán vào "SQL Editor" trong Supabase
-- và nhấn nút "RUN" để khởi tạo cấu trúc bảng + dữ liệu mẫu.
-- ===================================================================

-- 1. Kích hoạt extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. BẢNG DANH MỤC SẢN PHẨM (Categories)
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BẢNG SẢN PHẨM BÀN GHẾ XƯỞNG (Products)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  original_price NUMERIC,
  wood_type TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  finish TEXT DEFAULT 'Sơn PU Inchem cao cấp chống thấm',
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_customizable BOOLEAN DEFAULT true,
  stock_status TEXT DEFAULT 'made_to_order', -- 'available', 'made_to_order', 'out_of_stock'
  lead_time_days INT DEFAULT 7,
  warranty_months INT DEFAULT 36,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BẢNG YÊU CẦU ĐẶT ĐÓNG BÀN GHẾ THEO YÊU CẦU (Custom Orders)
CREATE TABLE IF NOT EXISTS custom_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  furniture_type TEXT NOT NULL,
  wood_material TEXT NOT NULL,
  length_cm NUMERIC,
  width_cm NUMERIC,
  height_cm NUMERIC,
  thickness_cm NUMERIC,
  estimated_price NUMERIC DEFAULT 0,
  design_image_url TEXT, -- Link ảnh mẫu upload lên Cloudinary
  note TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'in_production', 'delivering', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BẢNG ĐƠN ĐẶT HÀNG TRỰC TIẾP (Orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT DEFAULT 'cod', -- 'cod', 'transfer'
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'cancelled'
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BẢNG LIÊN HỆ / YÊU CẦU KHẢO SÁT ĐO ĐẠC TẬN NHÀ (Inquiries)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  address TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================================
-- CÀI ĐẶT BẢO MẬT ROW LEVEL SECURITY (RLS)
-- ===================================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Cho phép đọc công khai danh mục & sản phẩm
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- Cho phép khách hàng gửi đơn đặt hàng & yêu cầu đóng bàn ghế
CREATE POLICY "Public insert custom_orders" ON custom_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read custom_orders" ON custom_orders FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Cho phép quản trị viên thêm/sửa/xóa (hoặc API anon thao tác)
CREATE POLICY "Admin write categories" ON categories FOR ALL USING (true);
CREATE POLICY "Admin write products" ON products FOR ALL USING (true);
CREATE POLICY "Admin update custom_orders" ON custom_orders FOR UPDATE USING (true);
CREATE POLICY "Admin update orders" ON orders FOR UPDATE USING (true);

-- ===================================================================
-- DỮ LIỆU MẪU (SEED DATA) CHO XƯỞNG BÀN GHẾ
-- ===================================================================
INSERT INTO categories (id, name, description, icon, display_order) VALUES
  ('ban-an', 'Bàn Ghế Ăn Gia Đình', 'Bộ bàn ăn gỗ sồi, gõ đỏ, óc chó nguyên khối sang trọng ấm cúng', 'UtensilsCrossed', 1),
  ('sofa-go', 'Sofa Gỗ Hiện Đại', 'Sofa gỗ tự nhiên kết hợp đệm da bò nhập khẩu, phong cách Indochine & Bắc Âu', 'Armchair', 2),
  ('ban-lam-viec', 'Bàn Làm Việc & Họp', 'Bàn giám đốc, bàn họp văn phòng, bàn làm việc gỗ tự nhiên bo cong tinh tế', 'Briefcase', 3),
  ('ghe-cafe-bar', 'Ghế Cafe & Nhà Hàng', 'Ghế mây đan, ghế Thonet, ghế gỗ tần bì thanh lịch cho quán cafe, nhà hàng', 'Coffee', 4),
  ('ban-me-tay', 'Bàn Me Tây Nguyên Tấm', 'Bàn mặt gỗ me tây vân sóng tự nhiên độc bản, giữ nguyên bìa gỗ mộc mạc', 'TreePine', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (
  id, name, category_id, price, original_price, wood_type, dimensions, finish, description, features, images, is_featured, is_customizable, stock_status, lead_time_days
) VALUES
  (
    'p1',
    'Bộ Bàn Ăn Gỗ Sồi Nga Tinh Tế (1 Bàn + 6 Ghế)',
    'ban-an',
    12500000,
    14800000,
    'Gỗ Sồi Nga (Oak) nhập khẩu loại 1',
    'Bàn: 160 x 80 x 75 cm | Ghế: 45 x 45 x 85 cm',
    'Sơn bóng mờ 50% Inchem Mỹ, giữ vân sồi tự nhiên',
    'Thiết kế tân thời bo vát 4 góc an toàn cho trẻ nhỏ. Chân tiện tròn nghiêng góc vững chãi, nệm ghế bọc da microfiber êm ái chống bám bẩn.',
    '["Gỗ sồi sấy nhiệt chân không chống cong vênh", "Bo cạnh tròn an toàn chống va đập", "Ghế chịu tải tới 200kg", "Bảo hành mối mọt 5 năm"]'::jsonb,
    '["https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    true,
    true,
    'available',
    3
  ),
  (
    'p2',
    'Bàn Mặt Gỗ Me Tây Nguyên Tấm Độc Bản (Edge Live)',
    'ban-me-tay',
    18900000,
    22000000,
    'Gỗ Me Tây tự nhiên nguyên khối 100%',
    'Dài 200 x Rộng 85-90 x Dày 7 cm',
    'Phủ dầu lau Osmo Đức + PU bóng gương chịu nhiệt',
    'Mỗi tấm gỗ me tây là một kiệt tác vân gỗ tự nhiên độc nhất vô nhị. Mặt bàn giữ trọn đường cong bìa cây hoang dã kết hợp chân sắt sơn tĩnh điện chữ X siêu chịu lực.',
    '["Gỗ nguyên khối không chắp vá", "Vân gỗ tự nhiên uốn lượn sắc sảo", "Chân sắt tĩnh điện sơn nhám cao cấp", "Tặng kèm chai sáp dưỡng gỗ"]'::jsonb,
    '["https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    true,
    true,
    'made_to_order',
    5
  ),
  (
    'p3',
    'Bộ Sofa Gỗ Óc Chó (Walnut) Chữ L Cao Cấp Kèm Bàn Trà',
    'sofa-go',
    38500000,
    45000000,
    'Gỗ Óc Chó Bắc Mỹ nhập khẩu FAS',
    'Văng dài 260 x 180 x 75 cm | Bàn trà 120 x 60 x 42 cm',
    'Sơn lót 3 lớp, hoàn thiện PU mờ 70% mịn như lụa',
    'Bộ sofa chữ L sang trọng cho phòng khách biệt thự & chung cư cao cấp. Vân gỗ óc chó xoáy cuộn mê hoặc, ngăn kéo tab tiện dụng tích hợp ray trượt giảm chấn Hafele.',
    '["Chất gỗ Óc chó loại FAS tiêu chuẩn xuất khẩu", "Đệm mút D40 chống xẹp lún bọc da bò Ý", "Ray trượt âm giảm chấn Hafele Đức", "Bảo hành khung gỗ 10 năm"]'::jsonb,
    '["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    true,
    true,
    'made_to_order',
    10
  ),
  (
    'p4',
    'Bàn Làm Việc Giám Đốc Gỗ Gõ Đỏ Chạm Khắc Tinh Xảo',
    'ban-lam-viec',
    21500000,
    26000000,
    'Gỗ Gõ Đỏ Pachy Nam Phi đanh chắc',
    'Dài 180 x Rộng 90 x Cao 78 cm',
    'Sơn PU mộc giữ màu đỏ cam quý phái nguyên bản',
    'Bàn làm việc bề thế mang lại tài lộc và phong thủy vượng khí. Hộc tủ khoá số tiện ích, mặt bàn đục chỉ trang nhã, viền dày dặn chống trầy xước.',
    '["Gỗ gõ đỏ thịt đanh chắc chống mối mọt vĩnh viễn", "Có lỗ luồn dây điện âm giấu kín tinh tế", "Ngăn kéo khóa an toàn tài liệu", "Miễn phí đo đạc lắp đặt"]'::jsonb,
    '["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    false,
    true,
    'made_to_order',
    8
  ),
  (
    'p5',
    'Ghế Thonet Mây Gỗ Tần Bì (Ash) Chuẩn Quán Cafe & Dining',
    'ghe-cafe-bar',
    1450000,
    1850000,
    'Khung Gỗ Tần Bì uốn nhiệt + Mây mắt cáo tự nhiên',
    '45 x 48 x 82 cm (Chiều cao ngồi 45 cm)',
    'Phủ bóng mờ bảo vệ mây tự nhiên',
    'Dòng ghế kinh điển vượt thời gian. Lưng tựa và mê ngồi đan mây mắt cáo thoáng mát, đàn hồi tốt mang lại cảm giác ngồi cực kỳ thư thái.',
    '["Kỹ thuật uốn cong gỗ hơi nước nguyên khối", "Mây đan thủ công tỉ mỉ", "Phù hợp quán cafe, trà sữa, homestay, ban công", "Chống ẩm mốc tốt"]'::jsonb,
    '["https://images.unsplash.com/photo-1580481077195-c3a9927b74b7?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"]'::jsonb,
    true,
    true,
    'available',
    1
  ),
  (
    'p6',
    'Bàn Trà Bệt Tròn Chân Tiện Gỗ Tự Nhiên Bắc Âu',
    'ban-an',
    2800000,
    3400000,
    'Gỗ Cao Su tự nhiên ghép thanh phủ veneer Sồi',
    'Đường kính 70 cm x Cao 42 cm',
    'Sơn NC mờ chống nước tràn bề mặt',
    'Bàn trà tối giản nhỏ gọn, dễ dàng tháo lắp di chuyển. Mặt bàn vát cạnh kim cương nhẹ nhàng thanh thoát.',
    '["Dễ lau chùi kháng nước cà phê, trà", "Chân bàn vặn ốc tiện tháo rời cất gọn", "Thích hợp phòng khách nhỏ hoặc căn hộ studio"]'::jsonb,
    '["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    false,
    false,
    'available',
    1
  )
ON CONFLICT (id) DO NOTHING;
