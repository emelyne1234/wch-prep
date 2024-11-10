"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaCog, FaSignOutAlt, FaComment, FaThumbsUp } from 'react-icons/fa';
import { Editor } from 'react-draft-wysiwyg'; 
import { EditorState } from 'draft-js'; 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ForumPage = () => {
    const [showNewDiscussion, setShowNewDiscussion] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty()); 

    const handleNewDiscussionClick = () => {
        setShowNewDiscussion(true);
    };

    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom sticky-top">
                <h1 className="h4">Wildlife Conservation Forum</h1>
                <div>
                    <button className="btn btn-outline-secondary me-2"><FaUser /> Profile</button>
                    <button className="btn btn-outline-danger"><FaSignOutAlt /> Log Out</button>
                </div>
            </header>

            <div className="row">
                <nav className="col-md-3 col-lg-2 sidebar bg-light p-3">
                    <h4>All Topics</h4>
                    <ul className="nav flex-column">
                        {["General", "News", "Knowledge", "Articles", "Project"].map((item) => (
                            <li className="nav-item" key={item}>
                                <a className="nav-link" href="#">{item}</a>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary mt-3" onClick={handleNewDiscussionClick}>
                        Start New Discussion
                    </button>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 col-lg-10">
                    <h2 className="mt-3">Latest Topics</h2>
                    {[
                        {
                            title: "Innovative Approaches to Habitat Restoration",
                            author: "Sarah",
                            time: "10 days ago",
                            badge: "Research",
                            comments: [
                                { author: "John", text: "Great insights!", avatar: "https://i.pravatar.cc/150?img=5" },
                                { author: "Alice", text: "Very informative.", avatar: "https://i.pravatar.cc/150?img=6" }
                            ],
                            likes: ["John", "Alice", "Marien"],
                            avatar: "https://i.pravatar.cc/150?img=1"
                        },
                        {
                            title: "Focus group on endangered species protection",
                            author: "Marien",
                            time: "10 days ago",
                            badge: "Conservation Strategies",
                            comments: [
                                { author: "Bob", text: "Interesting topic!", avatar: "https://i.pravatar.cc/150?img=7" }
                            ],
                            likes: ["Sarah", "Michelangelo"],
                            avatar: "https://i.pravatar.cc/150?img=2"
                        },
                        {
                            title: "New opportunities in wildlife research",
                            author: "Michelangelo",
                            time: "10 days ago",
                            badge: "Research",
                            comments: [],
                            likes: ["Rafaelle"],
                            avatar: "https://i.pravatar.cc/150?img=3"
                        },
                        {
                            title: "How communities perceive wildlife conservation efforts?",
                            author: "Rafaelle",
                            time: "10 days ago",
                            badge: "Community Initiatives",
                            comments: [
                                { author: "Sarah", text: "I have some questions.", avatar: "https://i.pravatar.cc/150?img=5" }
                            ],
                            likes: ["Marien", "John"],
                            avatar: "https://i.pravatar.cc/150?img=4"
                        },
                    ].map((discussion, index) => (
                        <div className="card discussion-card mb-3" key={index}>
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start p-3">
                                    <div className="d-flex align-items-center">
                                        <img src={discussion.avatar} alt={`${discussion.author}'s avatar`} className="rounded-circle me-2" width="40" height="40" />
                                        <div>
                                            <h5 className="card-title mb-0">{discussion.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted p-2">{discussion.author} started {discussion.time}</h6>
                                        </div>
                                    </div>
                                    <span className={`badge badge-${discussion.badge === "News" ? "info" : discussion.badge === "Knowledge" ? "success" : "warning"}`}>{discussion.badge}</span>
                                </div>
                                <p className="card-text mt-2">Wildlife conservation is a pressing concern that requires our attention...</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <div className="d-flex">
                                        {discussion.likes.map((like, idx) => (
                                            <img key={idx} src={`https://i.pravatar.cc/150?img=${idx + 5}`} alt={`${like}'s avatar`} className="rounded-circle me-1" width="30" height="30" />
                                        ))}
                                        <FaThumbsUp className="ms-1" />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">{discussion.comments.length} <FaComment /></span>
                                        <span className="me-2">{discussion.likes.length} likes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>

            {/* Render New Discussion Component if showNewDiscussion is true */}
            {showNewDiscussion && (
                <div className="modal fade show" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
                    <div className="modal-content" style={{ borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', padding: '20px', backgroundColor: '#fff', width: '400px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <h5 style={{ marginBottom: '20px' }}>Create Post</h5>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Title</label>
                            <input type="text" className="form-control" placeholder="Enter post title" />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Content</label>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image'],
                                    inline: {
                                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                                    },
                                    blockType: {
                                        options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
                                    },
                                    image: {
                                        uploadCallback: uploadImageCallback,
                                        alt: { present: true, mandatory: false },
                                    },
                                }}
                            />
                        </div>
                        <button onClick={() => setShowNewDiscussion(false)} className="btn btn-primary">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Define your image upload function
const uploadImageCallback = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve({ data: { link: reader.result } }); // Return the image link
        };
        reader.readAsDataURL(file);
    });
};

export default ForumPage;
