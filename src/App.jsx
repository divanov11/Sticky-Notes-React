import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NotesContext";

function App() {
    return (
        <div id="app">
            <NotesProvider>
                <NotesPage />
            </NotesProvider>
        </div>
    );
}

export default App;
