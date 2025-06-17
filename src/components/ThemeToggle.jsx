export default function ThemeToggle({ onToggle }) {
  return (
    <button onClick={onToggle} className="p-2 bg-gray-200 rounded">
      Toggle Theme
    </button>
  );
}