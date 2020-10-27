export default function Avatar({ name }) {
  return (
    <div className="flex items-center">
      <div className="text-md text-gray-600 italic text-center">
        {"By " + name}
      </div>
    </div>
  );
}
