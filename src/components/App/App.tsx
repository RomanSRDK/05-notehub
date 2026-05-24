import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";

function App() {
  const [currentPage, setcurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
  });

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
        <button className={css.button}>Create note +</button>
      </header>
      {data && data.notes.length && <NoteList allNotes={data.notes} />}
    </div>
  );
}

export default App;
