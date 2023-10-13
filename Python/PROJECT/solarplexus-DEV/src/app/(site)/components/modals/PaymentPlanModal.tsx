'use client';
import React, { useState } from 'react';
import Modal, { ModalProps } from '~/app/(site)/components/modals/Modal';
import { useRouter } from 'next/navigation';
import { PaymentPeriodEnum, PaymentPlanEnum } from '~/app/(site)/core/types';
import clsx from 'clsx';
import PaymentPlanCard from '~/app/(site)/components/PaymentPlanCard';

type Props = ModalProps;

const PaymentPlanModal: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const [period, setPeriod] = useState<PaymentPeriodEnum>(
    PaymentPeriodEnum.Yearly,
  );
  const [plan, setPlan] = useState<PaymentPlanEnum>(PaymentPlanEnum.team);

  return (
    <Modal onClose={onClose} className="!max-w-[1160px]">
      <div className="relative p-6">
        <div className="mb-9">
          <h3 className="text-[26px] font-bold">Switch to a different plan</h3>
          <p className="text-grey-800 text-lg">
            Choose a plan that suits your needs.
          </p>
        </div>

        <div className="flex rounded-md overflow-hidden mx-auto w-fit mb-8">
          {/*<div*/}
          {/*  className={clsx(*/}
          {/*    'w-[110px] text-lg text-grey-800 bg-grey-10 py-2 text-center cursor-not-allowed font-semibold',*/}
          {/*    period === PaymentPeriodEnum.Monthly && 'bg-primary-100'*/}
          {/*  )}*/}
          {/*  onClick={() => setPeriod(PaymentPeriodEnum.Monthly)}*/}
          {/*>*/}
          {/*  Monthly*/}
          {/*</div>*/}
          <div
            className={clsx(
              'w-[110px] text-lg text-grey-800 bg-grey-10 py-2 text-center cursor-pointer font-semibold',
              period === PaymentPeriodEnum.Yearly && 'bg-primary-100',
            )}
            onClick={() => setPeriod(PaymentPeriodEnum.Yearly)}
          >
            Yearly
          </div>
        </div>

        <div className="grid grid-cols-3 gap-7">
          <PaymentPlanCard
            active={plan === PaymentPlanEnum.user}
            onClick={() => setPlan(PaymentPlanEnum.user)}
            title="Professional user"
            description="Create unlimited One2One marketing and communication assets that are true to your brand"
            redirectLink="/checkout"
          >
            <div
              className={clsx(
                'flex items-baseline justify-center text-primary',
                plan === PaymentPlanEnum.user && 'text-white',
              )}
            >
              <span className="text-[64px] font-bold">$99</span>
              <span className="text-[26px] font-bold"> / month</span>
            </div>
            <p
              className={clsx(
                'text-xl font-bold text-primary mb-4',
                plan === PaymentPlanEnum.user && 'text-white',
              )}
            >
              1 named user
            </p>
          </PaymentPlanCard>

          <PaymentPlanCard
            active={plan === PaymentPlanEnum.team}
            onClick={() => setPlan(PaymentPlanEnum.team)}
            title="Professional team"
            description="Create unlimited One2One marketing and communication assets that are true to your brand"
            redirectLink="/checkout"
          >
            <div
              className={clsx(
                'flex items-baseline justify-center text-primary',
                plan === PaymentPlanEnum.team && 'text-white',
              )}
            >
              <span className="text-[64px] font-bold">$499</span>
              <span className="text-[26px] font-bold whitespace-nowrap">
                {' '}
                / month
              </span>
            </div>
            <p
              className={clsx(
                'text-xl font-bold text-primary mb-4',
                plan === PaymentPlanEnum.team && 'text-white',
              )}
            >
              up to 7 named users
            </p>
          </PaymentPlanCard>

          <PaymentPlanCard
            active={plan === PaymentPlanEnum.enterprise}
            onClick={() => setPlan(PaymentPlanEnum.enterprise)}
            title="Enterprise"
            description="Service adjusted to your needs, i.e. connector to your CRM, CMS or Marketing application, or special feature"
            buttonLabel="Contact Us"
            redirectLink="https://www.solarplexus.ai/contact-us/"
          >
            <div
              className={clsx(
                'text-[34px] text-primary font-bold mb-8 leading-10 text-center',
                plan === PaymentPlanEnum.enterprise && 'text-white',
              )}
            >
              Price upon request
            </div>
          </PaymentPlanCard>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentPlanModal;
