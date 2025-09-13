import React, { useState } from "react";

const StoreCard = ({ store }) => {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", margin: "10px", width: "250px" }}>
      <h2>{store.name}</h2>
      <p>Category: {store.category}</p>
      <p>Current Rating: {store.rating} / 5</p>
      <div>
        {[1,2,3,4,5].map(star => (
          <span 
            key={star} 
            style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray", fontSize: "20px" }}
            onClick={() => setRating(star)}
          >★</span>
        ))}
      </div>
      <button 
        onClick={() => alert(`You rated ${store.name} ${rating} stars!`)} 
        disabled={rating === 0}
        style={{ marginTop: "10px", padding: "5px 10px", background: "#1E40AF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Submit
      </button>
    </div>
  );
};

export default StoreCard;
