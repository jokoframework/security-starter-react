import axios from 'axios';

const baseURL = process.env.MOCK_SERVER_HOST + ':' + process.env.MOCK_SERVER_PORT;

// Obtener tokens
export async function getTokens() {
  try {
    const response = await axios.get<Token[]>(`${baseURL}/tokens`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los tokens:', error);
    throw error;
  }
}

// Definir el tipo de datos de los tokens
type Token = {
  id: number;
  token: string;
  expiry: string;
};

// Otras funciones relacionadas con las solicitudes REST...