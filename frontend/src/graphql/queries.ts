import { gql } from "@apollo/client";


// Projects
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

//Comments

export const GET_TASK_COMMENTS = gql`
  query GetTaskComments(
    $organizationSlug: String!
    $taskId: ID!
  ) {
    taskComments(
      organizationSlug: $organizationSlug
      taskId: $taskId
    ) {
      id
      content
      authorEmail
      createdAt
    }
  }
`;