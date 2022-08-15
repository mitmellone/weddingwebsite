import axios from "axios";

const weddingWebsiteBackend = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

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

export interface Table {
  _id: string;
  tableNumber: number;
  artist: string;
}

interface ListResponse<T> {
  items: Array<T>;
  total: number;
}

export type GuestCreatePayload = Omit<Guest, "_id">;
export type TableCreatePayload = Omit<Table, "_id">;

interface GetGuestsOptions {
  nameQuery?: string;
  limit?: number;
}

export async function getGuests({ nameQuery, limit = 100 }: GetGuestsOptions): Promise<Guest[]> {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());

  if (nameQuery) {
    params.append("match", `name=(?i)${nameQuery}`);
  }

  const response = await weddingWebsiteBackend.get<ListResponse<Guest>>("/guests", { params });
  if (response.status < 300) {
    return response.data.items;
  }
  return Promise.reject(
    new Error(`Could not fetch guests: ${response.statusText} ${JSON.stringify(response.data)}`),
  );
}

export async function createGuest(newGuest: GuestCreatePayload): Promise<Guest> {
  const response = await weddingWebsiteBackend.post<Guest>("/guests", newGuest);
  if (response.status < 300) {
    return response.data;
  }

  return Promise.reject(
    new Error(`Could not create guest: ${response.statusText} ${JSON.stringify(response.data)}`),
  );
}

export async function deleteGuest(guestId: string): Promise<void> {
  const response = await weddingWebsiteBackend.delete(`/guests/${guestId}`);
  if (response.status < 300) {
    return Promise.resolve();
  }

  return Promise.reject(
    new Error(`Could not delete guest: ${response.statusText} ${JSON.stringify(response.data)}`),
  );
}

export async function getTables(): Promise<Table[]> {
  const response = await weddingWebsiteBackend.get<ListResponse<Table>>("/tables");
  if (response.status < 300) {
    return response.data.items;
  }
  return Promise.reject(
    new Error(`Could not fetch guests: ${response.statusText} ${JSON.stringify(response.data)}`),
  );
}

export async function createTable(newTable: TableCreatePayload): Promise<Table> {
  const response = await weddingWebsiteBackend.post<Table>("/tables", newTable);
  if (response.status < 300) {
    return response.data;
  }

  return Promise.reject(
    new Error(`Could not create guest: ${response.statusText} ${JSON.stringify(response.data)}`),
  );
}

export async function deleteTable(tableId: string): Promise<void> {
  const response = await weddingWebsiteBackend.delete(`/tables/${tableId}`);
  if (response.status < 300) {
    return Promise.resolve();
  }

  return Promise.reject(
    new Error(`Could not delete guest: ${response.statusText} ${JSON.stringify(response.data)}`),
  );
}
