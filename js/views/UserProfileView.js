import { store } from '../core/store.js';
import { BaseComponent } from '../components/BaseComponent.js';

export class UserProfileView extends BaseComponent {
  constructor(containerId) {
    super(containerId);
  }

  render() {
    if (!this.container) return;
    
    const state = store.getState();
    const user = state.user;

    this.container.innerHTML = `
      <div class="user-profile fade-in">
        <div class="profile-header glass-effect">
          <div class="profile-avatar">
            ${user.name.charAt(0)}
          </div>
          <div class="profile-info">
            <h2>${user.name}</h2>
            <p class="text-muted">HarmonyOS ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          </div>
          <div class="profile-actions">
            <button class="btn btn-outline">Edit Profile</button>
          </div>
        </div>

        <div class="profile-grid mt-6">
          <div class="profile-section">
            <h3>Recent Orders</h3>
            <div class="order-list stagger-children">
              <div class="order-card glass-effect">
                <div class="order-header">
                  <span class="order-id">Order #HM-89231</span>
                  <span class="badge badge-success">Delivered</span>
                </div>
                <div class="order-details">
                  <p>3 items • $45.90</p>
                  <p class="text-muted">Placed on Oct 24, 2026</p>
                </div>
                <button class="btn btn-outline btn-sm mt-3">View Details</button>
              </div>
              <div class="order-card glass-effect">
                <div class="order-header">
                  <span class="order-id">Order #HM-88102</span>
                  <span class="badge badge-primary">Processing</span>
                </div>
                <div class="order-details">
                  <p>12 items • $124.50</p>
                  <p class="text-muted">Placed on Oct 22, 2026</p>
                </div>
                <button class="btn btn-outline btn-sm mt-3">Track Shipment</button>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h3>Connected Devices</h3>
            <p class="text-muted mb-4">Manage devices linked to your Distributed ID.</p>
            <div class="device-list stagger-children">
              <div class="device-item glass-effect">
                <div class="device-icon">📱</div>
                <div class="device-info">
                  <h4>Huawei Mate 60 Pro</h4>
                  <p>This Device • Active</p>
                </div>
              </div>
              <div class="device-item glass-effect">
                <div class="device-icon">💻</div>
                <div class="device-info">
                  <h4>MatePad Pro 13.2</h4>
                  <p>Last active: 2 hours ago</p>
                </div>
              </div>
              <div class="device-item glass-effect">
                <div class="device-icon">📺</div>
                <div class="device-info">
                  <h4>Vision TV 85"</h4>
                  <p>Last active: Yesterday</p>
                </div>
              </div>
            </div>
            <button class="btn btn-primary mt-4" onclick="store.dispatch('TOGGLE_DEVICE_MANAGER')">
              Scan for Nearby Devices
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
