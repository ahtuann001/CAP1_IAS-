import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, TrendingUp, Weight, Calendar } from "lucide-react";

interface FishStock {
  id: string;
  pondId: string;
  pondName: string;
  species: string;
  currentCount: number;
  initialCount: number;
  averageWeight: number;
  totalWeight: number;
  growthRate: number;
  lastWeighed: string;
  harvestDate: string;
  status: "đang nuôi" | "sẵn sàng thu hoạch" | "đã thu hoạch";
}

interface FishInventoryProps {
  fishStocks: FishStock[];
}

export default function FishInventory({ fishStocks }: FishInventoryProps) {
  const [selectedStock, setSelectedStock] = useState<FishStock | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [formData, setFormData] = useState({
    pondId: "",
    species: "",
    count: "",
    weight: ""
  });

  const handleAddRecord = () => {
    console.log("Thêm bản ghi cá mới:", formData);
    setIsAddingRecord(false);
    setFormData({ pondId: "", species: "", count: "", weight: "" });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "đang nuôi": return "default";
      case "sẵn sàng thu hoạch": return "secondary";
      case "đã thu hoạch": return "outline";
      default: return "default";
    }
  };

  const totalFish = fishStocks.reduce((sum, stock) => sum + stock.currentCount, 0);
  const totalWeight = fishStocks.reduce((sum, stock) => sum + stock.totalWeight, 0);
  const readyToHarvest = fishStocks.filter(s => s.status === "sẵn sàng thu hoạch").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý tồn kho cá</h1>
        <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-record">
              <Plus className="h-4 w-4 mr-2" />
              Cập nhật tồn kho
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-add-record">
            <DialogHeader>
              <DialogTitle>Cập nhật thông tin cá</DialogTitle>
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
                <Label htmlFor="species-select">Loại cá</Label>
                <Select value={formData.species} onValueChange={(value) => setFormData({...formData, species: value})}>
                  <SelectTrigger data-testid="select-species">
                    <SelectValue placeholder="Chọn loại cá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tra">Cá tra</SelectItem>
                    <SelectItem value="basa">Cá basa</SelectItem>
                    <SelectItem value="chep">Cá chép</SelectItem>
                    <SelectItem value="ro-phi">Cá rô phi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fish-count">Số lượng hiện tại</Label>
                <Input
                  id="fish-count"
                  data-testid="input-fish-count"
                  type="number"
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: e.target.value})}
                  placeholder="950"
                />
              </div>
              <div>
                <Label htmlFor="average-weight">Trọng lượng trung bình (kg)</Label>
                <Input
                  id="average-weight"
                  data-testid="input-average-weight"
                  type="number"
                  step="0.01"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  placeholder="1.2"
                />
              </div>
              <Button onClick={handleAddRecord} className="w-full" data-testid="button-confirm-record">
                Cập nhật tồn kho
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data-testid="card-total-fish">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số cá</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-fish">{totalFish.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">con cá đang nuôi</p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-weight">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng trọng lượng</CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-weight">{totalWeight.toFixed(0)} kg</div>
            <p className="text-xs text-muted-foreground">khối lượng hiện tại</p>
          </CardContent>
        </Card>

        <Card data-testid="card-ready-harvest">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sẵn sàng thu hoạch</CardTitle>
            <Calendar className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2" data-testid="text-ready-harvest">{readyToHarvest}</div>
            <p className="text-xs text-muted-foreground">ao sẵn sàng thu hoạch</p>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-fish-inventory">
        <CardHeader>
          <CardTitle>Chi tiết tồn kho theo ao</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ao nuôi</TableHead>
                <TableHead>Loại cá</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Trọng lượng TB</TableHead>
                <TableHead>Tăng trưởng</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead>Thu hoạch dự kiến</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fishStocks.map((stock) => (
                <TableRow 
                  key={stock.id} 
                  className="cursor-pointer hover-elevate"
                  onClick={() => setSelectedStock(stock)}
                  data-testid={`row-fish-stock-${stock.id}`}
                >
                  <TableCell className="font-medium" data-testid={`text-pond-name-${stock.id}`}>{stock.pondName}</TableCell>
                  <TableCell data-testid={`text-species-${stock.id}`}>{stock.species}</TableCell>
                  <TableCell data-testid={`text-count-${stock.id}`}>{stock.currentCount.toLocaleString()}</TableCell>
                  <TableCell data-testid={`text-weight-${stock.id}`}>{stock.averageWeight.toFixed(2)} kg</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-chart-2" />
                      <span data-testid={`text-growth-${stock.id}`}>{stock.growthRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(stock.status)} data-testid={`badge-status-${stock.id}`}>
                      {stock.status}
                    </Badge>
                  </TableCell>
                  <TableCell data-testid={`text-harvest-date-${stock.id}`}>{stock.harvestDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedStock && (
        <Dialog open={!!selectedStock} onOpenChange={() => setSelectedStock(null)}>
          <DialogContent data-testid="dialog-stock-details">
            <DialogHeader>
              <DialogTitle>Chi tiết {selectedStock.pondName} - {selectedStock.species}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Số lượng ban đầu</Label>
                  <p className="text-sm font-medium">{selectedStock.initialCount.toLocaleString()} con</p>
                </div>
                <div>
                  <Label>Số lượng hiện tại</Label>
                  <p className="text-sm font-medium">{selectedStock.currentCount.toLocaleString()} con</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Trọng lượng trung bình</Label>
                  <p className="text-sm font-medium">{selectedStock.averageWeight.toFixed(2)} kg</p>
                </div>
                <div>
                  <Label>Tổng trọng lượng</Label>
                  <p className="text-sm font-medium">{selectedStock.totalWeight.toFixed(0)} kg</p>
                </div>
              </div>
              <div>
                <Label>Tốc độ tăng trưởng</Label>
                <p className="text-sm font-medium">{selectedStock.growthRate}% / tháng</p>
              </div>
              <div>
                <Label>Lần cân gần nhất</Label>
                <p className="text-sm font-medium">{selectedStock.lastWeighed}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" data-testid="button-update-weight">
                  Cập nhật cân nặng
                </Button>
                <Button variant="outline" data-testid="button-record-harvest">
                  Ghi nhận thu hoạch
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}