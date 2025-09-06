
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between space-x-4">
                        <Label htmlFor="theme-switcher" className="flex flex-col space-y-1">
                            <span>Theme</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Select between light and dark mode.
                            </span>
                        </Label>
                        <Switch id="theme-switcher" disabled />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center justify-between space-x-4">
                        <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                            <span>Email Notifications</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive updates about payments and members via email.
                            </span>
                        </Label>
                        <Switch id="email-notifications" defaultChecked disabled />
                    </div>
                    <Separator className="my-6" />
                     <div className="flex items-center justify-between space-x-4">
                        <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                            <span>Push Notifications</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Get real-time alerts on your devices.
                            </span>
                        </Label>
                        <Switch id="push-notifications" disabled />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
