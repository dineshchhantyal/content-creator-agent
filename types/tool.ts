import { ReactNode } from "react";

export type Tool = {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
  category: string;
  imageUrl: string;
  popular: boolean;
  new: boolean;
  proOnly: boolean;
  features: string[];
};
