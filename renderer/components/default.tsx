// "use client";

// import {
//   FileIcon,
//   FolderIcon,
//   GitBranchIcon,
//   PlayIcon,
//   LinkIcon,
//   UsersIcon,
//   HistoryIcon,
//   Settings2Icon,
//   GlobeIcon,
//   BookOpenIcon,
// } from "lucide-react";
// import { useState } from "react";

// interface MenuItem {
//   icon: React.ReactNode;
//   text: string;
//   path?: string;
//   description?: string;
// }

// interface RecentItem {
//   name: string;
//   path: string;
//   lastOpened: string;
//   collaborators?: number;
// }

// interface WelcomePageProps {
//   onClose: () => void;
// }

// export default function WelcomePage({ onClose }: WelcomePageProps) {
//   const [showOnStartup, setShowOnStartup] = useState(true);
//   const [recentProjects, setRecentProjects] = useState<RecentItem[]>([
//     {
//       name: "frontend-project",
//       path: "/workspace/frontend",
//       lastOpened: "2 hours ago",
//       collaborators: 3,
//     },
//     {
//       name: "api-service",
//       path: "/workspace/backend",
//       lastOpened: "yesterday",
//       collaborators: 2,
//     },
//   ]);

//   const startMenuItems: MenuItem[] = [
//     {
//       icon: <FileIcon className='w-4 h-4' />,
//       text: "New File...",
//       description: "Create a new file in the workspace",
//     },
//     {
//       icon: <FileIcon className='w-4 h-4' />,
//       text: "Open File...",
//       description: "Open a local file in the workspace",
//     },
//     {
//       icon: <FolderIcon className='w-4 h-4' />,
//       text: "Open Folder...",
//       description: "Open a local folder in the workspace",
//     },
//   ];

//   const quickActions: MenuItem[] = [
//     {
//       icon: <UsersIcon className='w-4 h-4' />,
//       text: "Start Collaboration Session",
//       description: "Invite others to code with you in real-time",
//     },
//     {
//       icon: <LinkIcon className='w-4 h-4' />,
//       text: "Join Session",
//       description: "Join an existing collaboration session",
//     },
//   ];

//   const learnItems: MenuItem[] = [
//     {
//       icon: <BookOpenIcon className='w-4 h-4' />,
//       text: "Documentation",
//       description: "Learn how to use Code Collab",
//     },
//     {
//       icon: <PlayIcon className='w-4 h-4' />,
//       text: "Interactive Tutorial",
//       description: "Get started with a guided tutorial",
//     },
//   ];

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setShowOnStartup(e.target.checked);
//     if (!e.target.checked) {
//       localStorage.setItem("hideWelcomePage", "true");
//     } else {
//       localStorage.removeItem("hideWelcomePage");
//     }
//   };

//   const handleItemClick = () => {
//     onClose();
//   };

//   return (
//     <div className=' min-h-screen bg-[#1e1e1e] text-gray-300 p-8'>
//       <div className='max-w-6xl mx-auto'>
//         <h1 className='text-4xl font-light mb-2 text-white'>Code Collab</h1>
//         <h2 className='text-xl font-light mb-8 text-gray-400'>
//           Editing evolved
//         </h2>

//         <div className='flex flex-col gap-8 justify-center'>
//           {/* Start Section */}
//           <div className='flex gap-x-4 justify-around items-start'>
//             <div className='flex flex-col gap-y-2'>
//               <h3 className='text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider'>
//                 Start
//               </h3>
//               <div className='space-y-2'>
//                 {startMenuItems.map((item, index) => (
//                   <button
//                     key={index}
//                     className='flex items-center space-x-3 w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors group'
//                     onClick={handleItemClick}
//                   >
//                     <div className='text-[#0098ff]'>{item.icon}</div>
//                     <div className='flex flex-col items-start'>
//                       <span className='text-[#0098ff] text-sm  '>
//                         {item.text}
//                       </span>
//                       <span className='text-xs text-gray-500'>
//                         {item.description}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {/* Recent Section */}
//             <div className='flex flex-col gap-y-2'>
//               <h3 className='text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider'>
//                 Recent
//               </h3>
//               <div className='space-y-2 mb-8'>
//                 {recentProjects.map((project, index) => (
//                   <button
//                     key={index}
//                     className='flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors'
//                     onClick={handleItemClick}
//                   >
//                     <div className='flex items-center space-x-3'>
//                       <FolderIcon className='w-4 h-4 text-blue-400' />
//                       <div className='flex flex-col items-start'>
//                         <span className='text-sm text-gray-300'>
//                           {project.name}
//                         </span>
//                         <span className='text-xs text-gray-500'>
//                           {project.path}
//                         </span>
//                       </div>
//                     </div>
//                     <div className='flex items-center space-x-2'>
//                       {project.collaborators && (
//                         <div className='flex items-center space-x-1 text-xs text-gray-500'>
//                           <UsersIcon className='w-3 h-3' />
//                           <span>{project.collaborators}</span>
//                         </div>
//                       )}
//                       <span className='text-xs text-gray-500'>
//                         {project.lastOpened}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className='flex gap-x-4 justify-around items-start'>
//             {/* Quick Actions */}
//             <div className='flex flex-col gap-y-2'>
//               <h3 className='text-sm font-medium mb-4 mt-8 text-gray-400 uppercase tracking-wider'>
//                 Quick Actions
//               </h3>
//               <div className='space-y-2'>
//                 {quickActions.map((item, index) => (
//                   <button
//                     key={index}
//                     className='flex items-center space-x-3 w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors group'
//                     onClick={handleItemClick}
//                   >
//                     <div className='text-emerald-500'>{item.icon}</div>
//                     <div className='flex flex-col items-start'>
//                       <span className='text-emerald-500 text-sm  '>
//                         {item.text}
//                       </span>
//                       <span className='text-xs text-gray-500'>
//                         {item.description}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Learn Section */}
//             <div className='flex flex-col gap-y-2'>
//               <h3 className='text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider'>
//                 Learn
//               </h3>

//               <div className='space-y-2'>
//                 {learnItems.map((item, index) => (
//                   <button
//                     key={index}
//                     className='flex items-center space-x-3 w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors group'
//                     onClick={handleItemClick}
//                   >
//                     <div className='text-purple-400'>{item.icon}</div>
//                     <div className='flex flex-col items-start'>
//                       <span className='text-purple-400 text-sm  '>
//                         {item.text}
//                       </span>
//                       <span className='text-xs text-gray-500'>
//                         {item.description}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import {
  FileIcon,
  FolderIcon,
  GitBranchIcon,
  PlayIcon,
  LinkIcon,
  UsersIcon,
  HistoryIcon,
  Settings2Icon,
  GlobeIcon,
  BookOpenIcon,
} from "lucide-react"
import { useState } from "react"

interface MenuItem {
  icon: React.ReactNode
  text: string
  path?: string
  description?: string
}

interface RecentItem {
  name: string
  path: string
  lastOpened: string
  collaborators?: number
}

interface WelcomePageProps {
  onClose: () => void
}

export default function WelcomePage({ onClose }: WelcomePageProps) {
  const [recentProjects, setRecentProjects] = useState<RecentItem[]>([
    {
      name: "frontend-project",
      path: "/workspace/frontend",
      lastOpened: "2 hours ago",
      collaborators: 3,
    },
    {
      name: "api-service",
      path: "/workspace/backend",
      lastOpened: "yesterday",
      collaborators: 2,
    },
  ])

  const startMenuItems: MenuItem[] = [
    {
      icon: <FileIcon className="w-4 h-4" />,
      text: "New File...",
      description: "Create a new file in the workspace",
    },
    {
        icon: <FileIcon className="w-4 h-4" />,
        text: "Open File...",
        description: "Open a local file in the workspace",
      },
    {
      icon: <FolderIcon className="w-4 h-4" />,
      text: "Open Folder...",
      description: "Open a local folder in the workspace",
    },
  ]

  const quickActions: MenuItem[] = [
    {
      icon: <UsersIcon className="w-4 h-4" />,
      text: "Start Collaboration Session",
      description: "Invite others to code with you in real-time",
    },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      text: "Join Session",
      description: "Join an existing collaboration session",
    },
  ]

  const learnItems: MenuItem[] = [
    {
      icon: <BookOpenIcon className="w-4 h-4" />,
      text: "Documentation",
      description: "Learn how to use Code Collab",
    },
    {
      icon: <PlayIcon className="w-4 h-4" />,
      text: "Interactive Tutorial",
      description: "Get started with a guided tutorial",
    },
  ]

  const handleItemClick = () => {
    onClose()
  }

  return (
    <div className=" min-h-screen bg-[#1e1e1e] text-gray-300 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-2 text-white">Code Collab</h1>
        <h2 className="text-xl font-light mb-8 text-gray-400">Editing evolved</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Start Section */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider">Start</h3>
            <div className="space-y-2">
              {startMenuItems.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors group"
                  onClick={handleItemClick}
                >
                  <div className="text-[#0098ff]">{item.icon}</div>
                  <div className="flex flex-col items-start">
                    <span className="text-[#0098ff] text-sm  ">{item.text}</span>
                    <span className="text-xs text-gray-500">{item.description}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <h3 className="text-sm font-medium mb-4 mt-8 text-gray-400 uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors group"
                  onClick={handleItemClick}
                >
                  <div className="text-emerald-500">{item.icon}</div>
                  <div className="flex flex-col items-start">
                    <span className="text-emerald-500 text-sm  ">{item.text}</span>
                    <span className="text-xs text-gray-500">{item.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent & Learn Section */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider">Recent</h3>
            <div className="space-y-2 mb-8">
              {recentProjects.map((project, index) => (
                <button
                  key={index}
                  className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                  onClick={handleItemClick}
                >
                  <div className="flex items-center space-x-3">
                    <FolderIcon className="w-4 h-4 text-blue-400" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-gray-300">{project.name}</span>
                      <span className="text-xs text-gray-500">{project.path}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.collaborators && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <UsersIcon className="w-3 h-3" />
                        <span>{project.collaborators}</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-500">{project.lastOpened}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Learn Section */}
            <h3 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider">Learn</h3>
            <div className="space-y-2">
              {learnItems.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors group"
                  onClick={handleItemClick}
                >
                  <div className="text-purple-400">{item.icon}</div>
                  <div className="flex flex-col items-start">
                    <span className="text-purple-400 text-sm  ">{item.text}</span>
                    <span className="text-xs text-gray-500">{item.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>        
      </div>
    </div>
  )
}

