"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Music,
  Upload,
  BarChart3,
  TrendingUp,
  Users,
  Settings,
  LogOut,
  Plus,
  Play,
  Download,
  Trash2,
} from "lucide-react"
import Link from "next/link"

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "uploads" | "analytics">("overview")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedSongs, setUploadedSongs] = useState([
    { id: 1, title: "Midnight Dreams", plays: 12500, earnings: 1250, date: "2025-01-15" },
    { id: 2, title: "Electric Soul", plays: 9800, earnings: 980, date: "2025-01-10" },
    { id: 3, title: "Neon Lights", plays: 7600, earnings: 760, date: "2025-01-05" },
  ])

  const totalEarnings = uploadedSongs.reduce((sum, song) => sum + song.earnings, 0)
  const totalPlays = uploadedSongs.reduce((sum, song) => sum + song.plays, 0)
  const totalFollowers = 15420

  const handleDeleteSong = (id: number) => {
    setUploadedSongs((prev) => prev.filter((song) => song.id !== id))
  }

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
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "overview" ? "bg-primary/10 text-primary font-semibold" : "hover:bg-card/80"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("uploads")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "uploads" ? "bg-primary/10 text-primary font-semibold" : "hover:bg-card/80"
            }`}
          >
            My Uploads
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "analytics" ? "bg-primary/10 text-primary font-semibold" : "hover:bg-card/80"
            }`}
          >
            Analytics
          </button>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Artist Dashboard</h1>
            <p className="text-muted-foreground">Manage your music and track your earnings</p>
          </div>
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Track
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <Card className="p-6 border-border bg-card/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Total Earnings</p>
                    <p className="text-3xl font-bold">${totalEarnings}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </Card>
              <Card className="p-6 border-border bg-card/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Total Plays</p>
                    <p className="text-3xl font-bold">{totalPlays.toLocaleString()}</p>
                  </div>
                  <Play className="w-8 h-8 text-secondary" />
                </div>
              </Card>
              <Card className="p-6 border-border bg-card/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Followers</p>
                    <p className="text-3xl font-bold">{totalFollowers.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </Card>
              <Card className="p-6 border-border bg-card/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Tracks Uploaded</p>
                    <p className="text-3xl font-bold">{uploadedSongs.length}</p>
                  </div>
                  <Music className="w-8 h-8 text-secondary" />
                </div>
              </Card>
            </div>

            {/* Recent Uploads */}
            <Card className="border-border bg-card/50 p-6">
              <h2 className="text-xl font-bold mb-6">Recent Uploads</h2>
              <div className="space-y-4">
                {uploadedSongs.slice(0, 3).map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card/80 transition"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">{song.title}</p>
                        <p className="text-sm text-muted-foreground">{song.plays.toLocaleString()} plays</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">${song.earnings}</p>
                      <p className="text-xs text-muted-foreground">{song.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Uploads Tab */}
        {activeTab === "uploads" && (
          <div>
            <div className="mb-6">
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload New Track
              </Button>
            </div>

            <div className="space-y-4">
              {uploadedSongs.map((song) => (
                <Card key={song.id} className="p-6 border-border bg-card/50 hover:bg-card/80 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Music className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{song.title}</h3>
                        <p className="text-sm text-muted-foreground">{song.plays.toLocaleString()} plays</p>
                        <p className="text-xs text-muted-foreground mt-1">Uploaded {song.date}</p>
                      </div>
                    </div>
                    <div className="text-right mr-6">
                      <p className="text-2xl font-bold text-primary">${song.earnings}</p>
                      <p className="text-xs text-muted-foreground">Earnings</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border hover:bg-card/80 bg-transparent gap-2"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border hover:bg-destructive/10 hover:text-destructive bg-transparent gap-2"
                        onClick={() => handleDeleteSong(song.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 border-border bg-card/50">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Plays Over Time
              </h2>
              <div className="space-y-4">
                {[
                  { week: "Week 1", plays: 2400 },
                  { week: "Week 2", plays: 3200 },
                  { week: "Week 3", plays: 2800 },
                  { week: "Week 4", plays: 3900 },
                ].map((item) => (
                  <div key={item.week}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{item.week}</span>
                      <span className="text-sm text-muted-foreground">{item.plays}</span>
                    </div>
                    <div className="w-full h-2 bg-card rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${(item.plays / 4000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-border bg-card/50">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Top Performing Tracks
              </h2>
              <div className="space-y-4">
                {uploadedSongs
                  .sort((a, b) => b.plays - a.plays)
                  .map((song, idx) => (
                    <div key={song.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                          {idx + 1}
                        </div>
                        <span className="font-medium">{song.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{song.plays.toLocaleString()}</span>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="p-6 border-border bg-card/50 col-span-2">
              <h2 className="text-xl font-bold mb-6">Earnings Breakdown</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-2">This Month</p>
                  <p className="text-3xl font-bold text-primary">${totalEarnings}</p>
                </div>
                <div className="text-center border-l border-r border-border">
                  <p className="text-muted-foreground text-sm mb-2">Average per Track</p>
                  <p className="text-3xl font-bold text-secondary">
                    ${Math.round(totalEarnings / uploadedSongs.length)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-2">Pending Payout</p>
                  <p className="text-3xl font-bold text-primary">${Math.round(totalEarnings * 0.2)}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-6">Upload New Track</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Track Title</label>
                <Input type="text" placeholder="Enter track title" className="bg-input border-border" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Genre</label>
                <select className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground">
                  <option>Select a genre</option>
                  <option>Hip-Hop</option>
                  <option>Electronic</option>
                  <option>Pop</option>
                  <option>Rock</option>
                  <option>Jazz</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Audio File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-border hover:bg-card/80 bg-transparent"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Upload</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
