import React from 'react';
import Head from 'next/head';
import Calendar from './calendar';

const HomePage: React.FC = () => {
  return (
      <div className="p-3 bg-custom-gradient h-screen">
        <Head>
          <title>Titanom Room Reservation</title>
        </Head>

        <main>
          <h1 className="text-3xl font-semibold text-center mb-6">Titanom Room Reservation</h1>
            <div>
                <Calendar />
            </div>
        </main>

        <footer className="text-center mt-8 text-gray-700">
          &copy; {new Date().getFullYear()} Titanom Technologies GmbH
        </footer>
      </div>
  );
};

export default HomePage;
