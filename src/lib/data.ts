
import type { Member, Payment, Plan, AppUser } from './definitions';

export const members: Member[] = [
  {
    id: '1',
    memberNumber: 'GF001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    birthday: '1990-05-15',
    signupDate: '2023-01-10',
    paymentCycle: 'monthly',
    treadmillAccess: true,
    status: 'active',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: '2',
    memberNumber: 'GF002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    birthday: '1988-08-22',
    signupDate: '2022-11-20',
    paymentCycle: 'yearly',
    treadmillAccess: false,
    status: 'active',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: '3',
    memberNumber: 'GF003',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    birthday: '1995-12-01',
    signupDate: '2023-03-15',
    paymentCycle: 'monthly',
    treadmillAccess: true,
    status: 'inactive',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
  },
  {
    id: '4',
    memberNumber: 'GF004',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    birthday: '1992-07-30',
    signupDate: '2021-09-05',
    paymentCycle: 'quarterly',
    treadmillAccess: false,
    status: 'frozen',
    avatarUrl: 'https://picsum.photos/100/100?random=4',
  },
  {
    id: '5',
    memberNumber: 'GF005',
    firstName: 'Chris',
    lastName: 'Brown',
    email: 'chris.brown@example.com',
    birthday: '1985-02-18',
    signupDate: '2023-06-25',
    paymentCycle: 'monthly',
    treadmillAccess: true,
    status: 'active',
    avatarUrl: 'https://picsum.photos/100/100?random=5',
  },
];

export const payments: Payment[] = [
  {
    id: 'p1',
    memberId: '1',
    memberName: 'John Doe',
    amount: 50,
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    status: 'paid',
    memberAvatarUrl: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: 'p2',
    memberId: '2',
    memberName: 'Jane Smith',
    amount: 500,
    date: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    status: 'paid',
    memberAvatarUrl: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: 'p3',
    memberId: '5',
    memberName: 'Chris Brown',
    amount: 50,
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    status: 'due',
    memberAvatarUrl: 'https://picsum.photos/100/100?random=5',
  },
  {
    id: 'p4',
    memberId: '1',
    memberName: 'John Doe',
    amount: 50,
    date: new Date().toISOString(),
    status: 'due',
    memberAvatarUrl: 'https://picsum.photos/100/100?random=1',
  },
    {
    id: 'p5',
    memberId: '4',
    memberName: 'Emily Davis',
    amount: 150,
    date: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString(),
    status: 'overdue',
    memberAvatarUrl: 'https://picsum.photos/100/100?random=4',
  },
];

export const plans: Plan[] = [
    {
        id: 'plan-1',
        name: 'Basic Fit',
        description: 'Access to all basic gym equipment and facilities.',
        price: 29.99,
        cycle: 'monthly',
        features: [
            'Unlimited gym access',
            'Cardio and weight training zones',
            'Locker room access'
        ]
    },
    {
        id: 'plan-2',
        name: 'Pro Fit',
        description: 'All the benefits of Basic Fit, plus access to group classes.',
        price: 49.99,
        cycle: 'monthly',
        features: [
            'All Basic Fit features',
            'Access to all group classes (Yoga, Zumba, etc.)',
            'Towel service'
        ]
    },
    {
        id: 'plan-3',
        name: 'Yearly Saver',
        description: 'Commit for a year and save big on your membership.',
        price: 499.99,
        cycle: 'yearly',
        features: [
            'All Pro Fit features',
            '2 free personal training sessions',
            '10% off merchandise'
        ]
    }
];

export const appUsers: AppUser[] = [
    {
        id: 'user-1',
        name: 'Alex Johnson',
        email: 'alex.j@gymflow.com',
        mobile: '123-456-7890',
        role: 'admin',
        avatarUrl: 'https://picsum.photos/100/100?random=11',
        status: 'active',
    },
    {
        id: 'user-2',
        name: 'Maria Garcia',
        email: 'maria.g@gymflow.com',
        mobile: '234-567-8901',
        role: 'manager',
        avatarUrl: 'https://picsum.photos/100/100?random=12',
        status: 'active',
    },
    {
        id: 'user-3',
        name: 'Sam Wilson',
        email: 'sam.w@gymflow.com',
        mobile: '345-678-9012',
        role: 'staff',
        avatarUrl: 'https://picsum.photos/100/100?random=13',
        status: 'inactive',
    }
]
