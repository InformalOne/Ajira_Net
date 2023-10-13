'use client';
import ProfileMenu from '~/app/(site)/components/layouts/ProfileMenu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const menu = [
  {
    title: 'Brand, Guidelines & Assets',
    icon: 'upload_data_icon',
    activeIcon: 'upload_data_active_icon',
    path: '/brand'
  },
  {
    title: 'Project',
    icon: 'file_plus_icon',
    activeIcon: 'file_plus_active_icon',
    path: '/project'
  },
  {
    title: 'Segmentation',
    icon: 'user_group_icon',
    activeIcon: 'user_group_active_icon',
    path: '/segmentation'
  },
  {
    title: 'marketing & communication assets',
    icon: 'media_icon',
    activeIcon: 'media_active_icon',
    path: '/marketing'
  },
  {
    title: 'Library & statistics',
    icon: 'chart_up_icon',
    activeIcon: 'chart_up_active_icon',
    path: '/library'
  },
  {
    title: 'Connectors',
    icon: 'media_icon',
    activeIcon: 'media_active_icon',
    path: '/connector'
  }
]

function LeftNavigationBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center bg-gallery-100 py-7 px-[15px] w-[8.75rem]">
      <div className="mb-5">
        <Link href="/">
          <Image src="/assets/images/logo.svg" width={64} height={63.5} alt="logo" />
        </Link>
      </div>
      <ul className="flex flex-col gap-2 w-full">
        {menu.map((item, index) => {
          const active = pathname.includes(item.path);

          return (
            <Link key={index} href={item.path}>
              <li className={clsx('group flex flex-col justify-center items-center bg-white rounded-lg w-full h-[100px] py-0.5 px-2.5 cursor-pointer hover:bg-primary-500', active && '!bg-primary-500')}>
                <img
                  className="block group-hover:hidden"
                  src={`/assets/images/icons/${active ? item.activeIcon : item.icon}.svg`}
                  alt={item.icon}
                />
                <img
                  className="hidden group-hover:block"
                  src={`/assets/images/icons/${item.activeIcon}.svg`}
                  alt={item.icon}
                />
                <span className={clsx('uppercase text-center font-bold text-xs font-medium mt-1 leading-4 text-grey-800 group-hover:text-white', active && '!text-white')}>{item.title}</span>
              </li>
            </Link>
          )
        })}
      </ul>
      <div className="mt-auto">
        <ProfileMenu />
      </div>
    </div>
  );
}

export default LeftNavigationBar;
