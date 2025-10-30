"use client"

import React, { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAppKit } from "@reown/appkit/react"
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks"
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react"

const queryClient = new QueryClient()

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "f0e2d948b8d0dfc705c9f573ff67450f"

// ✅ Create Solana adapter
const solanaWeb3JsAdapter = new SolanaAdapter()

// ✅ Initialize AppKit outside component to ensure it's created before hooks are used
let appKitInitialized = false

if (typeof window !== "undefined" && !appKitInitialized) {
  createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: [solana, solanaTestnet, solanaDevnet],
    projectId,
    metadata: {
      name: "SolStream",
      description: "A Spotify-inspired Web3 music streaming platform powered by Solana",
      url: typeof window !== "undefined" ? window.location.origin : "https://solstream.app",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    features: {
      email: true,
      socials: [],
    },
  })
  appKitInitialized = true
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by only rendering children after mount
  if (!mounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}