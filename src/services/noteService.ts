import axios from "axios";
import type { Note } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

interface GetNotes {
  notes: Note[];
  totalPages: number;

  // currentPage: number;
  // perPage: number;
}

export const fetchNotes = async (
  page: number,
  search: string = "",
  perPage: number = 12,
): Promise<GetNotes> => {
  // const { data } = await axios.get<GetNotes>(
  //   `/notes?page=${page}&perPage=${perPage}`,
  // );
  const { data } = await axios.get<GetNotes>("/notes", {
    params: { page: page, perPage: perPage, search: search.trimStart() },
  });
  console.log(data);
  return data;
};

export const createNote = async (newNote: Note) => {
  const res = await axios.post<Note>("/notes", newNote);
  return res;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`);
  return data;
};
