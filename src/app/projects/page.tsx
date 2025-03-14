'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { ProjectCard } from '@/components/projects/project-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, Github, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: "Snapgram",
    description: "A fast, interactive social platform for sharing photos, videos, and stories in real-time.",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/Amitkumarsatapathy645",
    liveUrl: "https://snapbook-bay.vercel.app/",
    imageUrl: "/images/project1.png",
  },
  {
    title: "Job Portal",
    description: "JOBX – A fast, intuitive job portal with seamless applications and advanced filtering.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary", "Framer Motion"],
    githubUrl: "https://github.com/Amitkumarsatapathy645",
    liveUrl: "",
    imageUrl: "/images/project2.png",
  },
  {
    title: "CustomTee",
    description: "CustomTee – A 3D T-shirt design app for creating personalized styles with Three.js and Vite.",
    technologies: ["Three.js", "Vite", "React", "Tailwind CSS", "Node.js & Express"],
    githubUrl: "https://github.com/Amitkumarsatapathy645",
    liveUrl: "",
    imageUrl: "/images/project3.jpg",
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Get all unique technologies
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => project.technologies)
    )
  ).sort();

  // Filter projects based on technology filter and search query
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = projects.filter((project) => {
        const matchesTech = !activeFilter || 
          project.technologies.includes(activeFilter);
          
        const matchesSearch = !searchQuery || 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.technologies.some(tech => 
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
        return matchesTech && matchesSearch;
      });
      
      setVisibleProjects(filtered);
      setIsLoading(false);
    }, 400);
  }, [activeFilter, searchQuery]);
  
  // Reset project selection when filters change
  useEffect(() => {
    setSelectedProject(null);
  }, [activeFilter, searchQuery]);

  // Handle tech badge click
  const handleTechClick = (tech: string) => {
    setActiveFilter(prev => prev === tech ? null : tech);
  };
  
  // Handle project click to show details
  const handleProjectClick = (project: Project) => {
    setSelectedProject(prev => prev?.title === project.title ? null : project);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dark hero section with stark typography */}
      <section className="relative bg-black py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-900/20" />
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div 
                key={i}
                className="border-r border-b border-white/5"
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
              <span className="inline-block relative">
                <span className="relative z-10">Projects</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-500 opacity-70 rounded"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Exceptional software solutions built with precision and purpose
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main content area */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          {/* Filter controls */}
          <div className="mb-16 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white h-12 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map(tech => (
                <Badge
                  key={tech}
                  variant="outline"
                  className={cn(
                    "cursor-pointer py-2 px-3 rounded-full border transition-all duration-300",
                    activeFilter === tech 
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-transparent border-gray-700 text-gray-300 hover:border-blue-400"
                  )}
                  onClick={() => handleTechClick(tech)}
                >
                  {tech}
                </Badge>
              ))}
              {activeFilter && (
                <Badge
                  variant="outline"
                  className="cursor-pointer py-2 px-3 rounded-full bg-gray-800 border-gray-700 text-gray-300 hover:border-red-400"
                  onClick={() => setActiveFilter(null)}
                >
                  Clear filter
                </Badge>
              )}
            </div>
          </div>
          
          {/* Projects grid/detail view with toggleable states */}
          <div className="relative min-h-[500px]">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden">
                    <Skeleton className="h-64 w-full bg-gray-700/50" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-8 w-3/4 bg-gray-700/50" />
                      <Skeleton className="h-4 w-full bg-gray-700/50" />
                      <Skeleton className="h-4 w-2/3 bg-gray-700/50" />
                      <div className="flex gap-2 mt-4">
                        <Skeleton className="h-8 w-24 bg-gray-700/50 rounded-full" />
                        <Skeleton className="h-8 w-24 bg-gray-700/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {visibleProjects.length > 0 ? (
                  <motion.div 
                    layout 
                    className={cn(
                      "grid gap-8 transition-all duration-500",
                      selectedProject 
                        ? "grid-cols-1" 
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    )}
                  >
                    {/* Grid view or detail view based on selection */}
                    {selectedProject ? (
                      <ProjectDetail 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                      />
                    ) : (
                      visibleProjects.map((project, index) => (
                        <motion.div
                          key={project.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          whileHover={{ y: -8 }}
                          onClick={() => handleProjectClick(project)}
                          className="cursor-pointer group"
                        >
                          <div className="h-full bg-gray-800/40 border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                            <div className="relative h-56 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                              <div 
                                className="h-full w-full bg-cover bg-center transform transition-all duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${project.imageUrl})` }}
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                              </div>
                            </div>
                            <div className="p-6">
                              <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {project.technologies.slice(0, 3).map(tech => (
                                  <Badge key={tech} className="bg-gray-700 text-gray-200 hover:bg-gray-600">
                                    {tech}
                                  </Badge>
                                ))}
                                {project.technologies.length > 3 && (
                                  <Badge className="bg-gray-700 text-gray-200">
                                    +{project.technologies.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 border border-gray-800 rounded-lg bg-gray-900/50">
                    <Code size={48} className="text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
                    <p className="text-gray-400 mb-6 text-center max-w-md">
                      No projects match your current filter criteria. Try adjusting your search or filters.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
                      onClick={() => {
                        setActiveFilter(null);
                        setSearchQuery("");
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Detailed project view component
function ProjectDetail({ project, onClose }: { project: Project, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full bg-gray-800/40 border border-gray-700 rounded-lg overflow-hidden"
    >
      <div className="relative h-80 md:h-96 w-full">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <Button 
          variant="outline" 
          size="sm"
          className="absolute top-4 right-4 bg-black/50 border-gray-600 hover:bg-black/80 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Back to all projects
        </Button>
      </div>
      
      <div className="p-8 relative -mt-20 z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
          <p className="text-gray-300 text-lg mb-8">{project.description}</p>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <Badge key={tech} className="bg-blue-900/50 border border-blue-700 text-blue-200 py-1.5 px-3">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              disabled={!project.liveUrl}
            >
              <ExternalLink size={16} />
              {project.liveUrl ? "View Live Demo" : "Demo Coming Soon"}
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-600 hover:border-gray-500 text-gray-200 flex items-center gap-2"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github size={16} />
                View Source Code
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}