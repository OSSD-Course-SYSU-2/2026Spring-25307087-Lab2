import { store } from '../core/store.js';
import { BaseComponent } from './BaseComponent.js';

export class Sidebar extends BaseComponent {
  constructor(containerId) {
    super(containerId);
  }

  render() {
    if (!this.container) return;
    
    const state = store.getState();

    this.container.innerHTML = `
      <div class="sidebar-inner">
        <h3 class="sidebar-title">Categories</h3>
        <ul class="category-list">
          <li class="category-item ${state.activeCategory === 'all' ? 'active' : ''}" data-id="all">
            <span class="category-icon">🌟</span> All Products
          </li>
          ${state.categories.map(c => `
            <li class="category-item ${state.activeCategory === c.id ? 'active' : ''}" data-id="${c.id}">
              <span class="category-icon">${c.icon}</span> ${c.name}
            </li>
          `).join('')}
        </ul>
        
        <div class="sidebar-promo">
          <h4>HarmonyOS Distributed</h4>
          <p>Experience seamless handoff across devices.</p>
          <button class="btn btn-sm btn-outline-primary mt-2" id="demoHandoffBtn">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
            AirDrop Demo
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const item = e.target.closest('.category-item');
      if (item) {
        store.dispatch('SET_CATEGORY', { categoryId: item.dataset.id });
        // Scroll to top on category change (smooth)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const handoffBtn = e.target.closest('#demoHandoffBtn');
      if (handoffBtn) {
        alert("【HarmonyOS 模拟器】\n正在搜索局域网内可信设备 (如 Vision 智慧屏, MatePad)...\n\n在真实环境中，此操作将调用 @ohos.distributedHardware.deviceManager");
      }
    });
  }
}
