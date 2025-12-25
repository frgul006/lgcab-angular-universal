import { ProjectStatus } from './project-status.model';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  role: string;
  createdAt: string;
  currentStatus: ProjectStatus;
}
