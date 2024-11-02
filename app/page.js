import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h1 className="text-[#0077B5] text-4xl font-semibold mb-4">
            Welcome to G2 – Your All-in-One Professional Platform
          </h1>
          <p className="text-gray-600 mb-8">
            Connect, collaborate, manage projects, and advance your skills, all
            in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <button className="bg-[#0077B5] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#005B7F]">
                Get Started
              </button>
            </Link>
            <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Discover G2’s Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-[#0077B5] mb-2">
                Connect & Collaborate
              </h3>
              <p className="text-gray-600">
                Build your professional network and join agencies. Create or
                join organizations to work alongside industry experts.
              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-[#0077B5] mb-2">
                Manage Agencies & Teams
              </h3>
              <p className="text-gray-600">
                Create agencies, invite users, and manage teams efficiently.
                Delegate roles with multiple admins and team leads for a
                streamlined workflow.
              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-[#0077B5] mb-2">
                Project Creation & Assignment
              </h3>
              <p className="text-gray-600">
                Empower teams by assigning projects to specific teams. Agency
                admins and team leads have full control to assign projects for
                maximum productivity.
              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-[#0077B5] mb-2">
                Freelancing Opportunities
              </h3>
              <p className="text-gray-600">
                Access a world of freelancing possibilities, connect with
                agencies, and contribute your skills to projects on demand.
              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-[#0077B5] mb-2">
                Skill Development
              </h3>
              <p className="text-gray-600">
                Enroll in courses and sharpen your skills. From project
                management to specialized technical skills, G2 has you covered.
              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-[#0077B5] mb-2">
                Advanced User Roles
              </h3>
              <p className="text-gray-600">
                Flexible roles empower your team—admins, team leads, and
                members—ensuring efficient operations across all levels.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
