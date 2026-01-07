import DashboardOverview from '../DashboardOverview';

export default function DashboardOverviewExample() {
  //todo: remove mock functionality
  const mockPonds = [
    {
      id: "pond-1",
      name: "Ao số 1",
      fishCount: 2500,
      waterQuality: "tốt" as const,
      lastFed: "8:30",
      oxygenLevel: 6.2
    },
    {
      id: "pond-2", 
      name: "Ao số 2",
      fishCount: 1800,
      waterQuality: "cảnh báo" as const,
      lastFed: "8:45",
      oxygenLevel: 4.8
    },
    {
      id: "pond-3",
      name: "Ao số 3", 
      fishCount: 3200,
      waterQuality: "tốt" as const,
      lastFed: "9:00",
      oxygenLevel: 6.8
    },
    {
      id: "pond-4",
      name: "Ao số 4",
      fishCount: 950,
      waterQuality: "nguy hiểm" as const,
      lastFed: "chưa cho ăn",
      oxygenLevel: 2.8
    }
  ];

  return <DashboardOverview ponds={mockPonds} />;
}