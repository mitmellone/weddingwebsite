import axios from "axios";

const weddingWebsiteBackend = axios.create({
  baseURL: 'http://localhost:3001'
})

export interface ApiError {
  status: number;
  message: string;
}

export interface Guest {
  name: string;
  tableNumber: number;
}

export async function getGuests(): Promise<Guest[]> {
  const response = await weddingWebsiteBackend.get<Guest[]>("/guests");
  if (response.status === 200) {
    return response.data;
  }
  return Promise.reject(new Error(`Could not fetch guests: ${response.statusText} ${JSON.stringify(response.data)}`));
}