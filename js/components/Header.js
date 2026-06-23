import { store } from '../core/store.js';
import { BaseComponent } from './BaseComponent.js';

export class Header extends BaseComponent {
  constructor(containerId) {
    super(containerId);
  }

  render() {
    if (!this.container) return;
    
    const state = store.getState();
    const cartCount = store.getCartCount();

    this.container.innerHTML = `
      <div class="header-container">
        <div class="header-left">
          <button class="mobile-menu-toggle btn-icon" aria-label="Menu">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <a href="/" class="brand">
            <span class="brand-icon">🛒</span>
            <span class="brand-text">Harmony Mart</span>
          </a>
        </div>
        
        <div class="header-center">
          <div class="search-bar">
            <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="searchInput" class="search-input" placeholder="Search for fresh groceries..." value="${state.searchQuery}">
            ${state.searchQuery ? `
              <button class="clear-search btn-icon" aria-label="Clear search">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ` : ''}
          </div>
        </div>
        
        <div class="header-right">
          <a href="#/profile" class="user-profile" style="text-decoration: none; color: inherit;">
            <div class="avatar">${state.user ? state.user.name.charAt(0) : '?'}</div>
            <span class="user-name">${state.user ? state.user.name : 'Sign In'}</span>
          </a>
          
          <button class="cart-toggle btn-icon" aria-label="Cart">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            ${cartCount > 0 ? `<span class="cart-badge">${cartCount > 99 ? '99+' : cartCount}</span>` : ''}
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <nav class="mobile-nav ${state.isMobileMenuOpen ? 'open' : ''}">
        <div class="mobile-nav-header">
          <h3>Categories</h3>
          <button class="close-mobile-menu btn-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <ul class="mobile-nav-list">
          <li class="mobile-nav-item ${state.activeCategory === 'all' ? 'active' : ''}" data-id="all">
            <span class="category-icon">🌟</span> All Products
          </li>
          ${state.categories.map(c => `
            <li class="mobile-nav-item ${state.activeCategory === c.id ? 'active' : ''}" data-id="${c.id}">
              <span class="category-icon">${c.icon}</span> ${c.name}
            </li>
          `).join('')}
        </ul>
      </nav>
      ${state.isMobileMenuOpen ? `<div class="mobile-menu-overlay"></div>` : ''}
    `;
  }

  bindEvents() {
    if (!this.container) return;

    // Search input (debounce)
    const searchInput = this.container.querySelector('.search-input');
    if (searchInput) {
      let timeout = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          store.dispatch('SET_SEARCH_QUERY', e.target.value);
        }, 300);
      });
      // Set cursor to end if it was focused
      searchInput.addEventListener('focus', function() {
        const val = this.value;
        this.value = '';
        this.value = val;
      });
    }

    // Clear search
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.clear-search')) {
        store.dispatch('SET_SEARCH_QUERY', { query: '' });
      }
    });

    // Cart toggle
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.cart-toggle')) {
        store.dispatch('TOGGLE_CART');
      }
    });

    // Mobile menu toggle
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.mobile-menu-toggle') || 
          e.target.closest('.close-mobile-menu') || 
          e.target.closest('.mobile-menu-overlay')) {
        store.dispatch('TOGGLE_MOBILE_MENU');
      }
    });

    // Mobile category selection
    this.container.addEventListener('click', (e) => {
      const item = e.target.closest('.mobile-nav-item');
      if (item) {
        store.dispatch('SET_CATEGORY', { categoryId: item.dataset.id });
        store.dispatch('TOGGLE_MOBILE_MENU');
      }
    });
  }
}
