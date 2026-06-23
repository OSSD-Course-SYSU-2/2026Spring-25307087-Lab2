class Store {
  constructor() {
    this.state = {
      products: [],
      categories: [],
      promotions: [],
      cart: [],
      user: null,
      searchQuery: '',
      activeCategory: 'all',
      isCartOpen: false,
      isMobileMenuOpen: false,
      isCheckoutOpen: false,
      isDeviceManagerOpen: false,
      sortBy: 'popular',
      notifications: [],
      isLoading: true
    };
    this.listeners = new Set();
  }

  init(initialData) {
    this.state = { ...this.state, ...initialData, isLoading: false };
    // Load cart from localStorage if exists
    const savedCart = localStorage.getItem('ecommerce_cart');
    if (savedCart) {
      try {
        this.state.cart = JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
    // Persist cart
    localStorage.setItem('ecommerce_cart', JSON.stringify(this.state.cart));
  }

  dispatch(action, payload) {
    console.log(`[Store] Action: ${action}`, payload);
    switch (action) {
      case 'ADD_TO_CART': {
        const { product, quantity = 1 } = payload;
        const existing = this.state.cart.find(item => item.product.id === product.id);
        if (existing) {
          existing.quantity += quantity;
        } else {
          this.state.cart.push({ product, quantity });
        }
        this.addNotification(`Added ${product.name} to cart`, 'success');
        break;
      }
      case 'REMOVE_FROM_CART': {
        this.state.cart = this.state.cart.filter(item => item.product.id !== payload.productId);
        break;
      }
      case 'UPDATE_CART_QUANTITY': {
        const item = this.state.cart.find(item => item.product.id === payload.productId);
        if (item) {
          item.quantity = payload.quantity;
          if (item.quantity <= 0) {
            this.state.cart = this.state.cart.filter(i => i.product.id !== payload.productId);
          }
        }
        break;
      }
      case 'CLEAR_CART': {
        this.state.cart = [];
        this.addNotification('Cart cleared', 'info');
        break;
      }
      case 'TOGGLE_CART': {
        this.state.isCartOpen = !this.state.isCartOpen;
        break;
      }
      case 'SET_SORT': {
        this.state.sortBy = payload;
        break;
      }
      case 'TOGGLE_MOBILE_MENU': {
        this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
        break;
      }
      case 'SET_SEARCH_QUERY': {
        this.state.searchQuery = payload.query;
        break;
      }
      case 'SET_CATEGORY': {
        this.state.activeCategory = payload.categoryId;
        break;
      }
      case 'TOGGLE_FAVORITE': {
        if (!this.state.user) return;
        const idx = this.state.user.favorites.indexOf(payload.productId);
        if (idx > -1) {
          this.state.user.favorites.splice(idx, 1);
          this.addNotification('Removed from favorites', 'info');
        } else {
          this.state.user.favorites.push(payload.productId);
          this.addNotification('Added to favorites', 'success');
        }
        break;
      }
      default:
        console.warn(`[Store] Unknown action: ${action}`);
    }
    this.notify();
  }

  addNotification(message, type = 'info') {
    const id = Date.now().toString();
    this.state.notifications.push({ id, message, type });
    this.notify();
    setTimeout(() => {
      this.state.notifications = this.state.notifications.filter(n => n.id !== id);
      this.notify();
    }, 3000);
  }

  // Selectors
  getCartTotal() {
    return this.state.cart.reduce((total, item) => {
      const price = item.product.isSale ? item.product.originalPrice * 0.8 : item.product.price; // Simplified sale logic for selector
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getCartCount() {
    return this.state.cart.reduce((count, item) => count + item.quantity, 0);
  }

  getFilteredProducts() {
    let filtered = this.state.products;
    
    if (this.state.activeCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === this.state.activeCategory);
    }
    
    if (this.state.searchQuery.trim() !== '') {
      const query = this.state.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }
}

export const store = new Store();
