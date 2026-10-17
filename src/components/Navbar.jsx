import React, { useState } from 'react';
import { 
  Hammer, 
  ShoppingBag, 
  PhoneCall, 
  Settings, 
  Layers, 
  Calculator, 
  FileText, 
  Sparkles,
  Menu,
  X,
  Store
} from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabase';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenCart, 
  isAdmin, 
  setIsAdmin,
  scrollToSection 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDbLive = isSupabaseConfigured();

  const handleNavClick = (sectionId, tab = 'store') => {
    setActiveTab(tab);
    if (tab === 'store' && sectionId) {
      scrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-glass">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => { setIsAdmin(false); handleNavClick('hero'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #b45309, #78350f)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(180, 83, 9, 0.3)'
          }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', color: 'var(--wood-900)' }}>
                TINH HOA <span style={{ color: 'var(--amber-primary)' }}>WOOD</span>
              </span>
              <span style={{ fontSize: '0.65rem', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                XƯỞNG MỘC
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: 0 }}>
              Sản Xuất & Đóng Bàn Ghế Theo Kích Thước Riêng
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          <button 
            onClick={() => { setIsAdmin(false); handleNavClick('products'); }}
            style={{ 
              fontWeight: '600', 
              fontSize: '0.95rem',
              color: !isAdmin ? 'var(--wood-900)' : 'var(--text-muted)',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}
          >
            <Layers size={17} color="var(--amber-primary)" />
            Bộ Sưu Tập Bàn Ghế
          </button>

          <button 
            onClick={() => { setIsAdmin(false); handleNavClick('estimator'); }}
            style={{ 
              fontWeight: '600', 
              fontSize: '0.95rem',
              color: 'var(--wood-900)',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}
          >
            <Calculator size={17} color="var(--amber-primary)" />
            Dự Toán Báo Giá
          </button>

          <button 
            onClick={() => { setIsAdmin(false); handleNavClick('custom-order'); }}
            style={{ 
              fontWeight: '600', 
              fontSize: '0.95rem',
              color: 'var(--wood-900)',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}
          >
            <FileText size={17} color="var(--amber-primary)" />
            Đặt Làm Theo Bản Vẽ
          </button>

          <button 
            onClick={() => { setIsAdmin(false); handleNavClick('process'); }}
            style={{ 
              fontWeight: '600', 
              fontSize: '0.95rem',
              color: 'var(--wood-900)',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}
          >
            <Sparkles size={17} color="var(--amber-primary)" />
            Quy Trình Xưởng
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Admin Toggle Button */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`btn btn-sm ${isAdmin ? 'btn-secondary' : 'btn-outline'}`}
            title="Chuyển sang Quản Trị Xưởng (Backend React)"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              fontSize: '0.82rem',
              border: isAdmin ? 'none' : '1px solid #d6d3d1'
            }}
          >
            {isAdmin ? <Store size={15} /> : <Settings size={15} />}
            <span>{isAdmin ? 'Về Web Khách' : 'Quản Trị Xưởng (Admin)'}</span>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isDbLive ? '#10b981' : '#f59e0b',
              display: 'inline-block'
            }} title={isDbLive ? 'Supabase Live' : 'Supabase Mock'} />
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--wood-900)',
              transition: 'all 0.2s'
            }}
            title="Đơn hàng / Bàn ghế đã chọn"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--amber-primary)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: '700',
                width: '19px',
                height: '19px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(180, 83, 9, 0.4)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Hotline Quick Call */}
          <a
            href="tel:0987654321"
            className="btn btn-primary btn-sm quick-phone-btn"
            style={{ borderRadius: 'var(--radius-full)', display: 'none' }}
          >
            <PhoneCall size={15} />
            <span>0987.654.321</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              color: 'var(--wood-900)'
            }}
            className="mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            onClick={() => { setIsAdmin(false); handleNavClick('products'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontWeight: '600', color: 'var(--wood-900)' }}
          >
            <Layers size={18} color="var(--amber-primary)" />
            Bộ Sưu Tập Bàn Ghế
          </button>
          <button
            onClick={() => { setIsAdmin(false); handleNavClick('estimator'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontWeight: '600', color: 'var(--wood-900)' }}
          >
            <Calculator size={18} color="var(--amber-primary)" />
            Dự Toán Báo Giá Đóng Bàn Ghế
          </button>
          <button
            onClick={() => { setIsAdmin(false); handleNavClick('custom-order'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontWeight: '600', color: 'var(--wood-900)' }}
          >
            <FileText size={18} color="var(--amber-primary)" />
            Gửi Bản Vẽ Thiết Kế Theo Yêu Cầu
          </button>
          <button
            onClick={() => { setIsAdmin(false); handleNavClick('process'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', fontWeight: '600', color: 'var(--wood-900)' }}
          >
            <Sparkles size={18} color="var(--amber-primary)" />
            Quy Trình Xưởng Mộc
          </button>
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hotline Kỹ Thuật Xưởng:</span>
            <a href="tel:0987654321" style={{ fontWeight: '700', color: 'var(--amber-primary)' }}>0987.654.321</a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .quick-phone-btn { display: inline-flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
