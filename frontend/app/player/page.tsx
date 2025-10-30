"use client"

import { useState } from "react"
import { MusicPlayer } from "@/components/music-player"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, ChevronDown, List } from "lucide-react"
import Link from "next/link"

export default function PlayerPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [likedSongs, setLikedSongs] = useState<number[]>([])
  const [showPlaylist, setShowPlaylist] = useState(true)

  const playlist = [
    { id: 1, title: "Midnight Dreams", artist: "Luna Echo", duration: 240, plays: 12500 },
    { id: 2, title: "Urban Vibes", artist: "City Beats", duration: 210, plays: 8900 },
    { id: 3, title: "Sunset Melodies", artist: "Golden Hour", duration: 260, plays: 15200 },
    { id: 4, title: "Electric Soul", artist: "Neon Lights", duration: 230, plays: 9800 },
    { id: 5, title: "Jazz Nights", artist: "Smooth Jazz Co", duration: 280, plays: 7600 },
  ]

  const currentSong = playlist[currentSongIndex]

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
  }

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }

  const handleLike = () => {
    setLikedSongs((prev) =>
      prev.includes(currentSong.id) ? prev.filter((id) => id !== currentSong.id) : [...prev, currentSong.id],
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SolStream</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/fan">
              <Button variant="outline" className="border-border hover:bg-card/80 bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Player */}
          <div className="mb-8">
            <MusicPlayer
              song={currentSong}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onLike={handleLike}
              isLiked={likedSongs.includes(currentSong.id)}
            />
          </div>

          {/* Playlist Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <List className="w-6 h-6" />
              Playlist
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="border-border hover:bg-card/80 bg-transparent"
              onClick={() => setShowPlaylist(!showPlaylist)}
            >
              <ChevronDown className={`w-4 h-4 transition ${showPlaylist ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Playlist */}
          {showPlaylist && (
            <div className="space-y-2">
              {playlist.map((song, index) => (
                <Card
                  key={song.id}
                  onClick={() => {
                    setCurrentSongIndex(index)
                    setIsPlaying(true)
                  }}
                  className={`p-4 border-border cursor-pointer transition ${
                    index === currentSongIndex
                      ? "bg-primary/10 border-primary/50"
                      : "bg-card/50 hover:bg-card/80 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Music className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold line-clamp-1">{song.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{song.artist}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium">
                        {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
                      </p>
                      <p className="text-xs text-muted-foreground">{song.plays.toLocaleString()} plays</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Queue Info */}
          <Card className="mt-8 p-6 border-border bg-card/50">
            <h3 className="font-bold mb-4">Now Playing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Song</span>
                <span className="font-medium">{currentSong.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Artist</span>
                <span className="font-medium">{currentSong.artist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {Math.floor(currentSong.duration / 60)}:{(currentSong.duration % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Plays</span>
                <span className="font-medium">{currentSong.plays?.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
