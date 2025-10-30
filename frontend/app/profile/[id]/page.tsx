"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Music, Heart, Share2, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState<"tracks" | "about">("tracks")

  // Mock user data
  const user = {
    id: params.id,
    name: "Luna Echo",
    role: "Artist",
    bio: "Electronic music producer and composer. Creating immersive soundscapes since 2020.",
    followers: 45200,
    following: 320,
    tracks: 28,
    avatar: "🎵",
    genre: "Electronic",
    verified: true,
    joinDate: "January 2020",
    topTracks: [
      { id: 1, title: "Midnight Dreams", plays: 12500, likes: 2340 },
      { id: 2, title: "Neon Lights", plays: 9800, likes: 1850 },
      { id: 3, title: "Digital Horizon", plays: 8200, likes: 1560 },
    ],
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
          <Link href="/dashboard/fan">
            <Button variant="outline" className="border-border hover:bg-card/80 bg-transparent gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="border-border bg-card/50 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-5xl">
                  {user.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    {user.verified && <span className="text-primary text-lg">✓</span>}
                  </div>
                  <p className="text-muted-foreground mb-4">{user.role}</p>
                  <p className="text-foreground mb-4 max-w-md">{user.bio}</p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="font-bold text-lg">{user.followers.toLocaleString()}</p>
                      <p className="text-muted-foreground">Followers</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{user.following.toLocaleString()}</p>
                      <p className="text-muted-foreground">Following</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{user.tracks}</p>
                      <p className="text-muted-foreground">Tracks</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`gap-2 ${
                    isFollowing
                      ? "bg-muted hover:bg-muted/80 text-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" className="border-border hover:bg-card/80 bg-transparent gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
                <Button variant="outline" className="border-border hover:bg-card/80 bg-transparent gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Genre</p>
                <p className="font-semibold">{user.genre}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Joined</p>
                <p className="font-semibold">{user.joinDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Status</p>
                <p className="font-semibold text-green-500">Active</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Verified</p>
                <p className="font-semibold text-primary">Yes</p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            {["tracks", "about"].map((tab) => (
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

          {/* Tracks Tab */}
          {activeTab === "tracks" && (
            <div className="space-y-4">
              {user.topTracks.map((track) => (
                <Card key={track.id} className="p-6 border-border bg-card/50 hover:bg-card/80 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">{track.title}</p>
                        <p className="text-sm text-muted-foreground">{track.plays.toLocaleString()} plays</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Heart className="w-4 h-4 text-secondary" />
                          {track.likes.toLocaleString()}
                        </p>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Play</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-border bg-card/50">
                <h3 className="font-bold text-lg mb-4">About</h3>
                <p className="text-muted-foreground mb-6">{user.bio}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Genre</p>
                    <p className="font-semibold">{user.genre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                    <p className="font-semibold">{user.joinDate}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border bg-card/50">
                <h3 className="font-bold text-lg mb-4">Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Plays</span>
                    <span className="font-bold">
                      {user.topTracks.reduce((sum, t) => sum + t.plays, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Likes</span>
                    <span className="font-bold">
                      {user.topTracks.reduce((sum, t) => sum + t.likes, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Followers</span>
                    <span className="font-bold">{user.followers.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
