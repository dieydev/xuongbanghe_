import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('store');
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

  const scrollToSection = (id) => {
    if (isAdmin) {
      setIsAdmin(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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
    scrollToSection('custom-order');
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
    scrollToSection('custom-order');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        scrollToSection={scrollToSection}
      />

      {/* Main Content: Storefront OR Backend Admin */}
      {isAdmin ? (
        <AdminDashboard onBackToStore={() => setIsAdmin(false)} />
      ) : (
        <main style={{ flexGrow: 1 }}>
          {/* Hero Banner */}
          <Hero
            onExploreClick={() => scrollToSection('products')}
            onEstimateClick={() => scrollToSection('estimator')}
          />

          {/* Interactive Price Estimator */}
          <PriceEstimator onApplyToCustomOrder={handleApplyToCustomOrder} />

          {/* Product Catalog */}
          <ProductCatalog
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onAddToCart={handleAddToCart}
          />

          {/* Custom Order Form with Cloudinary upload */}
          <CustomOrderForm
            prefilledData={prefilledOrder}
            onOrderSuccess={() => {
              // Có thể reload lại nếu cần
            }}
          />

          {/* Workshop Craftsmanship Process */}
          <WorkshopProcess onConsultClick={() => scrollToSection('custom-order')} />
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
        onNavClick={scrollToSection}
        onOpenAdmin={() => setIsAdmin(true)}
      />
    </div>
  );
}
