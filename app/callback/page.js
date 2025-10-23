"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SpotifyCallback() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing Spotify authorization...");
  const [authCode, setAuthCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setStatus("error");
      setMessage("Authorization was denied or failed.");
      setError(errorParam);
      return;
    }

    if (code) {
      setAuthCode(code);
      setStatus("success");
      setMessage("Authorization successful! Use the code below to get your refresh token.");
    } else {
      setStatus("error");
      setMessage("No authorization code received.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="border-2 rounded-lg p-8" style={{ borderColor: 'var(--foreground)' }}>
          <h1 className="text-2xl font-bold mb-4">Spotify OAuth Callback</h1>

          <div className={`p-4 rounded mb-4 ${
            status === 'success' ? 'bg-green-100 text-green-800' :
            status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            <p className="font-medium">{message}</p>
          </div>

          {authCode && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Authorization Code:</h2>
              <div className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
                <code className="text-sm break-all">{authCode}</code>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Next Steps:</strong>
                </p>
                <ol className="list-decimal list-inside text-sm text-yellow-800 mt-2 space-y-1">
                  <li>Copy the authorization code above</li>
                  <li>Run the exchange script in your terminal:
                    <div className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                      <code className="text-xs">node exchange-spotify-code.js YOUR_AUTH_CODE</code>
                    </div>
                  </li>
                  <li>Copy the refresh token from the output</li>
                  <li>Add it to your .env.local file as SPOTIFY_REFRESH_TOKEN</li>
                </ol>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => navigator.clipboard.writeText(authCode)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Copy Code to Clipboard
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 p-4 rounded">
              <p className="text-sm text-red-800">
                <strong>Error Details:</strong> {error}
              </p>
            </div>
          )}

          <div className="mt-8 pt-4 border-t" style={{ borderColor: 'var(--foreground)' }}>
            <a href="/" className="text-blue-500 hover:underline">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
