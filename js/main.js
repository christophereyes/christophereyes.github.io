document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  fetchGitHubRepos();
});

/* ===== Navbar ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeEls.forEach(el => observer.observe(el));
}

/* ===== GitHub Projects ===== */
const GITHUB_USER = 'christophereyes';
const REPOS_TO_SHOW = 6;
const EXCLUDED_REPOS = [`${GITHUB_USER}.github.io`];

// GitHub language colors (subset)
const LANG_COLORS = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'C#': '#178600',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Rust': '#dea584',
  'Shell': '#89e051',
  'Dockerfile': '#384d54',
  'Jupyter Notebook': '#DA5B0B'
};

async function fetchGitHubRepos() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`
    );

    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

    const repos = await res.json();

    const filtered = repos
      .filter(r => !r.fork && !EXCLUDED_REPOS.includes(r.name))
      .slice(0, REPOS_TO_SHOW);

    if (filtered.length === 0) {
      container.innerHTML = '<p class="projects-error">No projects to display yet.</p>';
      return;
    }

    container.innerHTML = filtered.map(repo => repoCard(repo)).join('');
  } catch (err) {
    console.error('Failed to fetch GitHub repos:', err);
    container.innerHTML =
      '<p class="projects-error">Unable to load projects right now. ' +
      `<a href="https://github.com/${GITHUB_USER}?tab=repositories">View them on GitHub &rarr;</a></p>`;
  }
}

function repoCard(repo) {
  const langColor = LANG_COLORS[repo.language] || '#888';
  const langHtml = repo.language
    ? `<span class="project-lang"><span class="lang-dot" style="background:${langColor}"></span>${repo.language}</span>`
    : '';
  const starsHtml = repo.stargazers_count > 0
    ? `<span class="project-stars"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>${repo.stargazers_count}</span>`
    : '';
  const description = repo.description
    ? escapeHtml(repo.description)
    : '<em>No description</em>';

  return `<div class="project-card">
  <h3>
    <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8zM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2z"/></svg>
    <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.name)}</a>
  </h3>
  <p class="project-description">${description}</p>
  <div class="project-meta">${langHtml}${starsHtml}</div>
</div>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
