import { store } from '../core/store.js';
import { BaseComponent } from './BaseComponent.js';

export class DeviceManagerModal extends BaseComponent {
  constructor(containerId) {
    super(containerId);
  }

  render() {
    if (!this.container) return;

    const state = store.getState();
    if (!state.isDeviceManagerOpen) {
      this.container.innerHTML = '';
      this.container.classList.remove('open');
      return;
    }

    this.container.classList.add('open');

    this.container.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content device-manager-content glass-effect slide-in-bottom">
        <div class="modal-header">
          <h3>HarmonyOS Device Manager</h3>
          <button class="btn-icon close-dm" aria-label="Close">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="radar-container">
            <div class="radar-sweep"></div>
            <div class="radar-center">📱</div>
            
            <div class="device-node active" style="top: 20%; left: 70%;" data-id="tv1">
              <div class="device-icon">📺</div>
              <div class="device-name">Vision TV 85"</div>
              <div class="device-status">Ready</div>
            </div>
            
            <div class="device-node active" style="top: 60%; left: 20%;" data-id="pad1">
              <div class="device-icon">💻</div>
              <div class="device-name">MatePad Pro</div>
              <div class="device-status">Ready</div>
            </div>

            <div class="device-node offline" style="top: 80%; left: 80%;">
              <div class="device-icon">⌚</div>
              <div class="device-name">Watch 4</div>
              <div class="device-status">Offline</div>
            </div>
          </div>
          
          <div class="handoff-instructions mt-4">
            <h4>Cross-Device Handoff</h4>
            <p class="text-muted">Select a device above to seamlessly transfer your current shopping session via Distributed Softbus.</p>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.close-dm') || e.target.closest('.modal-overlay')) {
        store.dispatch('TOGGLE_DEVICE_MANAGER');
      }

      const deviceNode = e.target.closest('.device-node.active');
      if (deviceNode) {
        const id = deviceNode.dataset.id;
        const name = deviceNode.querySelector('.device-name').textContent;
        
        deviceNode.classList.add('transferring');
        
        setTimeout(() => {
          store.dispatch('TOGGLE_DEVICE_MANAGER');
          alert(`🚀 State successfully serialized and transferred to [${name}].\n\n(This simulates the @ohos.distributedHardware API)`);
        }, 1500);
      }
    });
  }
}
