import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X } from 'lucide-react';
import ReactDOM from 'react-dom';
import ukFlag from '../assets/flags/united-kingdom.png';
import frFlag from '../assets/flags/france.png';

export default function ResumeButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleModal}
                className="btn-secondary group flex items-center gap-2"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span>View My Resume</span>
            </button>

            {mounted && ReactDOM.createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop with blur */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                                onClick={toggleModal}
                            />
                            
                            {/* Modal Container */}
                            <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
                                <motion.div
                                    layoutId="resume-modal"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                                    className="relative w-full max-w-md bg-black/90 border border-white/10 pointer-events-auto overflow-hidden"
                                >
                                    {/* Decorative corner accents */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent"></div>
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent"></div>
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent"></div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent"></div>
                                    
                                    {/* Close button */}
                                    <button 
                                        onClick={toggleModal}
                                        className="absolute top-4 right-4 text-muted hover:text-white transition-colors z-10"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <div className="p-8">
                                        <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wide">Select Language</h3>
                                        <p className="text-muted text-sm mb-6">Choose a version to view my resume.</p>
                                        
                                        <div className="space-y-3">
                                            <a
                                                href="/resume/youssef-dhibi-cv-en.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center p-4 border border-white/10 hover:border-accent/50 bg-white/5 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                                            >
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className="mr-5 shrink-0">
                                                    <img 
                                                        src={ukFlag.src} 
                                                        alt="United Kingdom Flag" 
                                                        className="w-12 h-8 object-cover rounded border border-white/10 shadow-sm"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="block font-medium text-white">English Version</span>
                                                    <span className="text-xs text-muted">PDF Format</span>
                                                </div>
                                                <Eye className="h-5 w-5 text-muted group-hover:text-accent transition-colors opacity-50 group-hover:opacity-100" />
                                            </a>

                                            <a
                                                href="/resume/dhibi-youssef-cv-fr.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center p-4 border border-white/10 hover:border-accent/50 bg-white/5 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                                            >
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className="mr-5 shrink-0">
                                                    <img 
                                                        src={frFlag.src} 
                                                        alt="France Flag" 
                                                        className="w-12 h-8 object-cover rounded border border-white/10 shadow-sm"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="block font-medium text-white">French Version</span>
                                                    <span className="text-xs text-muted">PDF Format</span>
                                                </div>
                                                <Eye className="h-5 w-5 text-muted group-hover:text-accent transition-colors opacity-50 group-hover:opacity-100" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
