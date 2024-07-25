import React, { useState , useEffect } from "react";
import Header from "./Components/Header/Header";
import BodyArea from "./Components/BodyArea/BodyArea";
import Card from "./Components/Card/Card";
import Footer from "./Components/Footer/Footer";
import Pagination from "./Components/Pagination/Pagination";
import Search from "./Components/Search/Search";
import "./styles.css"

function App() {
  
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: "", content: "" });
  const notesPerPage = 10;

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter((noteItem, index) => index !== id);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  }

  function editNote(id) {
    const noteToEdit = notes.find((note, index) => index === id);
    setCurrentNote({ id, ...noteToEdit });
    setIsEditing(true);
  }

  function updateNote(updatedNote) {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map((note, index) =>
        index === updatedNote.id ? updatedNote : note
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setIsEditing(false);
    setCurrentNote({ id: null, title: "", content: "" });
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      <BodyArea 
        onAdd={addNote} 
        onUpdate={updateNote}
        isEditing={isEditing}
        currentNote={currentNote}
      />
      <section className="notesArea">
        {currentNotes.map((noteItem, index) => {
          return (
            <Card
              key={indexOfFirstNote + index}
              id={indexOfFirstNote + index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          );
        })}
      </section>
      <Pagination
        notesPerPage={notesPerPage}
        totalNotes={filteredNotes.length}
        paginate={paginate}
      />
      <Footer />
    </div>
  );
}

export default App;
