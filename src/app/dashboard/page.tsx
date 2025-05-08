'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Bookmark = {
  _id: string;
  title: string;
  url: string;
  favicon: string;
  summary: string;
};

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [url, setUrl] = useState('');
  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchBookmarks = async () => {
    const res = await fetch('/api/bookmarks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBookmarks(data);
  };

  const handleSave = async () => {
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      setUrl('');
      fetchBookmarks();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/bookmarks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookmarks();
  };

  useEffect(() => {
    if (!token) router.push('/login');
    else fetchBookmarks();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Paste URL"
          className="flex-grow border rounded p-2"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>

      <div className="grid gap-4">
        {bookmarks.map(b => (
          <div key={b._id} className="p-4 border rounded flex items-center gap-4">
            <img src={b.favicon} className="w-6 h-6" />
            <div className="flex-1">
              <a href={b.url} target="_blank" className="text-blue-700 underline">
                {b.title}
              </a>
              <p className="text-sm text-gray-600">{b.summary}</p>
            </div>
            <button onClick={() => handleDelete(b._id)} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
