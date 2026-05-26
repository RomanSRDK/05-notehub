import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "../../services/noteService";

import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";

import css from "./App.module.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [debouncedSearch] = useDebounce(searchText, 300);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, debouncedSearch),
  });

  //MODAL WINDOW
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //MODAL WINDOW

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox inputValue={searchText} onChange={setSearchText} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={currentPage}
            onPageChange={setcurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length && <NoteList allNotes={data.notes} />}
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

export default App;
