import { relations } from "drizzle-orm";

import {
  users,
  roles,
  forums,
  forumsComments,
  sessions,
  articles,
  articlesComments,
  forumLikes,
  projects,
  projectMembers,
  projectGoals,
  projectNeeds,
  messages
} from "./schema";

export const userRelations = relations(users, ({ one, many }) => ({
  sessions: many(sessions),
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  forums: many(forums),
  forumComments: many(forumsComments),
  articles: many(articles),
  articleComments: many(articlesComments),
  forumLikes: many(forumLikes),
  projectMembers: many(projectMembers),
  messages: many(messages),
}));

export const forumRelations = relations(forums, ({ one, many }) => ({
  author: one(users, {
    fields: [forums.userId],
    references: [users.id],
  }),
  comments: many(forumsComments),
  likes: many(forumLikes),
}));

export const articleRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
  comments: many(articlesComments),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
  }),
  members: many(projectMembers),
  goals: many(projectGoals),
  needs: many(projectNeeds),
  messages: many(messages),
}));

export const projectMemberRelations = relations(
  projectMembers,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [projectMembers.projectId],
      references: [projects.projectId],
    }),
    user: one(users, {
      fields: [projectMembers.userId],
      references: [users.id],
    }),
  })
);

export const messageRelations = relations(messages, ({ one }) => ({
  project: one(projects, {
    fields: [messages.projectId],
    references: [projects.projectId],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));
