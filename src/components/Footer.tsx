import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    useful: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Blog", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "FAQ", href: "/faq" },
    ],
    social: [
      { name: "Instagram", href: "https://instagram.com", icon: Instagram },
      { name: "Twitter", href: "https://twitter.com", icon: Twitter },
      { name: "Facebook", href: "https://facebook.com", icon: Facebook },
      { name: "Youtube", href: "https://youtube.com", icon: Youtube },
    ],
  };

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Image
                src="/gorilla-icon 1.png"
                alt="WCH Logo"
                width={48}
                height={48}
                className="invert"
              />
              <div>
                <h3 className="h5 mb-0 text-white">WCH</h3>
                <p className="small text-secondary mb-0">
                  Wildlife Conservation Hub
                </p>
              </div>
            </div>
            <p className="text-secondary">
              Dedicated to protecting and preserving wildlife through
              conservation, education, and community engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="h5 text-white mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              {links.useful.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link
                    href={link.href}
                    className="text-secondary text-decoration-none hover-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6">
            <h4 className="h5 text-white mb-3">Resources</h4>
            <ul className="list-unstyled">
              {links.resources.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link
                    href={link.href}
                    className="text-secondary text-decoration-none hover-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h4 className="h5 text-white mb-3">Newsletter</h4>
            <p className="text-secondary mb-3">
              Stay updated with our latest news
            </p>
            <form className="input-group">
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Enter your email"
              />
              <button className="btn btn-primary" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small text-secondary mb-0">
              © {currentYear} Wildlife Conservation Hub. All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex gap-3 justify-content-center justify-content-md-end mt-3 mt-md-0">
              {links.social.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="bg-dark-subtle p-2 rounded-circle text-decoration-none">
                    <Icon size={20} className="text-secondary" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
