// Dati di esempio per il portfolio
const portfolioData = [
    { id: 1, title: "Echi dal profondo", client: "Film: Nessuna Luce", category: "cinema", image: "assets/images/project1.jpg", description: "Sound design atmosferico per un thriller psicologico.", credits: "Musica: Riccardo Clerici", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "Velocità", client: "Nike Commercial", category: "commercial", image: "assets/images/project2.jpg", description: "Brand identity sonora ad alto impatto.", credits: "Mix & Master: Simone Mangialenti", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, title: "Notte al Museo", client: "Pop Single", category: "pop", image: "assets/images/project3.jpg", description: "Produzione e arrangiamento per il singolo di debutto.", credits: "Produzione: Carloalberto Viani", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: 4, title: "Sospeso", client: "Cortometraggio", category: "cinema", image: "assets/images/project4.jpg", description: "Colonna sonora minimalista.", credits: "Composizione: Riccardo Clerici", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
];

// Render portfolio
function renderPortfolio(filter = "all") {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    const filtered = filter === "all" ? portfolioData : portfolioData.filter(p => p.category === filter);
    grid.innerHTML = filtered.map(proj => `
        <div class="portfolio-card" data-id="${proj.id}" data-category="${proj.category}" data-audio="${proj.audioUrl}">
            <div class="card-media">
                <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                <div class="card-overlay">
                    <span class="preview-hint">▶ Ascolta anteprima</span>
                </div>
            </div>
            <div class="card-info">
                <h3>${proj.title}</h3>
                <p>${proj.client}</p>
            </div>
        </div>
    `).join('');
    attachCardEvents();
}

function attachCardEvents() {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        // Hover preview audio (breve)
        let hoverTimeout;
        let audioPreview = null;
        card.addEventListener('mouseenter', () => {
            const audioUrl = card.dataset.audio;
            if (audioUrl) {
                hoverTimeout = setTimeout(() => {
                    audioPreview = new Audio(audioUrl);
                    audioPreview.volume = 0.3;
                    audioPreview.play().catch(e => console.log("Preview autoplay bloccato"));
                }, 500);
            }
        });
        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            if (audioPreview) {
                audioPreview.pause();
                audioPreview = null;
            }
        });
        // Click per modal dettaglio
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const project = portfolioData.find(p => p.id === id);
            if (project) openModal(project);
        });
    });
}

// MODALE
const modal = document.getElementById('projectModal');
function openModal(project) {
    if (!modal) return;
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-description').innerText = project.description;
    document.getElementById('modal-credits').innerHTML = `<strong>Crediti:</strong> ${project.credits}`;
    const playerContainer = document.getElementById('modal-player-container');
    playerContainer.innerHTML = `
        <audio controls autoplay style="width:100%">
            <source src="${project.audioUrl}" type="audio/mpeg">
            Il tuo browser non supporta l'audio.
        </audio>
    `;
    modal.style.display = 'flex';
}

document.querySelector('.modal-close')?.addEventListener('click', () => {
    modal.style.display = 'none';
    const playerContainer = document.getElementById('modal-player-container');
    if (playerContainer) playerContainer.innerHTML = '';
});
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// FILTRI
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        renderPortfolio(filter);
    });
});

// Inizializza
if (document.getElementById('portfolio-grid')) {
    renderPortfolio('all');
}
