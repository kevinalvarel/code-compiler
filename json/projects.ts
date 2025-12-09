import { Project } from "@/types";

export const getProjects = async (userId: string): Promise<Project[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data compliant with the Project type
  return [
    {
      id: "1",
      userId,
      name: "Portfolio V3",
      description: "My personal portfolio website with 3D animations",
      framework: "nextjs",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-02-10"),
      status: "active",
    },
    {
      id: "2",
      userId,
      name: "E-commerce Dashboard",
      description: "Admin panel for the shopify store",
      framework: "react",
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-05"),
      status: "active",
    },
    {
      id: "3",
      userId,
      name: "Chat Server",
      description: "WebSocket implementation for real-time chat",
      framework: "node",
      createdAt: new Date("2024-02-20"),
      updatedAt: new Date("2024-02-28"),
      status: "active",
    },
    {
      id: "4",
      userId,
      name: "ThreeJS Experiments",
      description: "Learning WebGL and shaders",
      framework: "vanilla",
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-03-12"),
      status: "active",
    },
  ];
};
