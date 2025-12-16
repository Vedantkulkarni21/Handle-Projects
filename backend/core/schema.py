# # import graphene

# # class Query(graphene.ObjectType):
# #     hello = graphene.String(default_value="Hello, GraphQL!")

# # schema = graphene.Schema(query=Query)



# import graphene
# from graphql import GraphQLError
# from .types import ProjectType, TaskType
# from .models import Organization, Project, Task


# class Query(graphene.ObjectType):
#     projects_by_organization = graphene.List(
#         ProjectType,
#         organization_slug=graphene.String(required=True)
#     )

#     tasks_by_project = graphene.List(
#         TaskType,
#         project_id=graphene.ID(required=True),
#         organization_slug=graphene.String(required=True)
#     )

#     def resolve_projects_by_organization(self, info, organization_slug):
#         return Project.objects.filter(
#             organization__slug=organization_slug
#         )

#     def resolve_tasks_by_project(self, info, project_id, organization_slug):
#         try:
#             project = Project.objects.get(
#                 id=project_id,
#                 organization__slug=organization_slug
#             )
#         except Project.DoesNotExist:
#             raise GraphQLError("Project not found for this organization")

#         return project.tasks.all()


# import graphene
# from .mutations import (
#     CreateProject,
#     CreateTask,
#     UpdateTaskStatus,
#     AddTaskComment,
# )
# from .schema import Query  # remove this line if circular import appears


# schema = graphene.Schema(query=Query)





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
    create_project = CreateProject.Field()
    create_task = CreateTask.Field()
    update_task_status = UpdateTaskStatus.Field()
    add_task_comment = AddTaskComment.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
