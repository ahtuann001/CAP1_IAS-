import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fish, Droplets, Utensils, AlertTriangle } from "lucide-react";
import { WeatherWidget } from "./WeatherWidget";

interface PondSummary {
  id: string;
  name: string;
  fishCount: number;
  waterQuality: "tốt" | "cảnh báo" | "nguy hiểm";
  lastFed: string;
  oxygenLevel: number;
}

interface DashboardOverviewProps {
  ponds: PondSummary[];
}

export default function DashboardOverview({ ponds }: DashboardOverviewProps) {
  const totalFish = ponds.reduce((sum, pond) => sum + pond.fishCount, 0);
  const healthyPonds = ponds.filter(p => p.waterQuality === "tốt").length;
  const warningPonds = ponds.filter(p => p.waterQuality === "cảnh báo").length;
  const dangerPonds = ponds.filter(p => p.waterQuality === "nguy hiểm").length;

  const getQualityBadgeVariant = (quality: string) => {
    switch (quality) {
      case "tốt": return "default";
      case "cảnh báo": return "secondary"; 
      case "nguy hiểm": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tổng quan hệ thống</h1>
        <Badge variant="outline" data-testid="status-system">
          {ponds.length} ao đang hoạt động
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-total-fish">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số cá</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-fish">{totalFish.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">con cá đang nuôi</p>
          </CardContent>
        </Card>

        <Card data-testid="card-healthy-ponds">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ao khỏe mạnh</CardTitle>
            <Droplets className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2" data-testid="text-healthy-ponds">{healthyPonds}</div>
            <p className="text-xs text-muted-foreground">ao có chất lượng nước tốt</p>
          </CardContent>
        </Card>

        <Card data-testid="card-warning-ponds">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cần chú ý</CardTitle>
            <AlertTriangle className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3" data-testid="text-warning-ponds">{warningPonds}</div>
            <p className="text-xs text-muted-foreground">ao cần theo dõi</p>
          </CardContent>
        </Card>

        <Card data-testid="card-feeding-today">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cho ăn hôm nay</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-feeding-completed">6/8</div>
            <p className="text-xs text-muted-foreground">lượt cho ăn đã hoàn thành</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card data-testid="card-pond-status">
            <CardHeader>
              <CardTitle>Tình trạng các ao nuôi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ponds.map((pond) => (
                  <div key={pond.id} className="flex items-center justify-between p-3 border rounded-md hover-elevate" data-testid={`pond-status-${pond.id}`}>
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium" data-testid={`text-pond-name-${pond.id}`}>{pond.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {pond.fishCount.toLocaleString()} con cá • O₂: {pond.oxygenLevel}mg/L
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getQualityBadgeVariant(pond.waterQuality)} data-testid={`badge-quality-${pond.id}`}>
                        {pond.waterQuality}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Cho ăn: {pond.lastFed}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
}