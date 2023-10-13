'use client';
import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import Input from '~/app/(site)/components/forms/Input';
import Select from '~/app/(site)/components/forms/Select';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '~/app/(site)/components/forms/Button';
import CheckBox from '~/app/(site)/components/forms/CheckBox';
import PaymentPlanModal from '~/app/(site)/components/modals/PaymentPlanModal';
import {
  MARKETING_COMMUNICATION_OPTIONS,
  EMPLOYEES_OPTIONS,
  REVENUE_OPTIONS,
} from '~/app/(site)/core/constants/options';
import Link from 'next/link';
import CountrySelect from '~/app/(site)/components/forms/CountrySelect';

function MyAccountPage() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('123456');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div>
      <h2 className="text-[26px] font-bold text-grey-800 mb-10">My Account</h2>

      <div>
        <h2 className="text-lg font-bold border-b border-b-grey-300 border-dashed py-1">
          •&nbsp;&nbsp;Profile
        </h2>
        <div className="py-8 grid grid-cols-3 gap-16">
          <div className="col-span-2 grid grid-cols-2 gap-x-16 gap-y-5">
            <div>
              <p className="text-sm text-grey-800 mb-2">First name</p>
              <Input className="w-full" size="base" placeholder="Karen" />
            </div>
            <div>
              <p className="text-sm text-grey-800 mb-2">Last name</p>
              <Input className="w-full" size="base" placeholder="John" />
            </div>
            <div>
              <p className="text-sm text-grey-800 mb-2">Email</p>
              <Input
                className="w-full"
                size="base"
                placeholder="karen@gmail.com"
              />
            </div>
            <div>
              <p className="text-sm text-grey-800 mb-2">Company Name</p>
              <Input
                className="w-full"
                size="base"
                placeholder="Fulcrum digital"
              />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-grey-800 mb-2">Address line 1</p>
              <Input className="w-full" size="base" placeholder="Address 1" />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-grey-800 mb-2">Address line 2</p>
              <Input className="w-full" size="base" placeholder="Address 1" />
            </div>
            <div>
              <p className="text-sm text-grey-800 mb-2">Zip code</p>
              <Input className="w-full" size="base" placeholder="Zip code" />
            </div>
            <div>
              <p className="text-sm text-grey-800 mb-2">City</p>
              <Input className="w-full" size="base" placeholder="City" />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-grey-800 mb-2">Country</p>
              <CountrySelect />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-lg overflow-hidden w-40 h-40 bg-grey-200">
              <Image
                src={selectedImage ?? '/assets/images/robot.png'}
                width={160}
                height={160}
                alt="robot"
              />
            </div>
            <input
              className="w-0 h-0"
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <span
              className="underline mt-2.5 text-grey-800 cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              Change Picture
            </span>
          </div>
        </div>

        <h2 className="text-lg font-bold border-b border-b-grey-300 border-dashed py-1">
          •&nbsp;&nbsp;Password
        </h2>
        <div className="grid grid-cols-3 gap-x-16 gap-y-5 py-8">
          <div>
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm text-grey-800">Password *</p>
            </div>
            <div className="relative">
              <Input
                className="w-full pr-10"
                size="base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
              />
              <Image
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                src={`/assets/images/icons/${
                  showPassword ? 'eye_closed_icon.svg' : 'eye_open_icon.svg'
                }`}
                width={20}
                height={20}
                alt="robot"
              />
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between items-center">
              <p className="text-sm text-grey-800">Confirm Password *</p>
            </div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                size="base"
                className="w-full pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setShowError(password !== confirmPassword)}
              />
              <Image
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                src={`/assets/images/icons/${
                  showConfirmPassword
                    ? 'eye_closed_icon.svg'
                    : 'eye_open_icon.svg'
                }`}
                width={20}
                height={20}
                alt="robot"
              />
            </div>
            {showError && (
              <p className="text-red-600 text-xs">
                The passwords do not match.
                <br />
                Make sure you‘re using the correct password.
              </p>
            )}
          </div>
        </div>

        <h2 className="text-lg font-bold border-b border-b-grey-300 border-dashed py-1">
          •&nbsp;&nbsp;Additional information
        </h2>
        <div className="grid grid-cols-3 gap-x-16 gap-y-7 py-8">
          <div className="col-span-3 font-semibold">
            We’d love to know a bit more about you…
          </div>
          <div className="col-span-2">
            <p className="text-sm text-grey-800 mb-2">
              How many headcounts are there in your marketing and communication team?
            </p>
            <Select
              size="md"
              className="w-full"
              items={MARKETING_COMMUNICATION_OPTIONS}
            />
          </div>
          <div className="col-span-2">
            <p className="text-sm text-grey-800 mb-2">
              How many employees are there in your company/organization?
            </p>
            <Select size="md" className="w-full" items={EMPLOYEES_OPTIONS} />
          </div>
          <div className="col-span-2">
            <p className="text-sm text-grey-800 mb-2">
              How big is the revenue in your company/organisation?
            </p>
            <Select size="md" className="w-full" items={REVENUE_OPTIONS} />
          </div>
        </div>

        <h2 className="text-lg font-bold border-b border-b-grey-300 border-dashed py-1">
          •&nbsp;&nbsp;Subscription Details
        </h2>
        <div>
          <p className="text-grey-800 text-sm my-5">
            Manage your Subscription and Billing Settings
          </p>
        </div>
        <div className="p-8 rounded-md border border-grey-500/50 bg-white mb-10">
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold">Try our service</p>
            <span className="rounded text-xs font-semibold bg-success-100 text-success-800 px-2 py-1">
              Active
            </span>
          </div>
          <p className="text-sm text-grey-800 mb-5">
            Create 1 project and 10 marketing & communication assets to try our
            service
          </p>

          <div className="flex items-baseline text-grey-800 mb-3">
            <span className="text-[32px] font-bold">$99</span>
            <span className="text-sm"> / month</span>
          </div>

          <div className="rounded-md bg-success-100 text-success-800 py-4 px-3 max-w-[588px] mb-4">
            <div className="flex items-center gap-1">
              <CheckCircleIcon className="w-4 h-4 text-success-800" />
              <p className="text-sm font-bold text-success-800">
                Your subscription is active
              </p>
            </div>
            <p className="text-xs text-success-800">
              Your subscription is active. You can mange your subscription and
              billing in the Customer Portal.
            </p>
          </div>

          <div className="flex items-center gap-1 mb-7">
            <CheckCircleIcon className="w-4 h-4 text-success-800" />
            <p className="text-sm font-bold text-grey-800">
              Your subscription is scheduled to be renewed on Sat Mar 30 2024
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              color="grey"
              variant="outline"
              size="sm"
              className="!min-w-[110px] !font-bold"
              onClick={() => setShowPlanModal(true)}
            >
              Switch Plan
            </Button>
            <Link href="/checkout">
              <Button
                color="grey"
                variant="outline"
                size="sm"
                className="!min-w-[110px] !font-bold"
              >
                Update payment method
              </Button>
            </Link>
          </div>
        </div>

        <h2 className="text-lg font-bold border-b border-b-grey-300 border-dashed py-1">
          •&nbsp;&nbsp;Solarplexus updates
        </h2>
        <p className="mt-4 mb-4">
          I allow Solarplexus to send me the following information:
        </p>
        <div className="flex flex-col gap-4">
          <CheckBox
            size="lg"
            label="Newsletters"
            labelClassName="text-lg font-semibold gap-7 text-grey-800"
            className="bg-white"
          />
          <CheckBox
            size="lg"
            label="Marketing update"
            labelClassName="text-lg font-semibold gap-7 text-grey-800"
            className="bg-white"
          />
          <CheckBox
            size="lg"
            label="New product features, functions and enhancements"
            labelClassName="text-lg font-semibold gap-7 text-grey-800"
            className="bg-white"
          />
          <CheckBox
            size="lg"
            label="Only what is required by Law"
            labelClassName="text-lg font-semibold gap-7 text-grey-800"
            className="bg-white"
            defaultChecked={true}
            disabled
          />
        </div>

        <div className="pt-10 flex justify-end">
          <Button color="secondary">Save</Button>
        </div>
      </div>

      {showPlanModal && (
        <PaymentPlanModal onClose={() => setShowPlanModal(false)} />
      )}
    </div>
  );
}

export default MyAccountPage;
