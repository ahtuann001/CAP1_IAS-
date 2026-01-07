import { WeatherWidget } from "@/components/WeatherWidget";

export default function Weather() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Thông tin thời tiết</h1>
        <p className="text-muted-foreground mt-1">
          Theo dõi điều kiện thời tiết để điều chính hoạt động nuôi trồng thủy sản
        </p>
      </div>

      <WeatherWidget />
    </div>
  );
}
