import { state } from '../app.js';
import { fetchAPI } from '../utils/api.js';
import { saveToDB } from '../utils/db.js';

// Initialize Festivals Module
export function initFestivals() {
    setupEventFilters();
    setupEventSearch();
}

// Load Events
export async function loadEvents(loadMore = false) {
    try {
        const events = await fetchAPI('/events');
        displayEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Setup Event Filters
function setupEventFilters() {
    const filterForm = document.createElement('form');
    filterForm.className = 'mb-8 grid grid-cols-1 md:grid-cols-4 gap-4';
    filterForm.innerHTML = `
        <div class="relative">
            <input type="text" 
                   id="event-search" 
                   placeholder="Search events..." 
                   class="w-full px-4 py-2 rounded-lg border border-gray-300 input-focus">
            <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>
        <div class="relative">
            <select id="type-filter" 
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 input-focus appearance-none">
                <option value="">All Types</option>
                <option value="urban">Urban</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
            </select>
            <i class="fas fa-chevron-down absolute right-3 top-3 text-gray-400"></i>
        </div>
        <div class="relative">
            <input type="date" 
                   id="date-filter" 
                   class="w-full px-4 py-2 rounded-lg border border-gray-300 input-focus">
        </div>
        <div class="relative">
            <select id="sort-filter" 
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 input-focus appearance-none">
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
            </select>
            <i class="fas fa-chevron-down absolute right-3 top-3 text-gray-400"></i>
        </div>
    `;

    const eventsSection = document.getElementById('festivals');
    const title = eventsSection.querySelector('h2');
    eventsSection.insertBefore(filterForm, title.nextSibling);

    // Add event listeners
    setupFilterListeners();
}

// Setup Event Search
function setupEventSearch() {
    const searchInput = document.getElementById('event-search');
    let debounceTimer;

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterEvents();
        }, 300);
    });
}

// Setup Filter Listeners
function setupFilterListeners() {
    const typeFilter = document.getElementById('type-filter');
    const dateFilter = document.getElementById('date-filter');
    const sortFilter = document.getElementById('sort-filter');

    typeFilter.addEventListener('change', filterEvents);
    dateFilter.addEventListener('change', filterEvents);
    sortFilter.addEventListener('change', filterEvents);
}

// Filter Events
async function filterEvents() {
    const searchQuery = document.getElementById('event-search').value;
    const type = document.getElementById('type-filter').value;
    const date = document.getElementById('date-filter').value;
    const sortBy = document.getElementById('sort-filter').value;

    try {
        let events = await fetchAPI('/events');

        // Apply filters
        if (searchQuery) {
            events = events.filter(event => 
                event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (type) {
            events = events.filter(event => event.type === type);
        }

        if (date) {
            events = events.filter(event => event.date >= date);
        }

        // Apply sorting
        events.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(a.date) - new Date(b.date);
                case 'price':
                    return a.ticketPrice - b.ticketPrice;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        displayEvents(events);
    } catch (error) {
        console.error('Error filtering events:', error);
    }
}

// Display Events
function displayEvents(events) {
    const container = document.getElementById('events-container');
    container.innerHTML = ''; // Clear existing content

    events.forEach(event => {
        const card = createEventCard(event);
        container.appendChild(card);
    });
}

// Create Event Card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden card-hover';
    
    const eventDate = new Date(event.date + 'T' + event.time);
    
    card.innerHTML = `
        <div class="relative pb-48">
            <img class="absolute h-full w-full object-cover img-hover" 
                 src="${event.image}" 
                 alt="${event.name}"
                 loading="lazy">
            <div class="absolute top-4 right-4">
                <span class="badge ${event.type === 'urban' ? 'badge-primary' : 'badge-secondary'}">
                    ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
            </div>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-semibold text-text truncate">${event.name}</h3>
                <span class="text-blue-600 font-semibold">
                    $${event.ticketPrice}
                </span>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${event.description}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="flex items-center">
                        <i class="fas fa-calendar text-gray-400 mr-2"></i>
                        <span class="text-gray-600">${eventDate.toLocaleDateString()}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-clock text-gray-400 mr-2"></i>
                        <span class="text-gray-600">${eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
                <button onclick="showEventDetails('${event.id}')" 
                        class="btn-primary">
                    Get Tickets
                </button>
            </div>
            <div class="mt-4 flex items-center">
                <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                <span class="text-gray-600">${event.location}</span>
            </div>
        </div>
    `;

    return card;
}

// Export necessary functions
export {
    loadEvents
};