
import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types';

interface ResumeViewProps {
  data: ResumeData;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Oracle' | 'IT'>('All');
  const [visibleReferences, setVisibleReferences] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleReference = (idx: number) => {
    const next = new Set(visibleReferences);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setVisibleReferences(next);
  };

  const filteredCerts = data.certifications.filter(cert => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Oracle') return cert.issuer === 'Oracle';
    if (activeFilter === 'IT') return cert.issuer !== 'Oracle';
    return true;
  });

  const websiteUrl = data.website.startsWith('http') ? data.website : `https://${data.website}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`;

  const insights = [
    { label: "GPA", value: "Cum Laude", icon: "🎓", color: "bg-slate-900 border-slate-800 text-amber-500" },
    { label: "Certs", value: `${data.certifications.length}+ Active`, icon: "📜", color: "bg-slate-900 border-slate-800 text-blue-500" },
    { label: "Expertise", value: "Cloud & Dev", icon: "☁️", color: "bg-slate-900 border-slate-800 text-purple-500" },
    { label: "Experience", value: "Tech Support", icon: "🛠️", color: "bg-slate-900 border-slate-800 text-emerald-500" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-8 pb-20 print:pb-0 print:space-y-0">
      {/* Top Banner / Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 no-print">
        {insights.map((insight, i) => (
          <div key={i} className={`p-2 md:p-4 rounded-xl md:rounded-2xl border shadow-sm flex flex-col items-center text-center animate-in fade-in slide-in-from-top duration-500 delay-${i * 100} ${insight.color}`}>
            <span className="text-xl md:text-2xl mb-1">{insight.icon}</span>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider opacity-60 text-slate-400">{insight.label}</span>
            <span className="font-bold text-[10px] md:text-sm whitespace-nowrap">{insight.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 resume-container relative print:rounded-none print:border-none print:shadow-none">
        {/* Accent Bar */}
        <div className="h-1.5 md:h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 print:bg-blue-600"></div>

        <div className="p-4 md:p-14 print:p-0 print:pt-4">
          {/* Header */}
          <header className="mb-6 md:mb-10 print:mb-8">
            <div className="flex flex-row items-start gap-4 md:gap-8 print:gap-6">
              {/* Profile Picture */}
              {data.profilePicture && (
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-blue-600 rounded-lg md:rounded-2xl rotate-3 group-hover:rotate-6 transition-transform profile-decoration no-print"></div>
                  <img 
                    src={data.profilePicture} 
                    alt={data.name} 
                    className="relative w-20 h-20 md:w-40 md:h-40 rounded-lg md:rounded-2xl object-cover border border-white shadow-lg print:shadow-none print:w-28 print:h-28 print:rounded-xl print:border print:border-slate-200"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-1 md:mb-2 whitespace-nowrap overflow-hidden text-ellipsis print:text-3xl">
                  {data.name}
                </h1>
                
                <div className="mb-3 md:mb-6 print:mb-3">
                  <span className="px-2 md:px-4 py-0.5 md:py-1.5 bg-blue-600 text-white text-[8px] md:text-sm font-bold rounded-full uppercase tracking-widest shadow-lg print:shadow-none print:text-[10px] print:px-2 print:py-0.5 print:bg-slate-100 print:text-slate-800 print:border print:border-slate-200">
                    {data.title}
                  </span>
                </div>

                {/* Clickable Contact Information */}
                <div className="grid grid-cols-2 gap-y-1.5 md:gap-y-3 gap-x-2 md:gap-x-10 text-[9px] md:text-sm font-semibold print:text-[10px] print:grid-cols-2 print:gap-y-1 print:gap-x-4">
                  <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 md:gap-3 text-slate-600 hover:text-blue-600 transition-colors print:text-black group min-w-0">
                    <div className="p-1 md:p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all no-print shrink-0">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <span className="print:font-bold whitespace-nowrap truncate underline decoration-blue-200 print:no-underline">{data.email}</span>
                  </a>
                  
                  <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 md:gap-3 text-slate-600 hover:text-blue-600 transition-colors print:text-black group min-w-0">
                    <div className="p-1 md:p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all no-print shrink-0">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </div>
                    <span className="print:font-bold whitespace-nowrap truncate underline decoration-blue-200 print:no-underline">{data.phone}</span>
                  </a>

                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-3 text-slate-600 hover:text-blue-600 transition-colors print:text-black group min-w-0">
                    <div className="p-1 md:p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all no-print shrink-0">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18"/></svg>
                    </div>
                    <span className="print:font-bold whitespace-nowrap truncate underline decoration-blue-200 print:no-underline">{data.website}</span>
                  </a>

                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-3 text-slate-600 hover:text-blue-600 transition-colors print:text-black group min-w-0">
                    <div className="p-1 md:p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all no-print shrink-0">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    <span className="print:font-bold whitespace-nowrap truncate underline decoration-blue-200 print:no-underline">{data.location}</span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* About / Summary */}
          <section className="reveal mb-8 md:mb-12 print:mb-6">
            <div className="flex items-center gap-4 mb-3 md:mb-4 print:mb-2">
              <h2 className="text-sm md:text-xl font-black text-slate-900 uppercase tracking-tighter print:text-base">About Me</h2>
              <div className="h-px flex-1 bg-slate-100 print:bg-slate-300"></div>
            </div>
            <div className="relative p-3 md:p-6 bg-slate-50/50 rounded-xl md:rounded-2xl border border-slate-100 print:p-0 print:bg-transparent print:border-none">
              <p className="text-slate-700 leading-relaxed text-[10px] md:text-base print:text-[11px] print:text-black">
                {data.summary}
              </p>
            </div>
          </section>

          {/* Main Body - Split Layout */}
          <div className="grid grid-cols-12 gap-4 md:gap-12 print:gap-8">
            {/* Left Column */}
            <div className="col-span-7 space-y-8 md:space-y-12 print:space-y-6">
              <section className="reveal">
                <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 print:mb-3">
                  <h2 className="text-[10px] md:text-xl font-black text-slate-900 uppercase tracking-tighter print:text-base">Experience</h2>
                  <div className="h-px flex-1 bg-slate-100 print:bg-slate-300"></div>
                </div>
                <div className="space-y-4 md:space-y-8 relative print:space-y-4">
                  <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100 ml-[4px] md:ml-[9px] print:bg-slate-200"></div>
                  {data.experiences.map((exp, idx) => (
                    <div key={idx} className="relative pl-4 md:pl-10 group experience-item">
                      <div className="absolute left-0 top-1.5 w-2 h-2 md:w-5 md:h-5 rounded-full bg-white border-2 md:border-4 border-blue-600 z-10 print:w-3 print:h-3 print:border-2 print:left-[-1px] print:top-1"></div>
                      <div className="p-2 md:p-5 bg-white rounded-lg md:rounded-2xl border border-slate-100 shadow-sm group-hover:border-blue-100 transition-all print:p-0 print:border-none print:shadow-none">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 print:flex-col print:mb-0">
                          <div className="min-w-0">
                            <h3 className="text-[10px] md:text-lg font-extrabold text-slate-900 leading-tight print:text-xs">{exp.role}</h3>
                            <p className="text-blue-600 font-bold text-[8px] md:text-sm print:text-[10px] print:text-black">{exp.company}</p>
                          </div>
                          <span className="text-[7px] md:text-[10px] font-bold text-slate-400 bg-slate-50 px-1 md:px-2 py-0.5 md:py-1 rounded uppercase tracking-wider print:bg-transparent print:p-0 print:mt-0.5 print:text-[9px] print:text-slate-500 whitespace-nowrap">{exp.period}</span>
                        </div>
                        <ul className="mt-1 md:mt-3 space-y-1 md:space-y-2 print:mt-1 print:space-y-0.5">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex gap-1.5 text-slate-600 text-[9px] md:text-sm leading-tight md:leading-relaxed print:text-[10px] print:text-black">
                              <span className="text-blue-500 font-bold print:text-blue-700 shrink-0">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education section - 2 Column with Wrapping allowed for visibility */}
              <section className="reveal">
                <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 print:mb-3">
                  <h2 className="text-[10px] md:text-xl font-black text-slate-900 uppercase tracking-tighter print:text-base">Education</h2>
                  <div className="h-px flex-1 bg-slate-100 print:bg-slate-300"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4 print:grid-cols-2 print:gap-2">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="p-2 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 education-item print:bg-none print:border-none print:p-0">
                      <p className="text-[7px] md:text-[9px] font-black text-blue-500 uppercase tracking-widest mb-0.5 md:mb-1 print:text-[8px] print:text-slate-500">{edu.period}</p>
                      <h3 className="font-extrabold text-slate-900 leading-tight text-[10px] md:text-base print:text-xs">{edu.degree}</h3>
                      <p className="text-slate-500 text-[9px] md:text-sm mt-0.5 print:text-[10px] print:text-black">{edu.school}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="col-span-5 space-y-8 md:space-y-12 print:space-y-6">
              <section className="reveal">
                <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 print:mb-3">
                  <h2 className="text-[10px] md:text-xl font-black text-slate-900 uppercase tracking-tighter print:text-base">Arsenal</h2>
                  <div className="h-px flex-1 bg-slate-100 print:bg-slate-300"></div>
                </div>
                <div className="space-y-4 md:space-y-6 print:space-y-4">
                  {data.skills.map((skillGroup, idx) => (
                    <div key={idx}>
                      <h3 className="text-[7px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 md:mb-3 print:mb-1 print:text-[9px] print:text-slate-800">{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-1 md:gap-2 print:gap-1.5">
                        {skillGroup.items.map((skill, i) => (
                          <div key={i} className="px-1.5 md:px-3 py-0.5 md:py-1.5 bg-slate-50 border border-slate-100 rounded md:rounded-lg print:bg-transparent print:border-slate-200 print:px-1.5 print:py-0.5">
                            <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-tight text-slate-700 print:text-[9px] print:text-black whitespace-nowrap">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="reveal">
                <div className="flex items-center justify-between gap-1 md:gap-4 mb-4 md:mb-6 print:mb-3">
                  <h2 className="text-[10px] md:text-xl font-black text-slate-900 uppercase tracking-tighter print:text-base">Certs</h2>
                  <div className="flex gap-0.5 md:gap-1 no-print">
                    {(['All', 'Oracle'] as const).map(filter => (
                      <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`text-[6px] md:text-[9px] px-1 md:px-2 py-0.5 md:py-1 rounded font-black transition-all ${activeFilter === filter ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 md:space-y-4 max-h-[300px] md:max-h-[500px] overflow-y-auto pr-1 md:pr-2 custom-scrollbar no-print">
                  {filteredCerts.map((cert, idx) => (
                    <div key={idx} className="p-2 md:p-4 rounded-lg md:rounded-xl bg-white border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all">
                      <h3 className="font-bold text-slate-900 text-[9px] md:text-sm leading-tight">{cert.name}</h3>
                      <p className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5 md:mt-1">{cert.issuer}</p>
                    </div>
                  ))}
                </div>

                <div className="hidden print:block space-y-2">
                  {data.certifications.map((cert, idx) => (
                    <div key={idx} className="border-l-2 border-blue-600 pl-3 py-1">
                      <p className="font-bold text-[10px] text-black leading-tight">{cert.name}</p>
                      <p className="text-[8px] text-slate-500 uppercase font-black">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Professional References */}
          <section className="reveal mt-10 md:mt-16 pt-6 md:pt-10 border-t border-slate-100 print:mt-10 print:pt-4">
            <h2 className="text-[10px] md:text-xl font-black text-slate-900 uppercase tracking-tighter text-center md:text-left w-full mb-4 md:mb-8 print:mb-4 print:text-left print:text-base">References</h2>
            <div className="grid grid-cols-2 gap-2 md:gap-6 print:grid-cols-2 print:gap-2">
              {data.references.map((ref, idx) => {
                const isVisible = visibleReferences.has(idx);
                return (
                  <div key={idx} className="p-2 md:p-6 rounded-lg md:rounded-2xl bg-slate-50 border border-slate-100 print:bg-transparent print:border-none print:p-0">
                     <div className="flex flex-row items-center gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 rounded md:rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-[10px] md:text-base shadow-md no-print shrink-0">
                          {ref.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-900 text-[10px] md:text-base">{ref.name}</p>
                          <p className="text-slate-500 text-[7px] md:text-[10px] font-bold uppercase tracking-widest">{ref.position}</p>
                          
                          <button 
                            onClick={() => toggleReference(idx)}
                            className="mt-1 text-[7px] md:text-[10px] font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest no-print"
                          >
                            {isVisible ? 'Hide' : 'Show Details'}
                          </button>

                          <div className={`mt-1 flex flex-col gap-0.5 transition-all duration-300 overflow-hidden ${isVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'} print:max-h-none print:opacity-100 print:mt-0.5`}>
                            <a href={`tel:${ref.phone.replace(/[^0-9+]/g, '')}`} className="text-[8px] md:text-xs text-blue-600 font-bold hover:underline print:text-[9px] print:text-black print:no-underline whitespace-nowrap">
                              <span className="print:font-bold hidden md:inline">Tel: </span>{ref.phone}
                            </a>
                            <a href={`mailto:${ref.email}`} className="text-[8px] md:text-xs text-blue-600 font-bold hover:underline print:text-[9px] print:text-black print:no-underline whitespace-nowrap">
                              <span className="print:font-bold hidden md:inline">Email: </span>{ref.email}
                            </a>
                          </div>
                        </div>
                     </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
