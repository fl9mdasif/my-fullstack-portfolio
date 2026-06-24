// /* eslint-disable @next/next/no-img-element */
// "use client";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { useGetSingleProjectQuery } from "@/redux/api/projectApi";
// import LoadingSpinner from "@/components/shared/loading";

// import {
//   IconArrowLeft,
//   IconExternalLink,
//   IconBrandGithub,
//   IconCalendar,
//   IconCode,
//   IconEye,
// } from "@tabler/icons-react";
// import { getTechStackIcons, cleanDescription } from "@/utils/techStackMatcher";
// import NavBar from "@/components/shared/Navbar";

// const ProjectDetails = () => {
//   const params = useParams();
//   const projectId = params.id as string;

//   const {
//     data: projectData,
//     isLoading,
//     error,
//     isFetching,
//   } = useGetSingleProjectQuery(projectId, {
//     skip: !projectId,
//   });

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     console.error("API Error:", error);
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-red-400 mb-4">
//             Error Loading Project
//           </h1>
//           <p className="text-gray-300 mb-4">
//             There was an error loading the project details.
//           </p>
//           <Link
//             href="/projects"
//             className="text-blue-400 hover:text-blue-300 transition-colors"
//           >
//             ← Back to Projects
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const project = projectData?.data || projectData;

//   // console.log(projectId, project);

//   if (!project) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-white mb-4">
//             Project Not Found
//           </h1>
//           <Link
//             href="/projects"
//             className="text-blue-400 hover:text-blue-300 transition-colors"
//           >
//             ← Back to Projects
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <NavBar />

//       <div className="pt-20 pb-12">
//         {isLoading && <LoadingSpinner />}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Button */}
//           <Link
//             href="/projects"
//             className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
//           >
//             <IconArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
//             Back to Projects
//           </Link>

//           {/* Hero Section */}
//           <div className="relative mb-12">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
//             <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12">
//               <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Project Image */}
//                 <div className="lg:w-1/2">
//                   <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-700">
//                     {project.image ? (
//                       <img
//                         src={project.image}
//                         alt={project.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <IconCode className="w-24 h-24 text-gray-500" />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Project Info */}
//                 <div className="lg:w-1/2 space-y-6">
//                   <div>
//                     <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                       {project.title}
//                     </h1>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
//                         {project.category}
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           project.status === "Live"
//                             ? "bg-green-600/20 text-green-400"
//                             : project.status === "In Development"
//                               ? "bg-yellow-600/20 text-yellow-400"
//                               : "bg-gray-600/20 text-gray-400"
//                         }`}
//                       >
//                         {project.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex flex-wrap gap-4">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//                       >
//                         <IconEye className="w-5 h-5 mr-2" />
//                         View Live
//                         <IconExternalLink className="w-4 h-4 ml-2" />
//                       </a>
//                     )}
//                     {project.githubClient && (
//                       <a
//                         href={project.githubClient}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
//                       >
//                         <IconBrandGithub className="w-5 h-5 mr-2" />
//                         Frontend
//                         <IconCode className="w-4 h-4 ml-2" />
//                       </a>
//                     )}
//                     {project.githubServer && (
//                       <a
//                         href={project.githubServer}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
//                       >
//                         <IconBrandGithub className="w-5 h-5 mr-2" />
//                         Backend
//                         <IconCode className="w-4 h-4 ml-2" />
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* Description */}
//               <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                 <h2 className="text-2xl font-bold text-white mb-4">
//                   About This Project
//                 </h2>
//                 <p className="text-gray-300 leading-relaxed">
//                   {cleanDescription(project.description)}
//                 </p>
//               </div>

//               {/* Gallery */}
//               {project.gallery && project.gallery.length > 0 && (
//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                   <h2 className="text-2xl font-bold text-white mb-4">
//                     Gallery
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {project.gallery.map((image: string, index: number) => (
//                       <div
//                         key={index}
//                         className="relative aspect-video rounded-lg overflow-hidden bg-gray-700"
//                       >
//                         <img
//                           src={image}
//                           alt={`${project.title} screenshot ${index + 1}`}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* Technologies */}
//               <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   Technologies Used
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {getTechStackIcons(project.technologies).map(
//                     (tech, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-center w-12 h-12 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors group"
//                         title={tech.name}
//                       >
//                         <img
//                           src={tech.iconURL}
//                           alt={tech.name}
//                           className="w-8 h-8 object-contain"
//                         />
//                       </div>
//                     ),
//                   )}
//                   {/* Show technologies without icons as plain text */}
//                   {(project.technologies as string[])
//                     .filter((tech: string) => !getTechStackIcons([tech]).length)
//                     .map((tech: string, index: number) => (
//                       <span
//                         key={`text-${index}`}
//                         className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                 </div>
//               </div>

//               {/* Project Details */}
//               <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   Project Details
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center text-gray-300">
//                     <IconCalendar className="w-5 h-5 mr-3 text-gray-500" />
//                     <span className="text-sm">
//                       Created:{" "}
//                       {new Date(project.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-gray-300">
//                     <IconCalendar className="w-5 h-5 mr-3 text-gray-500" />
//                     <span className="text-sm">
//                       Updated:{" "}
//                       {new Date(project.updatedAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;

/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetSingleProjectQuery } from "@/redux/api/projectApi";
import {
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
  IconCalendar,
  IconCode,
  IconEye,
} from "@tabler/icons-react";
import { getTechStackIcons, cleanDescription } from "@/utils/techStackMatcher";
import NavBar from "@/components/shared/Navbar";

// ─── Skeleton Components ───────────────────────────────────────────────────────

const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-white/5 rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
  />
);

const ProjectDetailsSkeleton = () => (
  <div className="min-h-screen bg-[#0d0d14]">
    <NavBar />
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Shimmer className="h-5 w-32 mb-10 rounded-full" />

        {/* Hero Card */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 md:p-12 mb-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image */}
            <div className="lg:w-1/2">
              <Shimmer className="w-full aspect-video rounded-xl" />
            </div>
            {/* Info */}
            <div className="lg:w-1/2 space-y-5">
              <Shimmer className="h-10 w-3/4 rounded-lg" />
              <div className="flex gap-2">
                <Shimmer className="h-6 w-20 rounded-full" />
                <Shimmer className="h-6 w-24 rounded-full" />
              </div>
              <Shimmer className="h-4 w-full rounded" />
              <Shimmer className="h-4 w-5/6 rounded" />
              <Shimmer className="h-4 w-4/6 rounded" />
              <div className="flex gap-3 pt-2">
                <Shimmer className="h-11 w-32 rounded-lg" />
                <Shimmer className="h-11 w-32 rounded-lg" />
                <Shimmer className="h-11 w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 space-y-3">
              <Shimmer className="h-7 w-48 rounded" />
              <Shimmer className="h-4 w-full rounded" />
              <Shimmer className="h-4 w-full rounded" />
              <Shimmer className="h-4 w-5/6 rounded" />
              <Shimmer className="h-4 w-4/6 rounded" />
            </div>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
              <Shimmer className="h-7 w-32 rounded mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <Shimmer className="aspect-video rounded-lg" />
                <Shimmer className="aspect-video rounded-lg" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
              <Shimmer className="h-6 w-40 rounded mb-4" />
              <div className="flex flex-wrap gap-3">
                {[...Array(8)].map((_, i) => (
                  <Shimmer key={i} className="w-12 h-12 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 space-y-3">
              <Shimmer className="h-6 w-36 rounded mb-2" />
              <Shimmer className="h-4 w-48 rounded" />
              <Shimmer className="h-4 w-48 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params.id as string;

  const { data: projectData, isLoading, error } = useGetSingleProjectQuery(
    projectId,
    { skip: !projectId }
  );

  if (isLoading) return <ProjectDetailsSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center">
        <NavBar />
        <div className="text-center space-y-4">
          <p className="text-5xl">⚠️</p>
          <h1 className="text-3xl font-bold text-white">Failed to load project</h1>
          <p className="text-white/50 text-sm">Something went wrong fetching the data.</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm mt-2"
          >
            <IconArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const project = projectData?.data || projectData;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center">
        <NavBar />
        <div className="text-center space-y-4">
          <p className="text-5xl">🔍</p>
          <h1 className="text-3xl font-bold text-white">Project not found</h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
          >
            <IconArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const techWithIcons = getTechStackIcons(project.technologies);
  const techWithoutIcons = (project.technologies as string[]).filter(
    (t: string) => !getTechStackIcons([t]).length
  );

  const statusStyle: Record<string, string> = {
    Live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "In Development": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    default: "bg-white/5 text-white/50 border-white/10",
  };

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">
      <NavBar />

      {/* Global shimmer keyframe — inject once */}
      <style>{`
        @keyframes shimmer { to { transform: translateX(200%); } }
      `}</style>

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Back ── */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 group text-sm font-medium"
          >
            <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </Link>

          {/* ── Hero Card ── */}
          <div className="relative mb-12 rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02]">
            {/* Subtle purple glow */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10">

                {/* Project Image */}
                <div className="lg:w-1/2">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/[0.06]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IconCode className="w-16 h-16 text-white/20" />
                      </div>
                    )}
                    {/* Live badge overlay */}
                    {project.status === "Live" && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-emerald-500/30 rounded-full px-2.5 py-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-emerald-400 text-xs font-medium">Live</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="lg:w-1/2 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {project.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          statusStyle[project.status] ?? statusStyle.default
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                      {project.title}
                    </h1>

                    {/* Short description */}
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-4">
                      {cleanDescription(project.description)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <IconEye className="w-4 h-4" />
                        Live Demo
                        <IconExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    )}
                    {project.githubClient && (
                      <a
                        href={project.githubClient}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <IconBrandGithub className="w-4 h-4" />
                        Frontend
                      </a>
                    )}
                    {project.githubServer && (
                      <a
                        href={project.githubServer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <IconBrandGithub className="w-4 h-4" />
                        Backend
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main */}
            <div className="lg:col-span-2 space-y-8">

              {/* About */}
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-7">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-purple-500 rounded-full inline-block" />
                  About This Project
                </h2>
                <p className="text-white/60 leading-relaxed text-sm">
                  {cleanDescription(project.description)}
                </p>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-7">
                  <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-purple-500 rounded-full inline-block" />
                    Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/[0.06] group"
                      >
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Tech Stack */}
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-5">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {techWithIcons.map((tech, index) => (
                    <div
                      key={index}
                      title={tech.name}
                      className="w-11 h-11 bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] rounded-xl flex items-center justify-center transition-colors cursor-default"
                    >
                      <img
                        src={tech.iconURL}
                        alt={tech.name}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  ))}
                  {techWithoutIcons.map((tech: string, index: number) => (
                    <span
                      key={`text-${index}`}
                      className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-white/60 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-5">
                  Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/50 text-sm">
                    <IconCalendar className="w-4 h-4 shrink-0 text-purple-400" />
                    <div>
                      <p className="text-white/30 text-xs mb-0.5">Created</p>
                      <p className="text-white/70">
                        {new Date(project.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/50 text-sm">
                    <IconCalendar className="w-4 h-4 shrink-0 text-purple-400" />
                    <div>
                      <p className="text-white/30 text-xs mb-0.5">Last Updated</p>
                      <p className="text-white/70">
                        {new Date(project.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links summary */}
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-5">
                  Links
                </h3>
                <div className="space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-white/60 hover:text-purple-300 transition-colors group"
                    >
                      <IconEye className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="truncate">{project.liveUrl}</span>
                      <IconExternalLink className="w-3 h-3 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {project.githubClient && (
                    <a
                      href={project.githubClient}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-white/60 hover:text-purple-300 transition-colors group"
                    >
                      <IconBrandGithub className="w-4 h-4 shrink-0" />
                      <span className="truncate">Frontend Repo</span>
                      <IconExternalLink className="w-3 h-3 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {project.githubServer && (
                    <a
                      href={project.githubServer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-white/60 hover:text-purple-300 transition-colors group"
                    >
                      <IconBrandGithub className="w-4 h-4 shrink-0" />
                      <span className="truncate">Backend Repo</span>
                      <IconExternalLink className="w-3 h-3 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
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
