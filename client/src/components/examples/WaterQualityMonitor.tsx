import WaterQualityMonitor from '../WaterQualityMonitor';

export default function WaterQualityMonitorExample() {
  //todo: remove mock functionality
  const mockQualityData = [
    {
      id: "reading-1",
      pondId: "pond-1", 
      pondName: "Ao số 1",
      ph: 7.2,
      temperature: 28.5,
      oxygen: 6.2,
      ammonia: 0.08,
      timestamp: "2024-09-24T08:00:00Z",
      status: "tốt" as const
    },
    {
      id: "reading-2",
      pondId: "pond-2",
      pondName: "Ao số 2",
      ph: 6.8,
      temperature: 29.1,
      oxygen: 4.8,
      ammonia: 0.15,
      timestamp: "2024-09-24T08:15:00Z",
      status: "cảnh báo" as const
    },
    {
      id: "reading-3",
      pondId: "pond-3",
      pondName: "Ao số 3",
      ph: 7.5,
      temperature: 27.8,
      oxygen: 6.8,
      ammonia: 0.05,
      timestamp: "2024-09-24T08:30:00Z",
      status: "tốt" as const
    },
    {
      id: "reading-4",
      pondId: "pond-4",
      pondName: "Ao số 4",
      ph: 6.2,
      temperature: 31.2,
      oxygen: 2.8,
      ammonia: 0.35,
      timestamp: "2024-09-24T08:45:00Z",
      status: "nguy hiểm" as const
    },
    {
      id: "reading-5",
      pondId: "pond-1",
      pondName: "Ao số 1",
      ph: 7.1,
      temperature: 28.8,
      oxygen: 6.0,
      ammonia: 0.09,
      timestamp: "2024-09-24T09:00:00Z",
      status: "tốt" as const
    }
  ];

  const mockChartData = [
    { time: "06:00", ph: 7.0, temperature: 27.5, oxygen: 6.5, ammonia: 0.06 },
    { time: "08:00", ph: 7.2, temperature: 28.0, oxygen: 6.2, ammonia: 0.08 },
    { time: "10:00", ph: 7.3, temperature: 28.8, oxygen: 6.0, ammonia: 0.09 },
    { time: "12:00", ph: 7.1, temperature: 29.5, oxygen: 5.8, ammonia: 0.11 },
    { time: "14:00", ph: 7.0, temperature: 30.2, oxygen: 5.5, ammonia: 0.12 },
    { time: "16:00", ph: 6.9, temperature: 29.8, oxygen: 5.7, ammonia: 0.10 },
    { time: "18:00", ph: 7.1, temperature: 29.0, oxygen: 6.0, ammonia: 0.08 },
    { time: "20:00", ph: 7.2, temperature: 28.2, oxygen: 6.3, ammonia: 0.07 }
  ];

  return <WaterQualityMonitor qualityData={mockQualityData} chartData={mockChartData} />;
}