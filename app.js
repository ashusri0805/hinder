// Sample profiles with faceless cartoon characters in modest/Muslim attire
const profiles = [
  {
    name: "Amina",
    age: 24,
    location: "London, UK",
    bio: "Looking for someone who doesn't skip Fajr. Guardian (Wali) handles the first chat.",
    tags: ["Hijab Enthusiast", "Tea Lover", "Wali Supervised"],
    badge: "Niqab / Faceless Mode",
    // Faceless Hijab/Niqab Cartoon Vector
    svg: `
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="120" r="90" fill="#3f454d"/>
        <!-- Abaya/Jilbab shoulders -->
        <path d="M30 240 C30 180, 70 160, 100 160 C130 160, 170 180, 170 240 Z" fill="#202225"/>
        <!-- Hijab wrap -->
        <path d="M55 110 C55 50, 145 50, 145 110 C145 155, 135 175, 100 175 C65 175, 55 155, 55 110 Z" fill="#2c3e50"/>
        <!-- Veil / Covered Face (Blank / Faceless) -->
        <path d="M75 105 C75 95, 125 95, 125 105 C125 135, 120 145, 100 145 C80 145, 75 135, 75 105 Z" fill="#1b2631"/>
        <path d="M72 100 H128" stroke="#34495e" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    name: "Tariq",
    age: 27,
    location: "Birmingham, UK",
    bio: "Sunnah beard, thobe collection on point. Zero dating, strictly looking for Nikkah.",
    tags: ["Thobe Daily", "Fajr Club", "Architect"],
    badge: "Faceless Mode",
    // Faceless Kufi & Thobe Cartoon Vector
    svg: `
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="120" r="90" fill="#374151"/>
        <!-- Thobe -->
        <path d="M40 240 C40 170, 75 155, 100 155 C125 155, 160 170, 160 240 Z" fill="#f3f4f6"/>
        <path d="M96 155 V240" stroke="#d1d5db" stroke-width="2"/>
        <!-- Head silhouette (Faceless) -->
        <ellipse cx="100" cy="115" rx="35" ry="42" fill="#d4a373"/>
        <!-- Beard silhouette -->
        <path d="M68 115 C68 155, 132 155, 132 115 C132 135, 120 160, 100 160 C80 160, 68 135, 68 115 Z" fill="#1f2937"/>
        <!-- Kufi / Prayer Cap -->
        <path d="M65 105 C65 65, 135 65, 135 105 Z" fill="#ffffff"/>
        <line x1="65" y1="105" x2="135" y2="105" stroke="#e5e7eb" stroke-width="3"/>
      </svg>
    `
  },
  {
    name: "Zainab",
    age: 22,
    location: "Manchester, UK",
    bio: "Software developer, cat mom, and Halal food critic. Don't dm without speaking to my dad.",
    tags: ["Cat Lover", "Halal Foodie", "Coding"],
    badge: "Hijab Cartoon Mode",
    // Faceless Hijab Style 2 Vector
    svg: `
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="120" r="90" fill="#2d3748"/>
        <!-- Dress / Abaya -->
        <path d="M35 240 C35 175, 75 160, 100 160 C125 160, 165 175, 165 240 Z" fill="#4a5568"/>
        <!-- Hijab drape -->
        <path d="M50 115 C50 50, 150 50, 150 115 C150 165, 135 185, 100 185 C65 185, 50 165, 50 115 Z" fill="#68d391"/>
        <!-- Faceless oval skin tone -->
        <ellipse cx="100" cy="115" rx="30" ry="38" fill="#e2b997"/>
      </svg>
    `
  }
];

let currentIndex = 0;
const deck = document.getElementById("cardDeck");

function renderCards() {
  deck.innerHTML = "";
  
  if (currentIndex >= profiles.length) {
    deck.innerHTML = `
      <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#8e8e93; text-align:center; padding:20px;">
        <i class="fa-solid fa-mosque" style="font-size:3rem; margin-bottom:16px; color:#05a769;"></i>
        <h3>No more profiles</h3>
        <p style="font-size:0.9rem; margin-top:8px;">Check back later or pray Istikhara.</p>
        <button onclick="currentIndex=0; renderCards();" style="margin-top:20px; padding:10px 18px; border-radius:20px; border:none; background:#05a769; color:#fff; cursor:pointer;">Reset Deck</button>
      </div>`;
    return;
  }

  // Render top and underlying cards for stack effect
  for (let i = Math.min(currentIndex + 1, profiles.length - 1); i >= currentIndex; i--) {
    const p = profiles[i];
    const card = document.createElement("div");
    card.className = "card";
    
    // Slight scale for background card
    if (i > currentIndex) {
      card.style.transform = "scale(0.95) translateY(12px)";
      card.style.zIndex = "1";
    } else {
      card.style.zIndex = "2";
      card.id = "activeCard";
    }

    card.innerHTML = `
      <div class="card-illustration">
        <span class="privacy-badge"><i class="fa-solid fa-eye-slash"></i> ${p.badge}</span>
        ${p.svg}
      </div>
      <div class="card-info">
        <div class="card-title">${p.name}, ${p.age}</div>
        <div class="card-meta">
          <span><i class="fa-solid fa-location-dot"></i> ${p.location}</span>
        </div>
        <div class="card-bio">${p.bio}</div>
        <div class="tags">
          ${p.tags.map(t => `<span class="tag"># ${t}</span>`).join("")}
        </div>
      </div>
    `;
    deck.appendChild(card);
  }
}

function handleAction(type) {
  const activeCard = document.getElementById("activeCard");
  if (!activeCard) return;

  if (type === "like") {
    activeCard.classList.add("swipe-right");
  } else if (type === "pass") {
    activeCard.classList.add("swipe-left");
  } else if (type === "rewind" && currentIndex > 0) {
    currentIndex--;
    renderCards();
    return;
  } else {
    activeCard.classList.add("swipe-right");
  }

  setTimeout(() => {
    currentIndex++;
    renderCards();
  }, 350);
}

// Initial render
renderCards();
