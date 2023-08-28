import { useState } from "react";
import Item from "./Item";

// Array.from({ length: 20 }).forEach((_, i, arr) => {
//   arr.push(i + 1);
//   console.log(Array.isArray(arr));
// });
export default function PackingList({
  items,
  onDeleteItems,
  onToggleItem,
  onClearList,
}) {
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
        <button onClick={onClearList}>clear all</button>
      </div>
    </div>
  );
}
