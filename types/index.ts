export type Project = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  framework: "nextjs" | "react" | "node" | "vanilla";
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "archived";
};
