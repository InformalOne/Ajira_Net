import Image from 'next/image';
const SolarLogo = () => {
  return (
    <div className={'flex items-center justify-center'}>
      <Image
        decoding={'async'}
        loading={'lazy'}
        src={`/assets/images/logo/logo.svg`}
        alt={`banner`}
        height={60}
        width={220}
      />
    </div>
  );
};

export default SolarLogo;
