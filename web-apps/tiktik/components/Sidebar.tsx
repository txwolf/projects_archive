import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const userProfile = false;

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#E100E4] rounded';

  return (
    <div>
      <div
        className="block m-2 mt-3 text-xl xl:hidden"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="mb-10 flex w-20 flex-col justify-start border-r-2 border-gray-100 p-3 xl:w-[400px] xl:border-0">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="hidden text-xl xl:block">For You</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
