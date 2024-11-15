import { getAllForumsQuery } from '@/hooks/forum/useAllForum';
import React, { useState } from 'react';
import { SkeletonList } from '../skeleton/allforumSkeletonLoadter';
import { useJoinForum } from '@/hooks/forum/useJoinForum';
import Spinner from 'react-bootstrap/Spinner';
import { getAllForumsByMemberQuery } from '@/hooks/forum/allForumsByMember';
import Link from 'next/link';

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
  const [showActivities, setShowActivities] = useState(false);
  const [showUserForums, setShowUserForums] = useState(false);
  const [showAvailableForums, setShowAvailableForums] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [joiningForumId, setJoiningForumId] = useState<number | null>(null);

  const toggleActivities = () => {
    setShowActivities(!showActivities);
  };

  const toggleUserForums = () => {
    setShowUserForums(!showUserForums);
  };

  const toggleAvailableForums = () => {
    setShowAvailableForums(!showAvailableForums);
  };

  const { data, isPending } = getAllForumsQuery();
  const { data:allForumsOfMember , isPending: isPending1} = getAllForumsByMemberQuery()

  const allForums = data?.data || [];


  const { handleSubmit, errors } = useJoinForum();

  const handleJoinForum = async (forumId: number) => {
    setJoiningForumId(forumId);
    await handleSubmit(forumId);
    setJoiningForumId(null); 
  };


  return (
    <div className="card mb-3 over" style={{ maxWidth: "20rem", overflowY: "auto" }}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <span onClick={toggleAvailableForums} style={{ cursor: 'pointer' }}>Available Forums</span>
        <button className="btn btn-link" onClick={toggleActivities}>
          {showActivities ? 'Hide Activities' : 'Show Recent Activities'}
        </button>
        <button className="btn btn-link" onClick={toggleUserForums}>
          {showUserForums ? 'Hide My Forums' : 'Show My Forums'}
        </button>
      </div>
      <div className="card-body">
        {showAvailableForums && (
          <ul className="list-group">
            {isPending ? (
              <SkeletonList count={5} />
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
                          className="text-primary ms-1"
                          style={{ cursor: 'pointer' }}
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
        )}
        {showUserForums && (
          <div className="mt-3">
            <h5>My Forums</h5>
            <ul className="list-group">
              {allForumsOfMember.data.map((forum: { id: React.Key | null | undefined; forumId: any; forumName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <li key={forum.id} className="list-group-item">
                  <Link href={`/community/${forum.forumId}`} className="text-decoration-none">
                    {forum.forumName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {showActivities && (
          <div className="mt-3">
            <h5>Recent Activities</h5>
            <ul className="list-group">
              {recentActivities.map(activity => (
                <li key={activity.id} className="list-group-item">
                  <p>{activity.description}</p>
                  <small className="text-muted">{new Date(activity.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
