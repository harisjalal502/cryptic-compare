import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Update with your deployed backend URL

export const fetchExchangeData = async (exchange: string, cryptoA: string, cryptoB: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crypto`, {
      params: { exchange, crypto_a: cryptoA, crypto_b: cryptoB },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching exchange data:', error.message);
    throw error;
  }
};
