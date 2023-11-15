import { useEffect, useMemo } from 'react';

import { useGetVideosLazyQuery } from '@/queries';


export function useVideos(date:string) {

  const createdAt = new Date(date).toISOString();
  const endedAt = new Date(date+ "T23:59:59.999Z").toISOString();

  const variables = {
    where: { createdAt_gt: createdAt, createdAt_lt: endedAt },
    limit:50000
  };
  const [getVideo, getVideoQuery]= useGetVideosLazyQuery({variables});

  useEffect(() => {
    if (!date) return;
    getVideo({variables})
  }, [date]);
  
  const data = useMemo(() => getVideoQuery.data?.videos.map((item: any) => {
    const temp: any = {};
    temp.key = item['media']['id'];
    temp.video_title = item['title'];
    temp.video_link = item['media']['id'];
    temp.video_owner_handle = item['channel']['ownerMember']['handle'];
    temp.video_createdAt = item['createdAt'];
    return temp
  }), [getVideoQuery.data]);
  return {
    data,
    loading: getVideoQuery.loading,
    error: getVideoQuery.error,
  };
}
