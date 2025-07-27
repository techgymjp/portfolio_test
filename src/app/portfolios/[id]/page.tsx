'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

interface Portfolio {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

export default function PortfolioDetail() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', url: '', imageUrl: '' });

  useEffect(() => {
    if (id) {
      const fetchPortfolio = async () => {
        const res = await fetch(`/api/portfolios/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPortfolio(data);
          setForm(data);
        } else {
          router.push('/');
        }
      };
      fetchPortfolio();
    }
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/portfolios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setPortfolio(data);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      const res = await fetch(`/api/portfolios/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/');
      }
    }
  };

  if (!portfolio) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value={form.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" value={form.description} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">Project URL</label>
            <input type="text" name="url" id="url" value={form.url} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl" value={form.imageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <Image src={portfolio.imageUrl} alt={portfolio.title} width={800} height={600} className="w-full h-96 object-cover rounded-md mb-4" />
          <h1 className="text-3xl font-bold mb-2">{portfolio.title}</h1>
          <p className="text-gray-700 mb-4">{portfolio.description}</p>
          <a href={portfolio.url} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
            View Project
          </a>
          <div className="mt-8 flex gap-4">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            <button onClick={() => router.push('/')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
}
