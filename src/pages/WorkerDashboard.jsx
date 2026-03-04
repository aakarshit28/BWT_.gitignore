import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { calculateGigScore } from '../utils/gigEngine';
import mockData from '../data/mockTransactions.json';
import { ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

const WorkerDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching user profile
        setTimeout(() => {
            const result = calculateGigScore(mockData);
            setUserData({
                name: "Rahul Sharma",
                docId: "user_123_gig_profile",
                ...result
            });
            setLoading(false);
        }, 1500); // 1.5s simulated delay
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-cyan-400">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full mb-4"
                />
                <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Processing Identity...</p>
            </div>
        );
    }

    const { score, avgMonthlyGigIncome, burnRate, name, docId } = userData;

    // Score indicator color
    let scoreColor = "text-cyan-400";
    if (score < 600) scoreColor = "text-red-400";
    else if (score < 700) scoreColor = "text-yellow-400";

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex flex-col items-center font-sans tracking-tight">

            {/* Header */}
            <header className="w-full max-w-md pt-8 mb-8 flex items-center justify-between">
                <div className="text-xl font-black tracking-tighter w-8 h-8 rounded bg-zinc-800 flex items-center justify-center">GF</div>
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-xs font-semibold">
                    <ShieldCheck size={14} /> Verified Worker
                </div>
            </header>

            {/* Main Passport Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px] -z-10 rounded-full mix-blend-screen" />

                <h1 className="text-2xl font-semibold mb-1">{name}</h1>
                <p className="text-zinc-500 text-sm mb-8 flex items-center gap-2">
                    Zomato Delivery Partner
                </p>

                {/* Score Ring */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-48 h-48 flex flex-col items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="96" cy="96" r="88" className="stroke-zinc-800 fill-none" strokeWidth="8" />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="88"
                                className={`stroke-current ${scoreColor} fill-none drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]`}
                                strokeWidth="8"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: 553, strokeDashoffset: 553 }} // 2 * pi * 88
                                animate={{ strokeDashoffset: 553 - (553 * (score / 850)) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        </svg>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">Stability Score</span>
                            <span className={`text-6xl font-black ${scoreColor} tracking-tighter`}>{score}</span>
                        </motion.div>
                    </div>
                </div>

                {/* Financial Data Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-2 uppercase">
                            <TrendingUp size={12} className="text-emerald-400" /> Avg Income
                        </div>
                        <div className="text-xl font-semibold">₹{avgMonthlyGigIncome.toLocaleString()}</div>
                    </div>
                    <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-2 uppercase">
                            <AlertCircle size={12} className="text-red-400" /> 90d Burn
                        </div>
                        <div className="text-xl font-semibold">₹{burnRate.toLocaleString()}</div>
                    </div>
                </div>

                {/* QR Code Segment */}
                <div className="pt-6 border-t border-zinc-800 flex flex-col items-center pb-2">
                    <p className="text-zinc-500 text-xs font-mono text-center mb-4 uppercase tracking-wider">Lender Verification Passport</p>
                    <div className="bg-white p-3 rounded-2xl">
                        <QRCodeSVG
                            value={docId}
                            size={140}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"Q"}
                            includeMargin={false}
                        />
                    </div>
                    <p className="text-zinc-600 text-[10px] mt-4 font-mono">{docId}</p>
                </div>
            </motion.div>

        </div>
    );
};

export default WorkerDashboard;
