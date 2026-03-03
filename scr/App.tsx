/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  User,
  MessageCircle,
  Share2,
  Power,
  Volume2,
  Wifi,
  ChevronLeft,
  Image as ImageIcon,
  X,
  ExternalLink
} from "lucide-react";

type ViewState = 'profile' | 'high-poly' | 'mid-poly' | 'low-poly';

const highPolyImages = [
  "https://media.discordapp.net/attachments/948898963766001665/1477037858291187732/image2.png?ex=69a34e33&is=69a1fcb3&hm=80a9764cb86563267465cacd6b13d96649c6657cb5fdb412cca3dfbe5f2a28ab&=&format=webp&quality=lossless&width=1250&height=704",
  "https://media.discordapp.net/attachments/948898963766001665/1477037859218260203/image.png?ex=69a34e33&is=69a1fcb3&hm=ee22df07913c19db3cae6b3f18505ad5c69c80d01bdedffd4b0ad4afffcbb29f&=&format=webp&quality=lossless&width=1250&height=704",
  "https://media.discordapp.net/attachments/948898963766001665/1477037857616171171/frame_2_delay-2.5s.jpg?ex=69a34e33&is=69a1fcb3&hm=4cf43c53520487753978d248b9fdfae5f2b4ed59c501f1ded311b863b7f13974&=&format=webp&width=998&height=576",
  "https://media.discordapp.net/attachments/948898963766001665/1477037856051560508/image4.png?ex=69a34e32&is=69a1fcb2&hm=b4ddd69d5edb7ca020334c0999ffdb32f1b943b67bd1fcac961254f3c0b9176b&=&format=webp&quality=lossless&width=1355&height=704",
  "https://media.discordapp.net/attachments/948898963766001665/1477037856869322782/image3.png?ex=69a34e33&is=69a1fcb3&hm=10079773e58c8376dfcbaeb255db449e09faf925e6162346ed89cdf3ca269735&=&format=webp&quality=lossless&width=1418&height=704",
  "https://media.discordapp.net/attachments/948898963766001665/1477037855095394507/image5.png?ex=69a34e32&is=69a1fcb2&hm=93d2a3481233999cfdd40e46267fc195a20645d23da028d3e247287254d9a9f9&=&format=webp&quality=lossless&width=1084&height=704"
];

const midPolyImages = [
  "https://media.discordapp.net/attachments/948898963766001665/1477045512036286586/Union11_nmap.png?ex=69a35554&is=69a203d4&hm=0c0ff354b9262a31f126eb61242bb9420d8b7335871ff8adb4a6e678313f562c&=&format=webp&quality=lossless&width=1384&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477045513282125966/New_Project.png?ex=69a35554&is=69a203d4&hm=bca455067cb31464c978f7726e771b456a0c2a4896a0a80fbc2f0563cdaafcfa&=&format=webp&quality=lossless&width=1384&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477045513726591047/image.png?ex=69a35554&is=69a203d4&hm=6014a35c98f22a816a285961c444898122a475b0956575ab683be48a66b90739&=&format=webp&quality=lossless&width=1222&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477045511633637487/image.png?ex=69a35554&is=69a203d4&hm=2e2207ef7d59dd7b7a29a28c4451fb0d3cd3e0bf88dc04e9e08d607d1017ed31&=&format=webp&quality=lossless",
  "https://media.discordapp.net/attachments/948898963766001665/1477045512820756490/image.png?ex=69a35554&is=69a203d4&hm=b41c7d4ba1826879ee495d0e083c13a6851802c037d7c3d00c7604b4c5836308&=&format=webp&quality=lossless&width=1362&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477046551292543067/image.png?ex=69a3564c&is=69a204cc&hm=3ad4f7b3fd1235ffaf6cb3e84fc2c9528ebd62aa2ed094759fcb440f4f02f141&=&format=webp&quality=lossless&width=1376&height=806"
];

const lowPolyImages = [
  "https://media.discordapp.net/attachments/948898963766001665/1477049855745458206/image.png?ex=69a3595f&is=69a207df&hm=d952d7abc58678e5b34f873d2b97af81709fdb7fc617ed208fa0c2cbd069686e&=&format=webp&quality=lossless&width=1600&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477049855065985024/New_Project.png?ex=69a3595f&is=69a207df&hm=62527ba774e3498d64dd452625f6a0d684a201cc519aede5f84db613b3fd47b6&=&format=webp&quality=lossless&width=1384&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477049856567672972/frame_3_delay-2.5s.jpg?ex=69a35960&is=69a207e0&hm=d11819da1cdcd9a2075da377b098ee9f2015ba657a68fe48c4e183bec5863ba4&=&format=webp",
  "https://media.discordapp.net/attachments/948898963766001665/1477049857939210442/hammx-murshid-12.png?ex=69a35960&is=69a207e0&hm=f1c63b37687f649246ba10055847113a73d63b0e5ec235777ded6065c5bf5a4f&=&format=webp&quality=lossless&width=1434&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477049857452539945/hammx-murshid-untitled.png?ex=69a35960&is=69a207e0&hm=247b7f1174a9e4bedc75377e1e03c4126683a0e82ba8be9dc2e91fcea7722aaa&=&format=webp&quality=lossless&width=1384&height=779",
  "https://media.discordapp.net/attachments/948898963766001665/1477049858312634461/image.png?ex=69a35960&is=69a207e0&hm=f32b84de85d81eb1671a655ec151cc9e67b7606e57fe565aa839b85f72dd9e55&=&format=webp&quality=lossless&width=1394&height=779"
];

export default function App() {
  const [isOn, setIsOn] = useState(true);
  const [time, setTime] = useState(new Date());
  const [view, setView] = useState<ViewState>('profile');
  const [mousePos, setMousePos] = useState({ x: 50, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);
  const [showRedirectPopup, setShowRedirectPopup] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderGallery = (category: string) => {
    let images = highPolyImages;
    if (category === 'mid-poly') images = midPolyImages;
    if (category === 'low-poly') images = lowPolyImages;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="h-full flex flex-col"
      >
        <div className="flex justify-between items-center mb-4 border-b border-cyan-900/50 pb-2">
          <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            {category} GALLERY
          </h2>
          <button 
            onClick={() => setView('profile')} 
            className="flex items-center gap-1 text-cyan-500 hover:text-cyan-300 text-xs border border-cyan-800 px-2 py-1 bg-cyan-950/30 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> BACK
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4 custom-scrollbar flex-1">
          {images.map((src, i) => (
            <div 
              key={i} 
              className="aspect-video bg-black border border-cyan-900/50 relative group overflow-hidden rounded-sm cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`${category} art ${i}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-cyan-500 text-[10px] p-1.5 font-mono border-t border-cyan-900/50 transform translate-y-full group-hover:translate-y-0 transition-transform">
                IMG_00{i + 1}.DAT // {category.toUpperCase()}
              </div>
              {/* Scanline overlay for images */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative z-0">
      
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundColor: '#0f0f11',
          backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #1a1a20 0%, #0f0f11 60%)`
        }}
      />

      {/* Main Device Container */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-5xl carbon-fiber p-4 sm:p-8 rounded-[32px] shadow-2xl relative overflow-hidden"
      >
        {/* Dynamic Highlight for Carbon Fiber */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay z-0"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
          }}
        />

        <div 
          className="machined-aluminum p-6 sm:p-10 relative z-10"
          style={{
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.5) 0%, transparent 50%),
              linear-gradient(135deg, #e5e7eb 0%, #f9fafb 20%, #9ca3af 50%, #e5e7eb 80%, #6b7280 100%)
            `
          }}
        >
          
          {/* Screws */}
          <div className="screw top-4 left-4" />
          <div className="screw top-4 right-4" />
          <div className="screw bottom-4 left-4" />
          <div className="screw bottom-4 right-4" />

          {/* Top Device Bar */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-400/30 pb-4">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 led-indicator ${isOn ? 'on' : ''}`} />
              <span className="text-gray-700 font-display font-bold text-xl tracking-widest uppercase text-shadow-sm">
                SABMOHMAYA // TERMINAL
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <div className="w-12 h-2 inset-panel rounded-full" />
                <div className="w-12 h-2 inset-panel rounded-full" />
              </div>
              <button 
                onClick={() => setIsOn(!isOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isOn ? 'bg-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]' : 'bg-gray-100 shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,1)] border border-gray-300'}`}
              >
                <Power className={`w-5 h-5 ${isOn ? 'text-cyan-600' : 'text-red-500'}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Profile & Controls */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Profile Image Bezel */}
              <div className="p-2 inset-panel">
                <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-900 shadow-inner bg-black">
                  <img 
                    src="https://media.discordapp.net/attachments/948898963766001665/1477019683164258315/0001-0252-ezgif.com-optimize.gif?ex=69a33d46&is=69a1ebc6&hm=8d4f2f0d879767232d86d7b6c989870238a54219010ba6a593be8c7defbefbf1&=&width=834&height=834" 
                    alt="Profile" 
                    className={`w-full h-full object-cover transition-all duration-700 ${!isOn ? 'opacity-0' : 'opacity-80 sepia-[.2] contrast-125'}`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
                  {/* Scanlines */}
                  <div className="scanlines opacity-30" />
                </div>
              </div>

              {/* Hardware Buttons */}
              <div className="grid grid-cols-2 gap-4 p-4 inset-panel">
                <button 
                  onClick={() => {
                    setShowRedirectPopup(true);
                    setTimeout(() => {
                      setShowRedirectPopup(false);
                      window.open("https://www.artstation.com/sab_mohmaya", "_blank");
                    }, 3000);
                  }}
                  className="tactile-btn py-3 px-2 flex flex-col items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">ArtStation</span>
                </button>
                <button 
                  onClick={() => window.location.href = "mailto:sabmohmaya.3d@gmail.com"}
                  className="tactile-btn py-3 px-2 flex flex-col items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(".sabmohmaya");
                    setShowCopiedPopup(true);
                    setTimeout(() => setShowCopiedPopup(false), 2000);
                  }}
                  className="tactile-btn py-3 px-2 flex flex-col items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Connect</span>
                </button>
                <button className="tactile-btn py-3 px-2 flex flex-col items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Share</span>
                </button>
              </div>

              {/* Speaker Grill */}
              <div className="h-16 speaker-grill rounded-lg opacity-80" />

            </div>

            {/* Right Column: Main Screen & Data */}
            <div className="lg:col-span-8 space-y-6 flex flex-col">
              
              {/* Main OLED Screen */}
              <div className="oled-screen p-6 flex-1 min-h-[450px] flex flex-col">
                <div className="scanlines" />
                
                <div className={`relative z-30 h-full flex flex-col transition-all duration-500 ${!isOn ? 'opacity-0' : 'opacity-100'}`}>
                  
                  {/* Screen Header */}
                  <div className="flex justify-between items-start mb-6 border-b border-cyan-900/50 pb-2">
                    <div className="font-mono text-xs text-cyan-600/70">
                      OS.VER // 2.4.1 // ONLINE
                    </div>
                    <div className="font-mono text-xs text-cyan-600/70">
                      {time.toLocaleTimeString()}
                    </div>
                  </div>

                  {/* Screen Content Area */}
                  <div className="flex-1 overflow-hidden font-mono">
                    <AnimatePresence mode="wait">
                      {view === 'profile' ? (
                        <motion.div 
                          key="profile"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar"
                        >
                          <div>
                            <h1 className="text-2xl font-bold mb-2 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                              &gt; USER: SABMOHMAYA
                            </h1>
                            <p className="text-cyan-500/80 text-sm">
                              STATUS: ACTIVE | ROLE: 3D MODELER | EXP: 7+ YRS
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-cyan-300">&gt; BIOGRAPHY_</p>
                            <p className="text-cyan-500/90 text-sm leading-relaxed pl-4 border-l-2 border-cyan-800">
                              Experienced and Dedicated 3D Modeler. Passionate expert specializing in Blender. 
                              Pursuing a degree in Architecture, familiar with architectural design and CAD. 
                              Providing high-quality low-poly to high-poly models tailored to specific requirements 
                              with efficient service and daily updates.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="border border-cyan-800/50 p-3 bg-cyan-950/20">
                              <p className="text-cyan-300 text-xs mb-2">&gt; SPECIALTIES_</p>
                              <ul className="text-cyan-500/80 text-xs space-y-1 pl-2">
                                <li>- Blender 3D</li>
                                <li>- Architectural CAD</li>
                                <li>- High-Poly Modeling</li>
                                <li>- Low-Poly Optimization</li>
                              </ul>
                            </div>
                            <div className="border border-cyan-800/50 p-3 bg-cyan-950/20">
                              <p className="text-cyan-300 text-xs mb-2">&gt; SERVICE_GUARANTEES_</p>
                              <ul className="text-cyan-500/80 text-xs space-y-1 pl-2">
                                <li>- Daily Updates</li>
                                <li>- Efficient Delivery</li>
                                <li>- Tailored Requirements</li>
                              </ul>
                            </div>
                          </div>

                          <div className="pt-4">
                            <p className="text-cyan-300 text-xs mb-3">&gt; PORTFOLIO_ACCESS (CLICK TO VIEW)</p>
                            <div className="flex gap-3">
                              <button 
                                onClick={() => setView('high-poly')}
                                className="px-3 py-1.5 bg-cyan-950/40 border border-cyan-700 text-cyan-400 text-xs hover:bg-cyan-900/60 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                              >
                                [ HIGH-POLY ]
                              </button>
                              <button 
                                onClick={() => setView('mid-poly')}
                                className="px-3 py-1.5 bg-cyan-950/40 border border-cyan-700 text-cyan-400 text-xs hover:bg-cyan-900/60 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                              >
                                [ MID-POLY ]
                              </button>
                              <button 
                                onClick={() => setView('low-poly')}
                                className="px-3 py-1.5 bg-cyan-950/40 border border-cyan-700 text-cyan-400 text-xs hover:bg-cyan-900/60 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                              >
                                [ LOW-POLY ]
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key="gallery" className="h-full">
                          {renderGallery(view)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Lower Control Panel */}
              <div className="grid grid-cols-3 gap-4 p-4 inset-panel">
                <div className="text-center">
                  <div className="text-gray-600 text-[10px] font-bold mb-1 uppercase tracking-wider">Total Visits</div>
                  <div className="bg-gray-100 border border-gray-400 shadow-inner py-1 px-2 font-mono text-sm inline-block rounded text-gray-800">3.7B</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 text-[10px] font-bold mb-1 uppercase tracking-wider">Experience</div>
                  <div className="bg-gray-100 border border-gray-400 shadow-inner py-1 px-2 font-mono text-sm inline-block rounded text-gray-800">7+ YRS</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 text-[10px] font-bold mb-1 uppercase tracking-wider">Software</div>
                  <div className="bg-gray-100 border border-gray-400 shadow-inner py-1 px-2 font-mono text-sm inline-block rounded text-gray-800">BLENDER</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>

      {/* Full Screen Image Viewer (Fake Window) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedImage(null);
              setZoomLevel(1);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Fake Window Header */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-xs font-mono">IMAGE_VIEWER.EXE</span>
                </div>
                <div className="flex items-center gap-4">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-2 bg-gray-800 rounded px-2 py-1 border border-gray-700">
                    <button 
                      onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                      className="text-gray-400 hover:text-white text-xs font-mono px-1"
                    >
                      -
                    </button>
                    <span className="text-gray-300 text-xs font-mono w-12 text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button 
                      onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
                      className="text-gray-400 hover:text-white text-xs font-mono px-1"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
                    <button 
                      onClick={() => {
                        setSelectedImage(null);
                        setZoomLevel(1);
                      }}
                      className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
                    >
                      <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Image Container */}
              <div className="relative bg-black p-2 flex items-center justify-center min-h-[50vh] max-h-[80vh] overflow-auto custom-scrollbar">
                <motion.img 
                  src={selectedImage} 
                  alt="Full screen view" 
                  animate={{ scale: zoomLevel }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="max-w-full max-h-[75vh] object-contain origin-center cursor-zoom-in"
                  onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : 1)}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discord Copied Popup */}
      <AnimatePresence>
        {showCopiedPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.2)] font-mono text-sm z-50 flex items-center gap-3"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Discord ID <strong className="text-white">.sabmohmaya</strong> copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Redirect Popup */}
      <AnimatePresence>
        {showRedirectPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.2)] font-mono text-sm z-50 flex items-center gap-3"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Redirecting to ArtStation...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

