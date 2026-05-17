import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const handleAddToy = (toyData) => {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyData),
    })
      .then((response) => response.json())
      .then((newToy) => setToys((current) => [...current, newToy]));
  };

  const handleDeleteToy = (toyId) => {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE",
    }).then(() => {
      setToys((current) => current.filter((toy) => toy.id !== toyId));
    });
  };

  const handleLikeToy = (toyId, likes) => {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((current) =>
          current.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
        );
      });
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;
