'use client';

import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Table from '~/app/(site)/components/Table';
import { TableHeaderType } from '~/app/(site)/components/Table/TableHeader';
import Image from 'next/image';
import Link from 'next/link';
import Input from '~/app/(site)/components/forms/Input';
import Button from '~/app/(site)/components/forms/Button';
import { useRouter } from 'next/navigation';
import { TableActionEnum } from '~/app/(site)/components/Table/TableRow';

const TABLE_HEADERS: TableHeaderType[] = [
  {
    label: 'Target List',
    field: 'target',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-4">
        <Image
          src="/assets/images/icons/excel_icon.png"
          alt="excel_icon"
          width={16}
          height={16}
        />
        {row.target}
      </div>
    ),
  },
  {
    label: 'Project Name',
    field: 'project',
    sortable: true,
  },
  {
    label: 'Modified',
    field: 'updated_at',
    sortable: true,
    bodyClassName: 'text-grey-350',
  },
  {
    label: 'Segmentation Status',
    field: 'status',
    sortable: true,
    bodyClassName: 'text-grey-350',
  },
  {
    label: 'Action',
    field: 'action',
    bodyClassName: '!justify-start',
  },
];

const TABLE_DATA: Record<string, any>[] = [
  {
    id: '1',
    target: 'Customer file',
    project: 'Linkedin Posts',
    updated_at: 'December 12, 2023',
    status: 'Pending',
    action: {
      render: (data: any) => (
        <Link href="/segmentation/create">
          <Button className="whitespace-nowrap" size="xs" variant="contain" color="grey">Create segmentation</Button>
        </Link>
      )
    }
  },
  {
    id: '2',
    target: 'Owner file',
    project: 'Linkedin Posts 1',
    updated_at: 'December 11, 2023',
    status: 'Ready to view',
    action: {
      options: [
        TableActionEnum.Edit,
        TableActionEnum.Download,
        TableActionEnum.Delete,
      ],
    },
  },
  {
    id: '3',
    target: 'Test file',
    project: 'Linkedin Posts 1',
    updated_at: 'December 11, 2023',
    status: 'Ready to view',
    action: {
      options: [
        TableActionEnum.Edit,
        TableActionEnum.Download,
        TableActionEnum.Delete,
      ],
    },
  },
  {
    id: '4',
    target: 'Zip file',
    project: 'Linkedin Posts 1',
    updated_at: 'December 11, 2023',
    status: 'Ready to view',
    action: {
      options: [
        TableActionEnum.Edit,
        TableActionEnum.Download,
        TableActionEnum.Delete,
      ],
    },
  },
  {
    id: '5',
    target: 'Linkedin file',
    project: 'Linkedin Posts 1',
    updated_at: 'December 11, 2023',
    status: 'Ready to view',
    action: {
      options: [
        TableActionEnum.Edit,
        TableActionEnum.Download,
        TableActionEnum.Delete,
      ],
    },
  },
];

function SegmentationPage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const filtered = useMemo(() => {
    return TABLE_DATA.filter((item) =>
      item.target.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const navigateToPreviousPage = () => {
    router.back();
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="mb-10">
        <h2 className="text-[26px] font-bold text-grey-800">Segmentation</h2>
        <p className="text-sm font-semibold text-grey-800">
          Please upload your target list so we can identify the different
          segments and individualize your marketing and communication
          accordingly.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Button color="grey" size="sm">
          Upload Target List
        </Button>
        <div className="relative">
          <Input
            className="pr-5"
            size="md"
            placeholder="Search segment"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-1/2 right-2 -translate-y-1/2 w-3 h-3" />
        </div>
      </div>
      <div className="flex-1 pt-6">
        <Table
          headers={TABLE_HEADERS}
          data={filtered}
          showCheckbox
          onEdit={(id: string) => router.push(`/segmentation/edit/1`)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" color="grey" size="md" onClick={navigateToPreviousPage}>
          Go Back
        </Button>
        <div className="flex items-center justify-end gap-2 flex-1">
          <Link href="/marketing">
            <Button variant="outline" color="grey" size="md">Skip for now</Button>
          </Link>
          <Link href="/marketing">
            <Button color="secondary" size="md">
              Create Marketing Communication Asset ››
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SegmentationPage;
