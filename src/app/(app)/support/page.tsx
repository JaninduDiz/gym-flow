
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, Code } from "lucide-react";

const SupportContact = ({ name, role, email, phone, avatarUrl }: { name: string, role: string, email: string, phone: string, avatarUrl: string }) => (
    <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
            <AvatarImage src={avatarUrl} alt={name} data-ai-hint="support person" />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{phone}</span>
                </div>
            </div>
        </div>
    </div>
)


export default function SupportPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
            <SupportContact 
                name="Admin Support"
                role="System Administrator"
                email="admin@gymflow.com"
                phone="+1 (555) 123-4567"
                avatarUrl="https://picsum.photos/100/100?random=21"
            />
            <SupportContact 
                name="Manager Helpdesk"
                role="General Manager"
                email="manager@gymflow.com"
                phone="+1 (555) 765-4321"
                avatarUrl="https://picsum.photos/100/100?random=22"
            />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Developer Contact</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                    <AvatarFallback><Code /></AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-lg font-semibold">Your Developer</p>
                    <p className="text-sm text-muted-foreground">For technical assistance</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>[Your Contact Number]</span>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
