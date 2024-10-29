import Loader from "./Loader";
export default function Button({ label, onClick, loading}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${loading ? 'cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? <Loader /> : label}
    </button>
  );
}
