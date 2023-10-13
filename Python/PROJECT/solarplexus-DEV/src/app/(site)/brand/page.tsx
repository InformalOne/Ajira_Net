'use client';
import React, { useEffect, useState } from 'react';
import FoldersView from './components/folder_view/FoldersView';
import FilesView from './components/file_view/FilesView';
import { use } from 'chai';
import { FolderData } from './types/supabase_tables';
import { TableActionEnum } from '../components/Table/TableRow';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Loading from '~/app/loading';

const BrandPage: React.FC = () => {
  const [pageContext, setPageContext] = useState({
    pageMode: 'folders_view',
    folderId: null,
    selectedFolderId: null,
    folders: [],
    curr_user: null,
  });

  const [assets, setAssets] = useState<FolderData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  });

  useEffect(() => {
    const getUserAndAssets = async () => {
      setIsLoading(true);
      const user_data = await supabase.auth.getUser();
      // @ts-ignore
      setPageContext((prev) => ({ ...prev, curr_user: user_data }));

      console.log('user_data', user_data);

      const { data } = await supabase
        .from('folder_data')
        .select('*')
        .eq('user_id', user_data?.data?.user?.id)
        // also sort by name
        .order('name', { ascending: true });

      console.log('data', data);

      // clear the assets array
      setPageContext((prev) => ({ ...prev, folders: [] }));

      // for each data add to the assets array
      data?.forEach((item: FolderData) => {
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

      // if there is no data, set the selected folder id to null
      try {
        if (!data || data.length === 0) {
          const rowsToAdd = [
            {
              type: 'tone_of_voice',
              name: 'Tone Of Voice',
              user_id: user_data.data.user?.id,
            },
            {
              type: 'picture_bank',
              name: 'Picture Bank',
              user_id: user_data.data.user?.id,
            },
            { type: 'logo', name: 'Logo', user_id: user_data.data.user?.id },
            {
              type: 'brand_guidelines',
              name: 'Branding Guidelines',
              user_id: user_data.data.user?.id,
            },
            {
              type: 'others',
              name: 'Others',
              user_id: user_data.data.user?.id,
            },
          ];

          // Insert the rows into the Supabase table
          const { data, error: insertError } = await supabase
            .from('folder_data')
            .insert(rowsToAdd)
            .select('*');

          if (insertError) {
            throw insertError;
          }

          setPageContext((prev) => ({ ...prev, selectedFolderId: data[0].id }));

          // setAssets((prev) => [...prev, ...data]);
        } else {
          setPageContext((prev) => ({ ...prev, selectedFolderId: data[0].id }));
        }
      } catch (error) {
        console.log('error', error);
      }

      setIsLoading(false);
    };

    getUserAndAssets();

    // subscribe to the folder_data table

    const subscription = supabase
      .channel('any')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'folder_data' },
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

              return [...prev, payload.new as FolderData];
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

  return isLoading ? (
    <Loading />
  ) : pageContext.pageMode === 'folders_view' ? (
    <FoldersView
      pageContext={pageContext}
      setPageContext={setPageContext}
      folders={assets}
      supabase={supabase}
    />
  ) : (
    <FilesView
      pageContext={pageContext}
      setPageContext={setPageContext}
      folders={assets}
      supabase={supabase}
    />
  );
};

export default BrandPage;
