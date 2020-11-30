import React from "react";
import { FaTimes } from "react-icons/fa";

function Sidebar({ isOpen, closeSidebar, moves }) {
  return (
    <aside className={`${isOpen ? "show-sidebar" : ""} sidebar`}>
      <div className="sidebar-header">
        <h2>History</h2>
        <button className="btn-close" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </aside>
  );
}

export default Sidebar;
