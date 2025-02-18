import money from "../../assets/icons8-money-48.png";
const Footer = () => {
  return (
    <footer className="bg-black text-neutral-content py-10 max-w-full">
      <div className="footer mx-auto px-5 container grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <nav className="flex flex-col items-start">
          <a className="text-2xl font-bold flex gap-2 text-white ">
            {" "}
            <img src={money} className="w-8 text-center" alt="Earnly Logo" />
            Earnly
          </a>
          <p className="text-gray-400 mt-2 ">
            Unlock opportunities by completing tasks and earning money.
          </p>
        </nav>

        {/* Explore Section */}
        <nav>
          <h6 className="footer-title text-white">Explore</h6>
          <a href="/tasks" className="link link-hover text-gray-400">
            Browse Tasks
          </a>
          <a href="/categories" className="link link-hover text-gray-400">
            Task Categories
          </a>
          <a href="/top-earners" className="link link-hover text-gray-400">
            Top Earners
          </a>
          <a href="/recent-tasks" className="link link-hover text-gray-400">
            Recently Added Tasks
          </a>
        </nav>

        {/* Company Section */}
        <nav>
          <h6 className="footer-title text-white">Company</h6>
          <a href="/about" className="link link-hover text-gray-400">
            About Us
          </a>
          <a href="/contact" className="link link-hover text-gray-400">
            Contact
          </a>
          <a href="/careers" className="link link-hover text-gray-400">
            Careers
          </a>
          <a href="/blog" className="link link-hover text-gray-400">
            Blog
          </a>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="footer-title text-white">Legal</h6>
          <a href="/terms" className="link link-hover text-gray-400">
            Terms of Use
          </a>
          <a href="/privacy" className="link link-hover text-gray-400">
            Privacy Policy
          </a>
          <a href="/cookie-policy" className="link link-hover text-gray-400">
            Cookie Policy
          </a>
          <a href="/support" className="link link-hover text-gray-400">
            Support
          </a>
        </nav>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Earnly. All Rights Reserved. Built to
          empower your earning potential.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
