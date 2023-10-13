import Table from '~/app/(site)/components/Table';
import { TableHeaderType } from '~/app/(site)/components/Table/TableHeader';
import Button from '~/app/(site)/components/forms/Button';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const TABLE_HEADER: TableHeaderType[] = [
  {
    label: 'Unique ID nr',
    field: 'id',
    sortable: true,
    headerClassName: 'whitespace-nowrap',
    bodyClassName: 'text-center',
  },
  {
    label: 'Parameter 1',
    field: 'parameter_1',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Parameter 2',
    field: 'parameter_2',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Parameter 3',
    field: 'parameter_3',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Parameter 4',
    field: 'parameter_4',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Parameter 5',
    field: 'parameter_5',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Parameter 6',
    field: 'parameter_6',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Parameter 7',
    field: 'parameter_7',
    sortable: true,
    className: 'whitespace-nowrap',
  },
  {
    label: 'Parameter 8',
    field: 'parameter_8',
    className: 'whitespace-nowrap',
    sortable: true,
  },
];

const TABLE_DATA: Record<string, any>[] = [
  {
    id: 'f6d7e5c9-5d5c-4d4e-9e5d-6c8d7b6a8f3e',
    parameter_1: 'Lorem ipsum',
    parameter_2: 'Lorem ipsum',
    parameter_3: 'Lorem ipsum',
    parameter_4: 'Lorem ipsum',
    parameter_5: 'Lorem ipsum',
    parameter_6: 'Lorem ipsum',
    parameter_7: 'Lorem ipsum',
    parameter_8: 'Lorem ipsum',
  },
  {
    id: 'a8c1d8e9-7b6a-5c4d-3e2f-1d0c9b8a7f6e',
    parameter_1: 'Lorem ipsum',
    parameter_2: 'Lorem ipsum',
    parameter_3: 'Lorem ipsum',
    parameter_4: 'Lorem ipsum',
    parameter_5: 'Lorem ipsum',
    parameter_6: 'Lorem ipsum',
    parameter_7: 'Lorem ipsum',
    parameter_8: 'Lorem ipsum',
  },
  {
    id: 'd9e8c7b6-a5b4-4c3d-2e1f-0f9e8d7c6b5a',
    parameter_1: 'Lorem ipsum',
    parameter_2: 'Lorem ipsum',
    parameter_3: 'Lorem ipsum',
    parameter_4: 'Lorem ipsum',
    parameter_5: 'Lorem ipsum',
    parameter_6: 'Lorem ipsum',
    parameter_7: 'Lorem ipsum',
    parameter_8: 'Lorem ipsum',
  },
  {
    id: 'c5b4a3d2-1e2f-3c4d-5b6a-7d8c9e0f1a2b',
    parameter_1: 'Lorem ipsum',
    parameter_2: 'Lorem ipsum',
    parameter_3: 'Lorem ipsum',
    parameter_4: 'Lorem ipsum',
    parameter_5: 'Lorem ipsum',
    parameter_6: 'Lorem ipsum',
    parameter_7: 'Lorem ipsum',
    parameter_8: 'Lorem ipsum',
  },
  {
    id: 'f3e2d1c0-b9a8-7c6d-5e4f-3a2b1c0d9e8f',
    parameter_1: 'Lorem ipsum',
    parameter_2: 'Lorem ipsum',
    parameter_3: 'Lorem ipsum',
    parameter_4: 'Lorem ipsum',
    parameter_5: 'Lorem ipsum',
    parameter_6: 'Lorem ipsum',
    parameter_7: 'Lorem ipsum',
    parameter_8: 'Lorem ipsum',
  },
];

function SegmentationPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-[26px] font-bold text-grey-800 flex items-center gap-4">
          <Link href="/segmentation">
            <ChevronLeftIcon className="w-8 h-8" />
          </Link>
          Edit Segment
        </h2>
        <div className="flex items-center gap-3">
          <Link href="/segmentation">
            <Button className="bg-white" variant="outline" color="grey" size="sm">Delete</Button>
          </Link>
          <Link href="/segmentation">
            <Button className="bg-white" variant="outline" color="grey" size="sm">Merge Segments</Button>
          </Link>
          <Link href="/segmentation">
            <Button className="!min-w-[110px] bg-white" variant="outline" color="grey" size="sm">Download</Button>
          </Link>
          <Link href="/segmentation">
            <Button className="!min-w-[110px] bg-white" variant="outline" color="grey" size="sm">Save</Button>
          </Link>
          <Link href="/segmentation">
            <Button className="!min-w-[110px]" color="grey" size="sm">Submit</Button>
          </Link>
        </div>
      </div>

      <div className="pt-8 overflow-auto -mr-10">
        <Table headers={TABLE_HEADER} data={TABLE_DATA} showCheckbox showMovePointer />
      </div>
    </>
  )
}

export default SegmentationPage;
