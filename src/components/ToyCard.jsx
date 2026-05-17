import React from "react";

function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  const handleLike = () => {
    const newLikes = toy.likes + 1;
    onLikeToy(toy.id, newLikes);
  };

  const handleDelete = () => {
    onDeleteToy(toy.id);
  };

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
