import logo from "../assets/embel-logo.png";

const Navbar = () => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-end px-6">
      <img src={logo} alt="Logo" className="h-10" />
    </div>
  );
};

export default Navbar;
