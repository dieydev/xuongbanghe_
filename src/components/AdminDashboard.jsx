import React, { useState, useEffect } from 'react';
import { 
  Package, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Database, 
  Cloud, 
  Search, 
  RefreshCw,
  ExternalLink,
  DollarSign,
  Loader2,
  X
} from 'lucide-react';
import { 
  getProducts, 
  addProduct, 
  deleteProduct, 
  getCategories, 
  getCustomOrders, 
  updateCustomOrderStatus, 
  getSystemStatus 
} from '../services/supabase';
import { uploadToCloudinary, isCloudinaryConfigured } from '../services/cloudinary';

export default function AdminDashboard({ onBackToStore }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'config'
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState(getSystemStatus());

  // Form thêm sản phẩm mới
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newProductImage, setNewProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category_id: 'ban-an',
    price: '',
    original_price: '',
    wood_type: 'Gỗ Sồi Nga (Oak)',
    dimensions: '160 x 80 x 75 cm',
    finish: 'Sơn PU Inchem mờ 50%',
    description: '',
    featuresStr: 'Gỗ sấy nhiệt chống cong vênh, Bo cạnh an toàn',
    stock_status: 'available',
    lead_time_days: 3
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats, orders] = await Promise.all([
        getProducts('all'),
        getCategories(),
        getCustomOrders()
      ]);
      setProducts(prods);
      setCategories(cats);
      setCustomOrders(orders);
      setSystemStatus(getSystemStatus());
    } catch (err) {
      console.error('Lỗi tải dữ liệu quản trị:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Xử lý upload ảnh sản phẩm lên Cloudinary
  const handleProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Xem trước ảnh
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setUploadingImage(true);
    try {
      const result = await uploadToCloudinary(file);
      setNewProductImage(result.url);
    } catch (err) {
      alert('Không thể tải ảnh lên Cloudinary: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Thêm sản phẩm
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Vui lòng nhập Tên sản phẩm và Giá bán');
      return;
    }

    const payload = {
      ...newProduct,
      price: Number(newProduct.price),
      original_price: newProduct.original_price ? Number(newProduct.original_price) : null,
      lead_time_days: Number(newProduct.lead_time_days),
      features: newProduct.featuresStr.split(',').map((s) => s.trim()).filter(Boolean),
      images: newProductImage
        ? [newProductImage]
        : ['https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80']
    };

    delete payload.featuresStr;

    await addProduct(payload);
    setShowAddModal(false);
    setNewProductImage('');
    setImagePreview('');
    setNewProduct({
      name: '',
      category_id: 'ban-an',
      price: '',
      original_price: '',
      wood_type: 'Gỗ Sồi Nga (Oak)',
      dimensions: '160 x 80 x 75 cm',
      finish: 'Sơn PU Inchem mờ 50%',
      description: '',
      featuresStr: '',
      stock_status: 'available',
      lead_time_days: 3
    });
    loadData();
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa mẫu "${name}" khỏi xưởng?`)) {
      await deleteProduct(id);
      loadData();
    }
  };

  // Cập nhật trạng thái đơn đặt đóng
  const handleUpdateStatus = async (orderId, newStatus) => {
    await updateCustomOrderStatus(orderId, newStatus);
    loadData();
  };

  return (
    <div style={{ backgroundColor: 'var(--wood-50)', minHeight: '90vh', padding: '36px 0 60px' }}>
      <div className="container">
        {/* Top Header of Admin */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-wood" style={{ fontSize: '0.75rem' }}>
                BACKEND CMS (REACT)
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: systemStatus.supabaseConfigured ? '#059669' : '#d97706',
                fontWeight: '700'
              }}>
                {systemStatus.supabaseConfigured ? '● Supabase Đã Kết Nối' : '● Chế độ Dữ Liệu Cục Bộ (Mock)'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <img
                src="/logo-round.png"
                alt="DIEY WOOD"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'contain' }}
              />
              <h1 style={{ fontSize: '1.85rem', color: 'var(--wood-900)', margin: 0 }}>
                Quản Trị Xưởng Bàn Ghế DIEY WOOD
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={loadData}
              className="btn btn-outline btn-sm"
              style={{ background: '#ffffff' }}
            >
              <RefreshCw size={15} />
              <span>Làm Mới</span>
            </button>

            <button
              onClick={onBackToStore}
              className="btn btn-secondary btn-sm"
            >
              <span>Xem Web Khách Hàng</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'products' ? 'var(--wood-900)' : '#ffffff',
              color: activeTab === 'products' ? '#ffffff' : 'var(--wood-700)',
              border: '1px solid var(--border-color)',
              boxShadow: activeTab === 'products' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Package size={17} />
            <span>Sản Phẩm Xưởng ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'orders' ? 'var(--wood-900)' : '#ffffff',
              color: activeTab === 'orders' ? '#ffffff' : 'var(--wood-700)',
              border: '1px solid var(--border-color)',
              boxShadow: activeTab === 'orders' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <FileText size={17} />
            <span>Đơn Đặt Đóng Theo Yêu Cầu ({customOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'config' ? 'var(--wood-900)' : '#ffffff',
              color: activeTab === 'config' ? '#ffffff' : 'var(--wood-700)',
              border: '1px solid var(--border-color)',
              boxShadow: activeTab === 'config' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Settings size={17} />
            <span>Kết Nối Supabase & Cloudinary</span>
          </button>
        </div>

        {/* TAB 1: QUẢN LÝ SẢN PHẨM */}
        {activeTab === 'products' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px'
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
                Thêm mới, chỉnh sửa thông số gỗ, kích thước và ảnh sản phẩm trên Cloudinary.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Thêm Mẫu Bàn Ghế Mới</span>
              </button>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Đang tải dữ liệu sản phẩm...
              </div>
            ) : (
              <div style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--wood-50)', borderBottom: '1px solid var(--border-color)', color: 'var(--wood-700)' }}>
                        <th style={{ padding: '14px 16px' }}>Hình Ảnh</th>
                        <th style={{ padding: '14px 16px' }}>Tên Sản Phẩm</th>
                        <th style={{ padding: '14px 16px' }}>Chất Liệu Gỗ</th>
                        <th style={{ padding: '14px 16px' }}>Kích Thước</th>
                        <th style={{ padding: '14px 16px' }}>Giá Xuất Xưởng</th>
                        <th style={{ padding: '14px 16px' }}>Trạng Thái</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <img
                              src={p.images?.[0] || 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=200&q=80'}
                              alt=""
                              style={{ width: '56px', height: '46px', objectFit: 'cover', borderRadius: '6px' }}
                            />
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--wood-900)', maxWidth: '240px' }}>
                            {p.name}
                          </td>
                          <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                            <span className="badge badge-wood" style={{ fontSize: '0.72rem' }}>
                              {p.wood_type}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                            {p.dimensions}
                          </td>
                          <td style={{ padding: '12px 16px', fontWeight: '800', color: 'var(--amber-primary)' }}>
                            {Number(p.price).toLocaleString('vi-VN')} đ
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            {p.stock_status === 'available' ? (
                              <span className="badge badge-available">Có sẵn</span>
                            ) : (
                              <span className="badge badge-order">Đóng 5-7 ngày</span>
                            )}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              style={{
                                color: '#ef4444',
                                padding: '6px',
                                borderRadius: '6px',
                                background: '#fef2f2'
                              }}
                              title="Xóa sản phẩm"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: QUẢN LÝ ĐƠN ĐẶT ĐÓNG BÀN GHẾ */}
        {activeTab === 'orders' && (
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '18px' }}>
              Danh sách khách gửi bản vẽ & yêu cầu đo đạc tận nhà. Bạn có thể xem ảnh Cloudinary khách gửi và chuyển trạng thái sản xuất.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {customOrders.length === 0 ? (
                <div style={{ padding: '40px', background: '#ffffff', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                  Chưa có đơn đặt đóng nào.
                </div>
              ) : (
                customOrders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      padding: '24px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '20px',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '800', color: 'var(--amber-primary)', fontSize: '1rem' }}>
                          {order.order_code}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                          {new Date(order.created_at).toLocaleDateString('vi-VN')}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', color: 'var(--wood-900)', marginBottom: '8px' }}>
                        {order.customer_name} —{' '}
                        <a href={`tel:${order.customer_phone}`} style={{ color: 'var(--amber-primary)', textDecoration: 'underline' }}>
                          {order.customer_phone}
                        </a>
                      </h3>

                      {order.customer_address && (
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                          <strong>Địa chỉ khảo sát:</strong> {order.customer_address}
                        </div>
                      )}

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <strong>Quy cách:</strong> {order.furniture_type} | Gỗ: {order.wood_material}
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <strong>Kích thước:</strong> {order.length_cm} x {order.width_cm} x {order.height_cm || 75} cm (Dày {order.thickness_cm || 4}cm)
                      </div>

                      {order.estimated_price > 0 && (
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--amber-primary)', marginTop: '8px' }}>
                          Dự toán: {Number(order.estimated_price).toLocaleString('vi-VN')} đ
                        </div>
                      )}

                      {order.note && (
                        <div style={{
                          background: 'var(--wood-50)',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          color: 'var(--wood-800)',
                          marginTop: '10px'
                        }}>
                          <em>Ghi chú của khách:</em> {order.note}
                        </div>
                      )}
                    </div>

                    {/* Image from Cloudinary + Status changer */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      {order.design_image_url ? (
                        <div style={{ marginBottom: '14px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                            Ảnh Mẫu Khách Gửi (Lưu Cloudinary):
                          </span>
                          <a href={order.design_image_url} target="_blank" rel="noreferrer">
                            <img
                              src={order.design_image_url}
                              alt="Bản vẽ mẫu khách gửi"
                              style={{ maxHeight: '140px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                            />
                          </a>
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                          Khách không đính kèm ảnh mẫu.
                        </div>
                      )}

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>
                          Tiến Độ Sản Xuất:
                        </label>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)',
                            fontWeight: '700',
                            fontSize: '0.88rem',
                            background:
                              order.status === 'completed'
                                ? '#ecfdf5'
                                : order.status === 'in_production'
                                ? '#fef3c7'
                                : '#ffffff'
                          }}
                        >
                          <option value="pending">Chờ duyệt & Khảo sát đo đạc</option>
                          <option value="confirmed">Đã chốt hợp đồng & Cọc</option>
                          <option value="in_production">Đang xẻ phôi gỗ & Gia công</option>
                          <option value="delivering">Đang sơn PU & Giao hàng</option>
                          <option value="completed">Đã hoàn tất & Nghiệm thu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CẤU HÌNH KẾT NỐI SUPABASE & CLOUDINARY */}
        {activeTab === 'config' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Supabase Box */}
            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Database size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--wood-900)' }}>Supabase PostgreSQL</h3>
                  <span style={{ fontSize: '0.78rem', color: systemStatus.supabaseConfigured ? '#059669' : '#d97706', fontWeight: '700' }}>
                    {systemStatus.supabaseConfigured ? 'Đang Kết Nối Trực Tiếp' : 'Chế Độ Mock Data (Chưa Có Key)'}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Cơ sở dữ liệu lưu trữ sản phẩm bàn ghế, đơn hàng và danh mục. 
                Để kích hoạt Supabase thật:
              </p>

              <ol style={{ fontSize: '0.85rem', color: 'var(--wood-800)', paddingLeft: '20px', marginBottom: '20px', lineHeight: 1.8 }}>
                <li>Tạo dự án mới tại <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ color: 'var(--amber-primary)', textDecoration: 'underline' }}>supabase.com</a></li>
                <li>Vào <strong>SQL Editor</strong>, dán toàn bộ code từ file <code>supabase/schema.sql</code> và bấm <strong>RUN</strong></li>
                <li>Mở file <code>.env</code> trong thư mục dự án và điền:</li>
              </ol>

              <div style={{
                background: '#1c1917',
                color: '#34d399',
                padding: '14px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.82rem',
                lineHeight: 1.5,
                overflowX: 'auto'
              }}>
                VITE_SUPABASE_URL=https://your-id.supabase.co<br />
                VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
              </div>
            </div>

            {/* Cloudinary Box */}
            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Cloud size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--wood-900)' }}>Cloudinary Media</h3>
                  <span style={{ fontSize: '0.78rem', color: systemStatus.cloudinaryConfigured ? '#2563eb' : '#d97706', fontWeight: '700' }}>
                    {systemStatus.cloudinaryConfigured ? `Cloud: ${systemStatus.cloudinaryCloud}` : 'Chế Độ Ảnh Cục Bộ (Chưa Có Key)'}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Lưu trữ và nén ảnh mẫu bàn ghế tự động chuẩn web:
              </p>

              <ol style={{ fontSize: '0.85rem', color: 'var(--wood-800)', paddingLeft: '20px', marginBottom: '20px', lineHeight: 1.8 }}>
                <li>Đăng ký tài khoản miễn phí tại <a href="https://cloudinary.com" target="_blank" rel="noreferrer" style={{ color: 'var(--amber-primary)', textDecoration: 'underline' }}>cloudinary.com</a></li>
                <li>Vào <strong>Settings &gt; Upload &gt; Upload Presets</strong>, tạo 1 preset mới và chọn <strong>Unsigned</strong></li>
                <li>Điền vào file <code>.env</code>:</li>
              </ol>

              <div style={{
                background: '#1c1917',
                color: '#60a5fa',
                padding: '14px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.82rem',
                lineHeight: 1.5,
                overflowX: 'auto'
              }}>
                VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name<br />
                VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
              </div>
            </div>
          </div>
        )}

        {/* Modal Thêm Mẫu Bàn Ghế */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(28, 25, 23, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative'
            }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ position: 'absolute', top: '18px', right: '18px', color: 'var(--wood-900)' }}
              >
                <X size={22} />
              </button>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '18px', color: 'var(--wood-900)' }}>
                Thêm Mẫu Bàn Ghế Mới
              </h2>

              <form onSubmit={handleCreateProduct}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Tên Sản Phẩm:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Bộ Bàn Ăn Gỗ Me Tây 6 Ghế Tự Nhiên"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                        Danh Mục:
                      </label>
                      <select
                        value={newProduct.category_id}
                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#ffffff' }}
                      >
                        <option value="ban-an">Bàn Ăn Gia Đình</option>
                        <option value="sofa-go">Sofa Gỗ Phòng Khách</option>
                        <option value="ban-lam-viec">Bàn Làm Việc & Họp</option>
                        <option value="ghe-cafe-bar">Ghế Cafe & Decor</option>
                        <option value="ban-me-tay">Bàn Me Tây Nguyên Khối</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                        Chất Liệu Gỗ:
                      </label>
                      <input
                        type="text"
                        value={newProduct.wood_type}
                        onChange={(e) => setNewProduct({ ...newProduct, wood_type: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                        Giá Bán (VNĐ):
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="12500000"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                        Quy Cách Kích Thước:
                      </label>
                      <input
                        type="text"
                        placeholder="180 x 90 x 75 cm"
                        value={newProduct.dimensions}
                        onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                  </div>

                  {/* Upload ảnh Cloudinary */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Hình Ảnh (Tải lên Cloudinary):
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductImageUpload}
                        style={{ fontSize: '0.85rem' }}
                      />
                      {uploadingImage && <Loader2 size={18} className="pulse-glow" />}
                    </div>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ height: '80px', borderRadius: '6px', marginTop: '8px', objectFit: 'cover' }}
                      />
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                      Mô Tả Sản Phẩm:
                    </label>
                    <textarea
                      rows="3"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Mô tả kỹ thuật thợ mộc, vân gỗ, sơn lót..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="btn btn-primary btn-sm"
                  >
                    Lưu & Đăng Lên Web
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
