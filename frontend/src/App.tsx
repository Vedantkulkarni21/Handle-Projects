import ProjectList from "./components/ProjectList";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Project Dashboard
          </h1>
          <p className="mt-2 text-gray-400">
            Manage projects, tasks, and progress across your organization
          </p>
        </header>

        {/* Main Card */}
        <main className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-xl p-6 shadow-lg transition hover:border-gray-700 hover:shadow-xl">

          <ProjectList organizationSlug="acme" />
        </main>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-500">
          Built with React, Apollo & Django GraphQL
        </footer>
      </div>
    </div>
  );
}

export default App;
