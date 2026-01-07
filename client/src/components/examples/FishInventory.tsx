import FishInventory from '../FishInventory';

export default function FishInventoryExample() {
  //todo: remove mock functionality
  const mockFishStocks = [
    {
      id: "stock-1",
      pondId: "pond-1",
      pondName: "Ao số 1",
      species: "Cá tra",
      currentCount: 2450,
      initialCount: 2500,
      averageWeight: 1.2,
      totalWeight: 2940,
      growthRate: 8.5,
      lastWeighed: "20/09/2024",
      harvestDate: "15/11/2024",
      status: "đang nuôi" as const
    },
    {
      id: "stock-2",
      pondId: "pond-2", 
      pondName: "Ao số 2",
      species: "Cá basa",
      currentCount: 1750,
      initialCount: 1800,
      averageWeight: 1.8,
      totalWeight: 3150,
      growthRate: 12.3,
      lastWeighed: "18/09/2024",
      harvestDate: "01/11/2024",
      status: "sẵn sàng thu hoạch" as const
    },
    {
      id: "stock-3",
      pondId: "pond-3",
      pondName: "Ao số 3",
      species: "Cá chép", 
      currentCount: 3100,
      initialCount: 3200,
      averageWeight: 0.8,
      totalWeight: 2480,
      growthRate: 6.2,
      lastWeighed: "22/09/2024",
      harvestDate: "20/12/2024",
      status: "đang nuôi" as const
    },
    {
      id: "stock-4",
      pondId: "pond-4",
      pondName: "Ao số 4",
      species: "Cá rô phi",
      currentCount: 950,
      initialCount: 1000,
      averageWeight: 1.5,
      totalWeight: 1425,
      growthRate: 9.8,
      lastWeighed: "19/09/2024", 
      harvestDate: "05/11/2024",
      status: "sẵn sàng thu hoạch" as const
    },
    {
      id: "stock-5",
      pondId: "pond-1",
      pondName: "Ao số 1",
      species: "Tôm hẻ",
      currentCount: 5000,
      initialCount: 5200,
      averageWeight: 0.15,
      totalWeight: 750,
      growthRate: 15.2,
      lastWeighed: "21/09/2024",
      harvestDate: "30/10/2024",
      status: "sẵn sàng thu hoạch" as const
    }
  ];

  return <FishInventory fishStocks={mockFishStocks} />;
}