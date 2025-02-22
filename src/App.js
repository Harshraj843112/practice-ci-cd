import React from 'react';
import Header from './components/Header';

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center text-blue-600">
                    Welcome to My React App
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    Built with React.js and Tailwind CSS, deployed on AWS EC2 via Jenkins CI/CD.
                </p>
                <p> Simplifying Healthcare with GudMed: 🔧
                At GudMed, we believe that technology should enhance the work you already do, not complicate it. Our solution is designed to keep the process familiar and straightforward while bringing the benefits of digitalization right to your fingertips.</p>

                <p> Hellow jee</p>
            </main>
        </div>
    );
}

export default App;
