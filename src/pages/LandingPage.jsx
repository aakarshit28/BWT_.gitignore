import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [overlayPhase, setOverlayPhase] = useState(0); // 0: initial text, 1: second text, 2: expanding dot, 3: hide

    useEffect(() => {
        // Cinematic Intro Sequence
        const timers = [
            setTimeout(() => setOverlayPhase(1), 2500), // Change text after 2.5s
            setTimeout(() => setOverlayPhase(2), 5000), // Expand dot after 5s
            setTimeout(() => setShowOverlay(false), 6500) // Hide overlay after 6.5s
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const { scrollYProgress } = useScroll();
    const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <div className="relative min-h-screen bg-zinc-950 text-zinc-50 overflow-x-hidden pt-20">

            {/* Cinematic Overlay */}
            {showOverlay && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {overlayPhase === 0 && (
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-4xl md:text-6xl font-light tracking-tighter"
                        >
                            Connecting Gig workers
                        </motion.h1>
                    )}
                    {overlayPhase === 1 && (
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-4xl md:text-6xl font-light tracking-tighter"
                        >
                            To a system that's for everyone.
                        </motion.h1>
                    )}
                    {overlayPhase >= 2 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 150 }}
                            transition={{ duration: 1.5, ease: "circIn" }}
                            className="w-10 h-10 bg-zinc-950 rounded-full"
                        />
                    )}
                </motion.div>
            )}

            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-40 bg-zinc-950/50 backdrop-blur-md border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
                        GF
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/lender" className="px-5 py-2.5 text-sm font-medium hover:text-cyan-400 transition-colors">
                            Lender Portal
                        </Link>
                        <Link to="/worker" className="px-5 py-2.5 text-sm font-semibold text-zinc-950 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] rounded-full hover:bg-cyan-300 transition-colors">
                            Worker Access
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[calc(100vh-5rem)] flex items-end pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="absolute inset-0 max-w-7xl mx-auto -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950 to-zinc-950"></div>
                    <motion.div
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
                    ></motion.div>
                </div>

                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 6.5, duration: 1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]"
                    >
                        Financial Identity <br />
                        <span className="text-zinc-500">for the Invisible 400 Million.</span>
                    </motion.h1>
                </div>
            </section>

            {/* About / Features Section (Horizontal Scroll) */}
            <section className="h-[300vh] relative bg-zinc-950">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x: xTransform }} className="flex gap-12 px-12 md:px-24">

                        {/* Feature Cards */}
                        {[
                            { title: "Zero-Knowledge Proofs", desc: "Your data never leaves your device until you authorize a specific lender." },
                            { title: "Intent Engine", desc: "Analyzes semantic transaction data (Zomato/Swiggy) without accessing core banking IDs." },
                            { title: "Dynamic Scoring", desc: "Real-time stability scores measuring gig-consistency over 90-day rolling windows." },
                            { title: "Instant Verification", desc: "Generate secure, single-use QR passport codes for instant capital access." }
                        ].map((feature, i) => (
                            <div key={i} className="w-[80vw] md:w-[40vw] flex-shrink-0 h-[60vh] bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 flex flex-col justify-end backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                                <div className="text-cyan-400 font-mono text-sm mb-4">0{i + 1}</div>
                                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-zinc-400 text-lg">{feature.desc}</p>
                            </div>
                        ))}

                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-zinc-900 py-12 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-zinc-500 text-sm font-mono">
                    <p>© 2026 GIG Flow</p>
                    <p>Built by .gitignore</p>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
