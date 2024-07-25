import NotesPage from "./NotesPage";
import NotesProvider from "../context/NotesContext";

export default function Stickies() {
    return (
        <NotesProvider>
            <NotesPage />
        </NotesProvider>
    );
}
