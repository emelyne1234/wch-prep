import Image from "next/image";
import { Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

const ConservationPlatform = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid p-0">
        <div className="position-relative">
          <div
            style={{
              height: "100vh",
              minHeight: "600px",
              backgroundImage: "url(/images/crowned-cranes.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-12 text-center text-white">
                    <h1 className="display-4 fw-bold mb-4">
                      Empowering Conservation through
                      <br />
                      Collaboration and Technology.
                    </h1>
                    <p className="lead mb-4">
                      In preserving the wild, we preserve ourselves.
                      <br />
                      Join us in shaping a sustainable future for all species.
                    </p>
                    <button className="btn btn-success btn-lg px-5 py-3 rounded-pill">
                      Get involved
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="pe-lg-4">
              <h2 className="h3 mb-4">Our Conservation Platform</h2>
              <p className="text-muted">
                Our platform was created with the belief that effective
                conservation requires a collaborative approach, where knowledge,
                resources, and passion come together to make a difference. We
                bring together conservationists, researchers, educators, and the
                public, uniting people from diverse backgrounds to address
                urgent wildlife and environmental challenges.
              </p>
              <p className="text-muted">
                Through innovative tools, educational resources, and
                community-driven projects, we aim to empower individuals to
                contribute to preserving biodiversity and safeguarding
                ecosystems for future generations. Together, we can amplify our
                collective impact and drive meaningful change in wildlife
                conservation.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative rounded overflow-hidden shadow-lg">
              <Image
                src="/images/elephants.jpg"
                alt="Elephants walking through savanna landscape"
                width={800}
                height={600}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-2">Community</h2>
          <h3 className="text-center mb-5 font-italic">Testimonials</h3>

          <div className="position-relative">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="text-center">
                  <p className="lead mb-4">
                    "Being part of the Wildlife Conservation Hub has truly been
                    transformative. I've connected with experts globally, gained
                    invaluable insights, and accessed educational resources that
                    deepened my knowledge. The Hub's collaborative tools have
                    empowered me to contribute to impactful projects, making me
                    feel like part of a united, conservation-focused community."
                  </p>

                  <div className="d-flex align-items-center justify-content-center">
                    <Image
                      src="/images/profile-placeholder.png"
                      alt="Profile"
                      width={60}
                      height={60}
                      className="rounded-circle"
                    />
                    <div className="ms-3 text-start">
                      <h5 className="mb-1">Dr. Sarah Kim</h5>
                      <p className="text-muted mb-0">Researcher</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn position-absolute start-0 top-50 translate-middle-y"
              aria-label="Previous testimonial">
              <span className="fs-1">‹</span>
            </button>
            <button
              className="btn position-absolute end-0 top-50 translate-middle-y"
              aria-label="Next testimonial">
              <span className="fs-1">›</span>
            </button>
          </div>

          <div className="text-center mt-4">
            <span
              className="mx-1 rounded-circle d-inline-block bg-success"
              style={{ width: "10px", height: "10px" }}></span>
            <span
              className="mx-1 rounded-circle d-inline-block bg-secondary"
              style={{ width: "10px", height: "10px" }}></span>
            <span
              className="mx-1 rounded-circle d-inline-block bg-secondary"
              style={{ width: "10px", height: "10px" }}></span>
            <span
              className="mx-1 rounded-circle d-inline-block bg-secondary"
              style={{ width: "10px", height: "10px" }}></span>
            <span
              className="mx-1 rounded-circle d-inline-block bg-secondary"
              style={{ width: "10px", height: "10px" }}></span>
          </div>
        </div>
      </div>

      <footer className="bg-secondary text-white py-4 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <Image
                  src="/images/gorilla-logo.png"
                  alt="WCH Logo"
                  width={40}
                  height={40}
                />
                <div className="ms-3">
                  <h5 className="mb-0">WCH</h5>
                  <p className="mb-0">Wildlife Conservation Hub</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-0">
              <h6 className="mb-3">Useful links:</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link
                    href="/about"
                    className="text-white text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-white text-decoration-none">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-white text-decoration-none">
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="text-white text-decoration-none">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white text-decoration-none">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <div className="d-flex justify-content-md-end align-items-center">
                <Link href="https://instagram.com" className="text-white me-3">
                  <Instagram size={24} />
                </Link>
                <Link href="https://twitter.com" className="text-white me-3">
                  <Twitter size={24} />
                </Link>
                <Link href="https://facebook.com" className="text-white">
                  <Facebook size={24} />
                </Link>
              </div>
              <p className="text-end mt-2 mb-0">
                © Wildlife Conservation Hub 2024. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ConservationPlatform;
