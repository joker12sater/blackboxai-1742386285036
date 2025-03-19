// Mock data
const mockData = {
    businesses: [
        {
            id: 1,
            name: "The Coffee House",
            category: "Restaurant",
            location: "123 Main Street",
            description: "Cozy coffee shop serving artisanal coffee and pastries",
            rating: 4.5,
            reviewCount: 128,
            image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
            phone: "(555) 123-4567",
            email: "info@coffeehouse.com"
        },
        {
            id: 2,
            name: "Tech Hub",
            category: "Retail",
            location: "456 Innovation Ave",
            description: "Your one-stop shop for all things tech",
            rating: 4.2,
            reviewCount: 89,
            image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg",
            phone: "(555) 234-5678",
            email: "support@techhub.com"
        },
        {
            id: 3,
            name: "Fitness First",
            category: "Service",
            location: "789 Health Blvd",
            description: "Modern gym with state-of-the-art equipment",
            rating: 4.8,
            reviewCount: 256,
            image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
            phone: "(555) 345-6789",
            email: "info@fitnessfirst.com"
        }
    ],
    posts: [
        {
            id: 1,
            content: "Just discovered an amazing new café in town! The pastries are to die for! 🍰",
            author: {
                id: 1,
                name: "Sarah Wilson",
                avatar: "https://i.pravatar.cc/150?img=1"
            },
            timestamp: "2024-03-19T08:30:00Z",
            likes: 42,
            dislikes: 2,
            comments: [
                {
                    id: 1,
                    content: "Where is it located?",
                    author: {
                        id: 2,
                        name: "Mike Johnson",
                        avatar: "https://i.pravatar.cc/150?img=2"
                    },
                    timestamp: "2024-03-19T09:00:00Z",
                    likes: 5
                }
            ]
        },
        {
            id: 2,
            content: "Big tech conference coming to town next month! Who's going? 💻",
            author: {
                id: 3,
                name: "Tech Enthusiast",
                avatar: "https://i.pravatar.cc/150?img=3"
            },
            timestamp: "2024-03-19T07:15:00Z",
            likes: 28,
            dislikes: 0,
            comments: []
        }
    ],
    events: [
        {
            id: 1,
            name: "Summer Music Festival",
            type: "urban",
            date: "2024-07-15",
            time: "16:00",
            location: "Central Park",
            description: "Annual music festival featuring local and international artists",
            image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
            ticketPrice: 45,
            isFeatured: true
        },
        {
            id: 2,
            name: "Cultural Heritage Day",
            type: "cultural",
            date: "2024-04-20",
            time: "10:00",
            location: "Heritage Museum",
            description: "Celebrate local traditions and cultural performances",
            image: "https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg",
            ticketPrice: 25,
            isFeatured: false
        },
        {
            id: 3,
            name: "Food & Wine Festival",
            type: "urban",
            date: "2024-05-10",
            time: "12:00",
            location: "Downtown Square",
            description: "Taste the best local cuisine and wines",
            image: "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg",
            ticketPrice: 35,
            isFeatured: true
        }
    ],
    trendingTopics: [
        {
            id: 1,
            name: "LocalFoodScene",
            postCount: 156
        },
        {
            id: 2,
            name: "CommunityEvents",
            postCount: 89
        },
        {
            id: 3,
            name: "SmallBusiness",
            postCount: 234
        }
    ]
};

// Handle mock requests
export function handleMockRequest(endpoint, params = {}) {
    // Remove leading slash and query parameters
    endpoint = endpoint.replace(/^\//, '').split('?')[0];

    // Handle different endpoints
    switch (endpoint) {
        case 'businesses':
            return {
                items: mockData.businesses,
                total: mockData.businesses.length
            };

        case 'posts':
            return {
                items: mockData.posts,
                total: mockData.posts.length
            };

        case 'events':
            return {
                items: mockData.events,
                total: mockData.events.length
            };

        case 'trending-topics':
            return {
                items: mockData.trendingTopics,
                total: mockData.trendingTopics.length
            };

        default:
            // Handle individual item requests
            if (endpoint.startsWith('businesses/')) {
                const id = parseInt(endpoint.split('/')[1]);
                const business = mockData.businesses.find(b => b.id === id);
                if (!business) throw new Error('Business not found');
                return business;
            }
            if (endpoint.startsWith('posts/')) {
                const id = parseInt(endpoint.split('/')[1]);
                const post = mockData.posts.find(p => p.id === id);
                if (!post) throw new Error('Post not found');
                return post;
            }
            if (endpoint.startsWith('events/')) {
                const id = parseInt(endpoint.split('/')[1]);
                const event = mockData.events.find(e => e.id === id);
                if (!event) throw new Error('Event not found');
                return event;
            }
            throw new Error(`Endpoint ${endpoint} not implemented`);
    }
}