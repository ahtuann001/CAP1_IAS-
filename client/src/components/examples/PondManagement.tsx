import PondManagement from '../PondManagement';

export default function PondManagementExample() {
  //todo: remove mock functionality
  const mockPonds = [
    {
      id: "pond-1",
      name: "Ao số 1",
      area: 1000,
      depth: 2.5,
      fishSpecies: "Cá tra",
      fishCount: 2500,
      status: "hoạt động" as const,
      createdDate: "15/03/2024",
      location: "Khu vực A, lô 1"
    },
    {
      id: "pond-2",
      name: "Ao số 2", 
      area: 800,
      depth: 2.2,
      fishSpecies: "Cá basa",
      fishCount: 1800,
      status: "hoạt động" as const,
      createdDate: "20/03/2024",
      location: "Khu vực A, lô 2"
    },
    {
      id: "pond-3",
      name: "Ao số 3",
      area: 1200,
      depth: 2.8,
      fishSpecies: "Cá chép",
      fishCount: 3200,
      status: "hoạt động" as const,
      createdDate: "10/03/2024",
      location: "Khu vực B, lô 1"
    },
    {
      id: "pond-4",
      name: "Ao số 4",
      area: 600,
      depth: 2.0,
      fishSpecies: "Cá rô phi",
      fishCount: 950,
      status: "bảo trì" as const,
      createdDate: "25/03/2024",
      location: "Khu vực B, lô 2"
    },
    {
      id: "pond-5",
      name: "Ao số 5",
      area: 900,
      depth: 2.4,
      fishSpecies: "",
      fishCount: 0,
      status: "trống" as const,
      createdDate: "01/04/2024",
      location: "Khu vực C, lô 1"
    }
  ];

  return <PondManagement ponds={mockPonds} />;
}