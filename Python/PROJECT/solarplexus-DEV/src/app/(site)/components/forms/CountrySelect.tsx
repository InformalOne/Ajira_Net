import { Fragment, useState, useMemo } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import countryList from 'react-select-country-list'
import ReactCountryFlag from "react-country-flag"
import Image from 'next/image';

export type CountryItemType = {
  value: string;
  label: string;
}

export default function CountrySelect() {
  const [selected, setSelected] = useState<CountryItemType | null>(null);
  const countryOptions: CountryItemType[] = useMemo(() => countryList().getData(), []);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="h-10 rounded border border-grey-500/50 px-5 w-full bg-white focus:border-black">
          <div className="flex items-center gap-2 text-left">
            {selected?.value && (
              <ReactCountryFlag
                className="text-2xl"
                countryCode={selected.value}
                svg
              />
            )}
            {selected?.label}
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
            <Image src="/assets/images/icons/chevron_down_solid_icon.svg" alt="chevron-icon" width={12} height={12} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {countryOptions.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 gap-2 px-5 flex items-center text-grey-800 cursor-pointer ${
                    active ? 'bg-grey-100' : 'bg-white'
                  }`
                }
                value={person}
              >
                <ReactCountryFlag
                  className="text-2xl"
                  countryCode={person.value}
                  svg
                />
                <span
                  className={`block truncate ${
                    selected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  {person.label}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
