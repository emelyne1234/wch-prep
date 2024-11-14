"use client";

import { useState } from "react";

import Image from "next/image";

const testimonials = [
  {
    text: "Being part of the Wildlife Conservation Hub has truly been transformation. I've connected with experts globally, gained invaluable insights, and accessed educational resources that deepened my knowledge. The Hub's collaborative tools have empowered me to contribute to impactful projects, making me feel like part of a united, conservation-focused community.",
    author: "Dr. Uwimbabazi Emelyne",
    role: "Wildlife Researcher",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200",
  },
  {
    text: "The platform's innovative approach to conservation has revolutionized how we collaborate on wildlife projects. The resources and community support have been invaluable.",
    author: "Dr. Uwimana Jean Claude",
    role: "Conservation Biologist",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200",
  },
  {
    text: "As an educator, I've found the educational resources and community engagement tools incredibly valuable for teaching the next generation about conservation.",
    author: "Dr. Uwamahoro Ruth",
    role: "Environmental Educator",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200",
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const previousTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <h2 className="text-center mb-2 fw-bold">Community</h2>
        <h3 className="text-center mb-5 text-muted fst-italic">
          What Our Members Say
        </h3>

        <div className="position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="text-center p-4 rounded-3 shadow-sm bg-white"
                style={{ minHeight: "300px" }}
              >
                <p
                  className="lead mb-4 fw-normal"
                  key={currentTestimonial}
                  style={{
                    opacity: 1,
                    transition: "all 0.3s ease-in-out",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                  }}
                >
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </p>

                <div className="flex items-center justify-center">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={`Profile of ${testimonials[currentTestimonial].author}`}
                    width={70}
                    height={70}
                    className="rounded-full shadow-sm object-cover w-14 h-14"
                  />
                  <div className="ms-3 text-start">
                    <h5 className="mb-1 fw-bold">
                      {testimonials[currentTestimonial].author}
                    </h5>
                    <p className="text-muted mb-0 fst-italic">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="btn btn-light shadow-sm position-absolute start-0 top-50 translate-middle-y rounded-circle"
            onClick={previousTestimonial}
            style={{ width: "40px", height: "40px", padding: "0" }}
            aria-label="Previous testimonial"
          >
            <span className="fs-4">‹</span>
          </button>
          <button
            className="btn btn-light shadow-sm position-absolute end-0 top-50 translate-middle-y rounded-circle"
            onClick={nextTestimonial}
            style={{ width: "40px", height: "40px", padding: "0" }}
            aria-label="Next testimonial"
          >
            <span className="fs-4">›</span>
          </button>
        </div>

        <div className="text-center mt-4">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`mx-1 rounded-circle d-inline-block ${
                index === currentTestimonial ? "bg-success" : "bg-secondary"
              }`}
              style={{ width: "10px", height: "10px", cursor: "pointer" }}
              onClick={() => setCurrentTestimonial(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
