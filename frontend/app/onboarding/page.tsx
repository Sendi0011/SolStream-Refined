"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mic2, Users, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<"role" | "profile">("role")
  const [role, setRole] = useState<"artist" | "fan" | null>(null)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (selectedRole: "artist" | "fan") => {
    setRole(selectedRole)
    setStep("profile")
  }

  const handleProfileComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate profile creation
    setTimeout(() => {
      if (role === "artist") {
        router.push("/dashboard/artist")
      } else {
        router.push("/dashboard/fan")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {step === "role" ? (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Welcome to SolStream</h1>
              <p className="text-lg text-muted-foreground">Choose your role to get started</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Artist Card */}
              <button
                onClick={() => handleRoleSelect("artist")}
                className="group p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mic2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-3">I'm an Artist</h2>
                <p className="text-muted-foreground mb-6">
                  Upload your music, reach fans, and earn 80% of revenue directly
                </p>
                <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <span className="font-semibold">Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Fan Card */}
              <button
                onClick={() => handleRoleSelect("fan")}
                className="group p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-secondary/50 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-3">I'm a Fan</h2>
                <p className="text-muted-foreground mb-6">
                  Discover music, earn points for listening, and support your favorite artists
                </p>
                <div className="flex items-center gap-2 text-secondary group-hover:gap-3 transition-all">
                  <span className="font-semibold">Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
            <button
              onClick={() => setStep("role")}
              className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
            <p className="text-muted-foreground mb-8">
              {role === "artist" ? "Set up your artist profile" : "Set up your fan profile"}
            </p>

            <form onSubmit={handleProfileComplete} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Username</label>
                <Input
                  type="text"
                  placeholder={role === "artist" ? "Your artist name" : "Your username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-input border-border"
                  required
                />
              </div>

              {role === "artist" && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Genre</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground">
                      <option>Select a genre</option>
                      <option>Hip-Hop</option>
                      <option>Electronic</option>
                      <option>Pop</option>
                      <option>Rock</option>
                      <option>Jazz</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bio</label>
                    <textarea
                      placeholder="Tell us about yourself"
                      className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground"
                      rows={4}
                    />
                  </div>
                </>
              )}

              {role === "fan" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Favorite Genres</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Hip-Hop", "Electronic", "Pop", "Rock", "Jazz", "Indie"].map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        className="p-3 rounded-lg border border-border bg-card hover:bg-card/80 hover:border-primary/50 transition-all text-sm"
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !username}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? "Creating profile..." : "Complete Setup"}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
