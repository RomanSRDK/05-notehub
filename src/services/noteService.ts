import axios from "axios";
import type { Note } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

interface GetNotes {
  notes: Note[];
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number = 20,
): Promise<GetNotes> => {
  const { data } = await axios.get<GetNotes>(
    `/notes?page=${page}&perPage=${perPage}`,
  );
  return data;
};

// createNote
// deleteNote
