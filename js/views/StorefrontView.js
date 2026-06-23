import { store } from '../core/store.js';
import { BaseComponent } from '../components/BaseComponent.js';
import { ProductList } from '../components/ProductList.js';

export class StorefrontView extends BaseComponent {
  constructor(containerId) {
    super(containerId);
    this.productList = null;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="hero-banner mb-4 fade-in">
        <div class="hero-content">
          <h1>Fresh Groceries,<br>Delivered Fast.</h1>
          <p>Experience the seamless flow of data across devices.</p>
          <button class="btn btn-light mt-3" id="scroll-to-shop">Shop Now</button>
        </div>
      </section>

      <section class="products-section fade-in" style="animation-delay: 0.2s;">
        <div class="section-header">
          <h2>Featured Products</h2>
          <div class="sort-controls">
            <select class="form-select" aria-label="Sort products" id="sort-select">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div id="dynamic-product-list" class="min-h-500"></div>
      </section>
    `;

    // Initialize sub-component
    this.productList = new ProductList('dynamic-product-list');
    this.productList.mount();
  }

  bindEvents() {
    if (!this.container) return;

    const scrollBtn = this.container.querySelector('#scroll-to-shop');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        const target = this.container.querySelector('.products-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    const sortSelect = this.container.querySelector('#sort-select');
    if (sortSelect) {
      // Set initial value from state
      sortSelect.value = store.getState().sortBy || 'popular';
      
      sortSelect.addEventListener('change', (e) => {
        store.dispatch('SET_SORT', e.target.value);
      });
    }
  }

  unmount() {
    if (this.productList) {
      this.productList.unmount();
    }
    super.unmount();
  }
}
