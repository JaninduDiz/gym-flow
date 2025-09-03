import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { payments } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Filter, MoreHorizontal, PlusCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PaymentsPage() {
    return (
        <div className="grid gap-6">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 ml-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-[240px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Filter by date...
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="range" />
                      </PopoverContent>
                    </Popover>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="due">Due</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Record Payment
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map(payment => (
                                <TableRow key={payment.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={payment.memberAvatarUrl} alt={payment.memberName} data-ai-hint="member avatar" />
                                                <AvatarFallback>{payment.memberName[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{payment.memberName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "capitalize",
                                                payment.status === 'paid' && 'bg-green-600/20 text-green-400 border-green-600/30',
                                                payment.status === 'overdue' && 'bg-red-600/20 text-red-400 border-red-600/30',
                                                payment.status === 'due' && 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
                                            )}
                                        >{payment.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
