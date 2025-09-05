
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { members, payments } from "@/lib/data";
import { cn } from "@/lib/utils";
import { differenceInDays, isThisWeek, isToday, parseISO, formatDistanceToNow } from "date-fns";
import { Users, Wallet, BarChart, AlertTriangle } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, change, description, className }: { title: string, value: string, icon: React.ElementType, change?: string, description?: string, className?: string }) => (
    <Card className={cn(className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {change && <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-primary">{change}</span>
                {description}
            </p>}
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    const upcomingPayments = payments.filter(p => {
        if (p.status !== 'due') return false;
        const dueDate = parseISO(p.date);
        const today = new Date();
        const daysUntilDue = differenceInDays(dueDate, today);
        return daysUntilDue >= 0 && daysUntilDue <= 7;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);

    const overdueMembers = payments
        .filter(p => p.status === 'overdue')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    const upcomingBirthdays = members.filter(m => {
        const birthday = parseISO(m.birthday);
        const today = new Date();
        birthday.setFullYear(today.getFullYear());
        return isThisWeek(birthday, { weekStartsOn: 1 }) && differenceInDays(birthday, today) >= 0;
    }).sort((a,b) => parseISO(a.birthday).getDate() - parseISO(b.birthday).getDate()).slice(0, 5);

    const totalRevenue = payments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
    const overduePaymentsCount = payments.filter(p => p.status === 'overdue').length;
    const dueSoonCount = upcomingPayments.length;

    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard title="Members" value={String(members.length)} icon={Users} change="+2" description="this month" />
                <StatCard title="Overdues" value={String(overduePaymentsCount)} icon={BarChart} change="+5" description="since last week" />
                <StatCard title="Due Soon" value={String(dueSoonCount)} icon={AlertTriangle} description="within 7 days" />
                <StatCard title="30d Revenue" value={`$${(totalRevenue / 1000).toFixed(1)}k`} icon={Wallet} change="+15.2%" description="from last month" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Due within 7 days</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Due</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {upcomingPayments.map(payment => (
                                    <TableRow key={payment.id}>
                                        <TableCell>
                                            <div className="font-medium">{payment.memberName}</div>
                                        </TableCell>
                                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">{new Date(payment.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Overdue Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Overdue Since</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {overdueMembers.map(payment => (
                                    <TableRow key={payment.id}>
                                        <TableCell>
                                            <div className="font-medium">{payment.memberName}</div>
                                        </TableCell>
                                        <TableCell className="text-destructive">${payment.amount.toFixed(2)}</TableCell>
                                        <TableCell className="text-right text-destructive">{formatDistanceToNow(parseISO(payment.date), { addSuffix: true })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Birthdays</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {upcomingBirthdays.map(member => (
                             <div key={member.id} className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={member.avatarUrl} alt={member.firstName} data-ai-hint="member avatar" />
                                    <AvatarFallback>{member.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">{member.firstName} {member.lastName}</p>
                                    <p className="text-sm text-muted-foreground">{member.email}</p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Badge variant={isToday(parseISO(member.birthday)) ? "default" : "secondary"}>
                                        {new Date(member.birthday).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
