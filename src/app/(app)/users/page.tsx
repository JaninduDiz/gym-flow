
"use client"

import { useState } from "react";
import type { AppUser } from "@/lib/definitions";
import { appUsers as initialUsers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserFormDialog } from "./user-form-dialog";
import { cn } from "@/lib/utils";


export default function UsersPage() {
    const [users, setUsers] = useState<AppUser[]>(initialUsers);
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);

    const handleSaveUser = (userData: Omit<AppUser, 'id' | 'avatarUrl' | 'status'> & { password?: string }) => {
        if(selectedUser) {
            setUsers(users.map(u => u.id === selectedUser.id ? { ...selectedUser, ...userData } : u));
        } else {
            const newUser: AppUser = {
                id: `user-${Date.now()}`,
                ...userData,
                avatarUrl: `https://picsum.photos/100/100?random=${Date.now()}`,
                status: 'active'
            };
            setUsers([...users, newUser]);
        }
        setSelectedUser(null);
    }
    
    const handleEdit = (user: AppUser) => {
        setSelectedUser(user);
        setFormOpen(true);
    }

    const handleDelete = (userId: string) => {
        setUsers(users.filter(u => u.id !== userId));
    }

    return (
        <div className="grid gap-6">
            <div className="flex justify-end">
                <Button onClick={() => { setSelectedUser(null); setFormOpen(true); }}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Contact</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="font-medium">{user.name}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div>{user.email}</div>
                                        <div className="text-muted-foreground">{user.mobile}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">{user.role}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                         <Badge variant={user.status === 'active' ? 'default' : 'destructive'}
                                            className={cn(
                                                "capitalize",
                                                user.status === 'active' ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-red-600/20 text-red-400 border-red-600/30'
                                            )}
                                        >{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the user.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(user.id)}>Delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
             <UserFormDialog 
                open={isFormOpen} 
                onOpenChange={setFormOpen}
                onSave={handleSaveUser}
                user={selectedUser}
            />
        </div>
    )
}
