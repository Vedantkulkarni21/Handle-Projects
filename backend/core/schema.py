import graphene
from graphql import GraphQLError

from .models import Project
from .types import ProjectType, TaskType
from .mutations import (
    CreateProject,
    CreateTask,
    UpdateTaskStatus,
    AddTaskComment,
)


from .types import TaskCommentType
from .models import TaskComment, Task


class Query(graphene.ObjectType):
    projects_by_organization = graphene.List(
        ProjectType,
        organization_slug=graphene.String(required=True)
    )

    tasks_by_project = graphene.List(
        TaskType,
        project_id=graphene.ID(required=True),
        organization_slug=graphene.String(required=True)
    )

    task_comments = graphene.List(
        TaskCommentType,
        task_id=graphene.ID(required=True),
        organization_slug=graphene.String(required=True),
    )

    def resolve_task_comments(self, info, task_id, organization_slug):
        return TaskComment.objects.filter(
            task__id=task_id,
            task__project__organization__slug=organization_slug
        ).order_by("-created_at")

    def resolve_projects_by_organization(self, info, organization_slug):
        return Project.objects.filter(
            organization__slug=organization_slug
        )

    def resolve_tasks_by_project(self, info, project_id, organization_slug):
        try:
            project = Project.objects.get(
                id=project_id,
                organization__slug=organization_slug
            )
        except Project.DoesNotExist:
            raise GraphQLError("Project not found for this organization")

        return project.tasks.all()


class Mutation(graphene.ObjectType):
    updateTaskStatus = UpdateTaskStatus.Field()
    addTaskComment = AddTaskComment.Field()
    createProject = CreateProject.Field()
    createTask = CreateTask.Field()

    
    



schema = graphene.Schema(query=Query, mutation=Mutation)
