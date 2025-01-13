import React, { useState, useEffect } from 'react';
import './App.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>

const App = () => {
  const [data, setData] = useState({
    cables: [],
    cameras: [],
    chargers: [],
    computers: [],
    earbuds: [],
    headphones: [],
    iphone: [],
    smartphones: [],
    tablets: [],
    tvs: []
  });
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('cables');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    priceRange: 'all',
    reviewCount: 'all',
    availability: 'all',
    rating: 'all',
    brand: 'all'
  });
  const itemsPerPage = 10;

  useEffect(() => {
    const sections = Object.keys(data);
    sections.forEach(section => {
      fetch(`/${section}.json`)
        .then(res => res.json())
        .then(items => setData(prev => ({ ...prev, [section]: items })))
        .catch(err => console.error(`Error loading ${section} data:`, err));
    });
  }, []);

  // Stats calculation
  const getStats = () => {
    const currentItems = data[activeSection];
    if (!currentItems.length) return { totalProducts: 0, averagePrice: 0, totalReviews: 0 };

    const totalProducts = currentItems.length;
    const totalReviews = currentItems.reduce((acc, item) => {
      const reviews = parseInt(item.total_review?.replace(/[^0-9]/g, '') || 0);
      return acc + reviews;
    }, 0);
    
    const prices = currentItems.map(item => {
      const priceStr = item.price?.toString() || '';
      return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    }).filter(price => !isNaN(price) && price > 0);

    const averagePrice = prices.length ? 
      (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : 0;

    return { totalProducts, averagePrice, totalReviews };
  };

  const filterData = (items) => {
    return items.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(search.toLowerCase());
      const price = parseFloat(item.price?.toString().replace(/[^0-9.]/g, '') || 0);
      const reviews = parseInt(item.total_review?.replace(/[^0-9]/g, '') || 0);
      
      const matchesPriceRange = filters.priceRange === 'all' ||
        (filters.priceRange === 'under50' && price <= 50) ||
        (filters.priceRange === '50-100' && price > 50 && price <= 100) ||
        (filters.priceRange === '100-200' && price > 100 && price <= 200) ||
        (filters.priceRange === 'over200' && price > 200);

      const matchesReviews = filters.reviewCount === 'all' ||
        (filters.reviewCount === 'under100' && reviews < 100) ||
        (filters.reviewCount === '100-1000' && reviews >= 100 && reviews < 1000) ||
        (filters.reviewCount === 'over1000' && reviews >= 1000);

      return matchesSearch && matchesPriceRange && matchesReviews;
    });
  };

  const sortData = (items) => {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'price') {
        aValue = parseFloat(a.price?.toString().replace(/[^0-9.]/g, '') || 0);
        bValue = parseFloat(b.price?.toString().replace(/[^0-9.]/g, '') || 0);
      } else if (sortConfig.key === 'total_review') {
        aValue = parseInt(a.total_review?.replace(/[^0-9]/g, '') || 0);
        bValue = parseInt(b.total_review?.replace(/[^0-9]/g, '') || 0);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const currentData = sortData(filterData(data[activeSection] || []));
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginatedData = currentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const stats = getStats();

  const requestSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const FeaturedSection = () => (
    <section className="featured-section">
      <div className="section-content">
        <h2>Why Choose StoreAMA</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-shipping-fast"></i>
            <h3>Fast Shipping</h3>
            <p>Free delivery on orders over $50</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Round the clock customer service</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-undo"></i>
            <h3>Easy Returns</h3>
            <p>30-day money back guarantee</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Shopping</h3>
            <p>Protected by industry standards</p>
          </div>
        </div>
      </div>
    </section>
  );
  
  const AboutSection = () => (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h2>About StoreAMA</h2>
          <p>StoreAMA is your premier destination for all things tech. Founded in 2020, we've been committed to bringing you the latest and greatest in technology at competitive prices.</p>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img src="https://shourai.io/wp-content/uploads/2020/07/kindpng_1272110.png" alt="StoreAMA Office" />
        </div>
      </div>
    </section>
  );
  
  const NewsletterSection = () => {
    const [email, setEmail] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Newsletter signup:', email);
      setEmail('');
    };
  
    return (
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest tech news and exclusive offers</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    );
  };
  
  const TestimonialsSection = () => (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>"Outstanding selection of tech products and exceptional customer service!"</p>
            <div className="testimonial-rating">★★★★★</div>
          </div>
          <div className="testimonial-author">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/026/497/734/small_2x/businessman-on-isolated-png.png" alt="John Doe" />
            <div>
              <h4>John Doe</h4>
              <p>Verified Buyer</p>
            </div>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>"Fast shipping and great prices. Will definitely shop here again!"</p>
            <div className="testimonial-rating">★★★★★</div>
          </div>
          <div className="testimonial-author">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/026/497/734/small_2x/businessman-on-isolated-png.png" alt="Jane Smith" />
            <div>
              <h4>Jane Smith</h4>
              <p>Verified Buyer</p>
            </div>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>"The best tech store I've found online. Amazing support team!"</p>
            <div className="testimonial-rating">★★★★★</div>
          </div>
          <div className="testimonial-author">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/026/497/734/small_2x/businessman-on-isolated-png.png" alt="Mike Johnson" />
            <div>
              <h4>Mike Johnson</h4>
              <p>Verified Buyer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">StoreAMA</div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <div className="categories">
        {Object.keys(data).map(section => (
          <button
            key={section}
            className={`category-btn ${activeSection === section ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(section);
              setCurrentPage(1);
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Average Price</h3>
          <p>${stats.averagePrice}</p>
        </div>
        <div className="stat-card">
          <h3>Total Reviews</h3>
          <p>{stats.totalReviews.toLocaleString()}</p>
        </div>
      </div>
    <AboutSection />
    <div className="categories">
        {Object.keys(data).map(section => (
          <button
            key={section}
            className={`category-btn ${activeSection === section ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(section);
              setCurrentPage(1);
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
      <div className="filters-section">
        <select
          value={filters.priceRange}
          onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
        >
          <option value="all">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="over200">Over $200</option>
        </select>

        <select
          value={filters.reviewCount}
          onChange={(e) => setFilters({...filters, reviewCount: e.target.value})}
        >
          <option value="all">All Reviews</option>
          <option value="under100">Under 100 reviews</option>
          <option value="100-1000">100-1000 reviews</option>
          <option value="over1000">Over 1000 reviews</option>
        </select>
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th onClick={() => requestSort('title')}>
                Product Name {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('price')}>
                Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('total_review')}>
                Reviews {sortConfig.key === 'total_review' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="image-cell">
                  <img src={item.img_url} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.total_review}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="view-btn">
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

          <FeaturedSection />
          <TestimonialsSection />
          <NewsletterSection />
      <footer className="footer">
        <div className="footer-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#1a237e" fillOpacity="0.1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>StoreAMA</h3>
              <p>Your tech journey starts here</p>
              <div className="social-links">
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="link-column">
                <h4>Shop</h4>
                {Object.keys(data).slice(0, 4).map(section => (
                  <a key={section} href="#" onClick={() => setActiveSection(section)}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
              </div>
              
              <div className="link-column">
                <h4>Support</h4>
                <a href="#">Contact</a>
                <a href="#">Help Center</a>
                <a href="#">Returns</a>
              </div>

              <div className="link-column">
                <h4>Contact</h4>
                <span>
                  <i className="fas fa-envelope"></i>
                  support@techstore.com
                </span>
                <span>
                  <i className="fas fa-phone"></i>
                  (555) 123-4567
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom" style={{textAlign: 'center'}}>
          <p>&copy; 2025 StoreAMA</p>
         
        </div>
      </footer>
    </div>
  );
};

export default App;
