import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

async function getAccessToken() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  console.log('[Spotify Debug] Token length:', refresh_token?.length);
  console.log('[Spotify Debug] Client ID:', client_id ? 'Set' : 'Not set');
  console.log('[Spotify Debug] Client Secret:', client_secret ? 'Set' : 'Not set');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('[Spotify Debug] Token exchange failed:', errorData);
    return null;
  }

  const data = await response.json();
  console.log('[Spotify Debug] Access token obtained successfully');
  return data.access_token;
}

function formatPlayedAt(dateString) {
  const playedAt = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - playedAt.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const isToday = playedAt.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString() ===
    playedAt.toDateString();

  if (diffMinutes < 1) {
    return "Last listened just now";
  } else if (diffMinutes < 60) {
    return `Last listened ${diffMinutes} minute${
      diffMinutes === 1 ? "" : "s"
    } ago`;
  } else if (isToday) {
    if (diffHours === 1) {
      return "Last listened 1 hour ago";
    } else {
      return `Last listened ${diffHours} hours ago`;
    }
  } else if (isYesterday) {
    const time = playedAt.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    return `Last listened yesterday at ${time}`;
  } else if (diffDays < 7) {
    const dayName = playedAt.toLocaleDateString(undefined, { weekday: "long" });
    const time = playedAt.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    return `Last listened ${dayName} at ${time}`;
  } else {
    const date = playedAt.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    const time = playedAt.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    return `Last listened ${date} at ${time}`;
  }
}

function formatTrackData(track) {
  return {
    title: track.name,
    artists: track.artists.map((artist) => artist.name).join(", "),
    albumArtUrl: track.album.images[0]?.url,
    songUrl: track.external_urls.spotify,
  };
}

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json(
      {
        error:
          "Server environment variables for Spotify are not configured properly.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      {
        error:
          "Unable to authenticate with Spotify. Please check your credentials.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  // Check if currently playing
  const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (nowPlayingResponse.status === 200) {
    const data = await nowPlayingResponse.json();
    if (data && data.item && data.is_playing) {
      const songData = {
        ...formatTrackData(data.item),
        isPlaying: true,
        lastPlayed: "Listening now",
      };
      return NextResponse.json(songData, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }
  }

  // Get recently played
  const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (recentlyPlayedResponse.status === 200) {
    const data = await recentlyPlayedResponse.json();
    const lastTrack = data.items[0];
    if (lastTrack && lastTrack.track) {
      const songData = {
        ...formatTrackData(lastTrack.track),
        isPlaying: false,
        lastPlayed: formatPlayedAt(lastTrack.played_at),
      };
      return NextResponse.json(songData, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }
  }

  return NextResponse.json(
    {
      error: "No music activity found in your Spotify account.",
    },
    {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
