// Router Configuration
const routes = {
    '/': {
        title: 'Home',
        render: () => showSection('home')
    },
    '/business': {
        title: 'Business Directory',
        render: () => showSection('business')
    },
    '/gossip': {
        title: 'Community Feed',
        render: () => showSection('gossip')
    },
    '/festivals': {
        title: 'Events & Festivals',
        render: () => showSection('festivals')
    },
    '/culture': {
        title: 'Culture & Stories',
        render: () => showSection('culture')
    },
    '/news': {
        title: 'News & Updates',
        render: () => showSection('news')
    },
    '/polls': {
        title: 'Polls & Surveys',
        render: () => showSection('polls')
    }
};

// Show active section and hide others
function showSection(sectionId) {
    // First, hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
    }
    
    // Update active navigation state
    updateActiveNav(sectionId);
}

// Update active navigation state
function updateActiveNav(sectionId) {
    // Remove active state from all nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('text-blue-600');
        link.classList.add('text-gray-600');
    });
    
    // Add active state to current nav link
    const activeLink = document.querySelector(`nav a[href="/${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.remove('text-gray-600');
        activeLink.classList.add('text-blue-600');
    }
}

// Handle navigation
function handleNavigation(event) {
    if (event) {
        event.preventDefault();
    }
    
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    
    // Update document title
    document.title = `WhisperNet - ${route.title}`;
    
    // Render the route
    route.render();
}

// Initialize router
export function initRouter() {
    // Handle initial route
    handleNavigation();

    // Handle navigation events
    window.addEventListener('popstate', handleNavigation);
    
    // Handle link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href').startsWith('/')) {
            e.preventDefault();
            const path = link.getAttribute('href');
            window.history.pushState({}, '', path);
            handleNavigation();
        }
    });
}

// Export necessary functions
export { handleNavigation };