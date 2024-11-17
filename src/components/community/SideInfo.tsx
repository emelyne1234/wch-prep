import { getAllForumsQuery } from '@/hooks/forum/useAllForum';
import React, { useState } from 'react';
import { SkeletonList } from '../skeleton/allforumSkeletonLoadter';
import { useJoinForum } from '@/hooks/forum/useJoinForum';
import Spinner from 'react-bootstrap/Spinner';
import { getAllForumsByMemberQuery } from '@/hooks/forum/allForumsByMember';
import Link from 'next/link';
import Header from '../Header';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface Forum {
  id: number;
  name: string;
  description: string;
}

interface Activity {
  id: number;
  description: string;
  timestamp: string;
}


const recentActivities: Activity[] = [
  { id: 1, description: "User123 joined the General Discussion forum.", timestamp: "2023-10-01T12:00:00Z" },
  { id: 2, description: "User456 posted a new topic in Tech Talk.", timestamp: "2023-10-02T14:30:00Z" },
  { id: 3, description: "User789 commented on a Gaming thread.", timestamp: "2023-10-03T09:15:00Z" },
  { id: 4, description: "User101 joined the Health & Wellness forum.", timestamp: "2023-10-04T11:45:00Z" },
];
export const SideInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [joiningForumId, setJoiningForumId] = useState<number | null>(null);

  const { data, isPending } = getAllForumsQuery();
  const { data: allForumsOfMember, isPending: isPendingAllForumsOfMember } = getAllForumsByMemberQuery();
  const { handleSubmit, errors } = useJoinForum();

  const allForums = data?.data || [];

  const handleJoinForum = async (forumId: number) => {
    setJoiningForumId(forumId);
    await handleSubmit(forumId);
    setJoiningForumId(null);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="lg:max-w-[70vw] w-full mx-auto mt-24">
        <Tabs defaultValue="availableForums" className="lg:w-[400px] mr-10 w-full">
          <TabsList className="grid w-full grid-cols-3 pb-3  rounded-full bg-gray-200">
            <TabsTrigger value="availableForums"  className=' rounded-full lg:text-sm text-xs '>Available Forums</TabsTrigger>
            <TabsTrigger value="recentActivities" className=' rounded-full lg:text-sm text-xs'>Recent Activities</TabsTrigger>
            <TabsTrigger value="myForums" className=' rounded-full lg:text-sm text-xs'>My Forums</TabsTrigger>
          </TabsList>

          <TabsContent value="availableForums">
            <ul className="list-group">
              {isPending ? (
                <SkeletonList count={10} />
              ) : (
                allForums.map((forum: Forum) => {
                  const words = forum.description.split(' ');
                  const shortDescription = words.slice(0, 10).join(' ');
                  const hasMoreWords = words.length > 5;

                  return (
                    <li key={forum.id} className="list-group-item">
                      <a href="#" className="text-decoration-none">
                        {forum.name}
                      </a>
                      <p className="mb-0 text-muted">
                        {isExpanded ? forum.description : shortDescription}
                        {hasMoreWords && (
                          <span
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-primary ms-1 cursor-pointer"
                          >
                            {isExpanded ? ' Show less' : '...'}
                          </span>
                        )}
                      </p>
                      <button
                        onClick={() => handleJoinForum(forum.id)}
                        className="btn btn-primary btn-sm mt-2"
                        disabled={joiningForumId === forum.id}
                      >
                        {joiningForumId === forum.id ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Join"
                        )}
                      </button>
                      {errors.forumId && <small className="text-danger">{errors.forumId}</small>}
                    </li>
                  );
                })
              )}
            </ul>
          </TabsContent>

          <TabsContent value="recentActivities">
            <div className="mt-3">
              <ul className="list-group">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="list-group-item">
                    <p>{activity.description}</p>
                    <small className="text-muted">
                      {new Date(activity.timestamp).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="myForums">
            <div className="mt-3">
              <ul className="list-group">
                {allForumsOfMember?.data?.map((forum: { 
                  id: React.Key | null | undefined; 
                  forumId: any; 
                  forumName: string | number | React.ReactNode; 
                }, index: number) => (
                  isPendingAllForumsOfMember ? (
                    <SkeletonList count={10} />
                  ) : (
                  <li key={index} className="list-group-item">
                    <Link href={`/community/${forum.forumId}`} className="text-decoration-none">
                      {forum.forumName}
                    </Link>
                  </li>
                  )))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
