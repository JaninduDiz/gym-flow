
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Code } from "lucide-react";

const SupportContact = ({ name, role, email, phone }: { name: string, role: string, email: string, phone: string }) => (
    <div className="flex items-start gap-4">
        <div className="grid gap-1">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
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
            />
            <SupportContact 
                name="Manager Helpdesk"
                role="General Manager"
                email="manager@gymflow.com"
                phone="+1 (555) 765-4321"
            />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Developer Contact</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="flex items-center gap-4">
                <Code className="h-8 w-8 text-muted-foreground" />
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
