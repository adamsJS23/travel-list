import { useState } from "react";
import Option from "./Option.js";
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function hanbleSubmit(evt) {
    evt.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    console.log(newItem);

    setDescription("");
    setQuantity(1);

    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={hanbleSubmit}>
      <h3>What do you need for your trip</h3>
      <select
        value={quantity}
        onChange={(evt) => setQuantity(+evt.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <Option num={num} key={num} />
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
