"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Music, Bell, Lock, Palette, LogOut, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"account" | "privacy" | "notifications" | "preferences">("account")
  const [settings, setSettings] = useState({
    email: "user@example.com",
    username: "luna_echo",
    displayName: "Luna Echo",
    bio: "Electronic music producer",
    theme: "dark",
    notifications: {
      newFollowers: true,
      newMessages: true,
      trackUpdates: true,
      promotions: false,
    },
    privacy: {
      profilePublic: true,
      showActivity: true,
      allowMessages: true,
    },
  })

  const handleSettingChange = (path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split(".")
      const newSettings = JSON.parse(JSON.stringify(prev))
      let current = newSettings
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return newSettings
    })
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Settings</h1>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="space-y-2">
                {[
                  { id: "account", label: "Account", icon: Music },
                  { id: "privacy", label: "Privacy", icon: Lock },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "preferences", label: "Preferences", icon: Palette },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as typeof activeTab)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                        activeTab === item.id
                          ? "bg-primary/10 text-primary font-semibold"
                          : "hover:bg-card/80 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              {/* Account Settings */}
              {activeTab === "account" && (
                <Card className="border-border bg-card/50 p-8">
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange("email", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Username</label>
                      <Input
                        type="text"
                        value={settings.username}
                        onChange={(e) => handleSettingChange("username", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Display Name</label>
                      <Input
                        type="text"
                        value={settings.displayName}
                        onChange={(e) => handleSettingChange("displayName", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Bio</label>
                      <textarea
                        value={settings.bio}
                        onChange={(e) => handleSettingChange("bio", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
                      <Button variant="outline" className="border-border hover:bg-card/80 bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <Card className="border-border bg-card/50 p-8">
                  <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
                  <div className="space-y-6">
                    {[
                      { key: "profilePublic", label: "Make profile public", desc: "Allow anyone to view your profile" },
                      { key: "showActivity", label: "Show activity", desc: "Display your listening activity" },
                      { key: "allowMessages", label: "Allow messages", desc: "Let others send you messages" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-card/50">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                          onChange={(e) => handleSettingChange(`privacy.${item.key}`, e.target.checked)}
                          className="w-5 h-5 rounded accent-primary"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <Card className="border-border bg-card/50 p-8">
                  <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>
                  <div className="space-y-6">
                    {[
                      { key: "newFollowers", label: "New followers", desc: "Get notified when someone follows you" },
                      { key: "newMessages", label: "New messages", desc: "Get notified of new messages" },
                      {
                        key: "trackUpdates",
                        label: "Track updates",
                        desc: "Get notified when artists you follow upload",
                      },
                      { key: "promotions", label: "Promotions", desc: "Receive promotional emails" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-card/50">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                          onChange={(e) => handleSettingChange(`notifications.${item.key}`, e.target.checked)}
                          className="w-5 h-5 rounded accent-primary"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Preferences */}
              {activeTab === "preferences" && (
                <Card className="border-border bg-card/50 p-8">
                  <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Theme</label>
                      <select
                        value={settings.theme}
                        onChange={(e) => handleSettingChange("theme", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div className="pt-4">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Danger Zone */}
              <Card className="border-destructive/50 bg-destructive/5 p-8 mt-8">
                <h3 className="text-lg font-bold text-destructive mb-4">Danger Zone</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-destructive/50 hover:bg-destructive/10 text-destructive bg-transparent gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-destructive/50 hover:bg-destructive/10 text-destructive bg-transparent gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
