import { store } from '../core/store.js';
import { BaseComponent } from './BaseComponent.js';

export class ProductList extends BaseComponent {
  constructor(containerId) {
    super(containerId);
  }

  render() {
    if (!this.container) return;
    
    const state = store.getState();
    const products = store.getFilteredProducts();

    if (products.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1" fill="none">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters.</p>
          <button class="btn btn-outline" id="clearFiltersBtn">Clear Filters</button>
        </div>
      `;
      return;
    }

    this.container.innerHTML = `
      <div class="product-grid">
        ${products.map(product => this.renderProductCard(product, state.user)).join('')}
      </div>
    `;
  }

  renderProductCard(product, user) {
    const isFavorite = user && user.favorites.includes(product.id);
    const finalPrice = product.isSale && product.originalPrice ? product.price : product.price;
    const oldPriceHtml = product.isSale && product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
    const badgeHtml = product.isNew ? `<span class="badge badge-new">New</span>` : (product.isSale ? `<span class="badge badge-sale">Sale</span>` : '');

    return `
      <div class="product-card">
        <div class="product-image-container">
          ${badgeHtml}
          <button class="btn-icon favorite-btn ${isFavorite ? 'active' : ''}" data-id="${product.id}" aria-label="Toggle favorite">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="${isFavorite ? 'currentColor' : 'none'}">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
        </div>
        <div class="product-content">
          <div class="product-tags">
            ${product.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            <span class="star">★</span> ${product.rating} <span class="reviews">(${product.reviews})</span>
          </div>
          <div class="product-footer">
            <div class="price-container">
              ${oldPriceHtml}
              <span class="price">$${finalPrice.toFixed(2)} <span class="unit">/ ${product.unit}</span></span>
            </div>
            <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
              ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      // Handle Add to Cart
      if (e.target.closest('.add-to-cart')) {
        const btn = e.target.closest('.add-to-cart');
        const productId = parseInt(btn.dataset.id);
        const product = store.getState().products.find(p => p.id === productId);
        
        if (product) {
          store.dispatch('ADD_TO_CART', product);
          btn.classList.add('clicked');
          setTimeout(() => btn.classList.remove('clicked'), 300);
        }
      }

      // Handle Product Detail View (clicking on image or title)
      const productCard = e.target.closest('.product-card');
      if (productCard && !e.target.closest('.add-to-cart')) {
        const productId = parseInt(productCard.querySelector('.add-to-cart-btn')?.dataset.id || productCard.querySelector('.add-to-cart')?.dataset.id);
        const product = store.getState().products.find(p => p.id === productId);
        if (product) {
          document.dispatchEvent(new CustomEvent('open-product-detail', { detail: product }));
        }
      }

      // Toggle Favorite
      const favBtn = e.target.closest('.favorite-btn');
      if (favBtn) {
        const productId = favBtn.dataset.id;
        store.dispatch('TOGGLE_FAVORITE', { productId });
      }

      // Clear Filters
      const clearBtn = e.target.closest('#clearFiltersBtn');
      if (clearBtn) {
        store.dispatch('SET_CATEGORY', { categoryId: 'all' });
        store.dispatch('SET_SEARCH_QUERY', { query: '' });
      }
    });
  }
}
