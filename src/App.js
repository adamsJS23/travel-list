import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
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

function PackingList({ items, onDeleteItems, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");
  let itemsSorted;
  if (sortBy === "input") {
    itemsSorted = items;
  }

  if (sortBy === "description") {
    itemsSorted = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    itemsSorted = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {itemsSorted.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(evt) => setSortBy(evt.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🧨</em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentage =
    numItems !== 0 ? Math.trunc((packedItems / numItems) * 100) : 0;
  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You have got everything, Ready to go🏄‍♂️</em>
      ) : (
        <em>
          🧳You have {numItems} items on your list, and you already packed {""}
          {packedItems} ({percentage}
          %)
        </em>
      )}
    </footer>
  );
}
