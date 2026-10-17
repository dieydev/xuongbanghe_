import React, { useState } from 'react';
import { ShoppingBag, Settings, Store, Menu, X, Home, Grid, Calculator, FileEdit, Wrench } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabase';

const NAV_ITEMS = [
  { id: 'home', label: 'Trang Chủ', icon: Home },
  { id: 'products', label: 'Bộ Sưu Tập', icon: Grid },
  { id: 'estimator', label: 'Dự Toán Báo Giá', icon: Calculator },
  { id: 'custom-order', label: 'Đóng Theo Bản Vẽ', icon: FileEdit },
  { id: 'process', label: 'Quy Trình Xưởng', icon: Wrench }
];

export default function Navbar({ 
  activePage = 'home',
  onNavigate,
  cartCount, 
  onOpenCart, 
  isAdmin, 
  setIsAdmin
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDbLive = isSupabaseConfigured();

  const handleItemClick = (pageId) => {
    setIsAdmin(false);
    onNavigate(pageId);
    setMobileOpen(false);
  };

  return (
    <header className="wood-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', position: 'relative', zIndex: 2 }}>
        {/* Brand / Logo */}
        <div 
          onClick={() => handleItemClick('home')}
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            whiteSpace: 'nowrap', 
            flexShrink: 0,
            userSelect: 'none'
          }}
          className="brand-link"
          title="Về Trang Chủ DIEY WOOD"
        >
          <img
            src="/logo-round.png"
            alt="DIEY WOOD"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              objectFit: 'contain',
              boxShadow: '0 0 16px rgba(245, 158, 11, 0.4), 0 3px 8px rgba(0,0,0,0.5)',
              border: '2px solid rgba(251, 191, 36, 0.6)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              flexShrink: 0
            }}
            className="brand-logo-img"
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ 
              fontSize: 'clamp(1.2rem, 4vw, 1.4rem)', 
              fontWeight: '800', 
              fontFamily: 'var(--font-heading)', 
              letterSpacing: '-0.02em', 
              color: '#ffffff',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)'
            }}>
              DIEY WOOD
            </span>
            <span className="nav-tagline" style={{ 
              fontSize: '0.72rem', 
              color: '#fbbf24', 
              fontWeight: '700',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)'
            }}>
              Xưởng Mộc Canh Nậu
            </span>
          </div>
        </div>

        {/* Desktop Navigation with Wood Hover & Active States */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = !isAdmin && activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`wood-nav-item ${isActive ? 'is-active' : ''}`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="wood-header-btn-subtle nav-admin-btn"
            title="Khu vực quản trị xưởng"
          >
            {isAdmin ? <Store size={15} color="#fbbf24" /> : <Settings size={15} color="#fbbf24" />}
            <span>{isAdmin ? 'Web Khách Hàng' : 'Quản Trị (Admin)'}</span>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isDbLive ? '#10b981' : '#f59e0b',
              boxShadow: isDbLive ? '0 0 6px #10b981' : '0 0 6px #f59e0b',
              display: 'inline-block'
            }} />
          </button>

          <button
            onClick={onOpenCart}
            className={`wood-header-btn-cart ${cartCount > 0 ? 'cart-has-items' : ''}`}
            title="Xem đơn hàng đã chọn"
          >
            <ShoppingBag size={16} />
            <span className="nav-cart-text">Đơn Hàng </span>
            <span style={{ 
              backgroundColor: 'rgba(0,0,0,0.25)', 
              padding: '1px 6px', 
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '800'
            }}>
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '40px', 
              height: '40px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius-soft)',
              color: '#ffffff',
              cursor: 'pointer'
            }}
            className="mobile-toggle-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: 'linear-gradient(180deg, #693717 0%, #52290f 100%)',
          borderTop: '1px solid rgba(245, 158, 11, 0.25)',
          borderBottom: '2px solid #b45309',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 12px 24px rgba(0,0,0,0.6)'
        }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = !isAdmin && activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-soft)',
                  backgroundColor: isActive ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid transparent',
                  color: isActive ? '#fef08a' : '#f5eedc',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                <Icon size={18} color={isActive ? '#fbbf24' : '#d4bda8'} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '6px 0' }} />

          <button
            onClick={() => { setIsAdmin(true); setMobileOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-soft)',
              backgroundColor: isAdmin ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fbbf24',
              fontWeight: '700',
              fontSize: '0.95rem',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            <Settings size={18} />
            <span>Quản Trị Xưởng (Admin CMS)</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 959px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
        @media (max-width: 768px) {
          .nav-admin-btn, .nav-tagline { display: none !important; }
          .nav-cart-text { display: none !important; }
        }
      `}</style>
    </header>
  );
}
