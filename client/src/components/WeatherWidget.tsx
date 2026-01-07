import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Zap,
  Eye,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  MapPin
} from "lucide-react";

interface WeatherData {
  current: {
    name: string;
    country: string; // Thêm country
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
  };
  forecast: {
    list: Array<{
      dt: number;
      main: {
        temp: number;
        temp_max: number;
        temp_min: number;
        humidity: number;
      };
      weather: Array<{
        main: string;
        description: string;
        icon: string;
      }>;
      dt_txt: string;
    }>;
  };
}

const getWeatherIcon = (weatherMain: string, size: number = 24) => {
  const iconProps = { size, className: "text-primary" };
  
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return <Sun {...iconProps} className="text-yellow-500" />;
    case 'clouds':
      return <Cloud {...iconProps} className="text-gray-500" />;
    case 'rain':
    case 'drizzle':
      return <CloudRain {...iconProps} className="text-blue-500" />;
    case 'snow':
      return <CloudSnow {...iconProps} className="text-blue-200" />;
    case 'thunderstorm':
      return <Zap {...iconProps} className="text-purple-500" />;
    default:
      return <Cloud {...iconProps} />;
  }
};

const formatDate = (dt: number) => {
  return new Date(dt * 1000).toLocaleDateString('vi-VN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

export function WeatherWidget() {
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        () => {
          // Default to Da Nang, Vietnam nếu từ chối location
          setLocation({ lat: 16.0544, lon: 108.2022 });
        }
      );
    } else {
      // Default to Da Nang, Vietnam
      setLocation({ lat: 16.0544, lon: 108.2022 });
    }
  }, []);

  const { data: weatherData, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['/api/weather', location?.lat, location?.lon],
    queryFn: async () => {
      const response = await fetch(`/api/weather?lat=${location!.lat}&lon=${location!.lon}`);
      if (!response.ok) {
        throw new Error('Weather API error');
      }
      return response.json();
    },
    enabled: !!location,
  });

  if (isLoading || !location) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Thông tin thời tiết
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Thông tin thời tiết
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Không thể tải dữ liệu thời tiết</p>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) return null;

  const { current, forecast } = weatherData;
  
const getLocationName = () => {
  // Nếu current.name là địa danh nhỏ/lạ, fallback về tên thành phố lớn
  const unknownNames = ['Ap Ba', 'Ap', 'Xa', 'Huyen', 'Phuong'];
  const isUnknownName = unknownNames.some(name => current.name.includes(name));
  
  if (isUnknownName || current.name.length < 3) {
    // Dùng tọa độ để xác định thành phố lớn gần nhất
    const lat = location?.lat || 0;
    const lon = location?.lon || 0;
    
    // Map tọa độ Việt Nam với thành phố chính
    if (lat >= 10.5 && lat <= 11.0 && lon >= 106.5 && lon <= 107.0) {
      return 'Hồ Chí Minh, Vietnam';
    } else if (lat >= 20.5 && lat <= 21.5 && lon >= 105.0 && lon <= 106.0) {
      return 'Hà Nội, Vietnam';
    } else if (lat >= 15.8 && lat <= 16.3 && lon >= 107.8 && lon <= 108.5) {
      return 'Đà Nẵng, Vietnam';
    } else if (lat >= 10.0 && lat <= 10.5 && lon >= 105.5 && lon <= 106.5) {
      return 'Cần Thơ, Vietnam';
    } else if (lat >= 20.8 && lat <= 21.3 && lon >= 106.5 && lon <= 107.5) {
      return 'Hạ Long, Vietnam';
    } else {
      return current.country ? `${current.name}, ${current.country}` : 'Vị trí hiện tại';
    }
  }
  
  return current.country ? `${current.name}, ${current.country}` : current.name;
};

const locationName = getLocationName();

  
  const getDailyForecast = () => {
  const dailyData: { [date: string]: any } = {};
  
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        dt: item.dt,
        temps: [item.main.temp],
        weather: item.weather[0],
        humidity: item.main.humidity
      };
    } else {
      dailyData[date].temps.push(item.main.temp);
    }
  });
  
  return Object.values(dailyData).slice(0, 5).map((day: any) => ({
    dt: day.dt,
    main: {
      temp_max: Math.max(...day.temps),
      temp_min: Math.min(...day.temps)
    },
    weather: [day.weather],
    humidity: day.humidity
  }));
};

const dailyForecast = getDailyForecast();

  return (
    <div className="space-y-4">
      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Thời tiết hiện tại
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {locationName}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {getWeatherIcon(current.weather[0].main, 48)}
              <div>
                <div className="text-3xl font-bold">
                  {Math.round(current.main.temp)}°C
                </div>
                <div className="text-muted-foreground capitalize">
                  {current.weather[0].description}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Độ ẩm</div>
                <div className="font-semibold">{current.main.humidity}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm text-muted-foreground">Gió</div>
                <div className="font-semibold">{current.wind.speed} m/s</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Áp suất</div>
                <div className="font-semibold">{current.main.pressure} hPa</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">Tầm nhìn</div>
                <div className="font-semibold">{(current.visibility / 1000).toFixed(1)} km</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Dự báo 5 ngày tới</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyForecast.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium min-w-[80px]">
                    {index === 0 ? 'Hôm nay' : formatDate(item.dt)}
                  </div>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(item.weather[0].main, 24)}
                    <span className="text-sm text-muted-foreground capitalize">
                      {item.weather[0].description}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">
                      {Math.round(item.main.temp_max)}°
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(item.main.temp_min)}°
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
