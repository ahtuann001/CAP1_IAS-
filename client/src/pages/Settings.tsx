import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Database, Bell, User } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Cài đặt hệ thống</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-user-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Thông tin người dùng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input id="username" data-testid="input-username" defaultValue="admin" />
            </div>
            <div>
              <Label htmlFor="farm-name">Tên trại nuôi</Label>
              <Input id="farm-name" data-testid="input-farm-name" defaultValue="Trại cá Hồng Phước" />
            </div>
            <div>
              <Label htmlFor="owner-name">Tên chủ trại</Label>
              <Input id="owner-name" data-testid="input-owner-name" defaultValue="Nguyễn Văn A" />
            </div>
            <Button data-testid="button-save-user">
              <Save className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </Button>
          </CardContent>
        </Card>

        <Card data-testid="card-backup-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Sao lưu tự động
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup">Bật sao lưu tự động</Label>
              <Switch id="auto-backup" data-testid="switch-auto-backup" defaultChecked />
            </div>
            <div>
              <Label htmlFor="backup-frequency">Tần suất sao lưu</Label>
              <Select defaultValue="daily">
                <SelectTrigger data-testid="select-backup-frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Mỗi giờ</SelectItem>
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="backup-time">Thời gian sao lưu</Label>
              <Input id="backup-time" data-testid="input-backup-time" type="time" defaultValue="02:00" />
            </div>
            <Button data-testid="button-backup-now">
              <Database className="h-4 w-4 mr-2" />
              Sao lưu ngay
            </Button>
          </CardContent>
        </Card>

        <Card data-testid="card-notification-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Thông báo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="water-quality-alerts">Cảnh báo chất lượng nước</Label>
              <Switch id="water-quality-alerts" data-testid="switch-water-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="feeding-reminders">Nhắc nhở cho ăn</Label>
              <Switch id="feeding-reminders" data-testid="switch-feeding-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="harvest-alerts">Thông báo thu hoạch</Label>
              <Switch id="harvest-alerts" data-testid="switch-harvest-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="low-stock-alerts">Cảnh báo thiếu thức ăn</Label>
              <Switch id="low-stock-alerts" data-testid="switch-stock-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}