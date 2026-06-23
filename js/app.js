import { store } from './core/store.js';
import { database } from '../data/db.js';
import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { Cart } from './components/Cart.js';
import { CheckoutModal } from './components/CheckoutModal.js';
import { DeviceManagerModal } from './components/DeviceManagerModal.js';
import { ProductDetailModal } from './components/ProductDetailModal.js';
import { Router } from './core/router.js';
import { StorefrontView } from './views/StorefrontView.js';
import { AdminDashboard } from './views/AdminDashboard.js';
import { UserProfileView } from './views/UserProfileView.js';

class App {
  constructor() {
    this.components = [];
  }

  async init() {
    console.log('[App] Initializing Harmony Mart...');
    
    // 1. Load Data
    // In a real app, this would be an API call
    store.init({
      products: database.products,
      categories: database.categories,
      promotions: database.promotions,
      user: database.user
    });

    // 2. Initialize Global Components (Header, Sidebar, Modals)
    this.components = [
      new Header('header-root'),
      new Sidebar('sidebar-root'),
      new Cart('cart-root'),
      new CheckoutModal('checkout-root'),
      new DeviceManagerModal('device-manager-root'),
      new ProductDetailModal('product-detail-root')
    ];

    // 3. Mount all global components
    this.components.forEach(comp => comp.mount());

    // 4. Initialize Router
    this.router = new Router([
      { path: '/', component: StorefrontView },
      { path: '/admin', component: AdminDashboard },
      { path: '/profile', component: UserProfileView },
      { path: '*', component: StorefrontView }
    ]);

    // 4. Setup Global Event Listeners
    this.setupGlobalEvents();
    
    // 5. Hide Initial Loader
    document.getElementById('initial-loader')?.classList.add('hidden');
    
    console.log('[App] Initialization complete.');
  }

  setupGlobalEvents() {
    // Handle Toast Notifications
    store.subscribe((state) => {
      this.renderToasts(state.notifications);
    });
  }

  renderToasts(notifications) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Very basic DOM diffing for toasts
    const currentIds = Array.from(container.children).map(el => el.dataset.id);
    const newIds = notifications.map(n => n.id);

    // Remove old
    Array.from(container.children).forEach(el => {
      if (!newIds.includes(el.dataset.id)) {
        el.classList.add('fade-out');
        setTimeout(() => el.remove(), 300);
      }
    });

    // Add new
    notifications.forEach(n => {
      if (!currentIds.includes(n.id)) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${n.type} slide-in`;
        toast.dataset.id = n.id;
        toast.innerHTML = `
          <div class="toast-icon">${n.type === 'success' ? '✓' : 'i'}</div>
          <div class="toast-message">${n.message}</div>
        `;
        container.appendChild(toast);
      }
    });
  }
}

// Bootstrapping the application
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
