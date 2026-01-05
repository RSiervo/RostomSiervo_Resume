
import React, { useState, useEffect } from 'react';
import { ResumeView } from './components/ResumeView';
import { ChatAssistant } from './components/ChatAssistant';
import { MOCK_RESUME } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        await geminiService.initChat(MOCK_RESUME);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize career assistant", error);
        setIsLoading(false);
      }
    };
    initialize();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-800 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-slate-700">RS</div>
        </div>
        <p className="text-slate-400 font-bold text-sm tracking-widest mt-6 animate-pulse uppercase">Assembling Experience...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-10 selection:bg-blue-900 selection:text-blue-100 print:bg-white print:pt-0 print:pb-0">
      {/* Dynamic Navigation - DARK MODE UPDATED */}
      <nav className="max-w-5xl mx-auto mb-10 px-6 flex justify-between items-center no-print">
        <div className="flex items-center gap-3">
          <div className="bg-white text-slate-950 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-xl shadow-blue-900/20">R</div>
          <div>
            <span className="text-white font-black text-xl tracking-tighter">Rostom<span className="text-blue-500 italic">Siervo</span></span>
            <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden mt-0.5">
               <div className="h-full bg-blue-500 w-2/3"></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.print()}
            className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-black text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            GET PDF
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="px-6 relative print:px-0">
        {/* Floating Background Elements */}
        <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full no-print pointer-events-none"></div>
        <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full no-print pointer-events-none"></div>

        <ResumeView data={MOCK_RESUME} />
      </main>

      {/* Career Assistant */}
      <div className="no-print">
        <ChatAssistant userName={MOCK_RESUME.name} />
      </div>

      {/* Footer - DARK MODE UPDATED */}
      <footer className="mt-12 text-center no-print">
        <div className="flex flex-col items-center gap-4">
           <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all text-slate-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-950 hover:border-white transition-all text-slate-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
           </div>
           <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Digital Signature Authenticated • 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default App;