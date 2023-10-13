"use client"

import { ChartBarIcon } from '@heroicons/react/20/solid';
import Table from '~/app/(site)/components/Table';
import { TableHeaderType } from '~/app/(site)/components/Table/TableHeader';
import Image from 'next/image';
import { TableActionEnum } from '~/app/(site)/components/Table/TableRow';

const TABLE_HEADERS: TableHeaderType[] = [
  {
    label: 'Project Name',
    field: 'name',
    sortable: true,
    headerClassName: 'pl-8',
    className: '!w-full',
    render: (row) => (
      <div className="flex items-center gap-4">
        <Image src="/assets/images/icons/folder_icon.svg" alt="folder_icon" width={16} height={16} />
        {row.name}
      </div>
    )
  },
  {
    label: 'Modified',
    field: 'updated_at',
    sortable: true,
    bodyClassName: 'text-grey-350'
  },
  {
    label: 'Action',
    field: 'action',
    bodyClassName: '!justify-start'
  },
];

const TABLE_DATA: Record<string, any>[] = [
  {
    id: '1',
    name: 'Linkedin Posts',
    updated_at: 'December 12, 2023',
    action: {
      options: [TableActionEnum.Download, TableActionEnum.Delete]
    },
  },
  {
    id: '2',
    name: 'Project Name',
    updated_at: 'December 11, 2023',
    action: {
      options: [TableActionEnum.Download, TableActionEnum.Delete]
    },
  },
  {
    id: '3',
    name: 'Project Name',
    updated_at: 'December 11, 2023',
    action: {
      options: [TableActionEnum.Download, TableActionEnum.Delete]
    },
  },
  {
    id: '4',
    name: 'Project Name',
    updated_at: 'December 11, 2023',
    action: {
      options: [TableActionEnum.Download, TableActionEnum.Delete]
    },
  },
  {
    id: '5',
    name: 'Project Name',
    updated_at: 'December 11, 2023',
    action: {
      options: [TableActionEnum.Download, TableActionEnum.Delete]
    },
  },
]


function LibraryPage() {
  return (
    <div>
      <h2 className="text-[26px] font-bold text-grey-800">Library & Statistics</h2>
      <p className="text-sm font-semibold text-grey-800 mb-7">
        Here you find your created projects.
      </p>

      <div className="flex justify-between gap-3">
        <div className="p-3 bg-white shadow-card rounded-[10px] relative h-30 max-w-[300px] w-full">
          <ChartBarIcon className="w-3.5 h-3.5 absolute top-3.5 right-3.5" />
          <div className="flex justify-center items-center gap-5">
            <span className="text-[60px] font-semibold text-primary gap-5">30</span>
            <p className="text-base text-grey-800 max-w-[76px] font-semibold">Projects Created</p>
          </div>
        </div>

        <div className="p-3 bg-white shadow-card rounded-[10px] relative h-30 max-w-[300px] w-full">
          <ChartBarIcon className="w-3.5 h-3.5 absolute top-3.5 right-3.5" />
          <div className="flex justify-center items-center gap-5">
            <span className="text-[60px] font-semibold text-info-dark gap-5">20</span>
            <p className="text-base text-grey-800 max-w-[76px] font-semibold leading-[22px]">Segments Identified</p>
          </div>
        </div>

        <div className="p-3 bg-white shadow-card rounded-[10px] relative h-30 max-w-[300px] w-full">
          <ChartBarIcon className="w-3.5 h-3.5 absolute top-3.5 right-3.5" />
          <div className="flex justify-center items-center gap-5">
            <span className="text-[60px] font-semibold text-success-600 gap-5">600</span>
            <p className="text-base text-grey-800 max-w-[150px] font-semibold leading-[22px]">Marketing Communication Assets Generated</p>
          </div>
        </div>
      </div>

      <div className="flex-1 pt-6">
        <Table
          headers={TABLE_HEADERS}
          data={TABLE_DATA}
          showCheckbox
        />
      </div>
    </div>
  )
}

export default LibraryPage;
