import { store } from '../core/store.js';
import { BaseComponent } from './BaseComponent.js';

export class CheckoutModal extends BaseComponent {
  constructor(containerId) {
    super(containerId);
    this.currentStep = 1;
    this.formData = {
      name: '',
      address: '',
      payment: 'alipay'
    };
  }

  render() {
    if (!this.container) return;

    const state = store.getState();
    if (!state.isCheckoutOpen) {
      this.container.innerHTML = '';
      this.container.classList.remove('open');
      this.currentStep = 1; // reset on close
      return;
    }

    this.container.classList.add('open');
    const total = store.getCartTotal();

    this.container.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content glass-effect slide-in-bottom">
        <div class="modal-header">
          <h3>Secure Checkout</h3>
          <button class="btn-icon close-checkout" aria-label="Close checkout">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="checkout-steps">
            <div class="step ${this.currentStep >= 1 ? 'active' : ''}">
              <div class="step-icon">1</div>
              <span>Shipping</span>
            </div>
            <div class="step-divider ${this.currentStep >= 2 ? 'active' : ''}"></div>
            <div class="step ${this.currentStep >= 2 ? 'active' : ''}">
              <div class="step-icon">2</div>
              <span>Payment</span>
            </div>
            <div class="step-divider ${this.currentStep >= 3 ? 'active' : ''}"></div>
            <div class="step ${this.currentStep >= 3 ? 'active' : ''}">
              <div class="step-icon">3</div>
              <span>Confirm</span>
            </div>
          </div>
          
          <form id="checkoutForm" class="checkout-form mt-4">
            ${this.renderStepContent(state, total)}
          </form>
        </div>
      </div>
    `;
  }

  renderStepContent(state, total) {
    if (this.currentStep === 1) {
      return `
        <h4>Shipping Information</h4>
        <div class="form-group mt-3">
          <label>Full Name</label>
          <input type="text" class="form-control" name="name" value="${this.formData.name || (state.user ? state.user.name : '')}" required>
        </div>
        <div class="form-group mt-3">
          <label>Delivery Address</label>
          <textarea class="form-control" name="address" rows="3" required>${this.formData.address || (state.user ? state.user.address : '')}</textarea>
        </div>
        <div class="form-actions mt-4">
          <button type="button" class="btn btn-primary btn-block next-step">Continue to Payment</button>
        </div>
      `;
    } else if (this.currentStep === 2) {
      return `
        <h4>Payment Method</h4>
        <div class="payment-methods mt-3">
          <label class="payment-card">
            <input type="radio" name="payment" value="alipay" ${this.formData.payment === 'alipay' ? 'checked' : ''}>
            <div class="card-content">
              <span class="icon">📱</span> Alipay
            </div>
          </label>
          <label class="payment-card">
            <input type="radio" name="payment" value="wechat" ${this.formData.payment === 'wechat' ? 'checked' : ''}>
            <div class="card-content">
              <span class="icon">💬</span> WeChat Pay
            </div>
          </label>
          <label class="payment-card">
            <input type="radio" name="payment" value="harmony" ${this.formData.payment === 'harmony' ? 'checked' : ''}>
            <div class="card-content">
              <span class="icon">🌐</span> HarmonyOS Pay
            </div>
          </label>
        </div>
        <div class="form-actions mt-4" style="display: flex; gap: 1rem;">
          <button type="button" class="btn btn-outline prev-step" style="flex: 1;">Back</button>
          <button type="button" class="btn btn-primary next-step" style="flex: 2;">Review Order</button>
        </div>
      `;
    } else {
      return `
        <h4>Order Confirmation</h4>
        <div class="order-summary mt-3 p-4 glass-effect" style="border-radius: var(--radius-md);">
          <p><strong>Deliver to:</strong> ${this.formData.name}</p>
          <p><strong>Address:</strong> ${this.formData.address}</p>
          <p><strong>Payment:</strong> ${this.formData.payment.toUpperCase()}</p>
          <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border-color);">
          <div class="summary-row total">
            <span>Amount to Pay:</span>
            <span class="amount text-primary" style="font-size: 1.5rem;">$${total.toFixed(2)}</span>
          </div>
        </div>
        <div class="form-actions mt-4" style="display: flex; gap: 1rem;">
          <button type="button" class="btn btn-outline prev-step" style="flex: 1;">Back</button>
          <button type="submit" class="btn btn-success btn-pay" style="flex: 2;">Confirm & Pay</button>
        </div>
      `;
    }
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.close-checkout') || e.target.closest('.modal-overlay')) {
        store.dispatch('TOGGLE_CHECKOUT');
      }

      // Handle Next Step
      if (e.target.closest('.next-step')) {
        const form = this.container.querySelector('#checkoutForm');
        if (this.currentStep === 1) {
          const nameInput = form.querySelector('[name="name"]');
          const addressInput = form.querySelector('[name="address"]');
          if (!nameInput.value || !addressInput.value) {
            alert("Please fill out all shipping fields.");
            return;
          }
          this.formData.name = nameInput.value;
          this.formData.address = addressInput.value;
        } else if (this.currentStep === 2) {
          const paymentInput = form.querySelector('input[name="payment"]:checked');
          this.formData.payment = paymentInput ? paymentInput.value : 'alipay';
        }
        this.currentStep++;
        this.render(); // Re-render inside modal, no store dispatch needed for local state
      }

      // Handle Prev Step
      if (e.target.closest('.prev-step')) {
        this.currentStep--;
        this.render();
      }
    });

    const form = this.container.querySelector('#checkoutForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.currentStep !== 3) return;

        const btn = form.querySelector('.btn-pay');
        btn.innerHTML = '<span class="loader-inline"></span> Processing...';
        btn.disabled = true;

        setTimeout(() => {
          store.dispatch('CLEAR_CART');
          store.dispatch('TOGGLE_CHECKOUT');
          alert("🎉 Transaction Successful via " + this.formData.payment.toUpperCase() + "!\n\nOrder #HM-" + Math.floor(Math.random() * 1000000) + " has been placed.");
        }, 1500);
      });
    }
  }
  }
}
