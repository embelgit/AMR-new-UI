import logo from "../assets/embel-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  BoltIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import authService from "../services/authService";

const alertCount = 4;

const dummyMeters = [
  { id: "1", meterNumber: "MTR-001", meterType: "SOLAR" },
  { id: "2", meterNumber: "MTR-002", meterType: "GAS" },
  { id: "3", meterNumber: "MTR-003", meterType: "WATER" },
  { id: "4", meterNumber: "MTR-004", meterType: "ELECTRIC" },
];

const dummyUsers = [
  { id: 1, name: "Admin One", email: "admin1@amr.com", role: "ADMIN" },
  { id: 2, name: "John Doe", email: "john@amr.com", role: "USER" },
  { id: 3, name: "Alice Smith", email: "alice@amr.com", role: "USER" },
];

const dummyAlerts = [
  { id: 1, title: "Battery Low - MTR-001", type: "critical" },
  { id: 2, title: "Offline Device - MTR-003", type: "warning" },
];

const TopNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [user, setUser] = useState({
    name: localStorage.getItem('name') || 'User',
    email: localStorage.getItem('email') || 'Email',
    role: localStorage.getItem('role') || 'Role',
    username: localStorage.getItem('username') || 'username'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        const fullName = data.name || (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : (data.firstName || data.username || 'User'));
        const newUserData = {
          name: fullName,
          email: data.email || 'Email',
          role: data.role || 'Role',
          username: data.username || 'username'
        };
        setUser(newUserData);
        localStorage.setItem('name', newUserData.name);
        localStorage.setItem('email', newUserData.email);
        localStorage.setItem('role', newUserData.role);
        localStorage.setItem('username', newUserData.username);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowResults(false);
    setSearch("");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredMeters = search
    ? dummyMeters.filter(
      (m) =>
        m.meterNumber.toLowerCase().includes(search.toLowerCase()) ||
        m.meterType.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const filteredUsers = search
    ? dummyUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const filteredAlerts = search
    ? dummyAlerts.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const hasResults =
    filteredMeters.length > 0 ||
    filteredUsers.length > 0 ||
    filteredAlerts.length > 0;

  return (
    <header className="h-16 bg-white border-b flex items-center px-4 md:px-6 sticky top-0 z-40 gap-4">
      {/* LEFT: Menu & Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button - Only visible on Mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>
        <img src={logo} alt="Logo" className="h-8 md:h-9 w-auto" />
      </div>

      {/* CENTER: Global Search */}
      <div className="flex-1 flex justify-center lg:px-8" ref={searchRef}>
        <div className="relative w-full max-w-md hidden md:block">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => search && setShowResults(true)}
            placeholder="Search..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setShowResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition"
            >
              <XMarkIcon className="w-4 h-4 text-gray-500" />
            </button>
          )}

          {/* Search Results Dropdown */}
          {showResults && search && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
              {!hasResults ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No results found for "{search}"
                </div>
              ) : (
                <>
                  {/* Meters */}
                  {filteredMeters.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        Meters
                      </div>
                      {filteredMeters.slice(0, 3).map((meter) => (
                        <div
                          key={meter.id}
                          onClick={() => navigate("/meters")}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                        >
                          <BoltIcon className="w-5 h-5 text-purple-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {meter.meterNumber}
                            </p>
                            <p className="text-xs text-gray-500">
                              {meter.meterType}
                            </p>
                          </div>
                        </div>
                      ))}
                      {filteredMeters.length > 3 && (
                        <button
                          onClick={() => navigate("/meters")}
                          className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 text-left"
                        >
                          View all {filteredMeters.length} meters →
                        </button>
                      )}
                    </div>
                  )}

                  {/* Users */}
                  {filteredUsers.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        Users
                      </div>
                      {filteredUsers.slice(0, 3).map((user) => (
                        <div
                          key={user.id}
                          onClick={() => navigate("/users")}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                        >
                          <UsersIcon className="w-5 h-5 text-teal-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      ))}
                      {filteredUsers.length > 3 && (
                        <button
                          onClick={() => navigate("/users")}
                          className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 text-left"
                        >
                          View all {filteredUsers.length} users →
                        </button>
                      )}
                    </div>
                  )}

                  {/* Alerts */}
                  {filteredAlerts.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        Alerts
                      </div>
                      {filteredAlerts.slice(0, 3).map((alert) => (
                        <div
                          key={alert.id}
                          onClick={() => navigate("/alerts")}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                        >
                          <ExclamationTriangleIcon
                            className={`w-5 h-5 ${alert.type === "critical"
                              ? "text-red-500"
                              : "text-amber-500"
                              }`}
                          />
                          <p className="text-sm font-medium text-gray-800">
                            {alert.title}
                          </p>
                        </div>
                      ))}
                      {filteredAlerts.length > 3 && (
                        <button
                          onClick={() => navigate("/alerts")}
                          className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 text-left"
                        >
                          View all {filteredAlerts.length} alerts →
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button
          onClick={() => navigate("/alerts")}
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
          title="View Alerts"
        >
          <BellIcon className="w-6 h-6 text-gray-600" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
              {alertCount > 99 ? "99+" : alertCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <span className="h-6 w-px bg-gray-200"></span>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
