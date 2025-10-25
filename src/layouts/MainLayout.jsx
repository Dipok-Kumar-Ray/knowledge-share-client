import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow pt-20 pb-8">
                <div className="container mx-auto px-4">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;