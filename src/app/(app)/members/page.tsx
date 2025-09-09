
"use client";

import { useState } from "react";
import type { Member } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { members } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PlusCircle, Upload, Search } from "lucide-react";
import { ImportDialog } from "./import-dialog";
import { MemberDetailsSheet } from "./member-details-sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MembersPage() {
    const [isImportOpen, setImportOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    return (
        <div className="grid gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search members..." className="pl-9 w-full" />
                </div>
                <div className="flex w-full sm:w-auto gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="frozen">Frozen</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by plan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Plans</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" onClick={() => setImportOpen(true)} className="w-full sm:w-auto">
                    <Upload className="mr-0 sm:mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Import from CSV</span>
                </Button>
                <Button className="hidden md:flex">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Member
                </Button>
            </div>

            {/* Desktop View */}
            <Card className="hidden md:block">
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Member #</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map(member => (
                                <TableRow key={member.id} onClick={() => setSelectedMember(member)} className="cursor-pointer">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={member.avatarUrl} alt={member.firstName} data-ai-hint="member avatar" />
                                                <AvatarFallback>{member.firstName[0]}{member.lastName[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{member.firstName} {member.lastName}</div>
                                                <div className="text-sm text-muted-foreground">{member.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.memberNumber}</TableCell>
                                    <TableCell>
                                        <Badge variant={member.status === 'active' ? 'default' : member.status === 'inactive' ? 'destructive' : 'secondary'}
                                            className={cn(
                                                "capitalize",
                                                member.status === 'active' && 'bg-green-600/20 text-green-400 border-green-600/30',
                                                member.status === 'inactive' && 'bg-red-600/20 text-red-400 border-red-600/30',
                                                member.status === 'frozen' && 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                                            )}
                                        >{member.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Mobile View */}
            <div className="grid gap-4 md:hidden pb-20">
                {members.map(member => (
                    <Card key={member.id} onClick={() => setSelectedMember(member)} className="cursor-pointer">
                        <CardContent className="pt-6">
                           <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={member.avatarUrl} alt={member.firstName} data-ai-hint="member avatar" />
                                        <AvatarFallback>{member.firstName[0]}{member.lastName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{member.firstName} {member.lastName}</div>
                                        <div className="text-sm text-muted-foreground">{member.memberNumber}</div>
                                    </div>
                                </div>
                                <Badge variant={member.status === 'active' ? 'default' : member.status === 'inactive' ? 'destructive' : 'secondary'}
                                    className={cn(
                                        "capitalize",
                                        member.status === 'active' && 'bg-green-600/20 text-green-400 border-green-600/30',
                                        member.status === 'inactive' && 'bg-red-600/20 text-red-400 border-red-600/30',
                                        member.status === 'frozen' && 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                                    )}
                                >{member.status}</Badge>
                           </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            {/* Mobile FAB */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <Button size="lg" className="rounded-full shadow-lg w-auto px-4 py-6">
                    <PlusCircle className="mr-2 h-6 w-6" />
                    Add Member
                </Button>
            </div>

            <ImportDialog open={isImportOpen} onOpenChange={setImportOpen} />
            <MemberDetailsSheet member={selectedMember} onOpenChange={() => setSelectedMember(null)} />
        </div>
    )
}
