"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Music, Search, Heart, Play, Zap, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default function FanDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"discover" | "liked" | "following">("discover")
  const [likedSongs, setLikedSongs] = useState<number[]>([])

  const mockSongs = [
    { id: 1, title: "Midnight Dreams", artist: "Luna Echo", plays: 12500, genre: "Electronic" },
    { id: 2, title: "Urban Vibes", artist: "City Beats", plays: 8900, genre: "Hip-Hop" },
    { id: 3, title: "Sunset Melodies", artist: "Golden Hour", plays: 15200, genre: "Pop" },
    { id: 4, title: "Electric Soul", artist: "Neon Lights", plays: 9800, genre: "Electronic" },
    { id: 5, title: "Jazz Nights", artist: "Smooth Jazz Co", plays: 7600, genre: "Jazz" },
    { id: 6, title: "Rock Anthem", artist: "Thunder Road", plays: 11300, genre: "Rock" },
  ]

  const mockArtists = [
    { id: 1, name: "Luna Echo", followers: 45200, genre: "Electronic" },
    { id: 2, name: "City Beats", followers: 32100, genre: "Hip-Hop" },
    { id: 3, name: "Golden Hour", followers: 58900, genre: "Pop" },
  ]

  const toggleLike = (songId: number) => {
    setLikedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-card border-r border-border p-6 flex flex-col">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">SolStream</span>
        </Link>

        <nav className="space-y-2 flex-1">
          <button className="w-full text-left px-4 py-3 rounded-lg bg-primary/10 text-primary font-semibold">
            Discover
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-card/80 transition">My Likes</button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-card/80 transition">Following</button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-card/80 transition">Playlists</button>
        </nav>

        <div className="space-y-2 border-t border-border pt-4">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-card/80 transition flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-card/80 transition flex items-center gap-2 text-destructive">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Music</h1>
          <p className="text-muted-foreground">Explore new tracks and earn points for every listen</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-card border-border"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-6 border-border bg-card/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Points Balance</p>
                <p className="text-3xl font-bold">2,450</p>
              </div>
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </Card>
          <Card className="p-6 border-border bg-card/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Songs Liked</p>
                <p className="text-3xl font-bold">{likedSongs.length}</p>
              </div>
              <Heart className="w-8 h-8 text-secondary" />
            </div>
          </Card>
          <Card className="p-6 border-border bg-card/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Artists Following</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {["discover", "liked", "following"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Songs Grid */}
        {activeTab === "discover" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSongs.map((song) => (
              <Card
                key={song.id}
                className="p-6 border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Music className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <button onClick={() => toggleLike(song.id)} className="p-2 rounded-lg hover:bg-card/80 transition">
                    <Heart
                      className={`w-5 h-5 transition ${
                        likedSongs.includes(song.id) ? "fill-secondary text-secondary" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>
                <h3 className="font-semibold mb-1 line-clamp-1">{song.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{song.artist}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{song.genre}</span>
                  <span>{song.plays.toLocaleString()} plays</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Play className="w-4 h-4" />
                  Play
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Liked Songs */}
        {activeTab === "liked" && (
          <div>
            {likedSongs.length === 0 ? (
              <Card className="p-12 border-border bg-card/50 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No liked songs yet. Start exploring!</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSongs
                  .filter((song) => likedSongs.includes(song.id))
                  .map((song) => (
                    <Card
                      key={song.id}
                      className="p-6 border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Music className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <button
                          onClick={() => toggleLike(song.id)}
                          className="p-2 rounded-lg hover:bg-card/80 transition"
                        >
                          <Heart className="w-5 h-5 fill-secondary text-secondary" />
                        </button>
                      </div>
                      <h3 className="font-semibold mb-1 line-clamp-1">{song.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{song.artist}</p>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                        <Play className="w-4 h-4" />
                        Play
                      </Button>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Following Artists */}
        {activeTab === "following" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArtists.map((artist) => (
              <Card
                key={artist.id}
                className="p-6 border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{artist.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{artist.genre}</p>
                <p className="text-xs text-muted-foreground mb-4">{artist.followers.toLocaleString()} followers</p>
                <Button variant="outline" className="w-full border-border hover:bg-card/80 bg-transparent">
                  Following
                </Button>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
