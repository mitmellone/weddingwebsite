import axios from "axios";

const weddingWebsiteBackend = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001'
})

export interface ApiError {
  status: number;
  message: string;
}

export interface Guest {
  _id: string;
  name: string;
  table: number;
  artist?: string;
}

export type GuestCreatePayload = Omit<Guest, "_id">;

export async function getGuests(): Promise<Guest[]> {
  const response = await weddingWebsiteBackend.get<Guest[]>("/guests");
  if (response.status === 200) {
    return response.data;
  }
  return Promise.reject(new Error(`Could not fetch guests: ${response.statusText} ${JSON.stringify(response.data)}`));
}

export async function createGuest(newGuest: GuestCreatePayload): Promise<Guest> {
  const response = await weddingWebsiteBackend.post<Guest>("/guests", newGuest);
  if (response.status === 201) {
    return response.data;
  }

  return Promise.reject(new Error(`Could not create guest: ${response.statusText} ${JSON.stringify(response.data)}`))
}

export async function deleteGuest(guestId: string): Promise<void> {
  const response = await weddingWebsiteBackend.delete(`/guests/${guestId}`);
  if (response.status === 204) {
    return response.data;
  }

  return Promise.reject(new Error(`Could not delete guest: ${response.statusText} ${JSON.stringify(response.data)}`))
}
