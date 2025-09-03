
"use client";

import type { Member } from "@/lib/definitions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, History } from "lucide-react";

const DetailItem = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

export function MemberDetailsSheet({ member, onOpenChange }: { member: Member | null; onOpenChange: (open: boolean) => void; }) {
    if (!member) return null;

    const open = !!member;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="rounded-t-lg">
                <SheetHeader className="text-left">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={member.avatarUrl} alt={member.firstName} data-ai-hint="member avatar" />
                            <AvatarFallback>{member.firstName[0]}{member.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                             <SheetTitle className="text-2xl">{member.firstName} {member.lastName}</SheetTitle>
                             <SheetDescription>{member.email}</SheetDescription>
                        </div>
                    </div>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                    <div className="grid grid-cols-2 gap-4">
                         <DetailItem label="Status" value={
                             <Badge variant={member.status === 'active' ? 'default' : member.status === 'inactive' ? 'destructive' : 'secondary'}
                                className={cn(
                                    "capitalize w-fit",
                                    member.status === 'active' && 'bg-green-600/20 text-green-400 border-green-600/30',
                                    member.status === 'inactive' && 'bg-red-600/20 text-red-400 border-red-600/30',
                                    member.status === 'frozen' && 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                                )}
                            >{member.status}</Badge>
                         } />
                        <DetailItem label="Member Number" value={member.memberNumber} />
                        <DetailItem label="Signup Date" value={new Date(member.signupDate).toLocaleDateString()} />
                        <DetailItem label="Birthday" value={new Date(member.birthday).toLocaleDateString()} />
                        <DetailItem label="Payment Cycle" value={<span className="capitalize">{member.paymentCycle}</span>} />
                        <DetailItem label="Treadmill Access" value={member.treadmillAccess ? 'Yes' : 'No'} />
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Button variant="outline"><Pencil className="mr-2"/> Edit</Button>
                    <Button variant="outline"><History className="mr-2"/> View Payments</Button>
                    <Button variant="destructive" className="ml-auto"><Trash2 className="mr-2"/> Delete</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
