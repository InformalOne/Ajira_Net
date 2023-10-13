'use client';
import { useEffect, useMemo, useState } from 'react';
import Button from '~/app/(site)/components/forms/Button';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Input from '~/app/(site)/components/forms/Input';
import UploadForm from '~/app/(site)/components/UploadForm';
import { TableHeaderType } from '~/app/(site)/components/Table/TableHeader';
import Image from 'next/image';
import { TableActionEnum } from '~/app/(site)/components/Table/TableRow';
import Table from '~/app/(site)/components/Table';
import Link from 'next/link';

// create a supabse client
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import useUserSession from '~/core/hooks/use-user-session';
import { FILE_UPLOAD_OPTIONS } from '../../../core/constants';

const TABLE_HEADERS: TableHeaderType[] = [
  {
    label: 'Folder Name',
    field: 'name',
    sortable: true,
    headerClassName: 'pl-8',
    render: (row) => (
      <div className="flex items-center gap-4">
        <Image
          src="/assets/images/icons/folder_icon.svg"
          alt="pdf_icon"
          width={16}
          height={16}
        />
        {row.name}
      </div>
    ),
  },
  // {
  //   label: 'Type',
  //   field: 'type',
  //   sortable: true,
  //   bodyClassName: 'text-grey-350',
  // },
  {
    label: 'Modified',
    field: 'updated_at',
    sortable: true,
    bodyClassName: 'text-grey-350',
  },
  // {
  //   label: 'Action',
  //   field: 'action',
  //   bodyClassName: '!justify-start',
  // },
];

const TABLE_DATA: Record<string, any>[] = [
  // {
  //   id: '1',
  //   name: 'File name attached',
  //   type: 'Brand Guidelines',
  //   updated_at: 'December 20, 2023',
  //   action: {
  //     options: [TableActionEnum.Download, TableActionEnum.Delete],
  //   },
  // },
  // {
  //   id: '2',
  //   name: 'File name doc',
  //   type: 'Project',
  //   updated_at: 'December 19, 2023',
  //   action: {
  //     options: [TableActionEnum.Download, TableActionEnum.Delete],
  //   },
  // },
  // {
  //   id: '3',
  //   name: 'File name pdf',
  //   type: 'Asset',
  //   updated_at: 'December 18, 2023',
  //   action: {
  //     options: [TableActionEnum.Download, TableActionEnum.Delete],
  //   },
  // },
  // {
  //   id: '4',
  //   name: 'File name folder',
  //   type: 'Audio',
  //   updated_at: 'December 15, 2023',
  //   action: {
  //     options: [TableActionEnum.Download, TableActionEnum.Delete],
  //   },
  // },
];

// create a interface for the file_data table


function FoldersView(props:any) {
  const [search, setSearch] = useState<string>('');

  const [fileType, setFileType] = useState<string>(
    FILE_UPLOAD_OPTIONS[0].value,
  );
  

  

  const [user, setUser] = useState<User | null>(null);



 


  const filteredItems = useMemo(() => {
    if (search === '') {
      // console.log('search is empty');
      return  props.folders;
    }

    return props.folders.filter(
      (item :any) =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.type?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, props.folders]);

  // create a function to delete a file
  const deleteFile = async (id: any) => {
    console.log('delete id', id);

    const { error } = await props.supabase.from('folder_data').delete().eq('id', id);
    if (error) {
      console.log('error', error);
    } else {
      console.log('deleted');
    }
  };

  const downloadFile = async (filePath: string) => {
    
    console.log('filePath', filePath);
    
    const { data } = await props.supabase.storage
      .from('files')
      .createSignedUrl(filePath, 60);

    console.log('public url', data);
    

    try {
      // @ts-ignore
      const response = await fetch(data?.signedUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      const blob = await response.blob();

      // Create a blob URL and trigger the download
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      // @ts-ignore
      link.download = filePath.split('/').pop(); // Set the file name for download

      // Programmatically trigger the click event
      link.click();

      // Clean up the blob URL
      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // on click of a row, redirect to the files view with the folder id
  const handleRowClick = (id: any) => {
    console.log('row clicked', id);
    props.setPageContext({
      pageMode: 'files_view',
      folderId: id,
    });
    // redirect to the files view with the folder id
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="mb-10">
        <h2 className="text-[26px] font-bold text-grey-800">
          Brand, Guidelines & Assets
        </h2>
        <p className="text-sm font-semibold text-grey-800 max-w-[700px]">
          {`Please upload your branding guidelines so we can create marketing and communication assets in line with your brand. If you don't want to upload, we need your help to frame your brand in the chat.`}
        </p>
      </div>

      <div className="flex items-center">
        <div className="flex gap-5 items-center flex-1">
          {/* <Link href="/project">
            <Button
              className="bg-white flex items-center gap-1 !min-w-[110px] !px-2"
              variant="outline"
              color="grey"
              size="sm"
            >
              <PlusIcon className="w-3 h-3" />
              Create Folder
            </Button>
          </Link> */}
          <UploadForm 
            pageContext={props.pageContext}
            setPageContext={props.setPageContext}
            folders={props.folders}
          />
        </div>

        <div className="relative">
          <Input
            className="pr-5"
            size="md"
            placeholder=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-1/2 right-2 -translate-y-1/2 w-3 h-3" />
        </div>
      </div>

      <div className="flex-1 pt-10">
        <Table
          headers={TABLE_HEADERS
          }
          data={filteredItems}
          showCheckbox
          onDownload = {downloadFile}
          onDelete={deleteFile}
          onClick={handleRowClick}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" color="grey" size="md">
          Skip for now
        </Button>
        <Link href="/project">
          <Button color="secondary" size="md">
            Project ››
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FoldersView;
