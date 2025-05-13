import React from 'react';
import './CSS/home.css'

const HomePage = () => {
  return (
    <div className="font-sans text-gray-800">
      <div className="hero-banner text-white py-24 px-5 text-center">
        {/* Hero Section Content */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to CodeFore</h1>
        <p className="text-xl md:text-2xl mb-6">Your partner for smart, clean, and competitive web solutions.</p>
        <div className="space-x-4">
          <button className="bg-white text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-100">Get Started</button>
          <button className="bg-white text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-100">Contact Us</button>
        </div>
      </div>

      <section className="hero-section text-white py-20 px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Smart Design. Clean Code. Competitive Results.</h1>
        <p className="text-lg md:text-xl mb-6">Websites crafted with precision — where development meets design.</p>
        <div className="space-x-4">
          <button className="bg-white text-green-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">View Our Work</button>
          <button className="bg-white text-green-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">Get a Free Quote</button>
        </div>
      </section>

      {/* About Section */}
      <section className="hero-section max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <p className="text-lg">At CodeFore, we build high-performing websites with the precision of a perfect swing. We blend clean front-end design with custom backend development to help brands win online.</p>
      </section>

      {/* Services Section */}
      <section className="hero-section py-16 px-5">
        <h2 className="text-3xl font-bold text-center mb-10">What We Do</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {['Web Design', 'Web Development', 'SEO & Optimization', 'Brand Identity'].map((service, index) => (
            <div key={index} className="bg-white p-6 rounded shadow text-center">
              <h3 className="text-xl font-semibold mb-2">{service}</h3>
              <p className="text-sm">Short description of {service.toLowerCase()} service offered.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="hero-section text-center">
        <h2 className="text-3xl font-bold mb-6">See the CodeFore Difference</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((project) => (
            <div key={project} className="bg-gray-200 h-48 rounded shadow">Project {project}</div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="hero-section py-16 px-5 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
        <div className="max-w-3xl mx-auto">
          <blockquote className="italic">“CodeFore built us a beautiful, fast site that our customers love. Their attention to detail is unmatched.”</blockquote>
          <p className="mt-4 font-semibold">– Happy Client</p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="hero-section text-white py-16 px-5 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Something Great?</h2>
        <div className="space-x-4">
          <button className="bg-white text-green-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">Book a Consultation</button>
          <button className="bg-white text-green-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">Send Us a Message</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="hero-section text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} CodeFore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
