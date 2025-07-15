import React, { useState, useEffect } from 'react';

// --- Main Website Component ---
export default function Website() { // Renamed from App to Website
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'products':
        return <ProductsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #111827; /* Dark background for the whole page */
        }
        .text-glow {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), 0 0 20px rgba(234, 179, 8, 0.4);
        }
        .button-futuristic {
          background: linear-gradient(90deg, #991b1b, #b91c1c);
          border: 1px solid #dc2626;
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.5);
        }
        .button-futuristic:hover {
          box-shadow: 0 0 25px rgba(252, 211, 77, 0.7);
          background: linear-gradient(90deg, #facc15, #eab308);
          color: #78350f;
        }
        .card-glow-border {
            position: relative;
            overflow: hidden;
            border: 1px solid #4b5563;
        }
        .card-glow-border:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(110deg, transparent, rgba(250, 204, 21, 0.3), transparent);
            transition: transform 0.5s ease-in-out;
        }
        .card-glow-border:hover:before {
            transform: translateX(200%);
        }
      `}</style>
      <div className="bg-gray-900 text-gray-200 font-sans">
        <WebsiteHeader setActivePage={setActivePage} />
        <main>
          {renderPage()}
        </main>
        <WebsiteFooter setActivePage={setActivePage} />
        <WhatsAppButton />
      </div>
    </>
  );
}

// --- Reusable Components ---
const SectionTitle = ({ children }) => (
    <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-glow">{children}</h2>
        <div className="w-24 h-1 bg-red-700 mx-auto mt-4"></div>
    </div>
);

// --- Website UI Components ---

const WebsiteHeader = ({ setActivePage }) => (
  <header className="bg-gray-900/80 backdrop-blur-md shadow-lg shadow-red-900/20 sticky top-0 z-50">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
        <img src="https://i.imgur.com/r5F4yS2.png" alt="MyFlav Foods Logo" className="h-14"/>
      </div>
      <nav className="hidden md:flex space-x-8 items-center">
        <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} className="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">Home</a>
        <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }} className="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">Products</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); setActivePage('about'); }} className="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">About Us</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }} className="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">Contact</a>
      </nav>
       <a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }} className="hidden md:inline-block text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 button-futuristic">
          Get a Quote
        </a>
    </div>
  </header>
);

const WebsiteFooter = ({ setActivePage }) => (
  <footer className="bg-black text-white border-t border-gray-800">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">MyFlav Foods</h3>
          <p className="text-gray-400">Freshly made chapatis and pooris, delivered with care. Quality and hygiene you can trust.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }} className="text-gray-400 hover:text-white">Products</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); setActivePage('about'); }} className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }} className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Contact Us</h3>
          <p className="text-gray-400">Punnakkamugal, Trivandrum<br />Kerala, India<br />Email: myflavfoods.tvm@gmail.com<br />WhatsApp: +91 73561 95492</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/16h2jHR3AQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="https://www.instagram.com/myflav.foods?igsh=N3lsM3lqcnkyd2ps" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} MyFlav Foods. All Rights Reserved. | <a href="#" className="hover:text-white">Staff Login</a></p>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
    <a href="https://wa.me/917356195492" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform duration-300 hover:scale-110 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.457l-6.354 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 4.971 4.971z"/></svg>
    </a>
);


// --- Page Components ---

const HomePage = ({ setActivePage }) => (
  <>
    {/* Hero Section */}
    <section className="relative h-[80vh] md:h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565299585323-15d11e3c63e3?q=80&w=2070&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-start">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 max-w-3xl text-glow">Authentic Taste, Futuristic Process</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">Experience the perfect blend of traditional recipes and state-of-the-art hygiene with MyFlav Foods.</p>
        <a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }} className="text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 button-futuristic">
          Order Now
        </a>
      </div>
    </section>

    {/* Featured Products Section */}
    <section id="products" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
            <SectionTitle>Featured Products</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden card-glow-border">
                    <img src="https://placehold.co/600x400/111827/FBBF24?text=Half-Cooked+Chapati" alt="Half-Cooked Chapati" className="w-full h-64 object-cover"/>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Half-Cooked Chapati</h3>
                        <p className="text-gray-400">Soft, wholesome chapatis made from the finest wheat. Just heat and eat for a perfect homemade meal in minutes.</p>
                    </div>
                </div>
                 <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden card-glow-border">
                    <img src="https://placehold.co/600x400/111827/FBBF24?text=Ready-to-Fry+Poori" alt="Ready-to-Fry Poori" className="w-full h-64 object-cover"/>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Ready-to-Fry Poori</h3>
                        <p className="text-gray-400">Light, fluffy, and delicious. Our poori dough is perfectly prepared to puff up beautifully when fried.</p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-12">
                 <a href="#products" onClick={(e) => { e.preventDefault(); setActivePage('products'); }} className="text-yellow-400 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 hover:text-gray-900 border-2 border-yellow-400 transition-all duration-300 transform hover:scale-105">
                    View All Products
                </a>
            </div>
        </div>
    </section>

    {/* Features Section */}
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <SectionTitle>Why Choose Us?</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-6">
            <div className="flex justify-center items-center h-24 w-24 rounded-full bg-gray-800 mx-auto mb-6 border-2 border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
               <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Unmatched Hygiene</h3>
            <p className="text-gray-400">Our automated process ensures zero human contact, setting a new standard for food safety.</p>
          </div>
          <div className="p-6">
             <div className="flex justify-center items-center h-24 w-24 rounded-full bg-gray-800 mx-auto mb-6 border-2 border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0112 3c1.398 0 2.743.57 3.714 1.543C18.5 7 19 10 19 12c2 1 2 2.5 2 2.5S19.5 17 17.657 18.657z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Premium Ingredients</h3>
            <p className="text-gray-400">We source only the finest grains and oils to create products that are both delicious and wholesome.</p>
          </div>
          <div className="p-6">
            <div className="flex justify-center items-center h-24 w-24 rounded-full bg-gray-800 mx-auto mb-6 border-2 border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
               <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10M16 16l4-4m0 0l-4-4m4 4H9" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Reliable Delivery</h3>
            <p className="text-gray-400">Our efficient logistics network ensures you receive the freshest products on time, every time.</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ProductsPage = () => (
    <div className="bg-gray-900 py-24">
        <div className="container mx-auto px-6">
            <SectionTitle>Our Products</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden card-glow-border">
                    <img src="https://placehold.co/600x400/111827/FBBF24?text=Half-Cooked+Chapati" alt="Half-Cooked Chapati" className="w-full h-64 object-cover"/>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Half-Cooked Chapati</h3>
                        <p className="text-gray-400">Soft, wholesome chapatis made from the finest wheat. Just heat and eat for a perfect homemade meal in minutes.</p>
                    </div>
                </div>
                 <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden card-glow-border">
                    <img src="https://placehold.co/600x400/111827/FBBF24?text=Ready-to-Fry+Poori" alt="Ready-to-Fry Poori" className="w-full h-64 object-cover"/>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Ready-to-Fry Poori</h3>
                        <p className="text-gray-400">Light, fluffy, and delicious. Our poori dough is perfectly prepared to puff up beautifully when fried.</p>
                    </div>
                </div>
                 <div className="bg-gradient-to-br from-yellow-500 to-red-800 text-white rounded-lg shadow-lg flex flex-col items-center justify-center p-8 card-glow-border">
                    <h3 className="text-3xl font-bold mb-2">More Coming Soon!</h3>
                    <p className="text-center text-yellow-100">We are constantly innovating to bring more delicious and convenient products to your table.</p>
                </div>
            </div>
        </div>
    </div>
);

const AboutPage = () => (
    <div className="bg-gray-900 py-24">
        <div className="container mx-auto px-6">
            <SectionTitle>About MyFlav Foods</SectionTitle>
            <div className="max-w-4xl mx-auto text-center bg-gray-800/50 p-10 rounded-lg border border-gray-700">
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">A Flavourful Journey to Your Table</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    At MyFlav Foods, we believe good food begins with great care. We are a dedicated food processing brand, based in Kerala, committed to delivering high-quality, hygienically prepared chapatis and pooris that are both fresh and flavourful.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    Founded with a simple mission — to make everyday meals easier, tastier, and healthier — MyFlav Foods brings the authentic taste of home-cooked food straight to your plate. Whether you're a busy professional, a homemaker, or a food service provider, our ready-to-cook and ready-to-eat products are designed to save your time without compromising on taste or nutrition.
                </p>
            </div>
        </div>
    </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormStatus('success');
    setTimeout(() => setFormStatus(''), 5000); // Reset status after 5 seconds
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
  };

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-6 py-24">
        <SectionTitle>Get In Touch</SectionTitle>
        <p className="text-gray-400 max-w-2xl mx-auto text-center mb-16">
            We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
            {formStatus === 'success' && (
              <div className="bg-green-900/50 border border-green-500 text-green-300 p-4 mb-6 rounded-md" role="alert">
                <p className="font-bold">Success!</p>
                <p>Your message has been sent. We will get back to you shortly.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="font-semibold text-gray-300">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full mt-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 text-white" required />
              </div>
              <div>
                <label htmlFor="email" className="font-semibold text-gray-300">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 text-white" required />
              </div>
              <div>
                <label htmlFor="subject" className="font-semibold text-gray-300">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full mt-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 text-white" required />
              </div>
              <div>
                <label htmlFor="message" className="font-semibold text-gray-300">Message</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full mt-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 text-white" required></textarea>
              </div>
              <button type="submit" className="w-full text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 button-futuristic">
                Send Message
              </button>
            </form>
          </div>

          {/* Map and Info */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700">
               <h3 className="text-xl font-bold mb-4 text-white">Our Location</h3>
               <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden">
                 <iframe 
                    src="https://maps.google.com/maps?q=Punnakkamugal,Trivandrum,India&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, filter: 'invert(90%) hue-rotate(180deg)'}} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="MyFlav Foods Location"
                 ></iframe>
               </div>
            </div>
             <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700">
               <h3 className="text-xl font-bold mb-4 text-white">Contact Information</h3>
               <p className="text-gray-400">
                 <strong>Address:</strong> Punnakkamugal, Trivandrum, Kerala, India
               </p>
                <p className="text-gray-400 mt-2">
                 <strong>Email:</strong> myflavfoods.tvm@gmail.com
               </p>
                <p className="text-gray-400 mt-2">
                 <strong>WhatsApp:</strong> +91 73561 95492
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
