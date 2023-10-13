'use client';

import React, { useMemo, useState, useEffect } from 'react';
import TableHeader, {
  SortOption,
  TableHeaderType,
} from '~/app/(site)/components/Table/TableHeader';
import TableRow from '~/app/(site)/components/Table/TableRow';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export type FilterOption = Record<string, string[]>;

type Props = {
  headers: TableHeaderType[];
  data: Record<string, any>[];
  showCheckbox?: boolean;
  showMovePointer?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: number) => void;
  onDownload?:  (file_record: any) => void;
  onClick?: (id: number) => void;
  onSave?: (id: number) => void;


}


const Table: React.FC<Props> = ({
  headers,
  data,
  showCheckbox,
  showMovePointer,
  onDownload,
  onEdit,
  onDelete,
  onClick,
  onSave
}) => {
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [activeId, setActiveId] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>({
    direction: 'asc',
    field: null,
  });
  const [filterOption, setFilterOption] = useState<FilterOption>({});

  const items = useMemo(() => tableData?.map(({ id }) => id), [tableData]);


  useEffect(() => {
    if (sortOption.field) {
      const field = sortOption.field as string;

      const sorted = data.sort((a, b) => {
        if (sortOption.direction === 'asc') {
          return b[field].localeCompare(a[field]);
        }
        return a[field].localeCompare(b[field]);
      });
      setTableData([...sorted]);
    } else {
      setTableData(data);
    }
  }, [data, sortOption, filterOption]);

  const filteredData = useMemo(
    () =>
      tableData.filter((item) =>
        Object.keys(item).every(
          (key) => !filterOption[key]?.includes(item[key]),
        ),
      ),
    [filterOption, tableData],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTableData((data) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleBulkChecking = () => {
    if (!selectedItems.length) setSelectedItems(items);
    else setSelectedItems([]);
  };

  const handleRowChecking = (id: string) => {
    const filtered = selectedItems.filter((item) => item !== id);
    if (filtered.length === selectedItems.length)
      setSelectedItems([...filtered, id]);
    else setSelectedItems(filtered);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <table className="w-full">
        <TableHeader
          showCheckbox={showCheckbox}
          headers={headers}
          showMovePointer={showMovePointer}
          tableData={tableData}
          selectedNumber={selectedItems?.length}
          filterOption={filterOption}
          onCheck={handleBulkChecking}
          onSort={setSortOption}
          onFilter={setFilterOption}
        />

        <tbody>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {filteredData.map((item, index) => (
              <TableRow
                key={index}
                data={item}
                headers={headers}
                showCheckbox={showCheckbox}
                showMovePointer={showMovePointer}
                checked={selectedItems.includes(item.id)}
                onCheck={handleRowChecking}
                onClick={onClick}
                onEdit={onEdit}
                onDelete={onDelete}
                onDownload={onDownload}
                onSave={onSave}
              />
            ))}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
};

export default Table;
