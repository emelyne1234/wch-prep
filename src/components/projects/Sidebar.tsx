import {
  FaProjectDiagram,
  FaChartBar,
  FaUsers,
  FaCog,
  FaCalendarAlt,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-dark text-white position-fixed"
      style={{ width: "4.5rem", height: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center py-3 border-bottom">
        <FaUserCircle size={32} className="mb-2" />
        <div className="small text-center" style={{ fontSize: "0.65rem" }}>
          John Doe
        </div>
      </div>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item py-3">
          <a href="#" className="nav-link text-white" title="Dashboard">
            <FaProjectDiagram size={24} />
          </a>
        </li>
        <li className="nav-item py-3">
          <a href="#" className="nav-link text-white" title="Analytics">
            <FaChartBar size={24} />
          </a>
        </li>
        <li className="nav-item py-3">
          <a href="#" className="nav-link text-white" title="Team">
            <FaUsers size={24} />
          </a>
        </li>
        <li className="nav-item py-3">
          <a href="#" className="nav-link text-white" title="Calendar">
            <FaCalendarAlt size={24} />
          </a>
        </li>
        <li className="nav-item py-3">
          <a href="#" className="nav-link text-white" title="Tasks">
            <FaTasks size={24} />
          </a>
        </li>
        <li className="nav-item py-3 mt-auto">
          <a href="#" className="nav-link text-white" title="Settings">
            <FaCog size={24} />
          </a>
        </li>
      </ul>
    </div>
  );
}
