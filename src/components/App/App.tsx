import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";

import { fetchNotes } from "../../services/noteService";

import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";

import css from "./App.module.css";
import Loader from "../Loader/Loader";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce(searchText, 800);

  const { isPending, data } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [data]);

  //MODAL WINDOW
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //MODAL WINDOW

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setcurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox inputValue={searchText} onChange={handleSearchChange} />

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

      {isPending && <Loader />}
      {data && data.notes.length > 0 && <NoteList allNotes={data.notes} />}
      <Toaster />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
