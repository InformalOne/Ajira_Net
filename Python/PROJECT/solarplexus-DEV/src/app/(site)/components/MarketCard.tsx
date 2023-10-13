'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  EyeIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

import AssetViewModal from '~/app/(site)/components/modals/AssetViewModal';

type Props = {
  id: string | number;
  name: string;
  image: string;
};

const MarketCard: React.FC<Props> = ({ id, name, image }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-[170px]">
      <div className="border border-grey-400 h-8 bg-white text-sm text-grey-800 text-center flex items-center justify-center mb-5">
        {name}
      </div>
      <div className="relative group overflow-hidden">
        <div className="w-[170px] h-[170px] relative">
          <Image
            src={`/assets/images/${image}`}
            alt="mock_card"
            width={170}
            height={170}
            objectFit="contain"
            onLoad={() => {
              setTimeout(() => {
                setLoaded(true);
              }, 5000);
            }}
          />
          {!loaded && (
            <div className="absolute w-full h-full bg-gallery-100 top-0 bottom-0 right-0 left-0 flex justify-center items-center z-10">
              <Image
                className="spinner"
                src={'/assets/images/logo.svg'}
                alt="spinner logo"
                width={32}
                height={32}
              />
            </div>
          )}
        </div>
        <div className="transition absolute top-full left-0 right-0 h-full w-full bg-grey-800/70 group-hover:top-0 z-10 flex justify-center flex-col gap-2">
          <div className="flex justify-center gap-2">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center border hover:cursor-pointer hover:opacity-50"
              onClick={() => setSelectedCard(String(id))}
            >
              <EyeIcon className="w-4 text-white" />
            </span>
            <Link href={`/marketing/editor/${id}`}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center border hover:cursor-pointer hover:opacity-50">
                <PencilSquareIcon className="w-4 text-white" />
              </span>
            </Link>
          </div>
          <div className="flex justify-center gap-2">
            <span className="w-7 h-7 rounded-full flex items-center justify-center border hover:cursor-pointer hover:opacity-50">
              <ArrowDownTrayIcon className="w-4 text-white" />
            </span>
            <span className="w-7 h-7 rounded-full flex items-center justify-center border hover:cursor-pointer hover:opacity-50">
              <ShareIcon className="w-3 text-white" />
            </span>
          </div>
        </div>
      </div>

      {selectedCard !== null && (
        <AssetViewModal
          id={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default MarketCard;
