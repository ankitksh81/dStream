import React, { ReactNode } from 'react';

type LayoutProps = {
  meta: ReactNode;
  children: ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <div className="w-full antialiased text-gray-700">
      {props.meta}

      <div className="flex flex-col min-h-screen mx-auto bg-white">
        <div className="flex flex-col flex-1">{props.children}</div>
      </div>
    </div>
  );
};
