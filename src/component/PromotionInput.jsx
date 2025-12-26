import React, { useState } from "react";
import axios from "axios";

const PromotionInput = ({ itemId, category, currentPercentage = 0, onUpdate }) => {
  const [percentage, setPercentage] = useState(currentPercentage);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (percentage < 0 || percentage > 100) {
      alert("Please enter a valid percentage (0-100)");
      return;
    }

    try {
      setLoading(true);

      await axios.put(`http://localhost:5000/api/promotion/${category}/${itemId}`, {
        promotionPercentage: percentage,
      });

      onUpdate(percentage); // update frontend state
    } catch (err) {
      console.error("Error updating promotion:", err);
      alert("Failed to update promotion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex justify-center items-center gap-2">
      <input
        type="number"
        min="0"
        max="100"
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
        placeholder="Enter %"
        className="w-20 p-1 rounded border border-gray-300 text-center"
      />
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
      >
        {loading ? "Saving..." : "Set %"}
      </button>
    </div>
  );
};

export default PromotionInput;
