import { Home, Fish, Utensils, Droplets, BarChart3, Settings, LogOut, Cloud } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Tổng quan",
    url: "/",
    icon: Home,
  },
  {
    title: "Quản lý ao nuôi",
    url: "/ponds",
    icon: Droplets,
  },
  {
    title: "Tồn kho cá",
    url: "/fish-inventory",
    icon: Fish,
  },
  {
    title: "Quản lý thức ăn",
    url: "/feed-management",
    icon: Utensils,
  },
  {
    title: "Chất lượng nước",
    url: "/water-quality",
    icon: BarChart3,
  },
  {
    title: "Thời tiết",
    url: "/weather",
    icon: Cloud,
  },
  {
    title: "Cài đặt",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const [location] = useLocation();

  const handleLogout = () => {
    console.log("Đăng xuất");
  };

  return (
    <Sidebar data-testid="app-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Fish className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm" data-testid="text-app-title">Quản lý Thủy sản</h2>
            <p className="text-xs text-muted-foreground">Hệ thống nuôi trồng</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chức năng chính</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-active={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.url.replace('/', '')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Thông tin hệ thống</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Ao hoạt động:</span>
                <span className="font-medium" data-testid="text-active-ponds">8</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Tổng số cá:</span>
                <span className="font-medium" data-testid="text-total-fish-sidebar">12,450</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Sao lưu cuối:</span>
                <span className="font-medium text-chart-2" data-testid="text-last-backup">Hôm nay</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback data-testid="text-user-initials">QL</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" data-testid="text-username">Quản lý Trại</p>
            <p className="text-xs text-muted-foreground truncate">Trại cá Hồng Phước</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start" 
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}