export default function Item({ item, onDeleteItem, onTogglePacked }) {
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
