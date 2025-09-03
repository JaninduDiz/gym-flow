"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { members } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MoreHorizontal, PlusCircle, Upload } from "lucide-react";
import { ImportDialog } from "./import-dialog";

export default function MembersPage() {
    const [isImportOpen, setImportOpen] = useState(false);
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
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Signup Date</TableHead>
                                <TableHead>Birthday</TableHead>
                                <TableHead>Treadmill Access</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map(member => (
                                <TableRow key={member.id}>
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
                                    <TableCell>
                                        <Badge variant={member.status === 'active' ? 'default' : member.status === 'inactive' ? 'destructive' : 'secondary'}
                                            className={cn(
                                                member.status === 'active' && 'bg-green-600/20 text-green-400 border-green-600/30',
                                                member.status === 'inactive' && 'bg-red-600/20 text-red-400 border-red-600/30',
                                                member.status === 'frozen' && 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                                            )}
                                        >{member.status}</Badge>
                                    </TableCell>
                                    <TableCell>{new Date(member.signupDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(member.birthday).toLocaleDateString()}</TableCell>
                                    <TableCell>{member.treadmillAccess ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>View payments</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <ImportDialog open={isImportOpen} onOpenChange={setImportOpen} />
        </div>
    )
}
