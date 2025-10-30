"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Music, Wallet, Mail, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react"

export default function AuthPage() {
  const router = useRouter()
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const [authMethod, setAuthMethod] = useState<"wallet" | "email" | null>(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  // Move router.push to useEffect to avoid render-time state updates
  useEffect(() => {
    if (isConnected && address) {
      router.push("/onboarding")
    }
  }, [isConnected, address, router])

  const handleWalletConnect = async () => {
    setLoading(true)
    try {
      await open()
      // The useEffect above will handle the redirect when connection is successful
    } catch (error) {
      console.error("AppKit error:", error)
      setLoading(false)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate email signup
    setTimeout(() => {
      router.push("/onboarding")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Music className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">SolStream</span>
        </Link>

        {!authMethod ? (
          <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
            <h1 className="text-2xl font-bold mb-2">Welcome to SolStream</h1>
            <p className="text-muted-foreground mb-8">Stream, earn, and connect with your favorite music</p>

            <div className="space-y-4">
              <button
                onClick={() => setAuthMethod("wallet")}
                className="w-full p-4 rounded-lg border border-border bg-card hover:bg-card/80 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold">Connect Wallet</div>
                    <div className="text-sm text-muted-foreground">Via AppKit</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>

              <button
                onClick={() => setAuthMethod("email")}
                className="w-full p-4 rounded-lg border border-border bg-card hover:bg-card/80 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold">Continue with Email</div>
                    <div className="text-sm text-muted-foreground">Sign up with your email</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-secondary transition-colors" />
                </div>
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-8">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </Card>
        ) : authMethod === "wallet" ? (
          <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
            <button
              onClick={() => setAuthMethod(null)}
              className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-8">Choose from available wallets or connect via email</p>

            <Button
              onClick={handleWalletConnect}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-2" />
                  Open Wallet Selector
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-6">
              AppKit provides a secure way to connect your wallet and supports email login for easy access.
            </p>
          </Card>
        ) : (
          <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
            <button
              onClick={() => setAuthMethod(null)}
              className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold mb-2">Sign Up with Email</h2>
            <p className="text-muted-foreground mb-8">Create your SolStream account</p>

            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? "Creating account..." : "Continue"}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}