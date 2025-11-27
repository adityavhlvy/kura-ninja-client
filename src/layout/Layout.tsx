import { useLocation, useOutlet } from 'react-router-dom';
import { useState, cloneElement } from 'react';
import Header from './Header';
import Footer from './Footer';
import FileTreeSidebar from '../components/FileTreeSidebar';
import { AnimatePresence } from 'framer-motion';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const element = useOutlet();

    return (
        <div className="min-h-screen flex flex-col">
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} border-r bg-base-200 transition-all duration-300 flex flex-col`}>
                    <FileTreeSidebar isCollapsed={!isSidebarOpen} />
                </aside>
                <main className="flex-1 p-4 overflow-y-auto bg-base-100 relative">
                    <AnimatePresence mode="wait">
                        {element && cloneElement(element, { key: location.pathname })}
                    </AnimatePresence>
                </main>
            </div>
            <Footer />
        </div>
    );
}
