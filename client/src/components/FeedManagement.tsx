import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, Clock, Package, AlertCircle, Plus } from "lucide-react";

interface FeedingSchedule {
  id: string;
  pondId: string;
  pondName: string;
  feedTime: string;
  feedType: string;
  amount: number;
  status: "đã cho ăn" | "chưa cho ăn" | "trễ hạn";
  lastFed: string;
  nextFeeding: string;
}

interface FeedStock {
  id: string;
  feedType: string;
  currentStock: number;
  minStock: number;
  unit: string;
  expiryDate: string;
  supplier: string;
}

interface FeedManagementProps {
  schedules: FeedingSchedule[];
  feedStocks: FeedStock[];
}

export default function FeedManagement({ schedules, feedStocks }: FeedManagementProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<FeedingSchedule | null>(null);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [activeTab, setActiveTab] = useState<"schedule" | "stock">("schedule");
  const [formData, setFormData] = useState({
    pondId: "",
    feedTime: "",
    feedType: "",
    amount: ""
  });

  const handleAddSchedule = () => {
    console.log("Thêm lịch cho ăn:", formData);
    setIsAddingSchedule(false);
    setFormData({ pondId: "", feedTime: "", feedType: "", amount: "" });
  };

  const handleFeedNow = (scheduleId: string) => {
    console.log("Cho ăn ngay:", scheduleId);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "đã cho ăn": return "default";
      case "chưa cho ăn": return "secondary";
      case "trễ hạn": return "destructive";
      default: return "default";
    }
  };

  const completedFeedings = schedules.filter(s => s.status === "đã cho ăn").length;
  const pendingFeedings = schedules.filter(s => s.status === "chưa cho ăn").length;
  const overdueFeedings = schedules.filter(s => s.status === "trễ hạn").length;
  const lowStockItems = feedStocks.filter(s => s.currentStock <= s.minStock).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý thức ăn</h1>
        <Dialog open={isAddingSchedule} onOpenChange={setIsAddingSchedule}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-schedule">
              <Plus className="h-4 w-4 mr-2" />
              Thêm lịch cho ăn
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-add-schedule">
            <DialogHeader>
              <DialogTitle>Tạo lịch cho ăn mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pond-select">Chọn ao</Label>
                <Select value={formData.pondId} onValueChange={(value) => setFormData({...formData, pondId: value})}>
                  <SelectTrigger data-testid="select-pond">
                    <SelectValue placeholder="Chọn ao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pond-1">Ao số 1</SelectItem>
                    <SelectItem value="pond-2">Ao số 2</SelectItem>
                    <SelectItem value="pond-3">Ao số 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="feed-time">Thời gian cho ăn</Label>
                <Input
                  id="feed-time"
                  data-testid="input-feed-time"
                  type="time"
                  value={formData.feedTime}
                  onChange={(e) => setFormData({...formData, feedTime: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="feed-type">Loại thức ăn</Label>
                <Select value={formData.feedType} onValueChange={(value) => setFormData({...formData, feedType: value})}>
                  <SelectTrigger data-testid="select-feed-type">
                    <SelectValue placeholder="Chọn loại thức ăn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pellet-1">Cám viên số 1</SelectItem>
                    <SelectItem value="pellet-2">Cám viên số 2</SelectItem>
                    <SelectItem value="natural">Thức ăn tự nhiên</SelectItem>
                    <SelectItem value="supplement">Thức ăn bổ sung</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Khối lượng (kg)</Label>
                <Input
                  id="amount"
                  data-testid="input-amount"
                  type="number"
                  step="0.1"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="50"
                />
              </div>
              <Button onClick={handleAddSchedule} className="w-full" data-testid="button-confirm-schedule">
                Tạo lịch cho ăn
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="card-completed-feedings">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã cho ăn</CardTitle>
            <Utensils className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2" data-testid="text-completed-feedings">{completedFeedings}</div>
            <p className="text-xs text-muted-foreground">lượt hôm nay</p>
          </CardContent>
        </Card>

        <Card data-testid="card-pending-feedings">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ cho ăn</CardTitle>
            <Clock className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3" data-testid="text-pending-feedings">{pendingFeedings}</div>
            <p className="text-xs text-muted-foreground">lượt còn lại</p>
          </CardContent>
        </Card>

        <Card data-testid="card-overdue-feedings">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trễ hạn</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive" data-testid="text-overdue-feedings">{overdueFeedings}</div>
            <p className="text-xs text-muted-foreground">cần xử lý ngay</p>
          </CardContent>
        </Card>

        <Card data-testid="card-low-stock">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
            <Package className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3" data-testid="text-low-stock">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">loại thức ăn</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4 border-b">
        <Button 
          variant={activeTab === "schedule" ? "default" : "ghost"}
          onClick={() => setActiveTab("schedule")}
          data-testid="tab-schedule"
        >
          Lịch cho ăn
        </Button>
        <Button 
          variant={activeTab === "stock" ? "default" : "ghost"}
          onClick={() => setActiveTab("stock")}
          data-testid="tab-stock"
        >
          Tồn kho thức ăn
        </Button>
      </div>

      {activeTab === "schedule" && (
        <Card data-testid="card-feeding-schedule">
          <CardHeader>
            <CardTitle>Lịch cho ăn hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Ao nuôi</TableHead>
                  <TableHead>Loại thức ăn</TableHead>
                  <TableHead>Khối lượng</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id} data-testid={`row-schedule-${schedule.id}`}>
                    <TableCell className="font-medium" data-testid={`text-feed-time-${schedule.id}`}>{schedule.feedTime}</TableCell>
                    <TableCell data-testid={`text-pond-name-${schedule.id}`}>{schedule.pondName}</TableCell>
                    <TableCell data-testid={`text-feed-type-${schedule.id}`}>{schedule.feedType}</TableCell>
                    <TableCell data-testid={`text-amount-${schedule.id}`}>{schedule.amount} kg</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(schedule.status)} data-testid={`badge-status-${schedule.id}`}>
                        {schedule.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {schedule.status !== "đã cho ăn" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleFeedNow(schedule.id)}
                          data-testid={`button-feed-now-${schedule.id}`}
                        >
                          Cho ăn ngay
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "stock" && (
        <Card data-testid="card-feed-stock">
          <CardHeader>
            <CardTitle>Tồn kho thức ăn</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại thức ăn</TableHead>
                  <TableHead>Tồn kho hiện tại</TableHead>
                  <TableHead>Tồn kho tối thiểu</TableHead>
                  <TableHead>Hạn sử dụng</TableHead>
                  <TableHead>Nhà cung cấp</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedStocks.map((stock) => (
                  <TableRow key={stock.id} data-testid={`row-stock-${stock.id}`}>
                    <TableCell className="font-medium" data-testid={`text-feed-type-${stock.id}`}>{stock.feedType}</TableCell>
                    <TableCell data-testid={`text-current-stock-${stock.id}`}>{stock.currentStock} {stock.unit}</TableCell>
                    <TableCell data-testid={`text-min-stock-${stock.id}`}>{stock.minStock} {stock.unit}</TableCell>
                    <TableCell data-testid={`text-expiry-${stock.id}`}>{stock.expiryDate}</TableCell>
                    <TableCell data-testid={`text-supplier-${stock.id}`}>{stock.supplier}</TableCell>
                    <TableCell>
                      {stock.currentStock <= stock.minStock ? (
                        <Badge variant="destructive" data-testid={`badge-low-stock-${stock.id}`}>Sắp hết</Badge>
                      ) : (
                        <Badge variant="default" data-testid={`badge-sufficient-${stock.id}`}>Đủ dùng</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}