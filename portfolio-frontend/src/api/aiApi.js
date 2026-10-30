import api from './axios';

// Generate a professional About Me section
export const generateAboutMe = (data) => api.post('/api/ai/generate-about', data);

// Generate a professional project description
export const generateProjectDescription = (data) => api.post('/api/ai/generate-project-description', data);

// Generate 3 professional headline alternatives
export const generateHeadlines = (data) => api.post('/api/ai/generate-headlines', data);

// Get improvement suggestions for existing portfolio content
export const suggestImprovements = (data) => api.post('/api/ai/suggest-improvements', data);

