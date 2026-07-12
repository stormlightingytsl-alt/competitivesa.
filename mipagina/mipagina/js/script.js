// Maneja generación dinámica de jugadores y crews
function getPlayersList() {
  const players = [];
  for (let i = 1; i <= 50; i++) {
    const name = (i === 1) ? 'Astarum' : (i === 2) ? 'Moonlight' : `Jugador ${i}`;
    players.push(name);
  }
  return players;
}

function generatePlayers(count) {
  const container = document.getElementById('players');
  if (!container) return;
  container.innerHTML = '';
  // store current view
  window.currentView = 'players';
  for (let i = 1; i <= count; i++) {
    const card = document.createElement('div');
    card.className = 'player-card';
    const name = (i === 1) ? 'Astarum' : (i === 2) ? 'Moonlight' : `Jugador ${i}`;
    // Discord data for Astarum
    const astarumDiscordId = '1056681722353303614';
    const moonlightDiscordId = '693640792350392340';
    const astarumYouTube = 'https://www.youtube.com/@astarumking';
    const astarumAvatar = 'https://cdn.discordapp.com/embed/avatars/0.png'; // Discord placeholder avatar
    const discordElement = (i === 1)
      ? `<a class="discord" href="https://discord.com/users/${astarumDiscordId}" target="_blank" rel="noopener noreferrer">Discord</a>`
      : (i === 2)
      ? `<a class="discord" href="https://discord.com/users/${moonlightDiscordId}" target="_blank" rel="noopener noreferrer">Discord</a>`
      : `<button class="discord">Discord</button>`;
    
    const youtubeElement = (i === 1)
      ? `<a class="youtube" href="${astarumYouTube}" target="_blank" rel="noopener noreferrer">YouTube</a>`
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
  
  // Validar si el jugador existe en la lista
  const validPlayers = getPlayersList();
  if (!validPlayers.includes(playerName)) {
    detail.innerHTML = `
      <div class="player-detail-card" style="text-align: center; padding: 40px;">
        <h3 style="color: #ff6b6b;">❌ Jugador no encontrado</h3>
        <p>El jugador "<strong>${playerName}</strong>" no existe en la tabla.</p>
        <button id="detail-close" style="margin-top: 20px; background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Volver</button>
      </div>
    `;
    const closeBtn = document.getElementById('detail-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        detail.innerHTML = '';
        if (window.currentView === 'players') generatePlayers(50);
      });
    }
    return;
  }
  
  // find player's region by regenerating a single lookup
  let region = 'Unknown';
  if (playerName.toLowerCase() === 'astarum') region = 'EU';
  else if (playerName.toLowerCase() === 'moonlight') {
    const regionList = ['NA','EU','ASIA','SA','OC'];
    region = regionList[1 % regionList.length]; // index 1 for Moonlight
  }
  else {
    const m = playerName.match(/Jugador\s*(\d+)/i);
    if (m) {
      const idx = parseInt(m[1], 10);
      const regionList = ['NA','EU','ASIA','SA','OC'];
      region = regionList[idx % regionList.length];
    }
  }

  detail.innerHTML = `
    <div class="player-detail-card">
      <button class="close-x" id="detail-close">✕</button>
      <div class="avatar-wrap">
        <div class="avatar-large">
          ${playerName.toLowerCase() === 'astarum' ? `<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="${playerName}">` : '<div style="width:100%;height:100%;background:#223;">' + '</div>'}
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

      ${playerName.toLowerCase() === 'astarum' ? `<a class="social-btn" href="https://discord.com/users/1056681722353303614" target="_blank" rel="noopener noreferrer">Discord Profile</a>` : (playerName.toLowerCase() === 'moonlight' ? `<a class="social-btn" href="https://discord.com/users/693640792350392340" target="_blank" rel="noopener noreferrer">Discord Profile</a>` : `<button class="social-btn" disabled>Discord Profile</button>`)}
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

function generate2v2(count) {
  const container = document.getElementById('players');
  if (!container) return;
  window.currentView = '2v2';
  container.innerHTML = '';
  const headerEl = document.querySelector('main .content header h1');
  if (headerEl) headerEl.textContent = '2v2 Matches';

  for (let i = 1; i <= count; i++) {
    const match = document.createElement('div');
    match.className = 'war-log';
    match.innerHTML = `
      <strong>Match #${i}</strong>
      <p>Team A vs Team B</p>
      <small>Fecha: 2026-07-${(10+i).toString().padStart(2,'0')}</small>
    `;
    container.appendChild(match);
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

  const link2v2 = document.getElementById('link-2v2');
  if (link2v2) {
    link2v2.addEventListener('click', (e) => {
      e.preventDefault();
      generate2v2(5);
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
