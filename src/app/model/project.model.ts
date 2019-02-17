import { ProjectStatus } from './project-status.model';

export interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  createdAt: Date;
  currentStatus: ProjectStatus;
}
