import type { NextPage } from "next";
import axios from 'axios';
import { Video } from "../types";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? videos.map(video => <VideoCard key={video._id} post={video} />) :
        <NoResults text="No Results Found" />}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic }
}: { query: { topic: string; }; }) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data
    }
  };
};

export default Home;