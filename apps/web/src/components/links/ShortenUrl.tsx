import { apiClient } from '@/lib/api';
import { useState } from 'react';

export default function ShortenUrl() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);

    try {
      const response = await apiClient.post<{
        id: number;
        url: string;
        shortenedUrl: string;
        createdAt: Date;
        deleted: boolean;
        userId: number;
      }>('/links', {
        url: url,
      });

      setShortUrl(response.shortenedUrl);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

    // Simulate API call - replace with actual API call later
    // setTimeout(() => {
    //   setShortUrl(`https://lnks.ly/${Math.random().toString(36).substr(2, 8)}`);
    //   setIsLoading(false);
    // }, 1000);
  };

  const handleCopyToClipBoard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopyButtonText('Copied!');
    setTimeout(() => setCopyButtonText('Copy'), 2000);
  };

  return (
    <form onSubmit={handleShorten} className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Shorten Your URL
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter your long URL here..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">
                Your shortened URL:
              </p>
              <p className="text-lg font-mono text-green-800">{shortUrl}</p>
            </div>
            <div
              onClick={handleCopyToClipBoard}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors hover:cursor-pointer"
            >
              {copyButtonText}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
