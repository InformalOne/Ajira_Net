"use client";
import React, { useState, useEffect } from 'react';
import Modal, { ModalProps } from '~/app/(site)/components/modals/Modal';
import Button from '~/app/(site)/components/forms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { downloadImage } from '~/app/(site)/core/utils';

type Props = ModalProps & {
  id: string;
};

const MOCK_IMAGES = [
  'man.jpg',
  'man-1.png',
  'man-2.png',
]

const AssetViewModal: React.FC<Props> = ({ id, onClose }) => {
  const router = useRouter();

  const [assetIndex, setAssetIndex] = useState(Number(id));

  useEffect(() => {
    const newIndex = Number(id) % MOCK_IMAGES.length;
    if (newIndex >= 0 && newIndex !== assetIndex) {
      setAssetIndex(newIndex);
    }
  }, [id]);

  const handleChangeAsset = (change: number) => {
    if (assetIndex + change > MOCK_IMAGES.length - 1) setAssetIndex(0);
    else if (assetIndex + change < 0) setAssetIndex(MOCK_IMAGES.length - 1);
    else setAssetIndex(assetIndex + change);
  };

  const handleDownload = async () => {
    await downloadImage(`/assets/images/${MOCK_IMAGES[assetIndex]}`);
  };

  return (
    <Modal onClose={onClose}>
      <div className="relative">
        <div className="flex items-center gap-2.5 justify-end pr-16">
          <Button
            className="!min-w-[100px]"
            color="grey"
            onClick={() => router.push(`/marketing/editor/${id}`)}
          >
            Edit
          </Button>
          <Button
            className="!min-w-[100px]"
            color="grey"
            variant="outline"
            onClick={onClose}
          >
            Save
          </Button>
          <Button
            className="!min-w-[100px]"
            color="grey"
            variant="outline"
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button
            className="!min-w-[100px]"
            color="grey"
            variant="outline"
            onClick={onClose}
          >
            Share
          </Button>
        </div>

        <div className="flex justify-center py-10">
          <img
            src={`/assets/images/${MOCK_IMAGES[assetIndex]}`}
            alt="man"
            width={700}
            height={700}
          />
        </div>

        <div className="absolute flex justify-between top-1/2 left-10 2xl:-left-44 right-10 2xl:-right-44">
          <Image
            className="cursor-pointer hover:drop-shadow-md invert 2xl:invert-0"
            src="/assets/images/icons/arrow_left_icon.svg"
            width={80}
            height={80}
            alt="arrow_left"
            onClick={() => handleChangeAsset(-1)}
          />
          <Image
            className="cursor-pointer hover:drop-shadow-md invert 2xl:invert-0"
            src="/assets/images/icons/arrow_right_icon.svg"
            width={80}
            height={80}
            alt="arrow_right"
            onClick={() => handleChangeAsset(1)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AssetViewModal;
