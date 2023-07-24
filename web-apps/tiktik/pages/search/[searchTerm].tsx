import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[]; }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const videosClass = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='w-full'>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>
            Accounts
          </p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${videosClass}`} onClick={() => setIsAccounts(false)}>
            Videos
          </p>
        </div>
        {isAccounts ?
          <div className=''>
            {searchedAccounts.length > 0 ?
              searchedAccounts.map((user: IUser) => (
                <Link href={`/profile/${user._id}`} key={user._id}>
                  <div className='flex gap-3 cursor-pointer p-2 font-semibold rounded'>
                    <div className=''>
                      <Image
                        src={user.image}
                        width={50}
                        height={50}
                        className='rounded-full'
                        alt='user profile'
                      ></Image>
                    </div>
                    <div className='hidden xl:block'>
                      <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                        {user.userName.replaceAll(' ', '')}
                        <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
              : <NoResults text={'No results for ' + searchTerm} />
            }
          </div> :
          <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
            {videos?.length ?
              videos.map(video => (
                <VideoCard key={video._id} post={video} />
              ))
              : <NoResults text={'No video results for ' + searchTerm} />
            }
          </div>
        }
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string; }; }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;