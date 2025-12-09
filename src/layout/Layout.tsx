import { useLocation, useOutlet } from 'react-router-dom';
import { useState, cloneElement, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FileTreeSidebar from '../components/FileTreeSidebar';
import { AnimatePresence } from 'framer-motion';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const element = useOutlet();

    // Check for mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768; // md breakpoint
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Close sidebar on route change if on mobile
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname, isMobile]);

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Sidebar Overlay */}
                {isMobile && isSidebarOpen && (
                    <div
                        className="absolute inset-0 bg-black/50 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        ${isMobile ? 'absolute h-full z-50 shadow-xl' : 'relative'}
                        ${isSidebarOpen ? 'w-64' : (isMobile ? 'w-0' : 'w-20')} 
                        border-r bg-base-200 transition-all duration-300 flex flex-col overflow-hidden
                    `}
                >
                    <div className={isMobile ? "h-full w-64" : "h-full"}> {/* Inner container to prevent content squishing on mobile */}
                        <FileTreeSidebar isCollapsed={!isSidebarOpen && !isMobile} />
                    </div>
                </aside>

                <main className="flex-1 p-0 overflow-y-auto bg-base-100 relative w-full scroll-smooth">
                    <AnimatePresence mode="wait">
                        {element && cloneElement(element, { key: location.pathname })}
                    </AnimatePresence>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
