import { store } from '../core/store.js';
import { BaseComponent } from './BaseComponent.js';

export class Cart extends BaseComponent {
  constructor(containerId) {
    super(containerId);
  }

  render() {
    if (!this.container) return;
    
    const state = store.getState();
    const cart = state.cart;
    const total = store.getCartTotal();
    
    if (!state.isCartOpen) {
      this.container.innerHTML = '';
      this.container.classList.remove('open');
      return;
    }
    
    this.container.classList.add('open');

    this.container.innerHTML = `
      <div class="cart-overlay"></div>
      <div class="cart-panel">
        <div class="cart-header">
          <h2>Your Cart (${store.getCartCount()})</h2>
          <button class="btn-icon close-cart" aria-label="Close cart">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="cart-body">
          ${cart.length === 0 ? `
            <div class="empty-cart">
              <svg viewBox="0 0 24 24" width="64" height="64" stroke="#ddd" stroke-width="1" fill="none">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your cart is empty.</p>
              <button class="btn btn-primary mt-4 close-cart-btn">Start Shopping</button>
            </div>
          ` : `
            <ul class="cart-items">
              ${cart.map(item => this.renderCartItem(item)).join('')}
            </ul>
          `}
        </div>
        
        ${cart.length > 0 ? `
          <div class="cart-footer">
            <div class="cart-summary">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>$${total.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
              </div>
            </div>
            <button class="btn btn-primary btn-block checkout-btn">
              Proceed to Checkout ($${total.toFixed(2)})
            </button>
            <button class="btn btn-outline btn-block clear-cart-btn mt-2">
              Empty Cart
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderCartItem(item) {
    const p = item.product;
    const price = p.isSale && p.originalPrice ? p.price : p.price;
    
    return `
      <li class="cart-item">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${p.name}</h4>
          <div class="cart-item-price">$${price.toFixed(2)}</div>
          <div class="cart-item-actions">
            <div class="quantity-selector">
              <button class="btn-qty minus" data-id="${p.id}">-</button>
              <input type="number" class="qty-input" value="${item.quantity}" readonly>
              <button class="btn-qty plus" data-id="${p.id}">+</button>
            </div>
            <button class="btn-icon remove-item" data-id="${p.id}" aria-label="Remove item">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </li>
    `;
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      // Close cart
      if (e.target.closest('.close-cart') || 
          e.target.closest('.cart-overlay') ||
          e.target.closest('.close-cart-btn')) {
        store.dispatch('TOGGLE_CART');
      }

      // Quantity adjustments
      const minusBtn = e.target.closest('.minus');
      if (minusBtn) {
        const id = minusBtn.dataset.id;
        const item = store.getState().cart.find(i => i.product.id === id);
        if (item) store.dispatch('UPDATE_CART_QUANTITY', { productId: id, quantity: item.quantity - 1 });
      }

      const plusBtn = e.target.closest('.plus');
      if (plusBtn) {
        const id = plusBtn.dataset.id;
        const item = store.getState().cart.find(i => i.product.id === id);
        if (item) store.dispatch('UPDATE_CART_QUANTITY', { productId: id, quantity: item.quantity + 1 });
      }

      // Remove item
      const removeBtn = e.target.closest('.remove-item');
      if (removeBtn) {
        store.dispatch('REMOVE_FROM_CART', { productId: removeBtn.dataset.id });
      }

      // Clear cart
      if (e.target.closest('.clear-cart-btn')) {
        if (confirm('Are you sure you want to empty your cart?')) {
          store.dispatch('CLEAR_CART');
        }
      }

      // Checkout (Mock)
      const checkoutBtn = e.target.closest('.checkout-btn');
      if (checkoutBtn) {
        const originalText = checkoutBtn.textContent;
        checkoutBtn.innerHTML = '<span class="loader-inline"></span> Processing...';
        checkoutBtn.disabled = true;
        
        setTimeout(() => {
          store.dispatch('CLEAR_CART');
          store.dispatch('TOGGLE_CART');
          alert("🎉 订单提交成功！\n\n(前端模拟结算完成)");
        }, 1500);
      }
    });
  }
}
