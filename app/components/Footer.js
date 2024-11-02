// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-[#0077B5] p-6 mt-10">
      <div className="container mx-auto text-center text-gray-300 text-sm">
        <p>&copy; {new Date().getFullYear()} G2. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="#" className="hover:underline px-2">
            About
          </a>
          <a href="#" className="hover:underline px-2">
            Careers
          </a>
          <a href="#" className="hover:underline px-2">
            Privacy
          </a>
          <a href="#" className="hover:underline px-2">
            Terms
          </a>
          <a href="#" className="hover:underline px-2">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
