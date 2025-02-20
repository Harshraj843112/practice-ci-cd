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
            </main>
        </div>
    );
}

export default App;
