// ===================================================================
// DỊCH VỤ KẾT NỐI SUPABASE & MOCK DATA FALLBACK CHO XƯỞNG BÀN GHẾ
// ===================================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Kiểm tra xem đã cung cấp Supabase URL và Key hợp lệ chưa
export const isSupabaseConfigured = () => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL.startsWith('http') &&
    SUPABASE_ANON_KEY.length > 20 &&
    !SUPABASE_URL.includes('your-project-id')
  );
};

// Khởi tạo Supabase client nếu đã có config
export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ===================================================================
// DỮ LIỆU BAN ĐẦU CHO CHẾ ĐỘ MÔ PHỎNG (KHI CHƯA ĐIỀN API KEY)
// ===================================================================
const INITIAL_CATEGORIES = [
  { id: 'all', name: 'Tất Cả Sản Phẩm', icon: 'Grid' },
  { id: 'ban-an', name: 'Bàn Ăn Gia Đình', icon: 'UtensilsCrossed' },
  { id: 'sofa-go', name: 'Sofa Gỗ Hiện Đại', icon: 'Armchair' },
  { id: 'ban-lam-viec', name: 'Bàn Làm Việc & Họp', icon: 'Briefcase' },
  { id: 'ghe-cafe-bar', name: 'Ghế Cafe & Decor', icon: 'Coffee' },
  { id: 'ban-me-tay', name: 'Bàn Me Tây Nguyên Khối', icon: 'TreePine' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Bộ Bàn Ăn Gỗ Sồi Nga Tinh Tế (1 Bàn + 6 Ghế)',
    category_id: 'ban-an',
    price: 12500000,
    original_price: 14800000,
    wood_type: 'Gỗ Sồi Nga (Oak) nhập khẩu loại 1',
    dimensions: 'Bàn: 160 x 80 x 75 cm | Ghế: 45 x 45 x 85 cm',
    finish: 'Sơn PU Inchem Mỹ mờ 50%, giữ vân tự nhiên',
    description: 'Bộ bàn ăn gỗ sồi tự nhiên bo vát 4 góc an toàn cho gia đình có trẻ nhỏ. Chân tiện tròn nghiêng góc vững chãi, nệm ghế bọc da microfiber êm ái chống bám bẩn.',
    features: ['Gỗ sồi sấy nhiệt chân không chống cong vênh', 'Bo cạnh tròn an toàn chống va đập', 'Ghế chịu tải tới 200kg', 'Bảo hành mối mọt 5 năm'],
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80'
    ],
    is_featured: true,
    is_customizable: true,
    stock_status: 'available',
    lead_time_days: 3,
    warranty_months: 36
  },
  {
    id: 'p2',
    name: 'Bàn Mặt Gỗ Me Tây Nguyên Tấm Độc Bản (Live Edge)',
    category_id: 'ban-me-tay',
    price: 18900000,
    original_price: 22000000,
    wood_type: 'Gỗ Me Tây tự nhiên nguyên khối 100%',
    dimensions: 'Dài 200 x Rộng 85-90 x Dày 7 cm',
    finish: 'Phủ dầu lau Osmo Đức + PU bóng mờ chịu nhiệt',
    description: 'Mỗi tấm gỗ me tây là một kiệt tác vân gỗ tự nhiên độc nhất vô nhị. Mặt bàn giữ trọn đường cong bìa cây tự nhiên hoang dã kết hợp chân sắt sơn tĩnh điện chữ X.',
    features: ['Gỗ nguyên khối không ghép mí', 'Vân gỗ tự nhiên sắc sảo uốn lượn', 'Chân sắt hộp sơn tĩnh điện nhám', 'Tặng kèm hũ sáp dưỡng gỗ'],
    images: [
      'https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80'
    ],
    is_featured: true,
    is_customizable: true,
    stock_status: 'made_to_order',
    lead_time_days: 5,
    warranty_months: 60
  },
  {
    id: 'p3',
    name: 'Bộ Sofa Gỗ Óc Chó (Walnut) Chữ L Kèm Bàn Trà Kính',
    category_id: 'sofa-go',
    price: 38500000,
    original_price: 45000000,
    wood_type: 'Gỗ Óc Chó Bắc Mỹ nhập khẩu chuẩn FAS',
    dimensions: 'Văng dài 260 x 180 x 75 cm | Bàn trà 120 x 60 x 42 cm',
    finish: 'Sơn lót 3 lớp, hoàn thiện PU mờ mịn màng mát tay',
    description: 'Bộ sofa chữ L bề thế dành cho biệt thự và phòng khách rộng. Vân gỗ óc chó xoáy cuộn mê đắm, tab ngăn kéo đầu hồi tiện dụng tích hợp ray trượt giảm chấn.',
    features: ['Gỗ Óc chó loại FAS tiêu chuẩn cao cấp', 'Đệm mút D40 chống xẹp lún bọc da bò Ý', 'Ray trượt âm giảm chấn Hafele', 'Bảo hành khung gỗ 10 năm'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    is_featured: true,
    is_customizable: true,
    stock_status: 'made_to_order',
    lead_time_days: 10,
    warranty_months: 60
  },
  {
    id: 'p4',
    name: 'Bàn Làm Việc Giám Đốc Gỗ Gõ Đỏ Chạm Khắc Trang Nhã',
    category_id: 'ban-lam-viec',
    price: 21500000,
    original_price: 25000000,
    wood_type: 'Gỗ Gõ Đỏ Pachy Nam Phi đanh chắc',
    dimensions: 'Dài 180 x Rộng 90 x Cao 78 cm',
    finish: 'Sơn PU giữ màu đỏ cam quý phái nguyên bản',
    description: 'Bàn làm việc giám đốc bề thế mang lại tài lộc và phong thủy vượng khí. Hộc tủ khoá số tiện ích, mặt bàn đục chỉ trang nhã, viền dày dặn chống trầy xước.',
    features: ['Gỗ gõ đỏ thịt đanh chắc chống mối mọt', 'Có lỗ luồn dây điện âm giấu kín tinh tế', 'Ngăn kéo khóa an toàn tài liệu', 'Miễn phí đo đạc lắp đặt'],
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'
    ],
    is_featured: false,
    is_customizable: true,
    stock_status: 'made_to_order',
    lead_time_days: 7,
    warranty_months: 36
  },
  {
    id: 'p5',
    name: 'Ghế Thonet Mây Gỗ Tần Bì (Ash) Chuẩn Quán Cafe & Dining',
    category_id: 'ghe-cafe-bar',
    price: 1450000,
    original_price: 1850000,
    wood_type: 'Khung Gỗ Tần Bì uốn nhiệt + Mây đan tự nhiên',
    dimensions: '45 x 48 x 82 cm (Chiều cao ngồi 45 cm)',
    finish: 'Phủ bóng mờ bảo vệ mây tự nhiên',
    description: 'Dòng ghế kinh điển thanh thoát vượt thời gian. Lưng tựa và mê ngồi đan mây mắt cáo thoáng mát, đàn hồi êm ái cho trải nghiệm ngồi thư giãn.',
    features: ['Kỹ thuật uốn cong gỗ hơi nước nguyên thanh', 'Mây đan thủ công tỉ mỉ thoáng mát', 'Phù hợp quán cafe, phòng ăn, homestay', 'Khung chắc chắn chịu lực tốt'],
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    is_featured: true,
    is_customizable: false,
    stock_status: 'available',
    lead_time_days: 1,
    warranty_months: 24
  },
  {
    id: 'p6',
    name: 'Bàn Trà Bệt Tròn Chân Tiện Gỗ Tự Nhiên Bắc Âu',
    category_id: 'ban-an',
    price: 2800000,
    original_price: 3400000,
    wood_type: 'Gỗ Cao Su tự nhiên phủ veneer Sồi',
    dimensions: 'Đường kính 70 cm x Cao 42 cm',
    finish: 'Sơn NC mờ chống nước tràn bề mặt',
    description: 'Bàn trà tối giản nhỏ gọn, dễ dàng tháo lắp di chuyển. Mặt bàn vát cạnh kim cương thanh thoát.',
    features: ['Kháng nước cà phê trà dễ lau sạch', 'Chân bàn vặn ren dễ cất gọn', 'Thích hợp phòng khách nhỏ hoặc studio'],
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    ],
    is_featured: false,
    is_customizable: false,
    stock_status: 'available',
    lead_time_days: 1,
    warranty_months: 12
  }
];

const INITIAL_CUSTOM_ORDERS = [
  {
    id: 'co-101',
    order_code: 'BG-CUSTOM-8902',
    customer_name: 'Anh Hoàng Nam',
    customer_phone: '0912.888.999',
    customer_address: 'Khu Đô Thị Vinhomes Ocean Park, Gia Lâm, HN',
    furniture_type: 'Bàn ăn 8 ghế kiểu Indochine',
    wood_material: 'Gỗ Gõ Đỏ Pachy',
    length_cm: 220,
    width_cm: 95,
    height_cm: 75,
    thickness_cm: 5,
    estimated_price: 28500000,
    design_image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    note: 'Yêu cầu thợ mộc qua khảo sát đo đạc mặt bằng phòng ăn trước khi chốt phôi gỗ.',
    status: 'in_production',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'co-102',
    order_code: 'BG-CUSTOM-8903',
    customer_name: 'Chị Mai Linh (Chủ Quán Cafe The Wood)',
    customer_phone: '0977.123.456',
    customer_address: '45 Phố Huế, Hoàn Kiếm, HN',
    furniture_type: 'Bộ 10 bàn vuông + 40 ghế cafe mây',
    wood_material: 'Gỗ Tần Bì (Ash)',
    length_cm: 60,
    width_cm: 60,
    height_cm: 75,
    thickness_cm: 3,
    estimated_price: 32000000,
    design_image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    note: 'Cần hoàn thành trước ngày 28 để khai trương quán.',
    status: 'confirmed',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

// Helper khởi tạo LocalStorage có kiểm tra và tự dọn cache hỏng
const sanitizeUrl = (url) => {
  if (typeof url !== 'string' || url.includes('1580481077195')) {
    return 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80';
  }
  return url;
};

const sanitizeProduct = (p) => {
  const images = Array.isArray(p.images) ? p.images.map(sanitizeUrl) : [sanitizeUrl(p.image_url)];
  return {
    ...p,
    images,
    image_url: images[0]
  };
};

function getLocalStore(key, defaultValue) {
  try {
    // Clear out old keys if present
    localStorage.removeItem('xuong_products');
    localStorage.removeItem('xuong_products_v1');
    localStorage.removeItem('xuong_products_v2');
    
    const data = localStorage.getItem(key);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.map(sanitizeProduct);
      }
      return parsed;
    }
    const sanitized = Array.isArray(defaultValue) ? defaultValue.map(sanitizeProduct) : defaultValue;
    localStorage.setItem(key, JSON.stringify(sanitized));
    return sanitized;
  } catch {
    return defaultValue;
  }
}

function setLocalStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Lỗi lưu LocalStorage:', err);
  }
}

// ===================================================================
// CÁC HÀM XỬ LÝ DỮ LIỆU SẢN PHẨM & ĐƠN HÀNG
// ===================================================================

/**
 * Lấy danh sách sản phẩm
 */
export async function getProducts(categoryId = 'all') {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      if (categoryId && categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (data && data.length > 0) return data.map(sanitizeProduct);
    } catch (err) {
      console.warn('Supabase query failed, using local store:', err);
    }
  }

  // Fallback Local Storage
  const products = getLocalStore('xuong_products_v3', INITIAL_PRODUCTS);
  if (categoryId && categoryId !== 'all') {
    return products.filter((p) => p.category_id === categoryId);
  }
  return products;
}

/**
 * Lấy chi tiết 1 sản phẩm theo ID
 */
export async function getProductById(id) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (!error && data) return data;
    } catch (err) {
      console.warn('Lỗi getProductById Supabase:', err);
    }
  }

  const products = getLocalStore('xuong_products', INITIAL_PRODUCTS);
  return products.find((p) => String(p.id) === String(id)) || null;
}

/**
 * Thêm sản phẩm mới (Admin)
 */
export async function addProduct(productData) {
  const newProduct = {
    ...productData,
    id: `prod_${Date.now()}`,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('products').insert([newProduct]).select().single();
      if (!error && data) return data;
      if (error) console.warn('Lỗi Supabase addProduct, fallback local:', error);
    } catch (err) {
      console.warn('Lỗi thêm sản phẩm Supabase:', err);
    }
  }

  const products = getLocalStore('xuong_products', INITIAL_PRODUCTS);
  const updated = [newProduct, ...products];
  setLocalStore('xuong_products', updated);
  return newProduct;
}

/**
 * Cập nhật sản phẩm (Admin)
 */
export async function updateProduct(id, updatedData) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.warn('Lỗi cập nhật sản phẩm Supabase:', err);
    }
  }

  const products = getLocalStore('xuong_products', INITIAL_PRODUCTS);
  const updated = products.map((p) => (String(p.id) === String(id) ? { ...p, ...updatedData } : p));
  setLocalStore('xuong_products', updated);
  return { id, ...updatedData };
}

/**
 * Xóa sản phẩm (Admin)
 */
export async function deleteProduct(id) {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (err) {
      console.warn('Lỗi xóa sản phẩm Supabase:', err);
    }
  }

  const products = getLocalStore('xuong_products', INITIAL_PRODUCTS);
  const updated = products.filter((p) => String(p.id) !== String(id));
  setLocalStore('xuong_products', updated);
  return true;
}

/**
 * Lấy danh mục sản phẩm
 */
export async function getCategories() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return [{ id: 'all', name: 'Tất Cả Sản Phẩm', icon: 'Grid' }, ...data];
    } catch (err) {
      console.warn('Lỗi lấy danh mục Supabase:', err);
    }
  }
  return INITIAL_CATEGORIES;
}

/**
 * Tạo yêu cầu đặt đóng bàn ghế theo yêu cầu
 */
export async function createCustomOrder(orderData) {
  const code = `BG-CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    ...orderData,
    order_code: code,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('custom_orders').insert([record]).select().single();
      if (!error && data) return data;
    } catch (err) {
      console.warn('Lỗi gửi custom order Supabase:', err);
    }
  }

  const orders = getLocalStore('xuong_custom_orders', INITIAL_CUSTOM_ORDERS);
  const updated = [{ ...record, id: `co_${Date.now()}` }, ...orders];
  setLocalStore('xuong_custom_orders', updated);
  return record;
}

/**
 * Lấy danh sách yêu cầu đóng bàn ghế (Admin)
 */
export async function getCustomOrders() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('custom_orders').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Lỗi lấy custom orders Supabase:', err);
    }
  }

  return getLocalStore('xuong_custom_orders', INITIAL_CUSTOM_ORDERS);
}

/**
 * Cập nhật trạng thái yêu cầu đóng bàn ghế (Admin)
 */
export async function updateCustomOrderStatus(id, status) {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('custom_orders').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Lỗi update trạng thái Supabase:', err);
    }
  }

  const orders = getLocalStore('xuong_custom_orders', INITIAL_CUSTOM_ORDERS);
  const updated = orders.map((o) => (String(o.id) === String(id) ? { ...o, status } : o));
  setLocalStore('xuong_custom_orders', updated);
  return true;
}

/**
 * Kiểm tra trạng thái hệ thống
 */
export function getSystemStatus() {
  return {
    supabaseConfigured: isSupabaseConfigured(),
    supabaseUrl: SUPABASE_URL || 'Chưa cung cấp trong .env',
    cloudinaryConfigured: Boolean(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
    cloudinaryCloud: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'Chưa cung cấp trong .env',
    isMockMode: !isSupabaseConfigured()
  };
}
