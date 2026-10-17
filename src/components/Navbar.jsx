import React, { useState } from 'react';
import { ShoppingBag, Settings, Store, Menu, X } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabase';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  isAdmin, 
  setIsAdmin,
  scrollToSection 
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDbLive = isSupabaseConfigured();

  const handleNav = (id) => {
    setIsAdmin(false);
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      backgroundColor: 'var(--bg-ground)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Wordmark */}
        <div 
          onClick={() => { setIsAdmin(false); handleNav('hero'); }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <span style={{ 
            fontSize: 'clamp(1.1rem, 4vw, 1.35rem)', 
            fontWeight: '800', 
            fontFamily: 'var(--font-heading)', 
            letterSpacing: '-0.03em', 
            color: 'var(--text-ink)',
            whiteSpace: 'nowrap'
          }}>
            TINH HOA WOOD
          </span>
          <span className="nav-tagline" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            / Xưởng Mộc
          </span>
        </div>

        {/* Plain Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <button 
            onClick={() => handleNav('products')}
            style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-ink)' }}
          >
            Bộ Sưu Tập
          </button>

          <button 
            onClick={() => handleNav('estimator')}
            style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-ink)' }}
          >
            Dự Toán Báo Giá
          </button>

          <button 
            onClick={() => handleNav('custom-order')}
            style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-ink)' }}
          >
            Đóng Theo Bản Vẽ
          </button>

          <button 
            onClick={() => handleNav('process')}
            style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-ink)' }}
          >
            Quy Trình Xưởng
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="btn btn-sm btn-subtle nav-admin-btn"
            style={{ fontSize: '0.82rem' }}
          >
            {isAdmin ? <Store size={15} /> : <Settings size={15} />}
            <span>{isAdmin ? 'Web Khách Hàng' : 'Quản Trị (Admin)'}</span>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isDbLive ? '#059669' : '#d97706',
              display: 'inline-block'
            }} />
          </button>

          <button
            onClick={onOpenCart}
            className="btn btn-sm btn-dark"
            style={{ position: 'relative', padding: '8px 14px' }}
            title="Đơn hàng đã chọn"
          >
            <ShoppingBag size={16} />
            <span className="nav-cart-text">Đơn Hàng </span>
            <span>({cartCount})</span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px' }}
            className="mobile-toggle-btn"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          backgroundColor: 'var(--bg-step)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <button onClick={() => handleNav('products')} style={{ textAlign: 'left', fontWeight: '600' }}>
            Bộ Sưu Tập Bàn Ghế
          </button>
          <button onClick={() => handleNav('estimator')} style={{ textAlign: 'left', fontWeight: '600' }}>
            Dự Toán Báo Giá
          </button>
          <button onClick={() => handleNav('custom-order')} style={{ textAlign: 'left', fontWeight: '600' }}>
            Đóng Theo Bản Vẽ
          </button>
          <button onClick={() => handleNav('process')} style={{ textAlign: 'left', fontWeight: '600' }}>
            Quy Trình Xưởng
          </button>
          <button onClick={() => { setIsAdmin(true); setMobileOpen(false); }} style={{ textAlign: 'left', fontWeight: '700', color: 'var(--accent)' }}>
            Quản Trị Xưởng (Admin CMS)
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-admin-btn, .nav-tagline { display: none !important; }
          .nav-cart-text { display: none !important; }
        }
      `}</style>
    </header>
  );
}
