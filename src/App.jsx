import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const App = () => {
  const [inventory, setInventory] = useState([
    { id: 1, Title: "DevOps Engineer", Location: "Bangalore", Vacancy: 8 },
    { id: 2, Title: "Front-End Developer", Location: "Hyderabad", Vacancy: 4 },
    { id: 3, Title: "Back-End Developer", Location: "Bangalore", Vacancy: 12 },
    { id: 4, Title: "Python Developer", Location: "Coimbatore", Vacancy: 17 },
    { id: 5, Title: "Java Developer", Location: "Pune", Vacancy: 15 },
    { id: 6, Title: "Graphics Designer", Location: "Bangalore", Vacancy: 8 },
  ]);

  const [newItem, setNewItem] = useState({
    Title: "",
    Location: "",
    Vacancy: "",
  });
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const addItem = () => {
    if (newItem.Title && newItem.Location && newItem.Vacancy) {
      setInventory([
        ...inventory,
        { id: Date.now(), ...newItem, Vacancy: parseInt(newItem.Vacancy) },
      ]);
      setNewItem({ Title: "", Location: "", Vacancy: "" });
    }
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const filteredInventory = filter
    ? inventory.filter(
        (item) => item.Location.toLowerCase() === filter.toLowerCase()
      )
    : inventory;

  const sortedInventory = [...filteredInventory].sort((a, b) =>
    sortAsc ? a.Vacancy - b.Vacancy : b.Vacancy - a.Vacancy
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
        Inventory Management
      </h1>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Item</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 h-12 w-full rounded sm:w-1/4"
            value={newItem.Title}
            onChange={(e) => setNewItem({ ...newItem, Title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded w-full sm:w-1/4"
            value={newItem.Location}
            onChange={(e) =>
              setNewItem({ ...newItem, Location: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Vacancy"
            className="border p-2 rounded w-full sm:w-1/4"
            value={newItem.Vacancy}
            onChange={(e) =>
              setNewItem({ ...newItem, Vacancy: e.target.value })
            }
          />
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Filter by Location"
          className="border p-2 rounded w-full sm:w-auto flex-grow"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Sort by Vacancy ({sortAsc ? "Asc" : "Desc"})
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-4 text-left">Title</th>
              <th className="border p-4 text-left">Location</th>
              <th className="border p-4 text-left">Vacancy</th>
              <th className="border p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInventory.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 ${
                  item.Vacancy < 10 ? "bg-red-50" : ""
                }`}
              >
                <td className="border p-4">{item.Title}</td>
                <td className="border p-4">{item.Location}</td>
                <td className="border p-4">{item.Vacancy}</td>
                <td className="border p-4 flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
