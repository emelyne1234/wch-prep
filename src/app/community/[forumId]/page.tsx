"use client";

import { useState } from "react";
import { FaThumbsUp, FaCommentAlt, FaPlus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { format } from "date-fns";
import { usegetForumPosts } from "@/hooks/forum/posts/usegetForum";
import { usePostOnForum } from "@/hooks/forum/posts/usePosts";
import { usePostComment } from "@/hooks/forum/posts/usepostComments";

export function Community() {
  const params = useParams();
  const forumId = params?.forumId as string;

  const [showModal, setShowModal] = useState(false);
  const [newCommentText, setNewCommentText] = useState<Record<string | number, string>>({});
  const [replyText, setReplyText] = useState<Record<string | number, string>>({});
  const [replyInputVisible, setReplyInputVisible] = useState<Record<string | number, boolean>>({});
  const [postId, setPostId] = useState("");

  const {
    posts,
    isError,
    error,
    isLoading,
  } = usegetForumPosts(forumId);

  const {
    handleSubmit,
    handleInputChanges,
    isPending,
    errors,
    formData,
    setFormData,
  } = usePostOnForum();

  const {
    formData: formData1,
    setFormData: setFormData1,
    handleSubmit: handleSubmit1,
    handleInputChanges: handleInputChanges1,
    isPending: isPending1,
    errors: errors1,
  } = usePostComment();

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ forumId: "", content: "" });
  };

  const handleShowModal = () => {
    setFormData({ forumId: "", content: "" });
    setShowModal(true);
  };

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!forumId) {
      console.error("Forum ID is missing");
      return;
    }

    try {
      const success = await handleSubmit(forumId);
      if (success) {
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handlePostCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postId) {
      console.error("postId is missing");
      return;
    }

    try {
      const success = await handleSubmit1(postId);
      if (success) {
        setNewCommentText((prev) => ({ ...prev, [postId]: "" }));
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const toggleReplyInput = (commentId: string | number) => {
    setReplyInputVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyChange = (commentId: string | number, text: string) => {
    setReplyText((prev) => ({
      ...prev,
      [commentId]: text,
    }));
  };

  if (isLoading || isPending) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Error loading posts: {error?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-success">Community Forum</h1>
        <button
          className="btn btn-success"
          onClick={handleShowModal}
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaPlus className="me-2" /> Create New Post
        </button>
      </div>

      <div className="row justify-content-center">
        {posts?.data?.map((post: any) => (
          <div
            key={post.postId}
            className="col-md-10 mb-4"
            onClick={() => setPostId(post.postId)}
          >
            <div className="card text-dark bg-light shadow border-0">
              <div className="card-header text-white bg-success d-flex align-items-center">
                <img
                  src={post.profileImage || "/default.png"}
                  alt="User avatar"
                  className="rounded-circle me-3"
                  width="50"
                  height="50"
                />
                <div>
                  <h5 className="m-0">{post.username || "Anonymous"}</h5>
                  <small className="text-light">
                    {format(new Date(post.createdAt), "MMM d, yyyy h:mm a")}
                  </small>
                </div>
              </div>

              <div className="card-body">
                <p className="card-text">{post.content}</p>
                {post.profileImage && (
                  <img
                    src={post.profileImage}
                    alt="Post content"
                    className="img-fluid rounded mt-2"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                )}
              </div>

              <div className="card-footer d-flex justify-content-between align-items-center">
                <span className="text-muted">
                  <FaThumbsUp className="me-1 text-success" /> {post.likes || 0}
                </span>
                <span className="text-muted" style={{ cursor: "pointer" }}>
                  <FaCommentAlt className="me-1 text-success" />{" "}
                  {post.comments?.length || 0} Comments
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <form onSubmit={handlePostSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className={`form-control ${errors.content ? "is-invalid" : ""}`}
                id="content"
                value={formData.content}
                onChange={handleInputChanges}
                rows={4}
              />
              {errors.content && (
                <div className="invalid-feedback">{errors.content}</div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={isPending || !formData.content.trim()}
            >
              {isPending ? "Posting..." : "Post"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
