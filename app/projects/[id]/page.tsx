/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetSingleProjectQuery } from "@/redux/api/projectApi";
import LoadingSpinner from "@/components/shared/loading";
// import NavBar from "@/components/shared/NavBar";

import {
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
  IconCalendar,
  IconCode,
  IconEye,
} from "@tabler/icons-react";
import { getTechStackIcons } from "@/utils/techStackMatcher";
import NavBar from "@/components/shared/Navbar";

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params.id as string;

  const {
    data: projectData,
    isLoading,
    error,
    isFetching,
  } = useGetSingleProjectQuery(projectId, {
    skip: !projectId,
  });

  //   console.log("Project ID:", projectId);
  //   console.log("Is Loading:", isLoading);
  //   console.log("Is Fetching:", isFetching);
  //   console.log("API Response:", projectData);
  //   console.log("API Error:", error);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("API Error:", error);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Error Loading Project
          </h1>
          <p className="text-gray-300 mb-4">
            There was an error loading the project details.
          </p>
          <Link
            href="/projects"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const project = projectData?.data || projectData;

  console.log(projectId, project);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link
            href="/projects"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />

      <div className="pt-20 pb-12">
        {isLoading && <LoadingSpinner />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <IconArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Hero Section */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Project Image */}
                <div className="lg:w-1/2">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-700">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IconCode className="w-24 h-24 text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === "Live"
                            ? "bg-green-600/20 text-green-400"
                            : project.status === "In Development"
                              ? "bg-yellow-600/20 text-yellow-400"
                              : "bg-gray-600/20 text-gray-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <IconEye className="w-5 h-5 mr-2" />
                        View Live
                        <IconExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}
                    {project.githubClient && (
                      <a
                        href={project.githubClient}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                      >
                        <IconBrandGithub className="w-5 h-5 mr-2" />
                        Frontend
                      </a>
                    )}
                    {project.githubServer && (
                      <a
                        href={project.githubServer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                      >
                        <IconBrandGithub className="w-5 h-5 mr-2" />
                        Backend
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  About This Project
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden bg-gray-700"
                      >
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technologies */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {getTechStackIcons(project.technologies).map(
                    (tech, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center w-12 h-12 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors group"
                        title={tech.name}
                      >
                        <img
                          src={tech.iconURL}
                          alt={tech.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    ),
                  )}
                  {/* Show technologies without icons as plain text */}
                  {(project.technologies as string[])
                    .filter((tech: string) => !getTechStackIcons([tech]).length)
                    .map((tech: string, index: number) => (
                      <span
                        key={`text-${index}`}
                        className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <IconCalendar className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-sm">
                      Created:{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <IconCalendar className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-sm">
                      Updated:{" "}
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
