import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "shirt", quantity: 12, packed: false },
  { id: 4, description: "shoes", quantity: 12, packed: true },
];

const optionArr = [];
for (let i = 1; i <= 20; i++) {
  optionArr.push(i);
}

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form() {
  return (
    <form className="add-form">
      <h3>What do you need for your trip</h3>
      <select>
        {optionArr.map((option) => (
          <Option number={option} key={option} />
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function Option(props) {
  return <option value={props.number}>{props.number}</option>;
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳You have X items on your list, and you already packed x (X%)</em>
    </footer>
  );
}
