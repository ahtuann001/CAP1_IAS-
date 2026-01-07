import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Calendar, Fish } from "lucide-react";

interface Pond {
  id: string;
  name: string;
  area: number;
  depth: number;
  fishSpecies: string;
  fishCount: number;
  status: "hoạt động" | "bảo trì" | "trống";
  createdDate: string;
  location: string;
}

interface PondManagementProps {
  ponds: Pond[];
}

export default function PondManagement({ ponds }: PondManagementProps) {
  const [selectedPond, setSelectedPond] = useState<Pond | null>(null);
  const [isAddingPond, setIsAddingPond] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    depth: "",
    location: "",
    fishSpecies: "",
    fishCount: ""
  });

  const handleAddPond = () => {
    console.log("Thêm ao mới:", formData);
    setIsAddingPond(false);
    setFormData({
      name: "",
      area: "",
      depth: "",
      location: "",
      fishSpecies: "",
      fishCount: ""
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "hoạt động": return "default";
      case "bảo trì": return "secondary";
      case "trống": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý ao nuôi</h1>
        <Dialog open={isAddingPond} onOpenChange={setIsAddingPond}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-pond">
              <Plus className="h-4 w-4 mr-2" />
              Thêm ao mới
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-add-pond">
            <DialogHeader>
              <DialogTitle>Thêm ao nuôi mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pond-name">Tên ao</Label>
                <Input
                  id="pond-name"
                  data-testid="input-pond-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ví dụ: Ao số 1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pond-area">Diện tích (m²)</Label>
                  <Input
                    id="pond-area"
                    data-testid="input-pond-area"
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="pond-depth">Độ sâu (m)</Label>
                  <Input
                    id="pond-depth"
                    data-testid="input-pond-depth"
                    type="number"
                    step="0.1"
                    value={formData.depth}
                    onChange={(e) => setFormData({...formData, depth: e.target.value})}
                    placeholder="2.5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pond-location">Vị trí</Label>
                <Input
                  id="pond-location"
                  data-testid="input-pond-location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Khu vực A, lô 1"
                />
              </div>
              <div>
                <Label htmlFor="fish-species">Loại cá nuôi</Label>
                <Select value={formData.fishSpecies} onValueChange={(value) => setFormData({...formData, fishSpecies: value})}>
                  <SelectTrigger data-testid="select-fish-species">
                    <SelectValue placeholder="Chọn loại cá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tra">Cá tra</SelectItem>
                    <SelectItem value="basa">Cá basa</SelectItem>
                    <SelectItem value="chep">Cá chép</SelectItem>
                    <SelectItem value="ro-phi">Cá rô phi</SelectItem>
                    <SelectItem value="tom-he">Tôm hẻ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fish-count">Số lượng cá thả ban đầu</Label>
                <Input
                  id="fish-count"
                  data-testid="input-fish-count"
                  type="number"
                  value={formData.fishCount}
                  onChange={(e) => setFormData({...formData, fishCount: e.target.value})}
                  placeholder="1000"
                />
              </div>
              <Button onClick={handleAddPond} className="w-full" data-testid="button-confirm-add-pond">
                Thêm ao nuôi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ponds.map((pond) => (
          <Card 
            key={pond.id} 
            className="hover-elevate cursor-pointer" 
            onClick={() => setSelectedPond(pond)}
            data-testid={`card-pond-${pond.id}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg" data-testid={`text-pond-name-${pond.id}`}>{pond.name}</CardTitle>
                <Badge variant={getStatusBadgeVariant(pond.status)} data-testid={`badge-pond-status-${pond.id}`}>
                  {pond.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm" data-testid={`text-pond-location-${pond.id}`}>{pond.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Fish className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm" data-testid={`text-pond-fish-${pond.id}`}>
                  {pond.fishCount.toLocaleString()} con {pond.fishSpecies}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Tạo: {pond.createdDate}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Diện tích: {pond.area}m² • Độ sâu: {pond.depth}m
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPond && (
        <Dialog open={!!selectedPond} onOpenChange={() => setSelectedPond(null)}>
          <DialogContent data-testid="dialog-pond-details">
            <DialogHeader>
              <DialogTitle>Chi tiết {selectedPond.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Diện tích</Label>
                  <p className="text-sm font-medium">{selectedPond.area} m²</p>
                </div>
                <div>
                  <Label>Độ sâu</Label>
                  <p className="text-sm font-medium">{selectedPond.depth} m</p>
                </div>
              </div>
              <div>
                <Label>Vị trí</Label>
                <p className="text-sm font-medium">{selectedPond.location}</p>
              </div>
              <div>
                <Label>Loại cá nuôi</Label>
                <p className="text-sm font-medium">{selectedPond.fishSpecies}</p>
              </div>
              <div>
                <Label>Số lượng cá hiện tại</Label>
                <p className="text-sm font-medium">{selectedPond.fishCount.toLocaleString()} con</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" data-testid="button-edit-pond">
                  Chỉnh sửa
                </Button>
                <Button variant="outline" data-testid="button-view-history">
                  Lịch sử
                </Button>
                <Button variant="destructive" data-testid="button-delete-pond">
                  Xóa ao
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}