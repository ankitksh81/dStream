import React, { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface DropdownProps {
  account: string;
  handleDisconnectWallet: () => void;
}

export const MenuDropdown = ({
  account,
  handleDisconnectWallet,
}: DropdownProps) => {
  return (
    <Menu as="div" className="relative z-10 inline-block ml-auto text-left">
      <div>
        <Menu.Button className="border-purple-400 z-10 ml-auto border w-[250px] overflow-ellipsis overflow-hidden whitespace-nowrap flex gap-2 items-center justify-center text-purple-400 px-8 py-4 rounded-lg text-xl font-bold">
          <span className="mx-auto overflow-hidden overflow-ellipsis">
            {account}
          </span>
          <ChevronDownIcon
            className="flex-shrink-0 w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-10"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDisconnectWallet}
                  className={`${
                    active ? 'bg-violet-500 ' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-lg`}
                >
                  Disconnect wallet
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
