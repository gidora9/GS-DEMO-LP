"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NeuralGraphDemo } from "@/components/neural-graph-demo"
import { TimelineView } from "@/components/timeline-view"
import { IntegrationPanel } from "@/components/integration-panel"
import { DataOwnershipSettings } from "@/components/data-ownership-settings"

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Gaming Dashboard</h1>
          <p className="text-white/70">Welcome back, Gamer</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">
            Refresh Data
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 bg-black/50 border border-white/10">
              <CardHeader>
                <CardTitle>Your Gaming DNA</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[400px]">
                <NeuralGraphDemo />
              </CardContent>
            </Card>

            <Card className="bg-black/50 border border-white/10">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">ER</span>
                    </div>
                    <div>
                      <p className="font-medium">Played Elden Ring</p>
                      <p className="text-sm text-white/60">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">CS</span>
                    </div>
                    <div>
                      <p className="font-medium">Achievement in Counter-Strike 2</p>
                      <p className="text-sm text-white/60">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">W3</span>
                    </div>
                    <div>
                      <p className="font-medium">Completed quest in The Witcher 3</p>
                      <p className="text-sm text-white/60">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-black/50 border border-white/10">
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <p className="text-white/60">Platform distribution chart would go here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border border-white/10">
              <CardHeader>
                <CardTitle>Genre Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <p className="text-white/60">Genre preferences chart would go here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="bg-black/50 border border-white/10">
            <CardHeader>
              <CardTitle>Your Gaming Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <TimelineView />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="bg-black/50 border border-white/10">
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <IntegrationPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-black/50 border border-white/10">
            <CardHeader>
              <CardTitle>Data Ownership & Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <DataOwnershipSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
