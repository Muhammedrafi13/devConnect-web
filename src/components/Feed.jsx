import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addFeedData } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const feed = useSelector(store => store.feed);

  const fetchFeed = async () => {
    const feedData = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true
    })
    setIsLoading(false);
    dispatch(addFeedData(feedData.data.data))
  }

  useEffect(() => {
    fetchFeed();
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-2">Loading users...</p>
      </div>
    );
  }

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10 items-center">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10 px-4">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;