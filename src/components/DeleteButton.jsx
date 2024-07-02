import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const DeleteButton = ({ noteId }) => {
    const { setNotes } = useContext(NotesContext);
    const handleDelete = async (e) => {
        db.notes.delete(noteId);

        setNotes((prevState) =>
            prevState.filter((note) => note.$id !== noteId)
        );
    };
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;
