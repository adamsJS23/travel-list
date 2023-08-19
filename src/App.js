import "./index.css";

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
    <div className="add-form">
      <h3>What do you need for your trip</h3>
    </div>
  );
}

function PackingList() {
  <div className="list">LIST</div>;
}

function Item() {}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳You have X items on your list, and you already packed x (X%)</em>
    </footer>
  );
}
