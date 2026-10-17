import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, ShoppingBag, Calculator } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PriceEstimator from './components/PriceEstimator';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import CustomOrderForm from './components/CustomOrderForm';
import WorkshopProcess from './components/WorkshopProcess';
import AdminDashboard from './components/AdminDashboard';
import CartModal from './components/CartModal';
import Footer from './components/Footer';
import { getProducts, getCategories } from './services/supabase';
import { getOptimizedImageUrl } from './services/cloudinary';

const VALID_PAGES = ['home', 'products', 'estimator', 'custom-order', 'process'];

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Dedicated Separate Page State with URL hash sync
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '').trim();
    if (VALID_PAGES.includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prefilledOrder, setPrefilledOrder] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load products and categories on mount
  useEffect(() => {
    async function initData() {
      try {
        setLoading(true);
        const [prods, cats] = await Promise.all([
          getProducts('all'),
          getCategories()
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu ban đầu:', err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  // Listen to hash change for browser Back/Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash === 'admin') {
        setIsAdmin(true);
      } else if (VALID_PAGES.includes(hash)) {
        setActivePage(hash);
        setIsAdmin(false);
      } else {
        setActivePage('home');
        setIsAdmin(false);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Observer for reveal animations
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0px)';
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.05 }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => {
      el.style.opacity = '0.01';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      io.observe(el);
    });

    return () => io.disconnect();
  }, [products, categories, isAdmin, activePage]);

  // Navigate to a specific page
  const navigateToPage = (pageId) => {
    setIsAdmin(false);
    setActivePage(pageId);
    window.location.hash = pageId === 'home' ? '' : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (String(item.id) === String(productId) ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Khi bấm "Gửi yêu cầu đóng kích thước này" từ công cụ tính giá
  const handleApplyToCustomOrder = (data) => {
    setPrefilledOrder(data);
    navigateToPage('custom-order');
  };

  // Khi bấm "Đặt kích thước khác" từ modal chi tiết sản phẩm
  const handleCustomizeFromModal = (product) => {
    setPrefilledOrder({
      furniture_type: product.name,
      wood_material: product.wood_type,
      length_cm: 180,
      width_cm: 90,
      height_cm: 75,
      thickness_cm: 4,
      estimated_price: product.price,
      note: `Yêu cầu làm tương tự mẫu "${product.name}", xin tư vấn kích thước và chất liệu.`
    });
    setSelectedProduct(null);
    navigateToPage('custom-order');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar with Wood Theme & Active Hover */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateToPage}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main Content: Storefront OR Backend Admin */}
      {isAdmin ? (
        <AdminDashboard onBackToStore={() => setIsAdmin(false)} />
      ) : (
        <main style={{ flexGrow: 1 }}>
          {/* ========================================================= */}
          {/* 1. TRANG CHỦ (HOME PAGE) */}
          {/* ========================================================= */}
          {activePage === 'home' && (
            <div key="home" className="page-enter">
              {/* Hero Banner */}
              <Hero
                onExploreClick={() => navigateToPage('products')}
                onEstimateClick={() => navigateToPage('estimator')}
              />

              {/* Featured Products Teaser */}
              <section className="section-space" style={{ backgroundColor: 'var(--bg-ground)' }}>
                <div className="container">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    justifyContent: 'space-between', 
                    marginBottom: '32px', 
                    flexWrap: 'wrap', 
                    gap: '16px' 
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '0.82rem', 
                        fontWeight: '700', 
                        color: 'var(--accent)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em', 
                        marginBottom: '6px' 
                      }}>
                        Mẫu Bàn Ghế Tiêu Biểu
                      </div>
                      <h2 className="section-title" style={{ margin: 0 }}>
                        Sản Phẩm Xuất Xưởng Nổi Bật
                      </h2>
                    </div>
                    <button
                      onClick={() => navigateToPage('products')}
                      className="btn btn-primary"
                    >
                      <span>Xem Tất Cả Bộ Sưu Tập</span>
                      <ArrowRight size={17} />
                    </button>
                  </div>

                  {/* Top 4 Products Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px',
                    marginBottom: '36px'
                  }}>
                    {products.slice(0, 4).map((product) => (
                      <div 
                        key={product.id}
                        className="surface-card"
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          borderRadius: 'var(--radius-soft)',
                          overflow: 'hidden',
                          border: '1px solid var(--bg-step)',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div 
                          style={{ height: '220px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <img
                            src={getOptimizedImageUrl(product.image_url, 600)}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <span className="wood-tag" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                            {product.wood_type}
                          </span>
                        </div>
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <h3 
                            style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', cursor: 'pointer' }}
                            onClick={() => setSelectedProduct(product)}
                          >
                            {product.name}
                          </h3>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                            {product.dimensions}
                          </div>
                          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--bg-step)' }}>
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Giá xuất xưởng</div>
                              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--accent)' }}>
                                {product.price.toLocaleString('vi-VN')} đ
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => setSelectedProduct(product)}
                                className="btn btn-sm btn-subtle"
                                title="Xem chi tiết"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="btn btn-sm btn-primary"
                                title="Thêm vào giỏ"
                              >
                                <ShoppingBag size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Price Estimator Teaser Card */}
              <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-step)' }}>
                <div className="container">
                  <div style={{
                    backgroundColor: '#1b110a',
                    color: '#ffffff',
                    borderRadius: 'var(--radius-soft)',
                    padding: '44px 36px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '36px',
                    alignItems: 'center',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}>
                    <div>
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '4px 12px', 
                        borderRadius: '999px', 
                        backgroundColor: 'rgba(245, 158, 11, 0.2)', 
                        color: '#fbbf24', 
                        fontSize: '0.82rem', 
                        fontWeight: '700', 
                        marginBottom: '16px' 
                      }}>
                        <Calculator size={15} />
                        <span>DỰ TOÁN TRỰC TUYẾN 5 GIÂY</span>
                      </div>
                      <h3 style={{ 
                        fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', 
                        fontWeight: '800', 
                        fontFamily: 'var(--font-heading)', 
                        color: '#ffffff', 
                        marginBottom: '16px', 
                        lineHeight: 1.25 
                      }}>
                        Tự Tính Giá Bộ Bàn Ghế Theo Số Đo Riêng
                      </h3>
                      <p style={{ color: '#d6cfc7', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px', maxWidth: '500px' }}>
                        Kéo thanh trượt điều chỉnh chiều dài, rộng, độ dày mặt gỗ Sồi, Gõ Đỏ hoặc Me Tây. Hệ thống tự động báo giá xuất xưởng chính xác tới 95% và số tiền tiết kiệm được!
                      </p>
                      <button
                        onClick={() => navigateToPage('estimator')}
                        className="btn btn-primary btn-lg"
                        style={{ backgroundColor: '#b45309', borderColor: '#d97706' }}
                      >
                        <span>Vào Công Cụ Dự Toán Báo Giá</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-soft)', padding: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.92rem', color: '#fbbf24', fontWeight: '700', marginBottom: '14px' }}>
                        Ưu thế khi đóng trực tiếp tại xưởng DIEY WOOD:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#e7e2db' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ color: '#10b981', fontWeight: '800' }}>✓</span>
                          <span>Giá xuất xưởng rẻ hơn 30% - 35% so với mua qua showroom</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ color: '#10b981', fontWeight: '800' }}>✓</span>
                          <span>Vừa vặn 100% từng centimet với phòng ăn hoặc phòng khách</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ color: '#10b981', fontWeight: '800' }}>✓</span>
                          <span>Được kiểm tra phôi gỗ mộc tại xưởng trước khi bắt đầu phun sơn</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Craftsmanship Teaser */}
              <section className="section-space" style={{ backgroundColor: 'var(--bg-ground)' }}>
                <div className="container">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    justifyContent: 'space-between', 
                    marginBottom: '32px', 
                    flexWrap: 'wrap', 
                    gap: '16px' 
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '0.82rem', 
                        fontWeight: '700', 
                        color: 'var(--accent)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em', 
                        marginBottom: '6px' 
                      }}>
                        Nghệ Nhân Canh Nậu
                      </div>
                      <h2 className="section-title" style={{ margin: 0 }}>
                        Kỹ Thuật Đóng Mộng Gỗ Cổ Truyền
                      </h2>
                    </div>
                    <button
                      onClick={() => navigateToPage('process')}
                      className="btn btn-subtle"
                    >
                      <span>Xem Toàn Bộ Quy Trình 5 Bước</span>
                      <ArrowRight size={17} />
                    </button>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--bg-step)',
                    borderRadius: 'var(--radius-soft)',
                    overflow: 'hidden',
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
                      <p style={{ fontSize: 'var(--type-body)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                        Mỗi khớp mộng, từng nét đục và đường chà nhám đều được thực hiện thủ công với sự chuẩn xác của người thợ hơn 15 năm kinh nghiệm.
                      </p>
                      <button
                        onClick={() => navigateToPage('process')}
                        className="btn btn-sm btn-dark"
                      >
                        <span>Khám Phá Chi Tiết Quy Trình</span>
                      </button>
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
                </div>
              </section>

              {/* Custom Order Callout */}
              <section style={{ padding: '60px 0 80px', backgroundColor: 'var(--bg-step)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
                  <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--text-ink)', marginBottom: '16px' }}>
                    Bạn Có Bản Vẽ 3D Hoặc Ảnh Mẫu Riêng?
                  </h2>
                  <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
                    Tải ảnh mẫu bạn thích trên Pinterest hoặc bản thiết kế nội thất lên xưởng. Kỹ thuật viên DIEY WOOD sẽ bóc tách kết cấu và cử thợ mang thước laser qua khảo sát tận nơi miễn phí.
                  </p>
                  <button
                    onClick={() => navigateToPage('custom-order')}
                    className="btn btn-primary btn-lg"
                  >
                    <span>Gửi Bản Vẽ / Yêu Cầu Cho Xưởng</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. TRANG BỘ SƯU TẬP (PRODUCTS CATALOG PAGE) */}
          {/* ========================================================= */}
          {activePage === 'products' && (
            <div key="products" className="page-enter">
              <ProductCatalog
                products={products}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onSelectProduct={(product) => setSelectedProduct(product)}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. TRANG DỰ TOÁN BÁO GIÁ (PRICE ESTIMATOR PAGE) */}
          {/* ========================================================= */}
          {activePage === 'estimator' && (
            <div key="estimator" className="page-enter">
              <PriceEstimator onApplyToCustomOrder={handleApplyToCustomOrder} />
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. TRANG ĐÓNG THEO BẢN VẼ (CUSTOM ORDER PAGE) */}
          {/* ========================================================= */}
          {activePage === 'custom-order' && (
            <div key="custom-order" className="page-enter">
              <CustomOrderForm
                prefilledData={prefilledOrder}
                onOrderSuccess={() => {}}
              />
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. TRANG QUY TRÌNH XƯỞNG (WORKSHOP PROCESS PAGE) */}
          {/* ========================================================= */}
          {activePage === 'process' && (
            <div key="process" className="page-enter">
              <WorkshopProcess onConsultClick={() => navigateToPage('custom-order')} />
            </div>
          )}
        </main>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onCustomizeRequest={handleCustomizeFromModal}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer
        onNavClick={navigateToPage}
        onOpenAdmin={() => setIsAdmin(true)}
      />
    </div>
  );
}
