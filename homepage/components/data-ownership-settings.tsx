"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Upload, Shield, Eye, EyeOff } from "lucide-react"

export function DataOwnershipSettings() {
  const [dataSettings, setDataSettings] = useState({
    publicProfile: true,
    shareGameActivity: true,
    shareAchievements: true,
    allowRecommendations: true,
    anonymizeData: false,
  })

  const handleToggle = (setting: keyof typeof dataSettings) => {
    setDataSettings({
      ...dataSettings,
      [setting]: !dataSettings[setting],
    })
  }

  return (
    <Tabs defaultValue="privacy">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="export">Export Data</TabsTrigger>
        <TabsTrigger value="delete">Delete Data</TabsTrigger>
      </TabsList>

      <TabsContent value="privacy">
        <div className="space-y-6">
          <p className="text-white/70 mb-6">Control how your gaming data is used and who can see it.</p>

          <div className="space-y-4">
            <Card className="bg-black/30 border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Profile Visibility</h3>
                      <p className="text-sm text-white/60">Control who can see your gaming profile</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="public-profile" className="flex-1">
                      <span className="font-medium">Public Profile</span>
                      <p className="text-sm text-white/60">Allow others to view your profile</p>
                    </label>
                    <Switch
                      id="public-profile"
                      checked={dataSettings.publicProfile}
                      onCheckedChange={() => handleToggle("publicProfile")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="share-activity" className="flex-1">
                      <span className="font-medium">Share Game Activity</span>
                      <p className="text-sm text-white/60">Show games you're playing</p>
                    </label>
                    <Switch
                      id="share-activity"
                      checked={dataSettings.shareGameActivity}
                      onCheckedChange={() => handleToggle("shareGameActivity")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="share-achievements" className="flex-1">
                      <span className="font-medium">Share Achievements</span>
                      <p className="text-sm text-white/60">Show your in-game achievements</p>
                    </label>
                    <Switch
                      id="share-achievements"
                      checked={dataSettings.shareAchievements}
                      onCheckedChange={() => handleToggle("shareAchievements")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Data Usage</h3>
                      <p className="text-sm text-white/60">Control how your data is used</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="allow-recommendations" className="flex-1">
                      <span className="font-medium">Game Recommendations</span>
                      <p className="text-sm text-white/60">Allow us to suggest games based on your preferences</p>
                    </label>
                    <Switch
                      id="allow-recommendations"
                      checked={dataSettings.allowRecommendations}
                      onCheckedChange={() => handleToggle("allowRecommendations")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="anonymize-data" className="flex-1">
                      <span className="font-medium">Anonymize Data</span>
                      <p className="text-sm text-white/60">Remove personally identifiable information from analytics</p>
                    </label>
                    <Switch
                      id="anonymize-data"
                      checked={dataSettings.anonymizeData}
                      onCheckedChange={() => handleToggle("anonymizeData")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="export">
        <div className="space-y-6">
          <p className="text-white/70 mb-6">Export your gaming data in various formats for your personal use.</p>

          <Card className="bg-black/30 border border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Export Options</h3>
                    <p className="text-sm text-white/60">Download your data in different formats</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export as JSON
                  </Button>

                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>

                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export Neural Graph
                  </Button>

                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export Timeline
                  </Button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="delete">
        <div className="space-y-6">
          <p className="text-white/70 mb-6">Manage or delete your data from GameScrobbler.</p>

          <Card className="bg-black/30 border border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <EyeOff className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Delete Data</h3>
                    <p className="text-sm text-white/60">Permanently remove your data</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-sm text-white/80 mb-2">
                    <strong>Warning:</strong> Deleting your data is permanent and cannot be undone. This will remove all
                    your gaming history, preferences, and neural graph data.
                  </p>
                  <p className="text-sm text-white/80">We recommend exporting your data before deletion.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Delete Platform Data
                  </Button>

                  <Button variant="outline" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Delete Neural Graph
                  </Button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Button variant="destructive" className="w-full">
                    Delete All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
