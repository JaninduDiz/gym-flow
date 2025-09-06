
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreVertical, PlusCircle, CheckCircle } from "lucide-react";
import { plans as initialPlans } from "@/lib/data";
import { type Plan } from "@/lib/definitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlanFormDialog } from "./plan-form-dialog";
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
} from "@/components/ui/alert-dialog"

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>(initialPlans);
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const handleSavePlan = (planData: Omit<Plan, 'id'>) => {
        if(selectedPlan) {
            setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...planData } : p));
        } else {
            const newPlan: Plan = {
                id: `plan-${Date.now()}`,
                ...planData
            };
            setPlans([...plans, newPlan]);
        }
        setSelectedPlan(null);
    }
    
    const handleEdit = (plan: Plan) => {
        setSelectedPlan(plan);
        setFormOpen(true);
    }

    const handleDelete = (planId: string) => {
        setPlans(plans.filter(p => p.id !== planId));
    }

    return (
        <div className="grid gap-6">
            <div className="flex justify-end">
                <Button onClick={() => { setSelectedPlan(null); setFormOpen(true); }}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Plan
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <Card key={plan.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{plan.name}</CardTitle>
                                    <CardDescription>
                                        <span className="text-2xl font-bold">${plan.price.toFixed(2)}</span>
                                        <span className="text-muted-foreground">/{plan.cycle}</span>
                                    </CardDescription>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(plan)}>Edit</DropdownMenuItem>
                                         <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the plan.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(plan.id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                            <ul className="space-y-2 text-sm">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <PlanFormDialog 
                open={isFormOpen} 
                onOpenChange={setFormOpen}
                onSave={handleSavePlan}
                plan={selectedPlan}
            />
        </div>
    )
}
