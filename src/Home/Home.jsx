import React from "react";
import { Link } from "react-router-dom";

// Update these paths to match your folder structure
import img1 from "../assets/img1.jpeg"
import img2 from "../assets/WhatsApp Image 2026-01-09 at 4.57.55 PM.jpeg";

const Home = () => {
  const features = [
    { title: "Community Box", desc: "Share thoughts and ideas with fellow students.", link: "/", icon: "💬" },
    { title: "Quick Notices", desc: "Stay updated with official campus announcements.", link: "/notice", icon: "📢" },
    { title: "Complaints", desc: "Submit and track university-related issues.", link: "/complaints", icon: "📝" },
    { title: "sex for love", desc: "Find peers to study and collaborate on projects.", link: "/", icon: "👥" },
    { title: "Events", desc: "Explore upcoming seminars, fests, and workshops.", link: "/", icon: "🗓️" },
    { title: "Resources", desc: "Access shared notes and academic materials.", link: "/", icon: "📚" },
    { title: "Lost & Found", desc: "Report or find lost items around the campus.", link: "/", icon: "🔍" },
    { title: "About Us", desc: "Learn more about the UniBox mission and team.", link: "/about", icon: "ℹ️" },
    { title: "Contact", desc: "Get in touch with us for any technical support.", link: "/contact", icon: "📞" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      
      {/* SWIPABLE HERO SLIDER (Blue Overlay) */}
      <section className="relative w-full h-[500px] lg:h-[650px]">
        <div className="carousel w-full h-full">
          
          {/* SLIDE 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <img 
              src={img1} 
              className="w-full object-cover" 
              alt="University Slide 1" 
            />
            {/* Blue Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/40"></div>
            
            <div className="absolute flex flex-col items-start justify-center inset-0 text-white p-10 lg:p-24">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight">UniBox <span className="text-blue-300">Portal</span></h1>
              <p className="max-w-xl text-lg lg:text-xl mb-8 font-light leading-relaxed text-blue-50">
                Your primary destination for campus connectivity. Bridging the gap between students and administration.
              </p>
              <Link to="/complaints" className="btn bg-white text-blue-700 border-none hover:bg-blue-100 btn-lg rounded-md px-10 shadow-xl">
                Enter Box
              </Link>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle bg-white/10 border-white/20 text-white hover:bg-blue-600">❮</a> 
              <a href="#slide2" className="btn btn-circle bg-white/10 border-white/20 text-white hover:bg-blue-600">❯</a>
            </div>
          </div> 
          
          {/* SLIDE 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <img 
              src={img2} 
              className="w-full object-cover" 
              alt="University Slide 2" 
            />
            {/* Blue Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/40"></div>

            <div className="absolute flex flex-col items-start justify-center inset-0 text-white p-10 lg:p-24">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight">Your Voice <span className="text-blue-300">Heard</span></h1>
              <p className="max-w-xl text-lg lg:text-xl mb-8 font-light text-blue-50">
                A transparent system for reporting campus concerns and tracking official notices in real-time.
              </p>
              <Link to="/complaints" className="btn bg-blue-500 text-white border-none hover:bg-blue-400 btn-lg rounded-md px-10 shadow-xl">
                File Complaint
              </Link>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle bg-white/10 border-white/20 text-white hover:bg-blue-600">❮</a> 
              <a href="#slide1" className="btn btn-circle bg-white/10 border-white/20 text-white hover:bg-blue-600">❯</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS - CLEAN WHITE BOX */}
      <section className="relative -mt-12 z-10 max-w-6xl mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-xl p-10 border border-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-100">
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">Users</div>
              <div className="text-4xl font-bold text-blue-900">2,540+</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">Solved Issues</div>
              <div className="text-4xl font-bold text-blue-900">92%</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">Support</div>
              <div className="text-4xl font-bold text-blue-900">24/7</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID - WHITE & BLUE THEME */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">Campus Services</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl border border-blue-50 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 text-3xl flex items-center justify-center rounded-xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                {item.desc}
              </p>
              <Link 
                to={item.link} 
                className="inline-flex items-center font-bold text-blue-600 hover:text-blue-800"
              >
                Learn More <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;