import { store } from '../core/store.js';
import { BaseComponent } from './BaseComponent.js';

export class ProductDetailModal extends BaseComponent {
  constructor(containerId) {
    super(containerId);
    this.currentProduct = null;
  }

  render() {
    if (!this.container) return;

    const state = store.getState();
    // In a real app, this would read from state.selectedProduct
    // For now, we listen for a custom event or check state if added.
    
    if (!this.currentProduct) {
      this.container.innerHTML = '';
      this.container.classList.remove('open');
      return;
    }

    const p = this.currentProduct;
    this.container.classList.add('open');

    this.container.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content product-detail-content glass-effect slide-in-bottom" style="max-width: 800px; width: 90%;">
        <div class="modal-header">
          <h3>Product Details</h3>
          <button class="btn-icon close-detail" aria-label="Close">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div class="product-image-large" style="font-size: 8rem; display: flex; align-items: center; justify-content: center; background: var(--bg-subtle); border-radius: var(--radius-lg);">
            ${p.image}
          </div>
          <div class="product-info-detailed">
            <span class="category-badge">${p.category}</span>
            <h2 style="margin: 1rem 0; font-size: 2rem;">${p.name}</h2>
            <div class="rating" style="color: #fbbf24; font-size: 1.2rem; margin-bottom: 1rem;">
              ${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 !== 0 ? '½' : ''} <span style="color: var(--text-muted); font-size: 0.9rem;">(${p.reviews} reviews)</span>
            </div>
            <div class="price" style="font-size: 2.5rem; font-weight: bold; color: var(--primary); margin-bottom: 1.5rem;">
              $${p.price.toFixed(2)} <span style="font-size: 1rem; color: var(--text-muted); font-weight: normal;">/ ${p.unit}</span>
            </div>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
              Experience the freshest ${p.name.toLowerCase()} sourced directly from our premium suppliers. Perfect for your daily nutritional needs and culinary creations. 
              Distributed across the Harmony Mart ecosystem for seamless purchase.
            </p>
            
            <div class="stock-status" style="margin-bottom: 1.5rem;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${p.stock > 10 ? 'var(--success)' : 'var(--warning)'}; margin-right: 8px;"></span>
              ${p.stock > 10 ? 'In Stock' : `Only ${p.stock} left`}
            </div>

            <button class="btn btn-primary btn-block detail-add-cart" style="font-size: 1.1rem; padding: 1rem;">
              Add to Cart - $${p.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.close-detail') || e.target.closest('.modal-overlay')) {
        this.currentProduct = null;
        this.render();
      }

      if (e.target.closest('.detail-add-cart')) {
        store.dispatch('ADD_TO_CART', this.currentProduct);
        const btn = e.target.closest('.detail-add-cart');
        btn.innerHTML = '✓ Added to Cart';
        btn.classList.add('btn-success');
        setTimeout(() => {
          btn.innerHTML = `Add to Cart - $${this.currentProduct.price.toFixed(2)}`;
          btn.classList.remove('btn-success');
          this.currentProduct = null;
          this.render();
        }, 1000);
      }
    });

    // Custom event listener for when a product card is clicked in ProductList
    document.addEventListener('open-product-detail', (e) => {
      this.currentProduct = e.detail;
      this.render();
    });
  }
}
