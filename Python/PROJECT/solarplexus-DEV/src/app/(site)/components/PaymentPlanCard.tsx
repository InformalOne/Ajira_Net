import React, { ReactNode } from 'react';
import Button from '~/app/(site)/components/forms/Button';
import clsx from 'clsx';

type Props = {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  children: ReactNode;
  buttonLabel?: string;
  redirectLink: string;
}

const PaymentPlanCard: React.FC<Props> = ({
  active,
  onClick,
  title,
  description,
  children,
  buttonLabel = 'Checkout',
  redirectLink,
}) => {
  const handleClickButton = (event: any) => {
    event.stopPropagation();
    if (!active) {
      event.preventDefault();
    } else {
      window.location.href = redirectLink;
    }
  }

  return (
    <div
      className={clsx('rounded-[20px] border border-grey-150 px-10 py-9 shadow-card text-center flex flex-col items-center cursor-pointer', active && 'bg-primary')}
      onClick={onClick}
    >
      <h2 className={clsx('text-[26px] font-semibold mb-3', active && 'text-white')}>{title}</h2>
      {children}
      <div className={clsx('text-lg font-medium text-center leading-6 flex-1  pb-12', active && 'text-white')}>
        {description}
      </div>
      <Button
        disabled={!active}
        onClick={handleClickButton}
        className="w-full"
        variant={active ? 'text' : 'contain'}
        color={active ? 'primary' : 'secondary'}
        size="md"
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

export default PaymentPlanCard;
