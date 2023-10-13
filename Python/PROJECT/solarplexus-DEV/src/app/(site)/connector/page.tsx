import Image from 'next/image';

function ConnectorPage() {
  return (
    <div>
      <h2 className="text-[26px] font-bold text-grey-800">Connectors</h2>
      <p className="text-sm font-semibold text-grey-800">
        Hang in there, here you will soon find connectors to your other applications in order for a seamless experience.
      </p>

      <div className="flex gap-2.5 pt-7">
        <div className="flex flex-col">
          <Image
            src="/assets/images/logo/logo-mailchimp.png"
            alt="mailchimp"
            width={242}
            height={74}
          />
          <p className="text-grey-350 text-sm opacity-0.5 pt-3.5 text-center">COMING SOON!</p>
        </div>
        <div className="flex flex-col">
          <Image
            src="/assets/images/logo/logo-salesforce.png"
            alt="mailchimp"
            width={242}
            height={74}
          />
          <p className="text-grey-350 text-sm opacity-0.5 pt-3.5 text-center">COMING SOON!</p>
        </div>
        <div className="flex flex-col">
          <Image
            src="/assets/images/logo/logo-hubspot.png"
            alt="mailchimp"
            width={242}
            height={74}
          />
          <p className="text-grey-350 text-sm opacity-0.5 pt-3.5 text-center">COMING SOON!</p>
        </div>
        <div className="flex flex-col">
          <Image
            src="/assets/images/logo/logo-monday.png"
            alt="mailchimp"
            width={242}
            height={74}
          />
          <p className="text-grey-350 text-sm opacity-0.5 pt-3.5 text-center">COMING SOON!</p>
        </div>
      </div>
    </div>
  )
}

export default ConnectorPage;
