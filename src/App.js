import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "shirt", quantity: 12, packed: false },
  { id: 4, description: "shoes", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItems} />
      <Stats items={items} />
    </div>
  );
}

// Array.from({ length: 20 }).forEach((_, i, arr) => {
//   arr.push(i + 1);
//   console.log(Array.isArray(arr));
// });

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
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

function Option(props) {
  return <option value={props.num}>{props.num}</option>;
}

function PackingList({ items, onDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={onDeleteItems} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  return (
    <footer className="stats">
      <em>
        🧳You have {items.length} items on your list, and you already packed x
        (X%)
      </em>
    </footer>
  );
}
