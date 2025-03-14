'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { FaReact, FaNodeJs, FaGit, FaDocker, FaAws, FaFigma, FaDatabase } from 'react-icons/fa'
import { IoLogoJavascript, IoLogoCss3 } from 'react-icons/io'
import { SiNextdotjs, SiGraphql, SiRedux, SiFirebase, SiApachekafka } from 'react-icons/si'
import { SiDjango } from "react-icons/si"
import { FaGolang } from "react-icons/fa6"
import { TbBrandOauth } from "react-icons/tb"
import { MdReportProblem } from "react-icons/md"
import { MdLeaderboard } from "react-icons/md"
import { RiUserCommunityFill } from "react-icons/ri"
import { GiHeavyCollar } from "react-icons/gi"
import { IoTimer } from "react-icons/io5"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Skill {
  name: string;
  icon: React.ReactNode;
  proficiency: number;
  experience: string;
}

interface SkillGroup {
  category: string;
  items: Skill[];
}

const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <FaReact />, proficiency: 90, experience: "3+ years" },
      { name: "Next.js", icon: <SiNextdotjs />, proficiency: 85, experience: "2+ years" },
      { name: "TypeScript", icon: <IoLogoJavascript />, proficiency: 80, experience: "2+ years" },
      { name: "Tailwind CSS", icon: <IoLogoCss3 />, proficiency: 90, experience: "3+ years" },
      { name: "JavaScript (ES6+)", icon: <IoLogoJavascript />, proficiency: 95, experience: "3+ years" },
      { name: "Framer Motion", icon: <FaReact />, proficiency: 75, experience: "1+ years" },
      { name: "State Management", icon: <SiRedux />, proficiency: 85, experience: "2+ years" },
      { name: "GraphQL", icon: <SiGraphql />, proficiency: 70, experience: "1+ years" },
      { name: "HTML5", icon: <IoLogoCss3 />, proficiency: 95, experience: "3+ years" },
      { name: "CSS3", icon: <IoLogoCss3 />, proficiency: 90, experience: "3+ years" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <FaNodeJs />, proficiency: 85, experience: "3+ years" },
      { name: "Express.js", icon: <FaNodeJs />, proficiency: 80, experience: "2+ years" },
      { name: "Go (Golang)", icon: <FaGolang />, proficiency: 75, experience: "1+ years" },
      { name: "Django", icon: <SiDjango />, proficiency: 70, experience: "1+ years" },
      { name: "RESTful APIs", icon: <FaNodeJs />, proficiency: 90, experience: "3+ years" },
      { name: "Redis", icon: <FaDatabase />, proficiency: 65, experience: "1+ years" },
      { name: "Auth (JWT, OAuth)", icon: <TbBrandOauth />, proficiency: 80, experience: "2+ years" },
      { name: "WebSockets", icon: <FaNodeJs />, proficiency: 70, experience: "1+ years" },
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", icon: <FaGit />, proficiency: 90, experience: "3+ years" },
      { name: "Docker", icon: <FaDocker />, proficiency: 75, experience: "2+ years" },
      { name: "AWS", icon: <FaAws />, proficiency: 70, experience: "1+ years" },
      { name: "Firebase", icon: <SiFirebase />, proficiency: 80, experience: "2+ years" },
      { name: "Postman", icon: <FaNodeJs />, proficiency: 85, experience: "2+ years" },
      { name: "VS Code", icon: <FaNodeJs />, proficiency: 95, experience: "3+ years" },
      { name: "Cloudinary", icon: <FaNodeJs />, proficiency: 75, experience: "1+ years" },
      { name: "MongoDB Atlas", icon: <FaDatabase />, proficiency: 80, experience: "2+ years" },
      { name: "Figma", icon: <FaFigma />, proficiency: 70, experience: "1+ years" },
      { name: "Apache Kafka", icon: <SiApachekafka />, proficiency: 65, experience: "1+ years" },
    ]
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Problem Solving", icon: <MdReportProblem />, proficiency: 90, experience: "3+ years" },
      { name: "Team Leadership", icon: <MdLeaderboard />, proficiency: 85, experience: "2+ years" },
      { name: "Communication", icon: <RiUserCommunityFill />, proficiency: 90, experience: "3+ years" },
      { name: "Agile", icon: <FaNodeJs />, proficiency: 80, experience: "2+ years" },
      { name: "Collaboration", icon: <GiHeavyCollar />, proficiency: 90, experience: "3+ years" },
      { name: "Time Management", icon: <IoTimer />, proficiency: 85, experience: "3+ years" },
    ]
  }
]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend")
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }
  
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
  }

  // Function to determine badge color based on proficiency
  const getProficiencyLabel = (value: number) => {
    if (value >= 90) return { label: 'Expert', color: 'bg-green-500/20 text-green-600' };
    if (value >= 80) return { label: 'Advanced', color: 'bg-blue-500/20 text-blue-600' };
    if (value >= 60) return { label: 'Intermediate', color: 'bg-yellow-500/20 text-yellow-600' };
    return { label: 'Beginner', color: 'bg-gray-500/20 text-gray-600' };
  };

  return (
    <div className="space-y-6" aria-label="Skills and expertise of Amit Kumar Satapathy">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {skills.map((skillGroup) => (
          <Badge
            key={skillGroup.category}
            variant={activeCategory === skillGroup.category ? "default" : "outline"}
            className="text-md px-4 py-1.5 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveCategory(skillGroup.category)}
          >
            {skillGroup.category}
          </Badge>
        ))}
      </div>

      {skills.map((skillGroup) => (
        skillGroup.category === activeCategory && (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-accent/20 shadow-lg">
              <CardContent className="p-6">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {skillGroup.items.map((skill) => {
                    const proficiencyInfo = getProficiencyLabel(skill.proficiency);
                    
                    return (
                      <motion.div 
                        key={skill.name}
                        variants={item}
                        whileHover={{ scale: 1.03 }}
                        className="relative"
                      >
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="p-4 rounded-lg bg-accent/10 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300 cursor-pointer h-full">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-primary text-xl">{skill.icon}</span>
                                <span className="font-medium">{skill.name}</span>
                              </div>
                              <Progress value={skill.proficiency} className="h-1.5" />
                              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                <span>Proficiency</span>
                                <span>{skill.proficiency}%</span>
                              </div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-72 p-4 z-50">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="text-primary text-xl">{skill.icon}</span>
                                <h4 className="text-lg font-semibold">{skill.name}</h4>
                              </div>
                              
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Proficiency</span>
                                  <span className="text-sm">{skill.proficiency}%</span>
                                </div>
                                <Progress value={skill.proficiency} className="h-2" />
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Experience</span>
                                <span className="text-sm">{skill.experience}</span>
                              </div>
                              
                              <div className="pt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${proficiencyInfo.color}`}>
                                  {proficiencyInfo.label}
                                </span>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )
      ))}
    </div>
  )
}