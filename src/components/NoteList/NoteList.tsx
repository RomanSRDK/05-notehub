import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  allNotes: Note[];
}

function NoteList({ allNotes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {allNotes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
