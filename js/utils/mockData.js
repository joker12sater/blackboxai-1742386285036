import { handleMockRequest } from './mockEndpoints.js';

// Helper function to simulate API delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Mock API response function
export async function getMockData(endpoint, params = {}) {
    // Simulate network delay
    await delay(300);

    try {
        // Get mock data from endpoints
        const data = handleMockRequest(endpoint, params);
        return data;
    } catch (error) {
        console.error('Error getting mock data:', error);
        throw error;
    }
}