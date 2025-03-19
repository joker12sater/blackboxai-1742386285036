// Mock API endpoints and responses
const API_DELAY = 500; // Simulate network delay

// Setup API endpoints
export function setupAPI() {
    // This function will be called to initialize any API-related setup
    console.log('API endpoints initialized');
}

// Fetch API wrapper
export async function fetchAPI(endpoint, options = {}) {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, API_DELAY));

        // Mock responses based on endpoints
        if (endpoint.startsWith('/businesses')) {
            return mockBusinesses;
        } else if (endpoint.startsWith('/posts')) {
            return mockPosts;
        } else if (endpoint.startsWith('/events')) {
            return mockEvents;
        } else if (endpoint === '/trending-topics') {
            return mockTrendingTopics;
        }

        throw new Error(`Endpoint not found: ${endpoint}`);
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Mock data
const mockBusinesses = [
    {
        id: '1',
        name: 'Urban Cafe',
        category: 'restaurant',
        description: 'A cozy cafe serving artisanal coffee and pastries',
        location: 'Downtown',
        rating: 4.5,
        reviewCount: 128,
        image: 'https://picsum.photos/800/600?random=1'
    },
    {
        id: '2',
        name: 'Tech Hub',
        category: 'service',
        description: 'Professional IT services and consulting',
        location: 'Business District',
        rating: 4.8,
        reviewCount: 89,
        image: 'https://picsum.photos/800/600?random=2'
    }
];

const mockPosts = [
    {
        id: '1',
        content: 'Just discovered an amazing new restaurant downtown!',
        author: {
            name: 'Jane Smith',
            avatar: 'https://picsum.photos/100/100?random=3'
        },
        timestamp: new Date().toISOString(),
        likes: 42,
        dislikes: 2,
        comments: [
            {
                id: '1',
                content: 'Thanks for sharing!',
                author: {
                    name: 'John Doe',
                    avatar: 'https://picsum.photos/100/100?random=4'
                },
                timestamp: new Date().toISOString(),
                likes: 5
            }
        ]
    }
];

const mockEvents = [
    {
        id: '1',
        name: 'Summer Music Festival',
        type: 'urban',
        description: 'Annual music festival featuring local artists',
        date: '2024-07-15',
        time: '18:00',
        location: 'City Park',
        ticketPrice: 25,
        image: 'https://picsum.photos/800/600?random=5'
    },
    {
        id: '2',
        name: 'Food & Wine Expo',
        type: 'cultural',
        description: 'Explore local cuisine and wine tasting',
        date: '2024-08-20',
        time: '12:00',
        location: 'Convention Center',
        ticketPrice: 40,
        image: 'https://picsum.photos/800/600?random=6'
    }
];

const mockTrendingTopics = [
    {
        id: '1',
        name: 'LocalFoodScene',
        postCount: 156
    },
    {
        id: '2',
        name: 'CommunityEvents',
        postCount: 89
    },
    {
        id: '3',
        name: 'SmallBusiness',
        postCount: 234
    }
];