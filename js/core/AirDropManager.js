export class AirDropManager {
  constructor() {
    this.container = null;
    this.devices = [
      { id: 'tv_1', name: '客厅智慧屏 (Vision)', type: 'tv', status: 'online', icon: '📺' },
      { id: 'pad_1', name: 'MatePad Pro', type: 'tablet', status: 'online', icon: '📱' },
      { id: 'pc_1', name: 'MateBook X', type: 'laptop', status: 'offline', icon: '💻' }
    ];
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'airdrop-overlay hidden';
    this.container.innerHTML = `
      <div class="airdrop-modal glass-effect">
        <div class="airdrop-header">
          <h3><span class="icon-spin">💫</span> HarmonyOS 隔空投送</h3>
          <button class="btn-icon close-airdrop">✖</button>
        </div>
        <div class="airdrop-radar">
          <div class="radar-center">
            <div class="radar-pulse"></div>
            <div class="radar-pulse delay-1"></div>
            <div class="radar-pulse delay-2"></div>
            <span class="my-device">📱</span>
          </div>
          <div class="radar-devices">
            ${this.renderDevices()}
          </div>
        </div>
        <div class="airdrop-status mt-3 text-center">
          <p class="status-text text-muted">正在寻找附近的可信设备...</p>
        </div>
      </div>
    `;
    document.body.appendChild(this.container);
    this.bindEvents();
  }

  renderDevices() {
    return this.devices.map((device, index) => {
      const angle = (index * (360 / this.devices.length)) * (Math.PI / 180);
      const radius = 120; // 120px from center
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      return `
        <div class="device-node ${device.status}" style="transform: translate(${x}px, ${y}px)" data-id="${device.id}">
          <div class="device-icon">${device.icon}</div>
          <span class="device-name">${device.name}</span>
          ${device.status === 'online' ? '<div class="online-dot"></div>' : ''}
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    const closeBtn = this.container.querySelector('.close-airdrop');
    closeBtn.addEventListener('click', () => this.close());

    const deviceNodes = this.container.querySelectorAll('.device-node.online');
    deviceNodes.forEach(node => {
      node.addEventListener('click', (e) => {
        this.transferToDevice(node.dataset.id, node.querySelector('.device-name').innerText);
      });
    });
  }

  open(payload) {
    this.payload = payload;
    this.container.classList.remove('hidden');
    setTimeout(() => this.container.classList.add('visible'), 10);
    
    // Simulate radar scanning
    const statusText = this.container.querySelector('.status-text');
    statusText.innerText = '正在寻找附近的可信设备...';
    
    setTimeout(() => {
      this.container.classList.add('scanning-complete');
      statusText.innerHTML = `已发现 <strong>${this.devices.filter(d => d.status === 'online').length}</strong> 台可流转设备。请选择目标设备。`;
    }, 2000);
  }

  close() {
    this.container.classList.remove('visible');
    setTimeout(() => {
      this.container.classList.remove('scanning-complete');
      this.container.classList.add('hidden');
    }, 400); // match transition time
  }

  transferToDevice(deviceId, deviceName) {
    const statusText = this.container.querySelector('.status-text');
    const nodes = this.container.querySelectorAll('.device-node');
    
    // UI Feedback for transfer
    nodes.forEach(n => {
      if(n.dataset.id !== deviceId) n.style.opacity = '0.2';
      else n.classList.add('transferring');
    });

    statusText.innerHTML = `<span class="loader-inline"></span> 正在向 <strong>${deviceName}</strong> 流转数据...`;

    setTimeout(() => {
      statusText.innerHTML = `<span style="color: var(--success-color);">✅ 成功流转至 ${deviceName}</span>`;
      nodes.forEach(n => n.classList.remove('transferring'));
      
      setTimeout(() => {
        this.close();
        nodes.forEach(n => n.style.opacity = '1'); // reset
        if (window.store) {
          window.store.addNotification(`购物流已成功无缝流转至 ${deviceName}`, 'success');
        }
      }, 1500);
    }, 2500);
  }
}
