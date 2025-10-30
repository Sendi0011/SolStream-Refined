"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Gift, TrendingUp, Lock, Unlock, ArrowRight, Star, Trophy, Flame } from "lucide-react"
import Link from "next/link"

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<"points" | "rewards" | "leaderboard">("points")
  const [userPoints, setUserPoints] = useState(2450)
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([])

  const rewards = [
    {
      id: 1,
      name: "SOL Token",
      description: "Convert 1000 points to 0.1 SOL",
      points: 1000,
      value: "0.1 SOL",
      icon: Zap,
      color: "from-primary to-secondary",
    },
    {
      id: 2,
      name: "Premium Pass",
      description: "1 month of ad-free listening",
      points: 500,
      value: "1 Month",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 3,
      name: "Artist Boost",
      description: "Promote your track to 10K users",
      points: 2000,
      value: "10K Reach",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Exclusive Badge",
      description: "Rare collector's badge for your profile",
      points: 750,
      value: "Badge",
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      name: "Double Points",
      description: "Earn 2x points for 7 days",
      points: 1500,
      value: "7 Days",
      icon: Flame,
      color: "from-red-500 to-orange-500",
    },
    {
      id: 6,
      name: "Playlist Feature",
      description: "Get featured on SolStream's top playlist",
      points: 3000,
      value: "Featured",
      icon: Gift,
      color: "from-blue-500 to-cyan-500",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Luna Echo", points: 15420, badge: "🏆" },
    { rank: 2, name: "City Beats", points: 12850, badge: "🥈" },
    { rank: 3, name: "Golden Hour", points: 11200, badge: "🥉" },
    { rank: 4, name: "Neon Lights", points: 9850, badge: "" },
    { rank: 5, name: "Thunder Road", points: 8920, badge: "" },
    { rank: 6, name: "You", points: userPoints, badge: "👤" },
  ]

  const pointsHistory = [
    { action: "Listened to 'Midnight Dreams'", points: 10, date: "Today" },
    { action: "Liked 'Urban Vibes'", points: 5, date: "Today" },
    { action: "Followed Luna Echo", points: 25, date: "Yesterday" },
    { action: "Shared track on social", points: 50, date: "2 days ago" },
    { action: "Completed daily challenge", points: 100, date: "3 days ago" },
  ]

  const handleRedeemReward = (rewardId: number, points: number) => {
    if (userPoints >= points) {
      setUserPoints((prev) => prev - points)
      setRedeemedRewards((prev) => [...prev, rewardId])
      setTimeout(() => {
        setRedeemedRewards((prev) => prev.filter((id) => id !== rewardId))
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Rewards & Points</h1>
            <p className="text-lg text-muted-foreground">Earn points by listening, engaging, and supporting artists</p>
          </div>

          {/* Points Balance Card */}
          <Card className="p-8 border-border bg-gradient-to-br from-card to-card/50 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Your Points Balance</p>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {userPoints.toLocaleString()}
                </p>
                <p className="text-muted-foreground text-sm mt-2">≈ {(userPoints / 10000).toFixed(2)} SOL</p>
              </div>
              <div className="text-right">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                  <Zap className="w-12 h-12 text-primary-foreground" />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Redeem Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            {["points", "rewards", "leaderboard"].map((tab) => (
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

          {/* Points Tab */}
          {activeTab === "points" && (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Points History */}
              <div className="md:col-span-2">
                <Card className="border-border bg-card/50 p-6">
                  <h2 className="text-xl font-bold mb-6">Points History</h2>
                  <div className="space-y-4">
                    {pointsHistory.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card/80 transition"
                      >
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">+{item.points}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* How to Earn */}
              <div>
                <Card className="border-border bg-card/50 p-6">
                  <h2 className="text-xl font-bold mb-6">How to Earn</h2>
                  <div className="space-y-4">
                    {[
                      { action: "Listen to a song", points: 10 },
                      { action: "Like a track", points: 5 },
                      { action: "Follow an artist", points: 25 },
                      { action: "Share a track", points: 50 },
                      { action: "Daily challenge", points: 100 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                        <span className="text-sm">{item.action}</span>
                        <span className="font-bold text-primary text-sm">+{item.points}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === "rewards" && (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => {
                  const Icon = reward.icon
                  const isRedeemed = redeemedRewards.includes(reward.id)
                  const canRedeem = userPoints >= reward.points

                  return (
                    <Card
                      key={reward.id}
                      className="border-border bg-card/50 hover:bg-card/80 transition overflow-hidden group"
                    >
                      <div
                        className={`h-24 bg-gradient-to-br ${reward.color} opacity-20 flex items-center justify-center`}
                      >
                        <Icon className="w-12 h-12 text-primary opacity-50" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="font-bold">{reward.points}</span>
                          </div>
                          <span className="text-sm font-semibold text-primary">{reward.value}</span>
                        </div>
                        <Button
                          onClick={() => handleRedeemReward(reward.id, reward.points)}
                          disabled={!canRedeem}
                          className={`w-full gap-2 ${
                            isRedeemed
                              ? "bg-green-500/20 text-green-500 hover:bg-green-500/20"
                              : canRedeem
                                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          {isRedeemed ? (
                            <>
                              <Unlock className="w-4 h-4" />
                              Redeemed!
                            </>
                          ) : canRedeem ? (
                            <>
                              <Gift className="w-4 h-4" />
                              Redeem
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              Locked
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <Card className="border-border bg-card/50 p-8">
              <h2 className="text-2xl font-bold mb-8">Global Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg transition ${
                      user.name === "You" ? "bg-primary/10 border border-primary/50" : "bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-primary-foreground">
                        {user.badge || user.rank}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">Rank #{user.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
