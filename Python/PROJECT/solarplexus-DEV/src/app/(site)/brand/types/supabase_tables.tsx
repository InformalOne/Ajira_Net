import { TableActionEnum } from '~/app/(site)/components/Table/TableRow';

export interface FolderData {
    action: { options: TableActionEnum[] };
    created_at: string | null;
    id: number;
    name: string | null;
    type: string | null;
    updated_at: string | null;
    user_id: string | null;
}

