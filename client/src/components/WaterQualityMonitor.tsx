import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Droplets, Thermometer, Activity, Zap, Plus, TrendingDown, TrendingUp } from "lucide-react";

interface WaterQualityData {
  id: string;
  pondId: string;
  pondName: string;
  ph: number;
  temperature: number;
  oxygen: number;
  ammonia: number;
  timestamp: string;
  status: "tốt" | "cảnh báo" | "nguy hiểm";
}

interface ChartData {
  time: string;
  ph: number;
  temperature: number;
  oxygen: number;
  ammonia: number;
}

interface WaterQualityMonitorProps {
  qualityData: WaterQualityData[];
  chartData: ChartData[];
}

export default function WaterQualityMonitor({ qualityData, chartData }: WaterQualityMonitorProps) {
  const [selectedReading, setSelectedReading] = useState<WaterQualityData | null>(null);
  const [isAddingReading, setIsAddingReading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<"ph" | "temperature" | "oxygen" | "ammonia">("ph");
  const [formData, setFormData] = useState({
    pondId: "",
    ph: "",
    temperature: "",
    oxygen: "",
    ammonia: ""
  });

  const handleAddReading = () => {
    console.log("Thêm đo chất lượng nước:", formData);
    setIsAddingReading(false);
    setFormData({ pondId: "", ph: "", temperature: "", oxygen: "", ammonia: "" });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "tốt": return "default";
      case "cảnh báo": return "secondary";
      case "nguy hiểm": return "destructive";
      default: return "default";
    }
  };

  const getParameterStatus = (parameter: string, value: number) => {
    switch (parameter) {
      case "ph":
        if (value >= 6.5 && value <= 8.5) return { status: "tốt", icon: TrendingUp, color: "text-chart-2" };
        if (value >= 6.0 && value <= 9.0) return { status: "cảnh báo", icon: TrendingDown, color: "text-chart-3" };
        return { status: "nguy hiểm", icon: TrendingDown, color: "text-destructive" };
      case "oxygen":
        if (value >= 5.0) return { status: "tốt", icon: TrendingUp, color: "text-chart-2" };
        if (value >= 3.0) return { status: "cảnh báo", icon: TrendingDown, color: "text-chart-3" };
        return { status: "nguy hiểm", icon: TrendingDown, color: "text-destructive" };
      case "temperature":
        if (value >= 26 && value <= 30) return { status: "tốt", icon: TrendingUp, color: "text-chart-2" };
        if (value >= 24 && value <= 32) return { status: "cảnh báo", icon: TrendingDown, color: "text-chart-3" };
        return { status: "nguy hiểm", icon: TrendingDown, color: "text-destructive" };
      default:
        return { status: "tốt", icon: TrendingUp, color: "text-chart-2" };
    }
  };

  const getLatestReading = (pondId: string) => {
    return qualityData
      .filter(d => d.pondId === pondId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  };

  const averages = {
    ph: qualityData.reduce((sum, d) => sum + d.ph, 0) / qualityData.length,
    temperature: qualityData.reduce((sum, d) => sum + d.temperature, 0) / qualityData.length,
    oxygen: qualityData.reduce((sum, d) => sum + d.oxygen, 0) / qualityData.length,
    ammonia: qualityData.reduce((sum, d) => sum + d.ammonia, 0) / qualityData.length,
  };

  const metricConfig = {
    ph: { label: "Độ pH", unit: "", color: "#3b82f6", min: 6.5, max: 8.5 },
    temperature: { label: "Nhiệt độ", unit: "°C", color: "#ef4444", min: 26, max: 30 },
    oxygen: { label: "Oxy hòa tan", unit: "mg/L", color: "#22c55e", min: 5, max: 10 },
    ammonia: { label: "Amoniac", unit: "mg/L", color: "#f59e0b", min: 0, max: 0.5 }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Giám sát chất lượng nước</h1>
        <Dialog open={isAddingReading} onOpenChange={setIsAddingReading}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-reading">
              <Plus className="h-4 w-4 mr-2" />
              Thêm số liệu đo
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-add-reading">
            <DialogHeader>
              <DialogTitle>Thêm số liệu đo chất lượng nước</DialogTitle>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ph">Độ pH</Label>
                  <Input
                    id="ph"
                    data-testid="input-ph"
                    type="number"
                    step="0.1"
                    value={formData.ph}
                    onChange={(e) => setFormData({...formData, ph: e.target.value})}
                    placeholder="7.2"
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Nhiệt độ (°C)</Label>
                  <Input
                    id="temperature"
                    data-testid="input-temperature"
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                    placeholder="28.5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="oxygen">Oxy hòa tan (mg/L)</Label>
                  <Input
                    id="oxygen"
                    data-testid="input-oxygen"
                    type="number"
                    step="0.1"
                    value={formData.oxygen}
                    onChange={(e) => setFormData({...formData, oxygen: e.target.value})}
                    placeholder="6.2"
                  />
                </div>
                <div>
                  <Label htmlFor="ammonia">Amoniac (mg/L)</Label>
                  <Input
                    id="ammonia"
                    data-testid="input-ammonia"
                    type="number"
                    step="0.01"
                    value={formData.ammonia}
                    onChange={(e) => setFormData({...formData, ammonia: e.target.value})}
                    placeholder="0.1"
                  />
                </div>
              </div>
              <Button onClick={handleAddReading} className="w-full" data-testid="button-confirm-reading">
                Lưu số liệu đo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="card-avg-ph">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pH trung bình</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-avg-ph">{averages.ph.toFixed(1)}</div>
            <div className="flex items-center text-xs">
              {(() => {
                const status = getParameterStatus("ph", averages.ph);
                const Icon = status.icon;
                return (
                  <>
                    <Icon className={`h-3 w-3 mr-1 ${status.color}`} />
                    <span className={status.color}>{status.status}</span>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-avg-temperature">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhiệt độ TB</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-avg-temperature">{averages.temperature.toFixed(1)}°C</div>
            <div className="flex items-center text-xs">
              {(() => {
                const status = getParameterStatus("temperature", averages.temperature);
                const Icon = status.icon;
                return (
                  <>
                    <Icon className={`h-3 w-3 mr-1 ${status.color}`} />
                    <span className={status.color}>{status.status}</span>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-avg-oxygen">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oxy TB</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-avg-oxygen">{averages.oxygen.toFixed(1)} mg/L</div>
            <div className="flex items-center text-xs">
              {(() => {
                const status = getParameterStatus("oxygen", averages.oxygen);
                const Icon = status.icon;
                return (
                  <>
                    <Icon className={`h-3 w-3 mr-1 ${status.color}`} />
                    <span className={status.color}>{status.status}</span>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-avg-ammonia">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amoniac TB</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-avg-ammonia">{averages.ammonia.toFixed(2)} mg/L</div>
            <p className="text-xs text-muted-foreground">7 ngày qua</p>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-quality-chart">
        <CardHeader>
          <CardTitle>Biểu đồ theo dõi chất lượng nước</CardTitle>
          <div className="flex space-x-2">
            {Object.entries(metricConfig).map(([key, config]) => (
              <Button
                key={key}
                size="sm"
                variant={selectedMetric === key ? "default" : "outline"}
                onClick={() => setSelectedMetric(key as any)}
                data-testid={`button-metric-${key}`}
              >
                {config.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}${metricConfig[selectedMetric].unit}`, 
                  metricConfig[selectedMetric].label
                ]}
              />
              <ReferenceLine 
                y={metricConfig[selectedMetric].min} 
                stroke="#22c55e" 
                strokeDasharray="5 5" 
                label="Min" 
              />
              <ReferenceLine 
                y={metricConfig[selectedMetric].max} 
                stroke="#22c55e" 
                strokeDasharray="5 5" 
                label="Max" 
              />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={metricConfig[selectedMetric].color}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card data-testid="card-recent-readings">
        <CardHeader>
          <CardTitle>Số liệu đo gần nhất</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Ao nuôi</TableHead>
                <TableHead>pH</TableHead>
                <TableHead>Nhiệt độ</TableHead>
                <TableHead>Oxy</TableHead>
                <TableHead>Amoniac</TableHead>
                <TableHead>Tình trạng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityData.slice(0, 10).map((reading) => (
                <TableRow 
                  key={reading.id}
                  className="cursor-pointer hover-elevate"
                  onClick={() => setSelectedReading(reading)}
                  data-testid={`row-reading-${reading.id}`}
                >
                  <TableCell className="font-medium" data-testid={`text-timestamp-${reading.id}`}>
                    {new Date(reading.timestamp).toLocaleString('vi-VN')}
                  </TableCell>
                  <TableCell data-testid={`text-pond-name-${reading.id}`}>{reading.pondName}</TableCell>
                  <TableCell data-testid={`text-ph-${reading.id}`}>{reading.ph}</TableCell>
                  <TableCell data-testid={`text-temperature-${reading.id}`}>{reading.temperature}°C</TableCell>
                  <TableCell data-testid={`text-oxygen-${reading.id}`}>{reading.oxygen} mg/L</TableCell>
                  <TableCell data-testid={`text-ammonia-${reading.id}`}>{reading.ammonia} mg/L</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(reading.status)} data-testid={`badge-status-${reading.id}`}>
                      {reading.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}