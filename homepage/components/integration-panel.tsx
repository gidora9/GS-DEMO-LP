"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ComputerIcon as Steam, Gamepad2, Trophy } from "lucide-react"

// Mock integration data
const integrations = [
  {
    id: "steam",
    name: "Steam",
    icon: <Steam className="h-6 w-6" />,
    connected: true,
    lastSync: "2 hours ago",
    gamesTracked: 42,
  },
  {
    id: "playstation",
    name: "PlayStation Network",
    icon: <Gamepad2 className="h-6 w-6" />,
    connected: true,
    lastSync: "1 day ago",
    gamesTracked: 18,
  },
  {
    id: "xbox",
    name: "Xbox",
    icon: <Trophy className="h-6 w-6" />,
    connected: false,
    lastSync: null,
    gamesTracked: 0,
  },
]

export function IntegrationPanel() {
  const [platforms, setPlatforms] = useState(integrations)
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = (id: string) => {
    setConnecting(id)

    // Simulate OAuth flow
    setTimeout(() => {
      setPlatforms(
        platforms.map((platform) =>
          platform.id === id ? { ...platform, connected: true, lastSync: "Just now", gamesTracked: 0 } : platform,
        ),
      )
      setConnecting(null)
    }, 2000)
  }

  const handleDisconnect = (id: string) => {
    setPlatforms(
      platforms.map((platform) =>
        platform.id === id ? { ...platform, connected: false, lastSync: null, gamesTracked: 0 } : platform,
      ),
    )
  }

  const handleToggleSync = (id: string, enabled: boolean) => {
    console.log(`Auto-sync for ${id} set to ${enabled}`)
    // Would update user preferences in a real app
  }

  return (
    <div className="space-y-6">
      <p className="text-white/70 mb-6">
        Connect your gaming platforms to automatically track your gaming activity and build your neural graph.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <Card key={platform.id} className="bg-black/30 border border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    {platform.icon}
                  </div>
                  <h3 className="font-bold">{platform.name}</h3>
                </div>
                <div>
                  {platform.connected ? (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Connected</span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-white/10 text-white/60 rounded-full">Disconnected</span>
                  )}
                </div>
              </div>

              {platform.connected ? (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <p className="text-white/60">Last Sync</p>
                      <p>{platform.lastSync}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Games Tracked</p>
                      <p>{platform.gamesTracked}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`auto-sync-${platform.id}`}
                        defaultChecked={true}
                        onCheckedChange={(checked) => handleToggleSync(platform.id, checked)}
                      />
                      <label htmlFor={`auto-sync-${platform.id}`} className="text-sm">
                        Auto-sync
                      </label>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDisconnect(platform.id)}>
                      Disconnect
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full">
                    Sync Now
                  </Button>
                </>
              ) : (
                <div>
                  <p className="text-white/70 text-sm mb-4">
                    Connect your {platform.name} account to track your gaming activity.
                  </p>

                  <Button
                    className="w-full"
                    onClick={() => handleConnect(platform.id)}
                    disabled={connecting === platform.id}
                  >
                    {connecting === platform.id ? "Connecting..." : `Connect ${platform.name}`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Card className="bg-black/30 border border-dashed border-white/10">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/60"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Add Platform</h3>
            <p className="text-white/60 text-sm mb-4">More platforms coming soon</p>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
