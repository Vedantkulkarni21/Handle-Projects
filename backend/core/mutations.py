import graphene
from graphql import GraphQLError
from .models import Organization, Project, Task, TaskComment
from .types import ProjectType, TaskType, TaskCommentType

class CreateProject(graphene.Mutation):
    class Arguments:
        organization_slug = graphene.String(required=True)
        name = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.Date()

    project = graphene.Field(ProjectType)

    def mutate(self, info, organization_slug, name, description="", status="ACTIVE", due_date=None):
        try:
            organization = Organization.objects.get(slug=organization_slug)
        except Organization.DoesNotExist:
            raise GraphQLError("Organization not found")

        project = Project.objects.create(
            organization=organization,
            name=name,
            description=description,
            status=status,
            due_date=due_date,
        )
        return CreateProject(project=project)


class CreateTask(graphene.Mutation):
    class Arguments:
        organization_slug = graphene.String(required=True)
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        assignee_email = graphene.String()

    task = graphene.Field(TaskType)

    def mutate(self, info, organization_slug, project_id, title, description="", assignee_email=""):
        try:
            project = Project.objects.get(
                id=project_id,
                organization__slug=organization_slug
            )
        except Project.DoesNotExist:
            raise GraphQLError("Project not found for this organization")

        task = Task.objects.create(
            project=project,
            title=title,
            description=description,
            assignee_email=assignee_email,
        )
        return CreateTask(task=task)


class UpdateTaskStatus(graphene.Mutation):
    class Arguments:
        organization_slug = graphene.String(required=True)
        task_id = graphene.ID(required=True)
        status = graphene.String(required=True)

    task = graphene.Field(TaskType)

    def mutate(self, info, organization_slug, task_id, status):
        try:
            task = Task.objects.get(
                id=task_id,
                project__organization__slug=organization_slug
            )
        except Task.DoesNotExist:
            raise GraphQLError("Task not found for this organization")

        task.status = status
        task.save()
        return UpdateTaskStatus(task=task)


class AddTaskComment(graphene.Mutation):
    class Arguments:
        organization_slug = graphene.String(required=True)
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)

    comment = graphene.Field(TaskCommentType)

    def mutate(self, info, organization_slug, task_id, content, author_email):
        try:
            task = Task.objects.get(
                id=task_id,
                project__organization__slug=organization_slug
            )
        except Task.DoesNotExist:
            raise GraphQLError("Task not found for this organization")

        comment = TaskComment.objects.create(
            task=task,
            content=content,
            author_email=author_email,
        )
        return AddTaskComment(comment=comment)
