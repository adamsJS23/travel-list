export default function Stats({ items }) {
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
