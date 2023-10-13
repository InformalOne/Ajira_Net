import { TableActionEnum } from "../../components/Table/TableRow";

// create a interface for the project table
interface Project {
    action: { options: TableActionEnum[] };
    created_at: string | null;
    id: number;
    name: string | null;
    user_id: string | null;  
  }
  
  interface Projectfiles {
    action: { options: TableActionEnum[] };
    created_at: string | null;
    id: number;
    name: string | null;
    project_id: string | null;
  }

  export type {Project,Projectfiles}