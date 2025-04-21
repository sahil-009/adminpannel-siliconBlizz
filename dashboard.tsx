"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { addDays, format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Dummy data for leads
const leadsData = [
  {
    id: "L001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    profession: "Doctor",
    message: "Looking for a new website for my private practice",
    date: "2023-04-12",
  },
  {
    id: "L002",
    name: "Atty. Michael Chen",
    email: "michael.chen@example.com",
    profession: "Lawyer",
    message: "Need a complete rebrand and website overhaul",
    date: "2023-04-14",
  },
  {
    id: "L003",
    name: "Jessica Williams",
    email: "jessica@coffeeshop.com",
    profession: "Small Business Owner",
    message: "Interested in e-commerce integration for my coffee shop",
    date: "2023-04-15",
  },
  {
    id: "L004",
    name: "Robert Davis",
    email: "robert.davis@example.com",
    profession: "Developer",
    message: "Looking for help with a SaaS product design",
    date: "2023-04-16",
  },
  {
    id: "L005",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    profession: "Doctor",
    message: "Need a website with appointment scheduling",
    date: "2023-04-18",
  },
]

// Dummy data for plans
const plansData = [
  {
    id: "P001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    plan: "Premium",
    status: "Confirmed",
  },
  {
    id: "P002",
    name: "Atty. Michael Chen",
    email: "michael.chen@example.com",
    plan: "Pro",
    status: "Pending",
  },
  {
    id: "P003",
    name: "Jessica Williams",
    email: "jessica@coffeeshop.com",
    plan: "Basic",
    status: "Confirmed",
  },
  {
    id: "P004",
    name: "Robert Davis",
    email: "robert.davis@example.com",
    plan: "Premium",
    status: "Pending",
  },
  {
    id: "P005",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    plan: "Pro",
    status: "Confirmed",
  },
]

// Dummy calendar events
const calendarEvents = [
  { date: addDays(new Date(), 2), client: "Dr. Sarah Johnson", time: "10:00 AM" },
  { date: addDays(new Date(), 4), client: "Atty. Michael Chen", time: "2:00 PM" },
  { date: addDays(new Date(), 7), client: "Jessica Williams", time: "11:30 AM" },
  { date: addDays(new Date(), 9), client: "Robert Davis", time: "3:00 PM" },
]

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  // Filter leads based on search query
  const filteredLeads = leadsData.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.profession.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get events for selected date
  const selectedDateEvents = calendarEvents.filter(
    (event) => date && format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 md:p-10">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">Agency Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage your clients, appointments, and plans</p>
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </div>

          <Tabs defaultValue="leads" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="plans">Plans Chosen</TabsTrigger>
            </TabsList>

            {/* Leads Tab */}
            <TabsContent value="leads">
              <Card>
                <CardHeader>
                  <CardTitle>Client Inquiries</CardTitle>
                  <CardDescription>View and manage all incoming client inquiries.</CardDescription>
                  <div className="mt-4 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search leads..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Profession</TableHead>
                          <TableHead className="hidden md:table-cell">Message</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.profession}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                              {lead.message}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(lead.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Send Email</DropdownMenuItem>
                                  <DropdownMenuItem>Schedule Call</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Calendar</CardTitle>
                    <CardDescription>View and manage your appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      modifiers={{
                        booked: calendarEvents.map((event) => event.date),
                      }}
                      modifiersStyles={{
                        booked: {
                          fontWeight: "bold",
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          color: "#3b82f6",
                        },
                      }}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{date ? format(date, "MMMM d, yyyy") : "No Date Selected"}</CardTitle>
                    <CardDescription>
                      {selectedDateEvents.length
                        ? `${selectedDateEvents.length} appointments scheduled`
                        : "No appointments scheduled"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-4">
                        {selectedDateEvents.map((event, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                            <div>
                              <p className="font-medium">{event.client}</p>
                              <p className="text-sm text-gray-500">{event.time}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[200px] text-center">
                        <p className="text-gray-500 mb-4">No appointments for this date</p>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Plans Tab */}
            <TabsContent value="plans">
              <Card>
                <CardHeader>
                  <CardTitle>Client Plans</CardTitle>
                  <CardDescription>View and manage client plan selections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plan Selected</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {plansData.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.name}</TableCell>
                            <TableCell>{plan.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  plan.plan === "Premium" ? "default" : plan.plan === "Pro" ? "secondary" : "outline"
                                }
                              >
                                {plan.plan}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span
                                className={
                                  plan.status === "Confirmed"
                                    ? "text-green-600 font-medium"
                                    : "text-amber-600 font-medium"
                                }
                              >
                                {plan.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Change Plan</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    {plan.status === "Pending" ? "Mark as Confirmed" : "Mark as Pending"}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Cancel Plan</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
