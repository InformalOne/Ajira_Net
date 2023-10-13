"use client";
import React, { useState } from 'react';
import Input from '~/app/(site)/components/forms/Input';
import Button from '~/app/(site)/components/forms/Button';
import clsx from 'clsx';
import ThanksForOrderModal from '~/app/(site)/components/modals/ThanksForOrderModal';

const PaymentPeriodRadioChip = ({
  label,
  price,
  active,
  description,
  onClick,
}: {
  label: string,
  price: number,
  description: string,
  active: boolean,
  onClick: () => void,
}) => {
  return (
    <div className={clsx('rounded py-5 px-4 flex gap-2.5 cursor-pointer border-2 border-transparent', active && '!border-primary')} onClick={onClick}>
      <div className={clsx('w-4 h-4 rounded-full bg-white border border-grey-500/50 mt-2 relative', active && '!border-primary')}>
        {active && <span className="bg-primary w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      </div>
      <div className="flex-1 flex justify-between">
        <div>
          <p className="text-lg font-bold text-black mb-2.5">{label}</p>
          <p className="text-sm text-grey-800">{description}</p>
        </div>
        <span className="text-lg font-bold text-black">${price}</span>
      </div>
    </div>
  )
}

function CheckoutPage() {
  const [period, setPeriod] = useState<string>('yearly');
  const [paymentMode, setPaymentMode] = useState<string>('card');
  const [showSuccessModal,setShowSuccessModal] = useState<boolean>(false);

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="bg-grey-50 px-10 pt-24">
        <div className="max-w-[550px] mx-auto">
          <h2 className="text-[26px] font-bold mb-2.5 text-black">Professional Team</h2>
          <p className="text-lg text-grey-800 mb-10 leading-6">
            Service adjusted to your needs, i.e. connector to your CRM, CMS or Marketing application, or special feature
          </p>

          {/*<PaymentPeriodRadioChip*/}
          {/*  label="Monthly"*/}
          {/*  description="Basic Monthly Plan for 7 users"*/}
          {/*  price={499}*/}
          {/*  active={period === 'monthly'}*/}
          {/*  onClick={() => setPeriod('monthly')}*/}
          {/*/>*/}
          <PaymentPeriodRadioChip
            label="Yearly"
            description="Basic Yearly Plan for 7 users"
            price={499}
            active={period === 'yearly'}
            onClick={() => setPeriod('yearly')}
          />
        </div>
      </div>
      <div className="bg-white border-l border-l-grey-200 px-10 pt-24">
        <div className="max-w-[550px] mx-auto">
          <h2 className="text-[26px] font-bold mb-2.5 text-black">Payment Details</h2>
          <p className="text-lg text-grey-800 mb-8 leading-6">
            Complete your purchase by providing your payment details
          </p>

          <div className="grid grid-cols-2 gap-5 text-grey-800 pr-20">
            <div className="col-span-2">
              <p className="text-sm text-grey-800 mb-2">Email address</p>
              <Input className="w-full" size="base" value="karen.johon@gmail.com" disabled />
            </div>

            <div
              className={clsx(
                'text-black h-[60px] rounded cursor-pointer border border-grey-500/50 flex justify-center items-center',
                paymentMode === 'card' && 'border-2 border-primary'
              )}
              onClick={() => setPaymentMode('card')}
            >
              Card
            </div>
            <div
              className={clsx(
                'text-black h-[60px] rounded cursor-pointer flex justify-center items-center border border-grey-500/50',
                paymentMode !== 'card' && 'border-2 border-primary'
              )}
              onClick={() => setPaymentMode('other')}
            >
              Payment mode 2
            </div>

            <div className="col-span-2">
              <p className="text-sm text-grey-800 mb-2">Card number</p>
              <Input className="w-full" size="base" />
            </div>

            <div>
              <p className="text-sm text-grey-800 mb-2">Expiration</p>
              <Input className="w-full" size="base" />
            </div>

            <div>
              <p className="text-sm text-grey-800 mb-2">CVC</p>
              <Input className="w-full" size="base" />
            </div>

            <div className="col-span-2 text-xs leading-4 py-4">
              By providing your card information, you allow Lemon Squeeze Test Mode to charge your card for future payments in accordance with their terms.
            </div>

            <div className="col-span-2">
              <p className="text-sm text-grey-800 mb-2">Cardholder name</p>
              <Input className="w-full" size="base" />
            </div>

            <div className="col-span-2">
              <p className="text-sm text-grey-800 mb-2">Billing address</p>
              <Input className="w-full" size="base" />
            </div>

            <div className="col-span-2 py-6">
              <div className="flex items-center justify-between text-grey-500 font-semibold mb-5">
                <span>Subtotal</span>
                <span>$499</span>
              </div>
              <div className="flex items-center justify-between mb-10 text-black font-bold">
                <span>Total</span>
                <span>$499</span>
              </div>

              <Button
                className="w-full"
                color="secondary"
                onClick={() => setShowSuccessModal(true)}
              >Make Payment</Button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <ThanksForOrderModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  )
}

export default CheckoutPage;
