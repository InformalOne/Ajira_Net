import Image from 'next/image';
import Link from 'next/link';
import Select from '~/app/(site)/components/forms/Select';

function WelcomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Image
        loading={'lazy'}
        src={`/assets/images/logo/logo-without-text.svg`}
        alt={`banner`}
        height={50}
        width={299}
      />

      <div className="max-w-[1240px] mx-auto rounded-[20px] shadow-card py-[118px] px-[156px] my-10">
        <p className="text-[36px] font-semibold text-grey-[800]">
          Welcome Karen!
        </p>
        <p className="text-[36px] font-semibold text-grey-[800] mb-14">
          We’d love to get to know you a bit better…
        </p>

        <div className="mb-14">
          <p className="text-[28px] font-semibold mb-5">
            How many people are on your marketing/communication team?
          </p>
          <Select className="w-full h-[50px]" />
        </div>

        <div>
          <p className="text-[28px] font-semibold mb-5">
            How big is the revenue in your company/organisation?
          </p>
          <Select className="w-full h-[50px]" />
        </div>
      </div>

      <div className="flex justify-center gap-5 mb-7">
        <span className="w-[100px] rounded-2xl h-2.5 bg-primary cursor-pointer"></span>
        <span className="w-[100px] rounded-2xl h-2.5 bg-grey-200 cursor-pointer"></span>
        <span className="w-[100px] rounded-2xl h-2.5 bg-grey-200 cursor-pointer"></span>
      </div>
      <div className="flex justify-center">
        <Link
          className="text-2xl font-semibold text-grey-800 cursor-pointer"
          href="/brand"
        >Skip for now</Link>
      </div>
    </div>
  )
}

export default WelcomePage;
