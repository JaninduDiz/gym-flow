
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CreditCard, LayoutGrid, Users, Settings, LifeBuoy, LogOut, NotebookPen, UsersRound } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProtectedRoute, useAuth } from '@/hooks/use-auth';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/members', label: 'Members', icon: Users },
  { href: '/payments', label: 'Payments', icon: CreditCard },
  { href: '/plans', label: 'Plans', icon: NotebookPen },
  { href: '/users', label: 'Users', icon: UsersRound },
];

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logOut, user } = useAuth();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const handleLogout = async () => {
    await logOut();
    router.push('/login');
  };

  const handleLinkClick = () => {
    setOpenMobile(false);
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  onClick={handleLinkClick}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu className="mb-[-2] sm:mb-[-8px]">
              <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" tooltip="Settings" isActive={pathname === '/settings'} onClick={handleLinkClick}>
                      <Link href="/settings">
                          <Settings />
                          <span>Settings</span>
                      </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" tooltip="Support" isActive={pathname === '/support'} onClick={handleLinkClick}>
                      <Link href="/support">
                          <LifeBuoy />
                          <span>Support</span>
                      </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton size="lg" tooltip="Logout" onClick={handleLogout}>
                      <LogOut />
                      <span>Logout</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
          <Separator className="bg-sidebar-border" />
          <div className="flex items-center gap-4 cursor-pointer px-2 rounded-md sm:py-2">
              <Avatar className="h-10 w-10">
              <AvatarImage src="https://picsum.photos/100/100?random=10" alt="@manager" data-ai-hint="manager avatar" />
              <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm truncate">
                  <span className="font-semibold truncate">{user?.displayName || 'User'}</span>
                  <span className="text-muted-foreground truncate">{user?.email}</span>
              </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card/80 backdrop-blur-sm px-6 sticky top-0 z-30 md:static md:h-auto md:border-0 md:bg-transparent md:px-6 md:pt-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold font-headline">
              {navItems.find(item => pathname.startsWith(item.href))?.label || 
               (pathname.startsWith('/settings') && 'Settings') ||
               (pathname.startsWith('/support') && 'Support')
              }
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
