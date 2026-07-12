// Maneja generación dinámica de jugadores y crews
function generatePlayers(count) {
  const container = document.getElementById('players');
  if (!container) return;
  container.innerHTML = '';
  // store current view
  window.currentView = 'players';
  for (let i = 1; i <= count; i++) {
    const card = document.createElement('div');
    card.className = 'player-card';
    const name = (i === 1) ? 'Astarum' : `Jugador ${i}`;
    // Discord data for Astarum
    const astarumDiscordId = '1056681722353303614';
    const astarumAvatar = 'file:///C:/Users/Diegoo/Downloads/1f05e6cb522cc355812f8f7c4685ea01.jpg'; // local image provided by user
    const discordElement = (i === 1)
      ? `<a class="discord" href="https://discord.com/users/${astarumDiscordId}" target="_blank" rel="noopener noreferrer">Discord</a>`
      : `<button class="discord">Discord</button>`;

    const youtubeElement = (i === 1)
      ? `<a class="youtube" href="https://www.youtube.com/@astarumking" target="_blank" rel="noopener noreferrer">YouTube</a>`
      : `<button class="youtube">YouTube</button>`;

    const regionList = ['NA','EU','ASIA','SA','OC'];
    const region = (i === 1) ? 'EU' : regionList[i % regionList.length];

    const avatarHtml = (i === 1)
      ? `<div class="avatar"><img src="${astarumAvatar}" alt="Astarum avatar"></div>`
      : `<div class="avatar"></div>`;

    card.innerHTML = `
      <div class="left">
        ${avatarHtml}
        <div>
          <h2>${name}</h2>
          <p>#${i} Global</p>
        </div>
      </div>
      <div class="buttons">
        ${youtubeElement}
        ${discordElement}
      </div>
    `;
    container.appendChild(card);
  }
}

function showPlayerDetail(playerName) {
  const detail = document.getElementById('player-detail');
  const headerEl = document.querySelector('main .content header h1');
  if (!detail) return;
  // find player's region by regenerating a single lookup
  let region = 'Unknown';
  if (playerName.toLowerCase() === 'astarum') region = 'EU';
  else {
    const m = playerName.match(/Jugador\s*(\d+)/i);
    if (m) {
      const idx = parseInt(m[1], 10);
      const regions = ['NA','EU','ASIA','SA','OC'];
      region = regions[idx % regions.length];
    }
  }

  detail.innerHTML = `
    <div class="player-detail-card">
      <button class="close-x" id="detail-close">✕</button>
      <div class="avatar-wrap">
        <div class="avatar-large">
          ${playerName.toLowerCase() === 'astarum' ? `<img src="file:///C:/Users/Diegoo/Downloads/1f05e6cb522cc355812f8f7c4685ea01.jpg" alt="${playerName}">` : '<div style="width:100%;height:100%;background:#223;">' + '</div>'}
        </div>
      </div>
      <h3>${playerName}</h3>
      <span class="badge">Elite Master</span>
      <p class="region">Region: <strong>${region}</strong></p>

      <div class="position-box">
        <strong>1. <span style="color:#ffd54a">LEADERBOARD</span></strong>
        <span style="float:right;color:#9aa6b2">(180 points)</span>
      </div>

      <div class="stats-box">
        <div class="stat-item">LT1<br><small>(90 Pts)</small></div>
        <div class="stat-item">LT1<br><small>(90 Pts)</small></div>
      </div>

      <a class="social-btn" href="https://discord.com/users/1056681722353303614" target="_blank" rel="noopener noreferrer">Discord Profile</a>
    </div>
  `;

  const closeBtn = document.getElementById('detail-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      detail.innerHTML = '';
      // restore view
      if (window.currentView === 'players') generatePlayers(50);
      else if (window.currentView === 'crews') generateCrews(10);
      else if (window.currentView === 'warlogs') generateWarLogs(5);
    });
  }
}

function generateWarLogs(count) {
  const container = document.getElementById('players');
  if (!container) return;
  window.currentView = 'warlogs';
  container.innerHTML = '';
  const headerEl = document.querySelector('main .content header h1');
  if (headerEl) headerEl.textContent = 'War Logs';

  for (let i = 1; i <= count; i++) {
    const log = document.createElement('div');
    log.className = 'war-log';
    log.innerHTML = `
      <strong>War #${i}</strong>
      <p>Winner: Crew ${i} — Loser: Crew ${i+1}</p>
      <small>Fecha: 2026-07-${(10+i).toString().padStart(2,'0')}</small>
    `;
    container.appendChild(log);
  }
}

function generateCrews(count) {
  const container = document.getElementById('players');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <div class="left">
        <div class="avatar"></div>
        <div>
          <h2>Crew ${i}</h2>
          <p>#${i} Crew</p>
        </div>
      </div>
      <div class="buttons">
        <button class="youtube">Ver</button>
      </div>
    `;
    container.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicial: mostrar jugadores
  // Inicial: mostrar jugadores y título
  const headerEl = document.querySelector('main .content header h1');
  if (headerEl) headerEl.textContent = 'Top Players';
  generatePlayers(50);

  const linkCrews = document.getElementById('link-crews');
  const linkPlayers = document.getElementById('link-players');
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  // Toggle collapsed state — do NOT hide nav items, only collapse sidebar visually
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      sidebar.classList.toggle('collapsed');
    });
  }

  if (linkCrews) {
    linkCrews.addEventListener('click', (e) => {
      e.preventDefault();
      if (headerEl) headerEl.textContent = 'Top Crews';
      generateCrews(10);
    });
  }

  const linkWarlogs = document.getElementById('link-warlogs');
  if (linkWarlogs) {
    linkWarlogs.addEventListener('click', (e) => {
      e.preventDefault();
      generateWarLogs(5);
    });
  }

  if (linkPlayers) {
    linkPlayers.addEventListener('click', (e) => {
      e.preventDefault();
      if (headerEl) headerEl.textContent = 'Top Players';
      generatePlayers(50);
    });
  }

  // Search input handler: Enter to show single player detail
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        const q = searchInput.value.trim();
        if (!q) return;
        showPlayerDetail(q);
      }
    });
  }
});
