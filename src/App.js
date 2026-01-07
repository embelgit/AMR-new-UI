// import Login from "./pages/Login";

// function App() {
//   return <Login />;
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Layout from "./components/Layout";
// import Users from "./pages/Users";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//          <Route element={<Layout />}></Route>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//          <Route path="users" element={<Users />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Layout from "./components/Layout";
// import Users from "./pages/Users";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Login without layout */}
//         <Route path="/" element={<Login />} />

//         {/* Pages WITH layout */}
//         <Route element={<Layout />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/users" element={<Users />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import Meters from "./pages/Meter";
import Devices from "./pages/Device";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Billing from "./pages/Billing";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/meters" element={<Meters />} />
          <Route path="/device" element={<Devices />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/alert-report" element={<Alerts />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/billing" element={<Billing />} />
        </Route>

        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
