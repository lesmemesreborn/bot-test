import axios from 'axios';

interface UserData {
    id: string;
    name: string;
    avatarUrl: string;
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
});

const api = {
    getUsers: async (searchTerm: string): Promise<UserData[]> => {
        try {
            const response = await axiosInstance.get(`/users?searchTerm=${searchTerm}`);
            return response.data;
        } catch (error) {
            console.error('Error in getUsers:', error);
            throw error;
        }
    },
};

export default api;