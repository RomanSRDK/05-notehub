import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

function App() {
  const [currentPage, setcurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
  });

  //MODAL WINDOW
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  //MODAL WINDOW

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
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
