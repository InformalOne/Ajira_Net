'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  UserCircleIcon,
  EllipsisVerticalIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useOnClickOutside } from 'usehooks-ts';
import Link from 'next/link';
import useSignOut from '~/core/hooks/use-sign-out';

import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import configuration from '~/configuration';
import useUser from '~/core/hooks/use-user';


function ProfileMenu() {
  const ref = useRef(null);

  const [openMenu, setOpenMenu] = useState(false);
  const [user , setUser] = useState<User | null>(null);

  const handleToggleProfileMenu = () => {
    setOpenMenu(!openMenu);
  };

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    // need to redirect to the sign in page
    window.location.href = '/auth/sign-in';
  };

  // user useeffect to get the user details 
  
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      
      if (user) {
        console.log('This is the user', user);
        console.log(user.data.user);
        setUser(user.data.user);
      }
    }
    getUser();
  }
  , []);


  useOnClickOutside(ref, handleToggleProfileMenu);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 overflow-hidden cursor-pointer"
        onClick={handleToggleProfileMenu}
      >
        <img
          className="w-7 h-7 rounded-sm"
          src="/assets/images/mock-user.png"
          alt="user"
        />
        <p className="text-xs leading-1 flex-1 w-[80px] truncate whitespace">
          {user?.email}
        </p>
        <EllipsisVerticalIcon className="-mr-3 h-7" />
      </div>

      {openMenu && (
        <div
          className="absolute bottom-[120%] left-0 bg-black rounded-md overflow-hidden"
          ref={ref}
        >
          <Link
            href="/my-account"
            className="p-3 flex items-center gap-1.5 text-white border-b border-b-gray-200/20 cursor-pointer hover:bg-gray-800"
            onClick={() => setOpenMenu(false)}
          >
            <UserCircleIcon className="w-4 h-4" />
            <span className="text-xs whitespace-nowrap">My Account</span>
          </Link>
          <div onClick={handleSignOut}>
            <div className="p-3 px-2 flex items-center gap-1.5 text-white cursor-pointer hover:bg-gray-800">
              <ArrowRightOnRectangleIcon className="w-5 h-4" />
              <span className="text-xs whitespace-nowrap">Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



export default ProfileMenu;
