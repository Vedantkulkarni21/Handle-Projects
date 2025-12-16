import { gql } from "@apollo/client";


/* -------- Projects -------- */


export const GET_PROJECTS = gql`
  query GetProjects($orgSlug: String!) {
    projectsByOrganization(organizationSlug: $orgSlug) {
      id
      name
      status
      dueDate
      taskCount
      completedTasks
    }
  }
`;

/* -------- Tasks -------- */

// export const GET_TASKS_BY_PROJECT = gql`
//   query GetTasksByProject($organizationSlug: String!, $projectId: ID!) {
//     tasksByProject(
//       organizationSlug: $organizationSlug
//       projectId: $projectId
//     ) {
//       id
//       title
//       status
//     }
//   }
// `;

export const GET_TASKS_BY_PROJECT = gql`
  query GetTasksByProject(
    $organizationSlug: String!
    $projectId: ID!
  ) {
    tasksByProject(
      organizationSlug: $organizationSlug
      projectId: $projectId
    ) {
      id
      title
      status
    }
  }
`;



// /* -------- Comments -------- */

// export const ADD_COMMENT = gql`
//   mutation AddComment($taskId: ID!, $content: String!) {
//     addTaskComment(taskId: $taskId, content: $content) {
//       id
//       content
//       authorEmail
//       createdAt
//     }
//   }
// `;


//import { gql } from "@apollo/client";

/* -------- Comments -------- */

export const GET_TASK_COMMENTS = gql`
  query GetTaskComments($taskId: ID!) {
    taskComments(taskId: $taskId) {
      id
      content
      authorEmail
      createdAt
    }
  }
`;
