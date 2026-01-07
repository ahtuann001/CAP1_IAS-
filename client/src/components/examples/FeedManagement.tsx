import FeedManagement from '../FeedManagement';

export default function FeedManagementExample() {
  //todo: remove mock functionality
  const mockSchedules = [
    {
      id: "sched-1",
      pondId: "pond-1",
      pondName: "Ao số 1",
      feedTime: "06:00",
      feedType: "Cám viên số 1",
      amount: 45,
      status: "đã cho ăn" as const,
      lastFed: "06:05",
      nextFeeding: "18:00"
    },
    {
      id: "sched-2",
      pondId: "pond-2",
      pondName: "Ao số 2", 
      feedTime: "06:30",
      feedType: "Cám viên số 2",
      amount: 38,
      status: "đã cho ăn" as const,
      lastFed: "06:35",
      nextFeeding: "18:30"
    },
    {
      id: "sched-3",
      pondId: "pond-3",
      pondName: "Ao số 3",
      feedTime: "07:00",
      feedType: "Thức ăn tự nhiên",
      amount: 52,
      status: "chưa cho ăn" as const,
      lastFed: "18:00 hôm qua",
      nextFeeding: "07:00"
    },
    {
      id: "sched-4", 
      pondId: "pond-1",
      pondName: "Ao số 1",
      feedTime: "18:00",
      feedType: "Cám viên số 1",
      amount: 45,
      status: "chưa cho ăn" as const,
      lastFed: "06:05",
      nextFeeding: "18:00"
    },
    {
      id: "sched-5",
      pondId: "pond-4",
      pondName: "Ao số 4",
      feedTime: "05:30",
      feedType: "Thức ăn bổ sung",
      amount: 25,
      status: "trễ hạn" as const,
      lastFed: "18:00 hôm qua",
      nextFeeding: "05:30"
    }
  ];

  const mockFeedStocks = [
    {
      id: "feed-1",
      feedType: "Cám viên số 1",
      currentStock: 850,
      minStock: 200,
      unit: "kg",
      expiryDate: "15/12/2024",
      supplier: "Công ty TNHH Thức ăn Hùng Vương"
    },
    {
      id: "feed-2",
      feedType: "Cám viên số 2", 
      currentStock: 120,
      minStock: 150,
      unit: "kg",
      expiryDate: "20/11/2024",
      supplier: "Công ty CP Thức ăn Gia Lai"
    },
    {
      id: "feed-3",
      feedType: "Thức ăn tự nhiên",
      currentStock: 45,
      minStock: 50,
      unit: "kg",
      expiryDate: "30/10/2024",
      supplier: "Trang trại địa phương"
    },
    {
      id: "feed-4",
      feedType: "Thức ăn bổ sung",
      currentStock: 280,
      minStock: 100,
      unit: "kg", 
      expiryDate: "05/01/2025",
      supplier: "Công ty TNHH Cargill Việt Nam"
    }
  ];

  return <FeedManagement schedules={mockSchedules} feedStocks={mockFeedStocks} />;
}