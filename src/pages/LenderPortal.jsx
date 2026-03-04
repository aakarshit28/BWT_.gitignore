import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateGigScore } from '../utils/gigEngine';
import mockData from '../data/mockTransactions.json';
import { ScanFace, UserCircle2, CheckCircle2, AlertTriangle, XCircle, Search, Settings, HelpCircle, FileText } from 'lucide-react';

// Mock DB Fetch
const fetchWorkerData = async (docId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Ideally this would fetch from Firebase using docId
            // For this demo, we use the gigEngine utility
            const data = calculateGigScore(mockData);
            resolve({ name: "Rahul Sharma", docId, ...data });
        }, 2000);
    });
};

const LenderPortal = () => {
    const [scanning, setScanning] = useState(false);
    const [workerData, setWorkerData] = useState(null);

    const handleScan = async () => {
        setScanning(true);
        setWorkerData(null);
        const data = await fetchWorkerData("user_123_gig_profile");
        setWorkerData(data);
        setScanning(false);
    };

    const getDecision = (score, income) => {
        if (score >= 700) {
            return {
                status: "APPROVED",
                color: "text-emerald-400",
                badge: "bg-emerald-400/10 border-emerald-400/20",
                icon: <CheckCircle2 className="text-emerald-400 w-16 h-16" />,
                limit: `₹${(income * 3).toLocaleString()}`,
                message: "Low Risk. Extend standard 3x monthly income line of credit."
            };
        } else if (score >= 600) {
            return {
                status: "CONDITIONAL",
                color: "text-yellow-400",
                badge: "bg-yellow-400/10 border-yellow-400/20",
                icon: <AlertTriangle className="text-yellow-400 w-16 h-16" />,
                limit: `₹${(income * 1.5).toLocaleString()}`,
                message: "Moderate Risk. Require bi-weekly repayments. Cap at 1.5x income."
            };
        } else {
            return {
                status: "HIGH RISK",
                color: "text-red-400",
                badge: "bg-red-400/10 border-red-400/20",
                icon: <XCircle className="text-red-400 w-16 h-16" />,
                limit: `₹${(income * 0.5).toLocaleString()}`,
                message: "High Risk. Micro-repayments required daily. Cap at 0.5x income."
            };
        }
    };

    return (
        <div className="flex bg-zinc-950 text-zinc-50 min-h-screen">

            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-900 bg-zinc-950/50 flex flex-col p-6 hidden lg:flex">
                <div className="text-2xl font-black tracking-tighter mb-12 flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">GF</div>
                    LenderOS
                </div>
                <nav className="flex flex-col gap-2 flex-grow">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-900 text-zinc-50 cursor-pointer">
                        <Search size={18} /> Underwriting
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-zinc-50 transition-colors cursor-pointer">
                        <FileText size={18} /> Active Loans
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-zinc-50 transition-colors cursor-pointer">
                        <Settings size={18} /> Config
                    </div>
                </nav>
                <div className="flex items-center gap-3 text-zinc-500 mt-auto">
                    <HelpCircle size={18} /> Support
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 pb-24 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full point-events-none -z-10" />

                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-light tracking-tight">Evaluate Applicant</h1>
                        <p className="text-zinc-500 mt-1">Scan Gig Worker Passport QR</p>
                    </div>
                    <button
                        onClick={handleScan}
                        disabled={scanning}
                        className="flex items-center gap-2 bg-zinc-50 text-zinc-950 px-6 py-3 rounded-full font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {scanning ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full" />
                        ) : (
                            <ScanFace size={20} />
                        )}
                        {scanning ? 'Scanning Doc ID...' : 'Scan Passport'}
                    </button>
                </header>

                <AnimatePresence mode="wait">

                    {/* Empty State */}
                    {!workerData && !scanning && (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-[60vh] flex flex-col items-center justify-center text-zinc-600 border border-dashed border-zinc-800 rounded-2xl"
                        >
                            <ScanFace size={64} className="mb-4 opacity-50" />
                            <p className="font-mono text-sm tracking-widest uppercase">Waiting for QR Scan</p>
                        </motion.div>
                    )}

                    {/* Scanning State */}
                    {scanning && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-[60vh] flex flex-col items-center justify-center text-cyan-500 border border-zinc-800 bg-zinc-900/20 rounded-2xl relative overflow-hidden"
                        >
                            <motion.div
                                animate={{ y: [-100, 100, -100] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]"
                            />
                            <UserCircle2 size={64} className="mb-4 animate-pulse opacity-50" />
                            <p className="font-mono text-sm tracking-widest uppercase">Querying Intent Engine...</p>
                        </motion.div>
                    )}

                    {/* Results State */}
                    {workerData && !scanning && (() => {
                        const decision = getDecision(workerData.score, workerData.avgMonthlyGigIncome);
                        return (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            >
                                {/* Applicant Profile */}
                                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col">
                                    <h2 className="text-xl font-semibold mb-6">Financial Identity Computed</h2>

                                    <div className="flex gap-8 mb-8 border-b border-zinc-800 pb-8">
                                        <div>
                                            <p className="text-zinc-500 text-sm mb-1 uppercase tracking-widest font-mono">Score</p>
                                            <p className={`text-5xl font-black ${decision.color}`}>{workerData.score}</p>
                                        </div>
                                        <div>
                                            <p className="text-zinc-500 text-sm mb-1 uppercase tracking-widest font-mono">Avg 90d Income</p>
                                            <p className="text-5xl font-light">₹{workerData.avgMonthlyGigIncome.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/50">
                                            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">Analyzed Doc ID</p>
                                            <p className="font-mono text-xs text-zinc-300 break-all">{workerData.docId}</p>
                                        </div>
                                        <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/50">
                                            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">Burn Rate</p>
                                            <p className="text-lg">₹{workerData.burnRate.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decision Card */}
                                <div className={`border rounded-3xl p-8 flex flex-col justify-center items-center text-center ${decision.badge}`}>
                                    <div className="mb-6">{decision.icon}</div>
                                    <h2 className={`text-4xl font-black mb-2 ${decision.color}`}>{decision.status}</h2>
                                    <p className="text-zinc-400 text-sm mb-8 leading-relaxed max-w-xs">{decision.message}</p>

                                    <div className="w-full bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
                                        <p className="text-zinc-500 text-xs uppercase font-mono tracking-widest mb-2">Max Pre-Approved Limit</p>
                                        <p className="text-3xl font-light">{decision.limit}</p>
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })()}

                </AnimatePresence>
            </main>

        </div>
    );
};

export default LenderPortal;
