import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 2, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function addItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function deleteItem(id) {
    // console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItemPacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItems} />
      <PackingList
        items={items}
        deleteItem={deleteItem}
        onTogglePacked={handleToggleItemPacked}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ Far Away </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function clearForm() {
    setDescription("");
    setQuantity(1);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);
    onAddItems(newItem);
    clearForm();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(evt) => setQuantity(Number(evt.target.value))}
      >
        {Array.from({ length: 20 }).map((_, idx) => (
          <option key={idx + 1} value={idx + 1}>
            {idx + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function Item({ item, onDeleteItem, onTogglePacked }) {
  return (
    <li>
      <input
        onChange={() => onTogglePacked(item.id)}
        type="checkbox"
        value={item.packed}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(evt) => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, deleteItem, onTogglePacked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, idx) => (
          <Item
            key={idx}
            item={item}
            onDeleteItem={deleteItem}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em> 💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
