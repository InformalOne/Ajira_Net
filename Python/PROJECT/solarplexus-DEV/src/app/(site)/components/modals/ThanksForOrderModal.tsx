"use client";
import React, { useState } from 'react';
import Modal, { ModalProps } from '~/app/(site)/components/modals/Modal';
import Button from '~/app/(site)/components/forms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { downloadImage } from '~/app/(site)/core/utils';

type Props = ModalProps;

const ThanksForOrderModal: React.FC<Props> = ({ onClose }) => {

  return (
    <Modal onClose={onClose} className="!max-w-[734px]">
      <div className="relative flex justify-center items-center flex-col pt-20 pb-14">
        <Image
          className="mb-4"
          width={64}
          height={64}
          src="/assets/images/icons/check_mark_accept_icon.svg"
          alt="check_mark"
        />
        <h2 className="text-[26px] font-bold mb-7">Thanks for your order!</h2>
        <p className="text-center text-lg leading-6 text-grey-800 mb-0 px-10">
          Woohoo! Your payment was successful, and your order is complete.
        </p>
        <p className="text-center text-lg leading-6 text-grey-800 mb-8 px-10">
          A receipt is on its way to your inbox.
        </p>

        <Button className="!min-w-[230px]" color="secondary">Continue</Button>
      </div>
    </Modal>
  )
}

export default ThanksForOrderModal;
