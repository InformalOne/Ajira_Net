'use client';
import { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import MarketCard from '~/app/(site)/components/MarketCard';
import Input from '~/app/(site)/components/forms/Input';
import { MOCK_ASSETS } from '~/app/(site)/core/constants/mock_assets';
import Image from 'next/image';

function MarketingPage() {
  const [search, setSearch] = useState<string>('');

  const filtered = useMemo(() => {
    return MOCK_ASSETS.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div>
      <h2 className="text-[26px] font-bold text-grey-800">
        Marketing & Communication Assets
      </h2>
      <div className="flex">
        <p className="text-sm font-semibold text-grey-800 flex-1 pr-10">
          Here are the assets we have created for you for each segment. Please
          review edit and save before you share.
        </p>
        <div className="relative h-fit">
          <Input
            className="pr-5"
            size="md"
            placeholder="Search assets"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-1/2 right-2 -translate-y-1/2 w-3 h-3" />
        </div>
      </div>

      <div className="flex flex-wrap justify-between content-between gap-11 mt-11">
        {filtered.map((item, index) => (
          <div key={index}>
            <MarketCard id={item.id} name={item.name} image={item.image} />
          </div>
        ))}
        {new Array(10).fill(1).map((item, index) => (
          <div key={index}>
            <div className="w-[170px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketingPage;
