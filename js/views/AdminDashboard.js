import { store } from '../core/store.js';
import { BaseComponent } from '../components/BaseComponent.js';

export class AdminDashboard extends BaseComponent {
  constructor(containerId) {
    super(containerId);
  }

  render() {
    if (!this.container) return;
    
    const state = store.getState();
    const totalProducts = state.products.length;
    const totalUsers = 1250; // Mock data
    const dailyRevenue = 45890.50; // Mock data

    this.container.innerHTML = `
      <div class="admin-dashboard fade-in">
        <div class="section-header">
          <h2>Admin Analytics Dashboard</h2>
          <span class="badge badge-primary">Live</span>
        </div>
        
        <div class="stats-grid">
          <div class="stat-card glass-effect">
            <div class="stat-icon text-primary">📦</div>
            <div class="stat-info">
              <h4>Total Products</h4>
              <div class="stat-value">${totalProducts}</div>
              <div class="stat-trend positive">↑ 12% from last month</div>
            </div>
          </div>
          <div class="stat-card glass-effect">
            <div class="stat-icon text-success">💰</div>
            <div class="stat-info">
              <h4>Daily Revenue</h4>
              <div class="stat-value">$${dailyRevenue.toLocaleString()}</div>
              <div class="stat-trend positive">↑ 8.5% from yesterday</div>
            </div>
          </div>
          <div class="stat-card glass-effect">
            <div class="stat-icon text-warning">👥</div>
            <div class="stat-info">
              <h4>Active Users</h4>
              <div class="stat-value">${totalUsers.toLocaleString()}</div>
              <div class="stat-trend negative">↓ 2% from yesterday</div>
            </div>
          </div>
        </div>

        <div class="charts-container mt-4">
          <div class="chart-panel glass-effect">
            <h3>Revenue Overview (Simulated)</h3>
            <div class="mock-chart">
              <div class="bar" style="height: 40%"><span>Mon</span></div>
              <div class="bar" style="height: 60%"><span>Tue</span></div>
              <div class="bar" style="height: 30%"><span>Wed</span></div>
              <div class="bar" style="height: 80%"><span>Thu</span></div>
              <div class="bar" style="height: 50%"><span>Fri</span></div>
              <div class="bar" style="height: 90%"><span>Sat</span></div>
              <div class="bar" style="height: 100%"><span>Sun</span></div>
            </div>
          </div>
          
          <div class="chart-panel glass-effect">
            <h3>Recent Distributed Sessions</h3>
            <ul class="session-list">
              <li>
                <span class="device-tag">MatePad Pro</span> 
                <span class="session-action">Handoff Complete</span>
                <span class="session-time">2 mins ago</span>
              </li>
              <li>
                <span class="device-tag">Vision TV</span> 
                <span class="session-action">Screen Cast Started</span>
                <span class="session-time">15 mins ago</span>
              </li>
              <li>
                <span class="device-tag">Mate 60 Pro</span> 
                <span class="session-action">Checkout Synced</span>
                <span class="session-time">1 hour ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}
