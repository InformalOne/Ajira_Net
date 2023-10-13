import React, { ReactNode } from 'react';
import TableCheckbox from '~/app/(site)/components/Table/TableCheckbox';
import { TableHeaderType } from '~/app/(site)/components/Table/TableHeader';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  PencilSquareIcon,
  ArrowDownTrayIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';

export enum TableActionEnum {
  Save,
  Edit,
  Download,
  Delete,
}

type Props = {
  headers: TableHeaderType[];
  data: Record<string, any> & {
    action?: {
      render?: (row: any) => ReactNode;
      options: TableActionEnum[];
    };
  };
  checked?: boolean;
  showCheckbox?: boolean;
  showMovePointer?: boolean;
  onCheck?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: number) => void;
  onDownload?: (file_record: any) => void;
  onClick?: (id: number) => void;
  onSave?: (id: number) => void;
}


const TableRow: React.FC<Props> = ({
  showCheckbox,
  showMovePointer,
  headers,
  data,
  checked,
  onCheck,
  onEdit,
  onDelete,
  onSave,
  onDownload,
  onClick
}) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: data.id,
  });

  return (
    <tr
      ref={setNodeRef}
      className="border-b border-b-grey-800/10 text-grey-800"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      onClick={() => onClick?.(data.id)}
    >
      {(showMovePointer || showCheckbox) && (
        <td className="py-2 px-4">
          <div className="flex items-center gap-4">
            {showCheckbox && (
              <TableCheckbox
                checked={checked}
                onSelect={() => onCheck?.(data.id)}
              />
            )}
            {showMovePointer && (
              <div
                className={clsx(
                  'w-5 cursor-grab',
                  isDragging && 'cursor-grabbing',
                )}
                {...attributes}
                {...listeners}
              >
                <Image
                  src="/assets/images/icons/move_pointer_icon.svg"
                  alt="move_pointer"
                  width={14}
                  height={14}
                />
              </div>
            )}
          </div>
        </td>
      )}
      {headers.map((header, index) => {
        if (header.field !== 'action') {
          return (
            <td
              key={index}
              className={clsx(
                'py-2 px-4 whitespace-nowrap font-semibold',
                header.bodyClassName,
              )}
            >
              {header.render ? header.render(data) : data[header.field]}
            </td>
          );
        } else {
          return (
            <td key={index} className="p-2">
              {data.action?.render ? (
                data.action?.render(data)
              ) : (
                <div
                  className={clsx(
                    'flex items-center justify-end gap-4',
                    header.bodyClassName,
                  )}
                >
                  {data.action?.options?.includes(TableActionEnum.Save) && (
                    <span className="text-base font-semibold underline" 
                      onClick={() => onSave?.(data.id)}
                    >
                      Save
                    </span>
                  )}

                  {data.action?.options?.includes(TableActionEnum.Edit) && (
                    <PencilSquareIcon
                      className="w-4 h-4 cursor-pointer hover:opacity-70"
                      onClick={() => onEdit?.(data.id)}
                    />
                  )}
                  {data.action?.options?.includes(TableActionEnum.Download) && (
                    <ArrowDownTrayIcon
                      className="w-4 h-4 cursor-pointer hover:opacity-70"
                      onClick={() => onDownload?.(data)}
                    />
                  )}
                  {data.action?.options?.includes(TableActionEnum.Delete) && (
                    <TrashIcon
                      className="w-4 h-4 cursor-pointer hover:opacity-70"
                      onClick={() => onDelete?.(data.id)}
                    />
                  )}
                </div>
              )}
            </td>
          );
        }
      })}
    </tr>
  );
};

export default TableRow;
