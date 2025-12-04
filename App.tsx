import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Gamepad2, ArrowRight, Github, Twitter, Linkedin, Lock, Send, Mail, User, MessageSquare } from 'lucide-react';
import { INITIAL_GAMES, STUDIO_NAME, FOUNDER_NAME, STUDIO_LOGO_URL } from './constants';
import { Game, PlayerStats, GlobalStats, LoadingState } from './types';
import { fetchLiveStats, calculateGlobalStats, fetchGameMedia } from './services/robloxService';
import GameCard from './components/GameCard';
import LiveWidget from './components/LiveWidget';
import AdminPanel from './components/AdminPanel';
import AnimatedBackground from "./components/AnimatedBackground";


// --- Components defined locally for simplicity in this file structure ---

// ... (Previous imports and components)

const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('work-with-us');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('work-with-us');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav
  className={`fixed w-full z-40 transition-all duration-300
    ${scrolled || isOpen
      ? 'bg-white/80 shadow-sm backdrop-blur-xl border-b border-white/30'
      : 'bg-transparent'
    }`}
>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
            onClick={handleLogoClick}
          >
             {/* Use Image Logo */}
             <img src={STUDIO_LOGO_URL} alt={STUDIO_NAME} referrerPolicy="no-referrer" className="h-10 w-auto object-contain" />
             <span className="text-stone-900 font-extrabold text-xl tracking-tight">{STUDIO_NAME}</span>
          </div>
          
          {/* Main Navigation - Moved to the right */}
          <div className="hidden md:flex flex-grow items-center justify-end">
            <div className="flex items-baseline space-x-8">
              <button onClick={(e) => handleNavClick('home', e)} className="text-stone-600 hover:text-fox-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors">Home</button>
              <button onClick={(e) => handleNavClick('games', e)} className="text-stone-600 hover:text-fox-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors">Games</button>
              <button onClick={(e) => handleNavClick('about', e)} className="text-stone-600 hover:text-fox-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors">About</button>
              
              {isAuthenticated ? (
                <Link to="/admin" className="text-stone-600 hover:text-fox-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-1">
                  <Lock size={14} /> Admin
                </Link>
              ) : (
                // Removed the 'Contact Us' button here as requested
                null
              )}
            </div>
          
            {/* Action Button - Changed text to "Contact Us" */}
            <button onClick={handleContactClick} className="ml-8 bg-stone-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-fox-600 transition-colors shadow-lg shadow-fox-500/10">
              Contact Us {/* Changed from 'Get a Quote' */}
            </button>
          </div>


          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600 hover:text-stone-900 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl border-b border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={(e) => handleNavClick('home', e)} className="text-left w-full text-stone-600 hover:text-stone-900 block px-3 py-2 rounded-md text-base font-bold">Home</button>
            <button onClick={(e) => handleNavClick('games', e)} className="text-left w-full text-stone-600 hover:text-stone-900 block px-3 py-2 rounded-md text-base font-bold">Games</button>
            <button onClick={(e) => handleNavClick('about', e)} className="text-left w-full text-stone-600 hover:text-stone-900 block px-3 py-2 rounded-md text-base font-bold">About</button>
            <button onClick={(e) => handleNavClick('work-with-us', e)} className="text-left w-full text-fox-600 hover:text-fox-700 block px-3 py-2 rounded-md text-base font-bold">Contact Us</button> {/* Changed text here too for consistency */}
            {isAuthenticated ? (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="text-stone-600 hover:text-stone-900 block px-3 py-2 rounded-md text-base font-bold flex items-center gap-1">
                <Lock size={16} /> Admin
              </Link>
            ) : (
              // Removed the mobile 'Contact Us' button here as requested
              null
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
// ... (Rest of the file)

const Footer = () => (
  <footer id="contact" className="bg-white/50 backdrop-blur-xl border-t border-white/20 text-stone-500 py-12 relative z-10">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8"> {/* Changed grid-cols-4 to grid-cols-3 */}
      
      {/* 1st Column (Left Side) - Studio Info & Contact Email 
        Colspan set to 2 to push 'Links' to the right
      */}
      <div className="col-span-1 md:col-span-2"> 
        <div className="flex items-center gap-2 mb-4">
          <img src={STUDIO_LOGO_URL} alt={STUDIO_NAME} referrerPolicy="no-referrer" className="h-8 w-auto opacity-100" />
          <span className="text-stone-900 font-bold text-lg">{STUDIO_NAME}</span>
        </div>
        <p className="text-sm max-w-xs mb-4 text-stone-500">Creating immersive multiplayer experiences for the next generation of gamers on Roblox.</p>
        
        {/* Added Email ID below the description */}
        <div className="border-t border-stone-200 pt-4 max-w-xs">
          <p className="text-xs text-stone-900 font-semibold mb-1">General Inquiries:</p>
          <a href="mailto:contact@motionfoxstudio.com" className="text-sm text-fox-600 hover:text-fox-700 transition-colors font-medium">
            contact@motionfoxstudio.com
          </a>
        </div>
        
        <div className="flex space-x-4 mt-6">
          <a href="https://x.com/motionfoxstudio" className="hover:text-fox-600 transition-colors text-stone-400"><Twitter size={20} /></a>
          <a href="#" className="hover:text-fox-600 transition-colors text-stone-400"><Github size={20} /></a>
          <a href="https://www.linkedin.com/company/110216867/" className="hover:text-fox-600 transition-colors text-stone-400"><Linkedin size={20} /></a>
        </div>
      </div>
      
      {/* 2nd Column (Right Side) - Links 
        This is now the rightmost section
      */}
      <div className="md:col-span-1">
        <h3 className="text-stone-900 font-bold mb-4">Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#games" className="hover:text-fox-600 transition-colors">Games</a></li>
          <li><a href="#about" className="hover:text-fox-600 transition-colors">About Us</a></li>
          <li><a href="#work-with-us" className="hover:text-fox-600 transition-colors">Contact</a></li>
        </ul>
      </div>
      
      {/* Removed the 'Legal' section which was here */}

    </div>
    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-200/50 text-center text-xs text-stone-400">
      © {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved. Not affiliated with Roblox Corporation.
    </div>
  </footer>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend API
    const subject = `Motion Fox Studio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:contact@motionfoxstudio.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/40">
      <h3 className="text-2xl font-bold text-stone-900 mb-6">Send us a message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-stone-600 text-sm font-semibold mb-2 flex items-center gap-2">
            <User size={16} /> Your Name
          </label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-white/40 border border-stone-200 rounded-lg p-3 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none transition-all placeholder-stone-400 focus:bg-white/80"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-stone-600 text-sm font-semibold mb-2 flex items-center gap-2">
            <Mail size={16} /> Email Address
          </label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full bg-white/40 border border-stone-200 rounded-lg p-3 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none transition-all placeholder-stone-400 focus:bg-white/80"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-stone-600 text-sm font-semibold mb-2 flex items-center gap-2">
            <MessageSquare size={16} /> Project Details
          </label>
          <textarea 
            required
            rows={4}
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            className="w-full bg-white/40 border border-stone-200 rounded-lg p-3 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none transition-all resize-none placeholder-stone-400 focus:bg-white/80"
            placeholder="Tell us about your game idea or partnership opportunity..."
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-fox-600 hover:bg-fox-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-lg shadow-fox-600/20"
        >
          <Send size={18} /> Send Message
        </button>
      </form>
    </div>
  );
};

const Home = ({ games, stats, statsMap, status }: { games: Game[], stats: GlobalStats | null, statsMap: Record<string, PlayerStats>, status: LoadingState }) => {
  
  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => {
      const statsA = statsMap[a.masterId];
      const statsB = statsMap[b.masterId];
      const liveA = statsA ? statsA.liveCount : 0;
      const liveB = statsB ? statsB.liveCount : 0;

      if (liveB !== liveA) return liveB - liveA;
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return 0;
    });
  }, [games, statsMap]);

  return (
    <div id="home" className="min-h-screen relative">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Remove solid background here to let index.html grid show through */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-stone-200 shadow-sm text-fox-600 font-bold text-sm">
            🚀 {stats ? (stats.totalVisits / 1000000).toFixed(0) : '150'} Million+ Total Visits
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-stone-900 tracking-tight mb-6 leading-tight drop-shadow-sm">
            Multiplayer Worlds <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fox-500 to-fox-700">Built for Roblox</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-700 mb-8 max-w-2xl mx-auto font-medium">
            {STUDIO_NAME} crafts high-quality, engaging experiences played by millions. 
            We push the boundaries of the Roblox platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })} 
              className="px-8 py-4 bg-stone-900 text-white font-bold rounded-full hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-stone-900/20"
            >
              Explore Games <Gamepad2 size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('work-with-us')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/50 backdrop-blur-md border border-stone-300 text-stone-900 font-bold rounded-full hover:bg-white transition-colors shadow-sm"
            >
              Work With Us
            </button>
          </div>
        </div>
      </div>

      {/* Live Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-7 relative z-20 mb-20">
        <LiveWidget stats={stats} status={status} />
      </div>

      {/* Games Grid */}
      <div id="games" className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="flex justify-between items-end mb-12 border-b border-stone-200/50 pb-4">
          <div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-2">Featured Games</h2>
             <p className="text-stone-600 font-medium">Explore our diverse portfolio of published titles, ranked by live players.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedGames.map(game => (
             <GameCard 
               key={game.id} 
               game={game} 
               stats={statsMap[game.masterId]}
             />
          ))}
        </div>
      </div>

      {/* About Section - Glassmorphism */}
      <div id="about" className="bg-white/30 backdrop-blur-xl py-24 border-y border-white/20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
           <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-8">About {STUDIO_NAME}</h2>
           
           <div className="text-left md:text-center max-w-4xl mx-auto">
             <p className="text-stone-700 mb-4 leading-relaxed font-medium text-lg">
               Founded by <strong>Laksh Dhanani</strong>,Motion Fox Studio has been at the forefront of Roblox development for over 8 years. What started as a solo passion project has grown into a full-scale development studio.
             </p>
             <p className="text-stone-700 mb-12 leading-relaxed font-medium text-lg">
             We build high performance Roblox experiences designed for engagement, retention, and scale. Our team handles everything scripting, 3D environments, UI/UX, monetization, economy balancing, live events, and ongoing updates.
             </p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
             <div className="p-6 bg-white/50 backdrop-blur-md rounded-xl border border-white/50 shadow-lg shadow-stone-500/5">
               <div className="text-4xl font-bold text-fox-600 mb-2">8+</div>
               <div className="text-sm text-stone-500 font-bold uppercase tracking-wider">Years Experience</div>
             </div>
             <div className="p-6 bg-white/50 backdrop-blur-md rounded-xl border border-white/50 shadow-lg shadow-stone-500/5">
               <div className="text-4xl font-bold text-fox-600 mb-2">{games.length}</div>
               <div className="text-sm text-stone-500 font-bold uppercase tracking-wider">Published Titles</div>
             </div>
             <div className="p-6 bg-white/50 backdrop-blur-md rounded-xl border border-white/50 shadow-lg shadow-stone-500/5">
               <div className="text-4xl font-bold text-fox-600 mb-2">25+</div>
               <div className="text-sm text-stone-500 font-bold uppercase tracking-wider">Team Members</div>
             </div>
           </div>
        </div>
      </div>

      {/* Work With Us Section - Glassmorphism */}
      <div id="work-with-us" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-fox-600 font-bold tracking-wider uppercase text-sm mb-2 block bg-white/50 w-fit px-2 py-1 rounded">Work With Us</span>
              <h2 className="text-4xl font-extrabold text-stone-900 mb-6">Let's Build the Next Big Hit Together</h2>
              <p className="text-stone-700 mb-8 text-lg font-medium">
              We craft fully customized Roblox games and immersive virtual worlds from scripting and systems design to 3D art, events, and monetization. Whether you're launching a brand new title or upgrading an existing one, we handle every step of development.

              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Full Game Development",
                  "Scripting, Systems & Game Mechanics",
                  "Art, Modeling & Visual Design",
                  "Game Economy, Monetization & Live Ops",
                  "QA, Compliance & Publishing Support",

                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-fox-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [pass, setPass] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Security Note: This is client-side only. Real apps should use server-side auth.
    if(pass === 'MotionFox2025!') onLogin(); 
    else alert('Incorrect password.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 relative z-10 pt-24">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl p-8 rounded-xl border border-white/40 shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
           <img src={STUDIO_LOGO_URL} alt="Logo" referrerPolicy="no-referrer" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">Admin Access</h2>
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="w-full bg-white/50 border border-stone-200 p-3 rounded-lg mb-4 text-stone-900 focus:border-fox-500 outline-none transition-colors"
        />
        <button type="submit" className="w-full bg-fox-600 text-white font-bold py-3 rounded-lg hover:bg-fox-500 transition-colors shadow-md">
          Login
        </button>
        <div className="mt-4 text-center">
            <Link to="/" className="text-stone-500 text-sm hover:text-fox-600 font-medium">Return to Home</Link>
        </div>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [statsMap, setStatsMap] = useState<Record<string, PlayerStats>>({});
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Load authentication state from localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Update localStorage when authentication changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  // Fetch Game Media (Thumbnails and Icons)
  useEffect(() => {
    const loadMedia = async () => {
      const masterIds = games.map(g => g.masterId);
      const mediaMap = await fetchGameMedia(masterIds);
      
      setGames(prevGames => prevGames.map(game => {
        const media = mediaMap[game.masterId];
        if (media) {
          // Only update if we got a valid URL back
          return {
            ...game,
            thumbnailUrl: media.thumbnailUrl || game.thumbnailUrl,
            iconUrl: media.iconUrl || game.iconUrl
          };
        }
        return game;
      }));
    };

    loadMedia();
  }, []); 

  // Live Stats Polling
  useEffect(() => {
    const loadStats = async () => {
      setStatus(LoadingState.LOADING);
      try {
        const masterIds = games.map(g => g.masterId);
        const stats = await fetchLiveStats(masterIds);
        const global = calculateGlobalStats(stats);
        
        setStatsMap(stats);
        setGlobalStats(global);
        setStatus(LoadingState.SUCCESS);
      } catch (e) {
        console.error(e);
        setStatus(LoadingState.ERROR);
      }
    };

    // Initial load
    loadStats();

    // Poll every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [games]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header isAuthenticated={isAuthenticated} />
            <Home games={games} stats={globalStats} statsMap={statsMap} status={status} />
            <Footer />
          </>
        } />
        <Route path="/admin" element={
          <>
            <Header isAuthenticated={isAuthenticated} />
            {isAuthenticated ? 
              <AdminPanel games={games} setGames={setGames} onLogout={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated');
              }} /> : 
              <Login onLogin={() => setIsAuthenticated(true)} />
            }
          </>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
