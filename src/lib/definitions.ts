
export type Member = {
  id: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string; // ISO string date
  signupDate: string; // ISO string date
  paymentCycle: 'monthly' | 'yearly' | 'quarterly';
  treadmillAccess: boolean;
  status: 'active' | 'inactive' | 'frozen';
  avatarUrl: string;
};

export type Payment = {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string; // ISO string date
  status: 'paid' | 'due' | 'overdue';
  memberAvatarUrl: string;
};

export type Plan = {
    id: string;
    name: string;
    description: string;
    price: number;
    cycle: 'monthly' | 'quarterly' | 'yearly';
    features: string[];
}

export type AppUser = {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role: 'admin' | 'manager' | 'staff';
    avatarUrl: string;
    status: 'active' | 'inactive';
}
