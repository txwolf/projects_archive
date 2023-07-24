import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';

import { BASE_URL } from '../utils';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any; } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets.upload('file', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async (e: any) => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          }
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category
      };

      await axios.post(`${BASE_URL}/api/post`, document);

      router.push('/');
    }
  };

  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='mt-1 text-gray-400 text-md'>Post a video to your account</p>
          </div>
          <div className='border-dashed border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ?
              <p>Uploading...</p> :
              <div>
                {videoAsset
                  ?
                  <div>
                    <video
                      src={videoAsset?.url}
                      loop
                      controls
                      className='rounded-xl h-[450px] mt-16 bg-black'
                    >
                    </video>
                  </div>
                  :
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='text-xl font-bold'>
                          <FaCloudUploadAlt className='text-6xl text-gray-300' />
                        </p>
                        <p className='text-xl font-semibold'>
                          Upload Video
                        </p>
                      </div>
                      <p className='mt-10 text-sm leading-10 text-center text-gray-400'>
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Less then 2GB
                      </p>
                      <p className='bg-[#E100E4] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      className='w-0 h-0'
                      name='upload-video'
                      onChange={uploadVideo}
                    />
                  </label>
                }
              </div>
            }
            {wrongFileType &&
              <p className='text-red-400 text-center mt-10 text-xl font-semibold w-[250px]'>
                Only MP4, WebM or ogg files are allowed
              </p>
            }
          </div>


        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label className='font-medium text-md'>Caption</label>
          <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className='p-2 border-2 border-gray-200 rounded outline-none text-md' />
          <label className='font-medium text-md'>Choose a Category</label>
          <select onChange={(e) => setCategory(e.target.value)} className='p-2 capitalize border-2 border-gray-200 rounded outline-none cursor-pointer text-md lg:p-4'>
            {topics.map((topic) => (
              <option key={topic.name} value={topic.name} className='p-2 text-gray-700 capitalize bg-white outline-none text-md hover:bg-slate-300'>
                {topic.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button onClick={() => { }} type='button' className='p-2 font-medium border-2 border-gray-300 rounded outline-none text-md w-28 lg:w-44'>
              Discard
            </button>
            <button onClick={handlePost} type='button' className='bg-[#E100E4] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload; 