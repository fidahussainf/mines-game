import React from "react";
import { FaBomb, FaGem } from "react-icons/fa";

interface CellProps {
  id: number;
  status: "hidden" | "gem" | "mine" | "revealed";
  handleClick: (id: number) => void;
}

const Cell: React.FC<CellProps> = ({ id, status, handleClick }) => (
  <button
    className={`w-12 h-12 flex items-center justify-center border rounded-md ${
      status === "revealed" ? "bg-gray-200" : "bg-gray-800"
    }`}
    onClick={() => handleClick(id)}
    disabled={status !== "hidden"}
  >
    {status === "mine" && <FaBomb className="text-red-500" />}
    {status === "gem" && <FaGem className="text-yellow-500" />}
  </button>
);

export default Cell;
