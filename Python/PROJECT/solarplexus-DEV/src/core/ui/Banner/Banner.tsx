import Image from 'next/image';
const Banner = () => {
  return (
    <Image
      decoding={'async'}
      loading={'lazy'}
      src={`/assets/images/auth/banner.png`}
      alt={`banner`}
      width={927}
      height={812}
    />
  );
};

export default Banner;
