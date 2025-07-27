'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Portfolio {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

export default function Home() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const res = await fetch('/api/portfolios');
      const data = await res.json();
      setPortfolios(data);
    };
    fetchPortfolios();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <Link href="/portfolios/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Portfolio
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="border rounded-lg p-4 flex flex-col">
            <Image src={portfolio.imageUrl} alt={portfolio.title} width={500} height={300} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{portfolio.title}</h2>
            <p className="text-gray-600 flex-grow">{portfolio.description}</p>
            <div className="mt-4">
              <Link href={`/portfolios/${portfolio.id}`} className="text-blue-500 hover:underline mr-4">
                View Details
              </Link>
              <a href={portfolio.url} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
