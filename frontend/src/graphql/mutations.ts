import { gql } from "@apollo/client";

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus(
    $organizationSlug: String!
    $taskId: ID!
    $status: String!
  ) {
    updateTaskStatus(
      organizationSlug: $organizationSlug
      taskId: $taskId
      status: $status
    ) {
      task { 
        id
        status
      }
    }
  }
`;



export const ADD_COMMENT = gql`
  mutation AddTaskComment(
    $organizationSlug: String!
    $taskId: ID!
    $content: String!
  ) {
    addTaskComment(
      organizationSlug: $organizationSlug
      taskId: $taskId
      content: $content
    ) {
      comment {
        id
        content
        authorEmail
        createdAt
      }
    }
  }
`;
