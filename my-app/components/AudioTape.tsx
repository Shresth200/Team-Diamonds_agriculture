"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/* 
  Reel Component 
  - Handles the visual rotation of the tape reels.
  - Interactivity: Drag to rotate/scrub.
  - Matches the reference design exactly.
*/
const Reel = ({
     onRotate,
     rotation,
}: {
     onRotate: (delta: number) => void;
     rotation: number;
}) => {
     const reelRef = useRef<HTMLDivElement>(null);
     const [isDragging, setIsDragging] = useState(false);
     const lastAngle = useRef(0);

     const handlePointerDown = (e: React.PointerEvent) => {
          setIsDragging(true);
          if (!reelRef.current) return;
          const rect = reelRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          lastAngle.current = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          (e.target as Element).setPointerCapture(e.pointerId);
     };

     const handlePointerMove = (e: React.PointerEvent) => {
          if (!isDragging || !reelRef.current) return;

          const rect = reelRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

          let delta = currentAngle - lastAngle.current;

          if (delta > Math.PI) delta -= 2 * Math.PI;
          if (delta < -Math.PI) delta += 2 * Math.PI;

          onRotate(delta);
          lastAngle.current = currentAngle;
     };

     const handlePointerUp = (e: React.PointerEvent) => {
          setIsDragging(false);
          (e.target as Element).releasePointerCapture(e.pointerId);
     };

     return (
          <div
               ref={reelRef}
               className="relative w-[180px] h-[180px] sm:w-[240px] md:w-[380px] md:h-[380px] shrink-0 aspect-square rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none transition-all duration-300"
               onPointerDown={handlePointerDown}
               onPointerMove={handlePointerMove}
               onPointerUp={handlePointerUp}
          >
               {/* Static Outer Dashed Ring */}
               <div className="absolute inset-0 rounded-full border border-dashed border-white/20 pointer-events-none scale-110" />
               <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none" />

               {/* Rotating Platter */}
               <motion.div
                    className="w-full h-full relative rounded-full border border-white/30 bg-black/50 backdrop-blur-sm"
                    style={{ rotate: rotation * (180 / Math.PI) }}
               >
                    {/* Spokes (Crosshairs) - Elegant thin lines */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2 rotate-60" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2 rotate-120" />

                    {/* Center Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] bg-neutral-950 rounded-full border-[3px] border-white z-10 flex items-center justify-center shadow-2xl">
                         {/* Inner Bolt Pattern */}
                         <div className="relative w-[60%] h-[60%]">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                         </div>
                    </div>
               </motion.div>
          </div>
     );
};

const tracks = [
     {
          id: 'en',
          label: 'English',
          src: '/audio/English.mp3',
          text: `KrishiMitraAI is an intelligent farming assistant that helps farmers make the right decisions throughout the crop lifecycle — from sowing to harvest.

Farmers share details in their native language, while IoT sensors collect real-time field data like soil moisture and weather conditions. Using agentic AI, KrishiMitraAI understands crop stages and local conditions to recommend the best actions at the right time — irrigation, fertilizer, pest control, and harvesting.

As conditions change, the AI updates its guidance automatically, providing continuous and personalized support.

KrishiMitraAI — your trusted AI partner in agriculture.`
     },
     {
          id: 'hi',
          label: 'Hindi',
          src: '/audio/Hindi.mp3',
          text: `स्वागत है KrishiMitraAI में।

KrishiMitraAI एक बुद्धिमान कृषि सहायक है, जो बीज बोने से लेकर कटाई तक किसानों को सही निर्णय लेने में मदद करता है।

किसान अपनी स्थानीय भाषा में जानकारी देते हैं और खेत में लगे IoT सेंसर मौसम व मिट्टी की जानकारी इकट्ठा करते हैं। एजेंटिक AI इस डेटा को समझकर सिंचाई, खाद, कीट नियंत्रण और कटाई के लिए सही समय पर सही सलाह देता है।

परिस्थितियाँ बदलते ही सलाह भी अपडेट हो जाती है।

KrishiMitraAI — खेती के लिए आपका भरोसेमंद AI मित्र।`
     },
     {
          id: 'mr',
          label: 'Marathi',
          src: '/audio/Marathi.mp3',
          text: `KrishiMitraAI मध्ये आपले स्वागत आहे.

KrishiMitraAI हा एक बुद्धिमान कृषी सहाय्यक आहे, जो पेरणीपासून कापणीपर्यंत शेतकऱ्यांना योग्य निर्णय घेण्यास मदत करतो.

शेतकरी आपल्या स्थानिक भाषेत माहिती देतात आणि IoT सेन्सर्स माती व हवामानाचा डेटा गोळा करतात. एजेंटिक AI या माहितीच्या आधारे पाणी, खत, कीड नियंत्रण आणि कापणीसाठी योग्य सल्ला योग्य वेळी देतो.

परिस्थिती बदलल्यावर सल्ला आपोआप अपडेट होतो.

KrishiMitraAI — शेतीसाठी तुमचा विश्वासू AI मित्र।`
     },
     {
          id: 'te',
          label: 'Telugu',
          src: '/audio/Telugu.mp3',
          text: `KrishiMitraAI కి స్వాగతం.

KrishiMitraAI ఒక తెలివైన వ్యవసాయ సహాయకుడు. ఇది విత్తనాలు వేసిన దశ నుండి పంట కోత వరకు రైతులకు సరైన నిర్ణయాలు తీసుకునేలా సహాయం చేస్తుంది.

రైతులు తమ స్థానిక భాషలో సమాచారం ఇస్తారు. పొలాల్లో ఉన్న IoT సెన్సర్లు మట్టి తేమ, వాతావరణ పరిస్థితుల వంటి డేటాను సేకరిస్తాయి. ఏజెంటిక్ AI ఈ సమాచారాన్ని విశ్లేషించి నీరు, ఎరువులు, పురుగుల నియంత్రణ మరియు కోతకు సంబంధించిన సరైన సూచనలు సరైన సమయంలో అందిస్తుంది.

పరిస్థితులు మారినప్పుడు సలహాలు కూడా స్వయంచాలకంగా మారుతాయి.

KrishiMitraAI — వ్యవసాయానికి మీ నమ్మకమైన AI మిత్రుడు.`
     },
     {
          id: 'bn',
          label: 'Bengali',
          src: '/audio/Bengali.mp3',
          text: `KrishiMitraAI-এ আপনাকে স্বাগতম।

KrishiMitraAI একটি বুদ্ধিমান কৃষি সহকারী, যা বীজ বপন থেকে ফসল কাটার পর্যন্ত কৃষকদের সঠিক সিদ্ধান্ত নিতে সাহায্য করে।

কৃষকরা তাদের নিজস্ব ভাষায় তথ্য দেন এবং মাঠে বসানো IoT সেন্সর মাটির আর্দ্রতা ও আবহাওয়ার তথ্য সংগ্রহ করে। এজেন্টিক AI এই তথ্য বিশ্লেষণ করে সেচ, সার, পোকা নিয়ন্ত্রণ এবং ফসল কাটার জন্য সঠিক সময়ে সঠিক পরামর্শ দেয়।

পরিস্থিতি পরিবর্তন হলে পরামর্শও স্বয়ংক্রিয়ভাবে আপডেট হয়।

KrishiMitraAI — কৃষির জন্য আপনার বিশ্বস্ত AI সঙ্গী।`
     }
];

export default function AudioTape() {
     const [isPlaying, setIsPlaying] = useState(false);
     const [currentTrack, setCurrentTrack] = useState(tracks[0]);
     const audioRef = useRef<HTMLAudioElement | null>(null);
     const [rotation, setRotation] = useState(0);
     const [currentTime, setCurrentTime] = useState(0);
     const textContainerRef = useRef<HTMLDivElement>(null);

     // Initialize Audio
     useEffect(() => {
          // Check if window is defined (client-side)
          if (typeof window !== 'undefined') {
               audioRef.current = new Audio(tracks[0].src); // Initialize with first track src
               audioRef.current.loop = false; // Usually narration isn't looped, but can be if requested

               audioRef.current.addEventListener("timeupdate", () => {
                    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
               });

               audioRef.current.addEventListener("ended", () => {
                    setIsPlaying(false);
               });
          }

          return () => {
               if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current = null;
               }
          };
     }, []); // Run once on mount

     // Update src when track changes
     useEffect(() => {
          if (audioRef.current) {
               // Only update if src is different to avoid reset
               if (audioRef.current.src !== new URL(currentTrack.src, window.location.href).href &&
                    audioRef.current.src !== currentTrack.src) {
                    const wasPlaying = isPlaying;
                    audioRef.current.src = currentTrack.src;
                    if (wasPlaying) { // Keep playing state
                         audioRef.current.play().catch(e => console.log("Play failed", e));
                    }
               }
          }
     }, [currentTrack, isPlaying]);

     // Text Animation
     const { contextSafe } = useGSAP({ scope: textContainerRef });

     const animateTextChange = contextSafe(() => {
          gsap.fromTo(".about-text",
               { opacity: 0, y: 10, filter: "blur(5px)" },
               { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out", stagger: 0.1 }
          );
     });

     const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const trackId = e.target.value;
          const track = tracks.find(t => t.id === trackId) || tracks[0];
          setCurrentTrack(track);
          // Only play if already playing, or let user press play. 
          // User requested "use this audio for evry language provided", so we use the files we found.
          animateTextChange();
     };

     const togglePlay = () => {
          // If audio context is locked or not initiated
          if (!audioRef.current) return;

          if (isPlaying) {
               audioRef.current.pause();
          } else {
               audioRef.current.play().catch(e => console.log("Audio play failed", e));
               animateTextChange(); // Re-trigger text reveal on play if intended
          }
          setIsPlaying(!isPlaying);
     };

     // Rotation Loop
     useEffect(() => {
          let animationFrame: number;
          const animate = () => {
               if (isPlaying) {
                    setRotation((prev) => prev + 0.02);
               }
               animationFrame = requestAnimationFrame(animate);
          };
          animate();
          return () => cancelAnimationFrame(animationFrame);
     }, [isPlaying]);

     const handleRotate = (delta: number) => {
          // Scrub sensitivity
          const timeDelta = (delta / (2 * Math.PI)) * 5;
          if (audioRef.current) {
               let newTime = audioRef.current.currentTime + timeDelta;
               if (newTime < 0) newTime = 0;
               if (newTime > audioRef.current.duration) newTime = audioRef.current.duration || 0;

               audioRef.current.currentTime = newTime;
               setCurrentTime(newTime);
               setRotation((start) => start + delta);
          }
     };

     const formatTime = (time: number) => {
          const minutes = Math.floor(time / 60);
          const seconds = Math.floor(time % 60);
          const ms = Math.floor((time % 1) * 1000);
          return `${minutes}:${seconds.toString().padStart(2, "0")}:${ms.toString().padStart(3, "0")}`;
     };

     return (
          <section className="w-full py-24 px-4 relative z-20 flex flex-col items-center justify-center bg-transparent">

               {/* Global container */}
               <div className="container mx-auto max-w-7xl flex flex-col items-center gap-16">

                    {/* Header: Title */}
                    <div className="text-center space-y-4">
                         <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/50">
                              About <span className="text-emerald-500">KrishiMitra</span>
                         </h2>
                         <p className="text-neutral-400 font-mono text-sm uppercase max-w-lg mx-auto leading-relaxed tracking-wider">
                              Your AI-powered companion for sustainable and smarter agriculture. Select a language to listen.
                         </p>
                    </div>

                    {/* DJ Interface Wrapper */}
                    <div className="w-full flex flex-col items-center relative">

                         {/* Deck Wrapper: Centered Player with Reels overlapping sides */}
                         <div className="relative flex flex-col xl:flex-row items-center justify-center gap-4 md:gap-8 w-full">

                              {/* Left Reel */}
                              <div className="hidden md:block xl:-mr-24 z-0 scale-90 xl:scale-100 transition-transform origin-right">
                                   <Reel rotation={rotation} onRotate={handleRotate} />
                              </div>

                              {/* Central Player Deck */}
                              <div className="relative z-10 w-full max-w-[700px] min-h-[400px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] border border-white/10 bg-[#0a0a0a] flex flex-col p-8 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)] shrink-0 overflow-hidden group">

                                   {/* Subtle Glass Noise/Texture */}
                                   <div className="absolute inset-0 bg-white/5 opacity-5 pointer-events-none" />

                                   {/* Top Status Bar */}
                                   <div className="flex justify-between items-center font-mono text-[10px] md:text-xs text-neutral-500 uppercase mb-8 tracking-[0.2em] relative z-20">
                                        <div className="flex items-center gap-2">
                                             <Play
                                                  className={isPlaying ? "animate-pulse text-emerald-500" : ""}
                                                  fill={isPlaying ? "currentColor" : "none"}
                                                  size={12}
                                             />
                                             <span className={isPlaying ? "text-emerald-400" : ""}>{isPlaying ? "PLAYING" : "PAUSED"}</span>
                                        </div>
                                        <div className="text-white font-bold">{formatTime(currentTime)}</div>
                                        <div className="flex items-center gap-2">
                                             <span>TRACK</span>
                                             <span className="text-white">0{tracks.findIndex(t => t.id === currentTrack.id) + 1}</span>
                                        </div>
                                   </div>

                                   {/* Main Content Area (Text Display instead of Waveform) */}
                                   <div className="grow relative z-20 overflow-y-auto custom-scrollbar mask-linear-fade" ref={textContainerRef}>
                                        <div className="prose prose-invert prose-lg max-w-none">
                                             {currentTrack.text.split('\n\n').map((paragraph, index) => (
                                                  <p
                                                       key={`${currentTrack.id}-${index}`}
                                                       className="about-text text-gray-300 leading-relaxed text-lg md:text-xl font-light mb-6 last:mb-0 transition-all duration-500"
                                                  >
                                                       {paragraph}
                                                  </p>
                                             ))}
                                        </div>

                                        {!isPlaying && currentTime === 0 && (
                                             <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
                                                  <div className="text-white/40 font-mono text-sm uppercase tracking-widest border border-white/10 px-6 py-3 rounded-full">
                                                       Initialize System
                                                  </div>
                                             </div>
                                        )}
                                   </div>

                                   {/* Bottom Controls */}
                                   <div className="flex justify-between items-end mt-8 relative z-20 pt-6 border-t border-white/5">

                                        {/* Left: Language Selector (Styled as LCD) */}
                                        <div className="flex flex-col gap-1">
                                             <label className="text-[10px] uppercase text-neutral-600 font-bold tracking-wider">Language Data</label>
                                             <div className="relative group">
                                                  <select
                                                       value={currentTrack.id}
                                                       onChange={handleTrackChange}
                                                       className="appearance-none bg-neutral-900/50 border border-white/10 text-emerald-500 font-mono text-xs md:text-sm py-2 pl-3 pr-8 rounded-md focus:outline-none focus:border-emerald-500/50 cursor-pointer hover:bg-neutral-800 transition-colors uppercase"
                                                  >
                                                       {tracks.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                                  </select>
                                                  {/* Custom Arrow */}
                                                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                                       <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-neutral-500" />
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Center: Brand */}
                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 hidden md:flex flex-col items-center opacity-30">
                                             <div className="text-[10px] tracking-[0.5em] font-light text-white">SYSTEM</div>
                                             <div className="w-12 h-px bg-white/50 mt-1" />
                                        </div>

                                        {/* Right: Audio Indicator */}
                                        <div className="flex items-center gap-3">
                                             <div className="text-right">
                                                  <div className="text-[10px] text-neutral-500 tracking-wider">AUDIO</div>
                                                  <div className={`text-xs font-bold font-mono ${isPlaying ? "text-emerald-400" : "text-neutral-700"}`}>{isPlaying ? "ACTIVE" : "STANDBY"}</div>
                                             </div>
                                             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ opacity: isPlaying ? 1 : 0.2 }} />
                                        </div>
                                   </div>
                              </div>

                              {/* Right Reel */}
                              <div className="hidden md:block xl:-ml-24 z-0 scale-90 xl:scale-100 transition-transform origin-left">
                                   <Reel rotation={rotation} onRotate={handleRotate} />
                              </div>
                         </div>

                         {/* Main Play Button (Floating Below) */}
                         <div className="mt-12 md:-mt-8 relative z-30">
                              <button
                                   onClick={togglePlay}
                                   className="group relative w-48 h-16 bg-emerald-500 rounded-full flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] cursor-pointer overflow-hidden"
                              >
                                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />

                                   {isPlaying ? (
                                        <Pause className="fill-black text-black relative z-10" />
                                   ) : (
                                        <Play className="fill-black text-black relative z-10" />
                                   )}
                                   <span className="font-bold text-black text-lg tracking-widest relative z-10 pt-1 font-mono">
                                        {isPlaying ? "PAUSE" : "PLAY"}
                                   </span>
                              </button>
                         </div>

                    </div>
               </div>
          </section>
     );
}
