import React, { ReactNode, useMemo, useState } from 'react';
import {
  ChevronDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';
import Image from 'next/image';
import clsx from 'clsx';
import TableCheckbox from '~/app/(site)/components/Table/TableCheckbox';
import { FilterOption } from '~/app/(site)/components/Table/index';

export type TableHeaderType = {
  label: string;
  field: string;
  render?: (row: any) => ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
  bodyClassName?: string;
};

export type SortOption = {
  direction: 'asc' | 'desc';
  field: string | null;
};

type Props = {
  headers: TableHeaderType[];
  tableData?: Record<string, any>[];
  showCheckbox?: boolean;
  showMovePointer?: boolean;
  selectedNumber?: number;
  filterOption: FilterOption;
  onCheck?: () => void;
  onSort?: (option: SortOption) => void;
  onFilter?: (option: FilterOption) => void;
};

const TableHeader: React.FC<Props> = ({
  showCheckbox,
  headers,
  showMovePointer,
  selectedNumber,
  tableData,
  filterOption,
  onCheck,
  onSort,
  onFilter,
}) => {
  const [selectedField, setSelectedField] = useState<string>('id');

  const selectedColumn = useMemo(() => {
    const columnData = tableData?.map((item) => item[selectedField]);
    return columnData?.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }, [selectedField, tableData]);

  const handleCheck = (item: string) => {
    const filterField = filterOption[selectedField] || [];
    if (filterField.includes(item)) {
      onFilter?.({
        ...filterOption,
        [selectedField]: filterField.filter((row) => row !== item),
      });
    } else {
      onFilter?.({
        ...filterOption,
        [selectedField]: [...filterField, item],
      });
    }
  };

  return (
    <thead>
      <tr className="border-b border-b-grey-800/10">
        {(showMovePointer || showCheckbox) && (
          <th className="pb-3 px-4 text-left align-bottom">
            <div className="flex items-center h-full gap-4">
              {showCheckbox && (
                <TableCheckbox
                  checked={
                    !!selectedColumn?.length &&
                    selectedNumber === selectedColumn?.length
                  }
                  checking={Boolean(
                    selectedColumn?.length &&
                      selectedNumber &&
                      selectedNumber < selectedColumn.length,
                  )}
                  onSelect={onCheck}
                />
              )}
              {showMovePointer && (
                <div>
                  <Image
                    src="/assets/images/icons/move_pointer_icon.svg"
                    alt="move_pointer"
                    width={14}
                    height={14}
                  />
                </div>
              )}
            </div>
          </th>
        )}
        {headers.map((header, index) => (
          <th
            key={index}
            className={clsx('pb-3 px-4 align-bottom', header.className)}
          >
            <div
              className={clsx(
                "relative flex justify-start gap-3 items-center w-100",
                header.headerClassName,
              )}
            >
              <p>{header.label}</p>
              {header.sortable && (
                <Popover className="relative">
                  <Popover.Button className="w-3">
                    <ChevronDownIcon
                      className={clsx(
                        'w-3 h-3 font-bold flex-shrink-0 absolute bottom-1.5 right-0 cursor-pointer hover:opacity-70',
                      )}
                      onClick={() => setSelectedField(header.field)}
                    />
                  </Popover.Button>
                  <Popover.Panel className="absolute left-1/2 z-10 w-max mt-2 -translate-x-[24px] px-4">
                    {({ close }) => (
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <p
                          className="relative bg-white p-2 pl-4 flex items-center gap-1 hover:bg-gray-100 cursor-pointer text-left text-sm font-medium"
                          onClick={() => {
                            onSort?.({
                              field: header.field,
                              direction: 'desc',
                            });
                            close();
                          }}
                        >
                          Sort <ArrowUpIcon className="w-3 h-3 font-bold" />
                        </p>
                        <p
                          className="relative bg-white p-2 pl-4 flex items-center gap-1 hover:bg-gray-100 cursor-pointer text-left text-sm font-medium"
                          onClick={() => {
                            onSort?.({ field: header.field, direction: 'asc' });
                            close();
                          }}
                        >
                          Sort decent{' '}
                          <ArrowDownIcon className="w-3 h-3 font-bold" />
                        </p>
                        <div className="bg-gray-50 p-4 max-h-44 overflow-auto">
                          {selectedColumn?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 py-1"
                            >
                              <TableCheckbox
                                checked={
                                  !filterOption[selectedField]?.includes(item)
                                }
                                onSelect={() => handleCheck(item)}
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Popover.Panel>
                </Popover>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
