import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import { Stats } from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function addItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function deleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    const clearList = window.confirm("Do you want to clear the list?");
    if (clearList) setItems([]);
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
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
