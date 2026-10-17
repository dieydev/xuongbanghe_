import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ShoppingBag, 
  Ruler, 
  Sparkles, 
  Check, 
  Clock, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { getOptimizedImageUrl } from '../services/cloudinary';

export default function ProductCatalog({ 
  products, 
  categories, 
  onSelectProduct, 
  onAddToCart,
  selectedCategory,
  setSelectedCategory
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Lọc danh mục
      const matchCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
      
      // Tìm kiếm từ khóa
      const matchSearch = searchTerm.trim() === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.wood_type.toLowerCase().includes(searchTerm.toLowerCase());

      // Lọc khoảng giá
      let matchPrice = true;
      if (priceRange === 'under5m') matchPrice = item.price < 5000000;
      else if (priceRange === '5to15m') matchPrice = item.price >= 5000000 && item.price <= 15000000;
      else if (priceRange === '15to30m') matchPrice = item.price > 15000000 && item.price <= 30000000;
      else if (priceRange === 'over30m') matchPrice = item.price > 30000000;

      return matchCategory && matchSearch && matchPrice;
    });
  }, [products, selectedCategory, searchTerm, priceRange]);

  return (
    <section id="products" className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={15} />
            <span>Sản Phẩm Tiêu Biểu</span>
          </div>
          <h2 className="section-title">Bộ Sưu Tập Bàn Ghế Gỗ Xưởng Tinh Hoa</h2>
          <p className="section-desc">
            Tất cả sản phẩm đều được gia công trực tiếp tại xưởng mộc, nhận điều chỉnh kích thước và loại gỗ theo yêu cầu riêng của từng khách hàng.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          background: '#ffffff',
          padding: '18px 24px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: '420px'
          }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} 
            />
            <input
              type="text"
              placeholder="Tìm theo tên bàn ghế, loại gỗ sồi, gõ đỏ, me tây..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px 11px 42px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
                backgroundColor: 'var(--wood-50)',
                color: 'var(--wood-900)'
              }}
            />
          </div>

          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
              Khoảng giá:
            </span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '600',
                color: 'var(--wood-800)',
                cursor: 'pointer'
              }}
            >
              <option value="all">Tất cả mức giá</option>
              <option value="under5m">Dưới 5 triệu</option>
              <option value="5to15m">5 - 15 triệu</option>
              <option value="15to30m">15 - 30 triệu</option>
              <option value="over30m">Trên 30 triệu</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '36px',
          scrollbarWidth: 'none'
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  background: isActive ? 'var(--wood-900)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--wood-700)',
                  border: isActive ? '1px solid var(--wood-900)' : '1px solid var(--border-color)',
                  boxShadow: isActive ? '0 4px 12px rgba(28, 25, 23, 0.15)' : 'none'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Không tìm thấy mẫu bàn ghế phù hợp</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '18px' }}>
              Hãy thử tìm với từ khóa khác hoặc gửi yêu cầu gia công riêng theo ý bạn.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setPriceRange('all'); setSelectedCategory('all'); }}
              className="btn btn-outline btn-sm"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {filteredProducts.map((product) => {
              const mainImg = product.images?.[0] || 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80';
              const optimizedImg = getOptimizedImageUrl(mainImg, 600);

              return (
                <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Image container */}
                  <div style={{ position: 'relative', overflow: 'hidden', height: '240px', background: '#e7e5e4' }}>
                    <img
                      src={optimizedImg}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />

                    {/* Badge: Stock status */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                      {product.stock_status === 'available' ? (
                        <span className="badge badge-available">
                          <Check size={12} strokeWidth={3} /> Có sẵn tại xưởng
                        </span>
                      ) : (
                        <span className="badge badge-order">
                          <Clock size={12} /> Đặt đóng {product.lead_time_days || 5} ngày
                        </span>
                      )}
                    </div>

                    {/* Quick view button */}
                    <button
                      onClick={() => onSelectProduct(product)}
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(6px)',
                        color: 'var(--wood-900)',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <Eye size={14} /> Xem Chi Tiết
                    </button>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {/* Wood type tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <span className="badge badge-wood" style={{ fontSize: '0.72rem' }}>
                        {product.wood_type}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        marginBottom: '10px',
                        color: 'var(--wood-900)',
                        cursor: 'pointer',
                        lineHeight: 1.4,
                        minHeight: '44px'
                      }}
                    >
                      {product.name}
                    </h3>

                    {/* Dimensions */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--text-muted)',
                      fontSize: '0.8rem',
                      marginBottom: '14px'
                    }}>
                      <Ruler size={14} color="var(--amber-primary)" />
                      <span>{product.dimensions}</span>
                    </div>

                    {/* Price and Cart Action */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: '800',
                          color: 'var(--amber-primary)',
                          fontFamily: 'var(--font-heading)'
                        }}>
                          {Number(product.price).toLocaleString('vi-VN')} đ
                        </div>
                        {product.original_price && (
                          <div style={{
                            fontSize: '0.78rem',
                            color: 'var(--text-light)',
                            textDecoration: 'line-through'
                          }}>
                            {Number(product.original_price).toLocaleString('vi-VN')} đ
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="btn btn-outline btn-sm"
                          title="Thêm vào danh sách chọn"
                          style={{ padding: '8px 12px' }}
                        >
                          <ShoppingBag size={16} />
                        </button>
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '8px 14px' }}
                        >
                          Đặt Làm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
