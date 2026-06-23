// js/core/router.js
import { store } from './store.js';

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentView = null;
    this.rootElement = document.getElementById('main-view-root');
    
    window.addEventListener('hashchange', () => this.handleRouteChange());
    window.addEventListener('load', () => this.handleRouteChange());
  }

  handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/';
    console.log(`[Router] Navigating to: ${hash}`);
    
    // Simple route matching
    const route = this.routes.find(r => {
      if (r.path === hash) return true;
      if (r.path.includes(':')) {
        const routeParts = r.path.split('/');
        const hashParts = hash.split('/');
        if (routeParts.length !== hashParts.length) return false;
        
        let match = true;
        for (let i = 0; i < routeParts.length; i++) {
          if (!routeParts[i].startsWith(':') && routeParts[i] !== hashParts[i]) {
            match = false;
            break;
          }
        }
        return match;
      }
      return false;
    }) || this.routes.find(r => r.path === '*');

    if (route) {
      this.renderView(route.component);
      store.dispatch('ROUTE_CHANGED', { path: hash });
    }
  }

  renderView(ViewComponent) {
    if (this.currentView) {
      if (typeof this.currentView.unmount === 'function') {
        this.currentView.unmount();
      }
    }
    
    if (this.rootElement) {
      this.rootElement.innerHTML = ''; // Clear current view
      this.currentView = new ViewComponent('main-view-root');
      this.currentView.mount();
    }
  }
}
