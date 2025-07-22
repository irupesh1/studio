
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Sector, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp, UserPlus, MessageCircle, BarChart2 } from "lucide-react";
import { renderActiveShape } from "@/components/charts/active-shape";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const engagementData = [
    { metric: "Likes", value: 450, fill: "var(--color-likes)" },
    { metric: "Shares", value: 120, fill: "var(--color-shares)" },
    { metric: "Follows", value: 300, fill: "var(--color-follows)" },
];
const engagementConfig = {
    value: { label: "Engagements" },
    likes: { label: "Likes", color: "hsl(var(--chart-1))" },
    shares: { label: "Shares", color: "hsl(var(--chart-2))" },
    follows: { label: "Follows", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const trafficData = [
  { source: 'Organic', visitors: 2000, fill: 'var(--color-organic)' },
  { source: 'Social', visitors: 1200, fill: 'var(--color-social)' },
  { source: 'Referral', visitors: 800, fill: 'var(--color-referral)' },
  { source: 'Direct', visitors: 500, fill: 'var(--color-direct)' },
];
const trafficConfig = {
  visitors: { label: "Visitors" },
  organic: { label: 'Organic', color: 'hsl(var(--chart-1))' },
  social: { label: 'Social Media', color: 'hsl(var(--chart-2))' },
  referral: { label: 'Referrals', color: 'hsl(var(--chart-3))' },
  direct: { label: 'Direct', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

const dailyChartData = {
  "Last 7 Days": [
    { date: "Day 1", users: 150, messages: 300 },
    { date: "Day 2", users: 200, messages: 450 },
    { date: "Day 3", users: 180, messages: 400 },
    { date: "Day 4", users: 250, messages: 500 },
    { date: "Day 5", users: 220, messages: 480 },
    { date: "Day 6", users: 300, messages: 600 },
    { date: "Day 7", users: 280, messages: 550 },
  ],
  "Last 30 Days": Array.from({length: 30}, (_, i) => ({ date: `Day ${i+1}`, users: 100 + Math.random() * 200, messages: 200 + Math.random() * 400})),
  "Last 90 Days": Array.from({length: 90}, (_, i) => ({ date: `Day ${i+1}`, users: 100 + Math.random() * 300, messages: 200 + Math.random() * 500})),
};
const dailyChartConfig = {
  users: { label: "Users", color: "hsl(var(--chart-1))" },
  messages: { label: "Messages", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;


export default function AnalyticsPage() {
    const [dailyTimeframe, setDailyTimeframe] = useState<keyof typeof dailyChartData>("Last 7 Days");
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,257</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10,432</div>
          <p className="text-xs text-muted-foreground">+15.3% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3m 45s</div>
          <p className="text-xs text-muted-foreground">+5.2% from last month</p>
        </CardContent>
      </Card>

       <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">25.5%</div>
          <p className="text-xs text-muted-foreground">-2.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-4">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
            <CardTitle>Daily Activity</CardTitle>
            <div className="ml-auto">
                <Select onValueChange={(value) => setDailyTimeframe(value as any)}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Last 7 Days" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                        <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                        <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={dailyChartConfig} className="h-[300px] w-full">
            <LineChart accessibilityLayer data={dailyChartData[dailyTimeframe]} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
               <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line dataKey="users" type="monotone" stroke="var(--color-users)" strokeWidth={2} dot={false} />
              <Line dataKey="messages" type="monotone" stroke="var(--color-messages)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>How users are finding your application.</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={trafficConfig} className="h-[250px] w-full">
                <PieChart>
                    <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                        data={trafficData}
                        dataKey="visitors"
                        nameKey="source"
                        innerRadius={60}
                        strokeWidth={5}
                        activeIndex={0}
                        activeShape={renderActiveShape}
                    >
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="source" />} />
                </PieChart>
           </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>User Engagement</CardTitle>
          <CardDescription>How users are interacting with content.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={engagementConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={engagementData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" dataKey="value" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Bar dataKey="value" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
