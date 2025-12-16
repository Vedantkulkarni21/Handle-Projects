# Handle-Projects

## Mini Project Management System
A multi-tenant project management tool built using Django + GraphQL + PostgreSQL on the backend and React + TypeScript + Apollo Client + TailwindCSS on the frontend.
The system includes organizations, projects, tasks, and task comments with proper data isolation and a responsive UI.

## Features
Backend (Django + GraphQL)
Organization-based multi-tenant data isolation

CRUD operations for:

Projects

Tasks

Comments

GraphQL API using Graphene

Basic project statistics (task counts, completion rate)

Clean model relationships and validation

Frontend (React + TypeScript)
Organization dashboard listing all projects

Project details page displaying tasks

Task status updates

Comment system per task

Apollo Client integration with error handling

Responsive UI built with TailwindCSS

Loading states and basic form validation

Tech Stack
Layer	Technology
Backend	Django 4.x, Graphene GraphQL, PostgreSQL
Frontend	React 18+, TypeScript, TailwindCSS
API Client	Apollo Client
Database	PostgreSQL
Project Structure
backend/
  core/
    models.py
    mutations.py
    schema.py
    types.py
  assignment_backend/
  manage.py

frontend/
  src/
    components/
    graphql/
    pages/
    App.tsx
  package.json
Setup Instructions (Local Development)
1. Clone Repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
Backend Setup (Django + GraphQL)
2. Create and Activate Virtual Environment
cd backend
python -m venv venv
Activate:

Windows

venv\Scripts\activate
macOS/Linux

source venv/bin/activate
3. Install Dependencies
pip install -r requirements.txt
If requirements.txt is missing:

pip freeze > requirements.txt
4. Configure PostgreSQL
Create database:

CREATE DATABASE project_management;
Update settings.py:

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "project_management",
        "USER": "postgres",
        "PASSWORD": "<your-password>",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
5. Apply Migrations
python manage.py migrate
6. Start Backend Server
python manage.py runserver
Backend will be available at:

http://127.0.0.1:8000/graphql/
Frontend Setup (React + TypeScript)
7. Install Dependencies
cd frontend
npm install
8. Start Frontend
npm run dev
Frontend will be available at:

http://localhost:5173
GraphQL API Overview
Queries
projectsByOrganization

tasksByProject

taskComments

Mutations
createProject

createTask

updateTaskStatus

addTaskComment

(If you want, a full schema reference can be added.)

Demo Video
A demonstration video is included showcasing:

Organization dashboard

Creating projects and tasks

Updating task status

Adding task comments

Multi-tenant isolation behavior

Technical Summary
Design Decisions
GraphQL chosen for flexible querying and reduced over-fetching

Organization slug used for multi-tenancy

Apollo Client caching improves responsiveness

Backend and frontend separated for clean architecture

Future Improvements
Authentication using JWT

Task board drag-and-drop

Live comments via WebSockets

Docker Compose for full containerized setup

More advanced project analytics

