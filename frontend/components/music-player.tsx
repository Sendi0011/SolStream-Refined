"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Music } from "lucide-react"

interface Song {
  id: number
  title: string
  artist: string
  duration: number
  plays?: number
}

interface MusicPlayerProps {
  song: Song
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onLike?: () => void
  isLiked?: boolean
}

export function MusicPlayer({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onLike,
  isLiked = false,
}: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(70)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={onNext} src={`/audio/sample-${song.id}.mp3`} />

      <Card className="border-border bg-card/50 backdrop-blur-sm p-6">
        {/* Song Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
            <Music className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg line-clamp-1">{song.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{song.artist}</p>
            {song.plays && <p className="text-xs text-muted-foreground mt-1">{song.plays.toLocaleString()} plays</p>}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-border hover:bg-card/80 bg-transparent"
              onClick={onLike}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-secondary text-secondary" : ""}`} />
            </Button>
            <Button size="sm" variant="outline" className="border-border hover:bg-card/80 bg-transparent">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={song.duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(song.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            size="sm"
            variant="outline"
            className="border-border hover:bg-card/80 bg-transparent"
            onClick={onPrevious}
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="border-border hover:bg-card/80 bg-transparent"
            onClick={onNext}
          >
            <SkipForward className="w-4 h-4" />
          </Button>

          <div className="ml-auto relative">
            <Button
              size="sm"
              variant="outline"
              className="border-border hover:bg-card/80 bg-transparent"
              onClick={() => setShowVolumeControl(!showVolumeControl)}
            >
              <Volume2 className="w-4 h-4" />
            </Button>

            {showVolumeControl && (
              <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg p-3 w-12">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                  className="w-full h-24 appearance-none cursor-pointer accent-primary"
                  style={{
                    writingMode: "bt-lr",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex items-end justify-center gap-1 h-12 bg-card/50 rounded-lg p-2">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-sm opacity-70 hover:opacity-100 transition"
              style={{
                height: `${Math.random() * 100}%`,
                animation: isPlaying ? `pulse 0.5s ease-in-out ${i * 0.05}s infinite` : "none",
              }}
            />
          ))}
        </div>
      </Card>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
