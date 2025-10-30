"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Music, Zap, Users, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SolStream</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How it Works
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Docs
            </a>
          </div>
          <Link href="/auth">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                  Stream, Earn,
                  <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    {" "}
                    Connect
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  A Spotify-inspired music platform powered by Solana. Artists earn fairly, fans earn rewards, and Web3
                  stays invisible.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                    Connect Wallet
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-card w-full sm:w-auto bg-transparent"
                >
                  Explore Music
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Artists</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">50K+</div>
                  <div className="text-sm text-muted-foreground">Listeners</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">$2M+</div>
                  <div className="text-sm text-muted-foreground">Paid Out</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/10 to-transparent rounded-3xl blur-3xl animate-glow-pulse" />
              <div className="relative bg-card border border-border rounded-3xl p-8 backdrop-blur-sm h-full flex flex-col justify-center items-center space-y-6">
                <div className="w-24 h-24 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-float">
                  <Music className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Now Playing</p>
                  <p className="text-xl font-semibold">Your Favorite Track</p>
                  <p className="text-sm text-muted-foreground">Artist Name</p>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-linear-to-r from-primary to-secondary rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why SolStream?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for creators and listeners who want fair compensation and seamless Web3 integration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Fair Earnings",
                description: "Artists earn 80% of revenue directly. No middlemen, no delays.",
              },
              {
                icon: Zap,
                title: "Instant Rewards",
                description: "Fans earn points for every listen and interaction. Convert to SOL anytime.",
              },
              {
                icon: Users,
                title: "Community First",
                description: "Engage with artists, earn badges, and climb the leaderboard.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Connect", desc: "Link your wallet or email" },
              { step: "2", title: "Choose Role", desc: "Artist or Fan" },
              { step: "3", title: "Engage", desc: "Stream or upload music" },
              { step: "4", title: "Earn & Redeem", desc: "Convert points to SOL" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Stream?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of artists and fans earning on their own terms
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-linear-to-br from-primary to-secondary rounded-lg" />
                <span className="font-bold">SolStream</span>
              </div>
              <p className="text-sm text-muted-foreground">Stream, Earn, Connect</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 SolStream. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition">
                Discord
              </a>
              <a href="#" className="hover:text-foreground transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
