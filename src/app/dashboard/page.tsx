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

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` // If you're using a token for authorization
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }

      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  // Fetch summary from the Jina AI API
  const fetchSummary = async (url: string) => {
    try {
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      console.log('-------------res------', res)

      const data = await res.json();
      console.log('----------Received summary-----------:', data.summary);
      const summary = extractSummary(data.summary);

      return summary;
    } catch {
      return 'Summary temporarily unavailable.';
    }
  };
  const extractSummary = (content: string) => {
    const marker = 'Markdown Content:';
    const contentIndex = content.indexOf(marker)

    if (contentIndex == -1) return "summary unavailable"
    const lines = content.slice(contentIndex + marker.length).split('\n');

    // Return the first non-empty line after the marker
    const firstLine = lines.find(line => line.trim() !== '');
    console.log("Markdown ----------------", firstLine)

    return firstLine || 'Summary temporarily unavailable.';
  }

  // Handle save bookmark
  const handleSave = async () => {
    const summary = await fetchSummary(url);
    console.log('summary-----------------', summary)
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url, summary }),
    });

    if (res.ok) {
      setUrl('');
      fetchBookmarks();
    }
  };

  // Handle delete bookmark
  const handleDelete = async (id: string) => {
    await fetch(`/api/bookmarks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookmarks();
  };

  // Handle signout
  const handleSignOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect the user to the login page
    router.push('/login');
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchBookmarks();
    }
  }, [token]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>

      <button
        onClick={handleSignOut}
        className="bg-red-600 text-white px-4 py-2 rounded mb-4"
      >
        Sign Out
      </button>

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
            <img src={b.favicon} alt="favicon" width={24} height={24} className="w-6 h-6" />

            <div className="flex-1">
              <a href={b.url} target="_blank" className="text-blue-700 underline">
                {b.title}
              </a>
              <p className="whitespace-pre-line text-sm text-gray-700">
                {b.summary}
              </p>
            </div>
            <button onClick={() => handleDelete(b._id)} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
