import React, { useState, useMemo } from 'react';
import { Search, Eye, ShoppingBag } from 'lucide-react';
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

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
      const matchSearch = searchTerm.trim() === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.wood_type.toLowerCase().includes(searchTerm.toLowerCase());

      let matchPrice = true;
      if (priceRange === 'under5m') matchPrice = item.price < 5000000;
      else if (priceRange === '5to15m') matchPrice = item.price >= 5000000 && item.price <= 15000000;
      else if (priceRange === '15to30m') matchPrice = item.price > 15000000 && item.price <= 30000000;
      else if (priceRange === 'over30m') matchPrice = item.price > 30000000;

      return matchCategory && matchSearch && matchPrice;
    });
  }, [products, selectedCategory, searchTerm, priceRange]);

  return (
    <section id="products" className="section-space" style={{ backgroundColor: 'var(--bg-ground)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Bộ Sưu Tập Bàn Ghế Gỗ Xưởng</h2>
          <p className="section-desc">
            Sản xuất trực tiếp tại xưởng Canh Nậu. Nhận điều chỉnh loại gỗ và kích thước thực tế theo mặt bằng.
          </p>
        </div>

        {/* Filter & Search Bar: Tone Separated */}
        <div style={{
          backgroundColor: 'var(--bg-step)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-soft)',
          marginBottom: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '380px' }}>
            <Search 
              size={17} 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
            <input
              type="text"
              placeholder="Tìm theo tên sản phẩm, loại gỗ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: 'var(--radius-soft)',
                border: 'none',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-ink)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: 'var(--type-small)', fontWeight: '600' }}>Khoảng giá:</span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: 'var(--radius-soft)',
                border: 'none',
                backgroundColor: 'var(--bg-surface)',
                fontSize: 'var(--type-small)',
                fontWeight: '600'
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

        {/* Categories Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '36px'
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: '700',
                  fontSize: 'var(--type-small)',
                  whiteSpace: 'nowrap',
                  backgroundColor: isActive ? '#181513' : 'var(--bg-step)',
                  color: isActive ? '#ffffff' : 'var(--text-ink)'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product Grid: Clean Tone-Separated Cards */}
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--bg-step)', borderRadius: 'var(--radius-soft)' }}>
            <p style={{ fontSize: 'var(--type-body)', color: 'var(--text-muted)' }}>Không tìm thấy mẫu bàn ghế phù hợp.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => {
              const mainImg = product.images?.[0] || 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80';
              const optimizedImg = getOptimizedImageUrl(mainImg, 600);

              return (
                <div key={product.id} data-reveal className="surface-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: '260px', backgroundColor: 'var(--bg-step)', overflow: 'hidden' }}>
                    <img
                      src={optimizedImg}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ marginBottom: '8px' }}>
                      <span className="wood-tag">{product.wood_type}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectProduct(product)}
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: '700',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        lineHeight: 1.3
                      }}
                    >
                      {product.name}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                      Kích thước: {product.dimensions}
                    </p>

                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      borderTop: '2px solid var(--bg-step)'
                    }}>
                      <div>
                        <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
                          {Number(product.price).toLocaleString('vi-VN')} đ
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="btn btn-subtle btn-sm"
                          title="Thêm vào đơn"
                        >
                          <ShoppingBag size={15} />
                        </button>
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="btn btn-dark btn-sm"
                        >
                          Xem Mẫu
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
