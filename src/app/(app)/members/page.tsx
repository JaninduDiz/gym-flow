
"use client";

import { useState } from "react";
import type { Member } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { members } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PlusCircle, Upload } from "lucide-react";
import { ImportDialog } from "./import-dialog";
import { MemberDetailsSheet } from "./member-details-sheet";

export default function MembersPage() {
    const [isImportOpen, setImportOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    return (
        <div className="grid gap-6">
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => setImportOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Import from CSV
                </Button>
                <Button>
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
            <div className="grid gap-4 md:hidden">
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

            <ImportDialog open={isImportOpen} onOpenChange={setImportOpen} />
            <MemberDetailsSheet member={selectedMember} onOpenChange={() => setSelectedMember(null)} />
        </div>
    )
}
