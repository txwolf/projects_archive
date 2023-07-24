import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#E100E4] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#E100E4]';
  const topicStyle = 'xl:border-2 hover:bg-gray-200 xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className='pb-6 xl:border-b-2 xl:border-gray-200'>
      <p className='hidden m-3 mt-4 font-semibold text-gray-500 xl:block'>
        Popular Topics
      </p>
      <div className='flex flex-wrap gap-3'>
        {topics.map((item) => (
          <Link key={item.name} href={`/?topic=${item.name}`}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className='text-2xl font-bold xl-text-md'>
                {item.icon}
              </span>
              <span className='hidden font-medium capitalize text-md xl:block'>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;