import { store } from '../core/store.js';

export class BaseComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[BaseComponent] Container #${containerId} not found`);
    }
    this.unsubscribe = null;
  }

  mount() {
    this.unsubscribe = store.subscribe(() => this.render());
    this.render();
    this.bindEvents();
  }

  unmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  render() {
    // To be implemented by subclasses
  }

  bindEvents() {
    // To be implemented by subclasses
  }
}
