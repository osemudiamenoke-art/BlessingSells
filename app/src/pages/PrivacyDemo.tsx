import React, { useState, useEffect } from 'react';
import { Shield, Zap, Lock, Database, Cpu, Activity, RefreshCw } from 'lucide-react';

const PrivacyDemo = () => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [isProving, setIsProving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [anonymitySet, setAnonymitySet] = useState(1428);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const simulateZKProof = async () => {
    setIsProving(true);
    setProgress(0);
    setLogs([]);
    
    const steps = [
      "Initializing Circom compiler...",
      "Generating witness from private inputs...",
      "Synthesizing R1CS constraints...",
      "Computing FFT for polynomial commitment...",
      "Generating Groth16 proof...",
      "Proof generated. Aggregating with Merkle root..."
    ];

    for (let i = 0; i < steps.length; i++) {
      addLog(steps[i]);
      for (let p = 0; p <= 100 / steps.length; p += 5) {
        setProgress(prev => Math.min(prev + 5, (i + 1) * (100 / steps.length)));
        await new Promise(r => setTimeout(r, 150));
      }
    }
    
    setIsProving(false);
    addLog("✓ Transaction committed to anonymity set.");
    setAnonymitySet(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans p-8 selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AEGIS PRIVACY PROTOCOL
            </h1>
            <p className="text-slate-500 text-sm mt-1">Non-custodial ZK-SNARK Mixer • v4.2.0-stable</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3">
              <Database size={18} className="text-purple-400" />
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Anonymity Set</p>
                <p className="text-lg font-mono font-bold">{anonymitySet.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#111114] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex border-b border-white/5">
                {['deposit', 'withdraw'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                      activeTab === tab ? 'bg-white/5 text-purple-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Asset</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['ETH', 'USDC', 'SOL'].map(asset => (
                      <button key={asset} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-purple-500/50 transition-all text-left group">
                        <p className="text-xl font-bold group-hover:text-purple-400 transition-colors">{asset}</p>
                        <p className="text-[10px] text-slate-500 mt-1">Mainnet-v1</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-2xl font-mono focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                      <button className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded hover:bg-white/20">MAX</button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={simulateZKProof}
                  disabled={isProving}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl font-bold text-white shadow-lg shadow-purple-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:grayscale"
                >
                  {isProving ? 'SYNTHESIZING PROOF...' : 'INITIALIZE COMMITMENT'}
                </button>
              </div>
            </div>

            {/* Proof Console */}
            <div className="bg-[#000] border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-hidden h-48 relative">
              <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] text-slate-500">
                <Activity size={12} className="text-green-500 animate-pulse" />
                LIVE_OUTPUT
              </div>
              <div className="space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className="text-slate-400 italic">
                    <span className="text-purple-500/50 mr-2">➜</span> {log}
                  </div>
                ))}
                {isProving && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>COMPUTING_WITNESS</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats & Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} className="text-blue-400" />
                Protocol Security
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-500">Privacy Score</span>
                  <span className="text-2xl font-mono text-green-400">98/100</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1.5 bg-green-500/20 border border-green-500/30 rounded-sm" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Latency</p>
                  <p className="text-sm font-mono mt-1">~14.2s</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Relayers</p>
                  <p className="text-sm font-mono mt-1">42 Active</p>
                </div>
              </div>

              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <div className="flex gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg h-fit">
                    <Lock size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-purple-200">Commitment Key</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Your commitment key is stored locally in IndexedDB. Never share your nullifier.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                <RefreshCw size={14} className="text-orange-400" />
                Recent State Transitions
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between text-[11px] border-b border-white/5 pb-3 last:border-0">
                    <div className="flex gap-3 items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                      <span className="font-mono text-slate-400">0x{Math.random().toString(16).slice(2, 10)}...</span>
                    </div>
                    <span className="text-slate-500">{(i * 4)}m ago</span>
                    <span className="text-green-500/80 font-bold uppercase tracking-tighter">Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyDemo;
