'use client';
import { useEffect, useMemo, useState } from 'react';
import Button from '~/app/(site)/components/forms/Button';
import {
  BackwardIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
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
import Loading from '~/app/(site)/loading';

const TABLE_HEADERS: TableHeaderType[] = [
  {
    label: 'Folder Name',
    field: 'name',
    sortable: true,
    headerClassName: 'pl-8',
    render: (row) => (
      <div className="flex items-center gap-4">
        <Image
          src="/assets/images/icons/pdf_icon.svg"
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
  {
    label: 'Action',
    field: 'action',
    bodyClassName: '!justify-start',
  },
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
interface FileData {
  action: { options: TableActionEnum[] };
  created_at: string | null;
  id: number;
  name: string | null;
  type: string | null;
  updated_at: string | null;
  user_id: string | null;
}

function FilesView(props: any) {
  const [search, setSearch] = useState<string>('');

  const [currentFolder, setCurrentFolder] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assets, setAssets] = useState<FileData[]>([]);

  const [user, setUser] = useState<User | null>(null);

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  });

  // fetch data from supabase client
  useEffect(() => {
    const getUserAndAssets = async () => {
      setIsLoading(true);
      const user_data = await supabase.auth.getUser();
      setUser(user_data.data.user);

      console.log('user_data', user_data);

      const { data } = await supabase
        .from('file_data')
        .select('*')
        .eq('user_id', user_data?.data?.user?.id)
        .eq('folder_id', props.pageContext.folderId);

      console.log('data', data);

      // clear the assets array
      setAssets([]);

      // for each data add to the assets array
      data?.forEach((item: FileData) => {
        // add action to the item
        item.action = {
          options: [TableActionEnum.Download, TableActionEnum.Delete],
        };

        // change the updated_at to a readable format like December 20, 2023
        if (item.updated_at) {
          const date = new Date(item.updated_at);
          item.updated_at = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        }

        setAssets((prev) => [...prev, item]);
      });

      const { data: folder_data } = await supabase
        .from('folder_data')
        .select('*')
        .eq('user_id', user_data?.data?.user?.id)
        .eq('id', props.pageContext.folderId);

      console.log('current folder data', folder_data);

      setCurrentFolder(folder_data ? folder_data[0] : null);

      props.setPageContext((prev: any) => ({
        ...prev,
        selectedFolderId: folder_data ? folder_data[0].id : null,
      }));

      setIsLoading(false);
    };

    console.log('props.pageContext.folderId', props.pageContext.folderId);

    getUserAndAssets();

    // Set up real-time subscription

    const subscription = supabase
      .channel('any')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'file_data' },
        (payload) => {
          console.log('real-time payload', payload);

          // from payload.event you can get the event type and do something with it
          if (payload.eventType === 'DELETE') {
            // if the event type is DELETE, remove the item from the assets array
            setAssets((prev) =>
              prev.filter((item) => item.id !== payload.old.id),
            );
          }

          if (payload.eventType === 'INSERT') {
            // if the event type is INSERT, add the item to the assets array
            setAssets((prev) => {
              // add action to the item
              payload.new.action = {
                options: [TableActionEnum.Download, TableActionEnum.Delete],
              };

              // change the updated_at to a readable format like December 20, 2023
              if (payload.new.updated_at) {
                const date = new Date(payload.new.updated_at);
                payload.new.updated_at = date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                });
              }

              return [...prev, payload.new as FileData];
            });
          }
        },
      )
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  console.log('assets', assets);

  const filteredItems = useMemo(() => {
    if (search === '') {
      // console.log('search is empty');
      return assets;
    }

    return assets.filter(
      (item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.type?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, assets]);

  // create a function to delete a file
  const deleteFile = async (id: any) => {
    console.log('delete id', id);

    const { error } = await supabase.from('file_data').delete().eq('id', id);
    if (error) {
      console.log('error', error);
    } else {
      console.log('deleted');
    }
  };

  const downloadFile = async (file_record: any) => {
    console.log('filePath', file_record);

    const { data } = await supabase.storage
      .from('solarplexus')
      .createSignedUrl(file_record.path, 60, {
        download: true,
      });

    console.log('public url', data);

    try {
      // @ts-ignore
      const response = await fetch(data?.signedUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      // change file name to

      // redirect in new tab to the file url
      window.open(data?.signedUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // on click of a row, redirect to the files view with the folder id
  const handleRowClick = (id: any) => {
    console.log('row clicked', id);
    // redirect to the files view with the folder id
  };

  return isLoading ? (
    <Loading />
  ) : (
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
          <Button
            className="bg-white
             flex items-center gap-1 !min-w-[90px] !px-2"
            variant="outline"
            color="grey"
            size="sm"
            onClick={() => {
              props.setPageContext({
                pageMode: 'folders_view',
                folderId: null,
              });
            }}
          >
            <BackwardIcon className="w-3 h-3" />
            Go Back
          </Button>

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
            folders={[currentFolder]}
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
          headers={TABLE_HEADERS}
          data={filteredItems}
          showCheckbox
          onDownload={downloadFile}
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

export default FilesView;
