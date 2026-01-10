import React, { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const content = {
    overview: (
      <>
        <p className="mb-4 text-gray-700 text-base leading-relaxed">
          Welcome to <span className="font-semibold">UniComplaint</span> — a
          centralized platform for managing, tracking, and resolving complaints
          within our university. Our system ensures transparency, accountability,
          and timely resolution of all issues reported by students, staff, and faculty.
        </p>
        <p className="mb-4 text-gray-700 text-base leading-relaxed">
          From facility maintenance to academic concerns, every complaint is
          logged, categorized, and assigned to the appropriate department for
          action. We aim to make the university environment safer, smarter, and more responsive.
        </p>
        <p className="text-gray-700 text-base leading-relaxed">
          With real-time dashboards, notifications, and status tracking, you
          can monitor the progress of your complaints from submission to
          resolution.
        </p>
      </>
    ),
    mission: (
      <p className="text-gray-700 text-base leading-relaxed">
        Our mission is to provide a reliable and efficient complaint management
        system for the university. We aim to foster a culture of accountability
        and responsiveness by ensuring complaints are addressed quickly,
        transparently, and effectively. Our goal is a safer, fairer, and more
        organized campus for everyone.
      </p>
    ),
    achievements: (
      <p className="text-gray-700 text-base leading-relaxed">
        Since our launch, <span className="font-semibold">UniComplaint</span> has
        successfully handled thousands of complaints, improving the campus
        experience. Departments are able to track their tasks, students receive
        real-time updates, and the administration has complete oversight of all
        complaints submitted.
      </p>
    ),
    team: (
      <p className="text-gray-700 text-base leading-relaxed">
        Our development and support team is composed of experienced IT staff
        and administrators who continuously work to enhance system features,
        ensure data security, and provide smooth user experiences. We value
        feedback and are committed to improving the platform for all campus users.
      </p>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2 text-gray-800">About UniComplaint</h2>
        <p className="text-gray-500 mb-6 text-sm md:text-base">
          A modern complaint management platform for students, faculty, and university staff to log, track, and resolve issues efficiently.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 border-b mb-6 text-sm md:text-base font-medium">
          {["overview", "mission", "achievements", "team"].map((tab) => {
            const label = {
              overview: "Overview",
              mission: "Mission",
              achievements: "Achievements",
              team: "Team",
            }[tab];

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition-colors duration-200 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed">
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default About;
