'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { FaReact, FaNodeJs, FaGit, FaDocker, FaAws, FaFigma, FaDatabase } from 'react-icons/fa'
import { IoLogoJavascript, IoLogoCss3 } from 'react-icons/io'
import { SiNextdotjs, SiGraphql, SiRedux, SiFirebase, SiApachekafka } from 'react-icons/si'
import { SiDjango } from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { TbBrandOauth } from "react-icons/tb";
import { MdReportProblem } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { RiUserCommunityFill } from "react-icons/ri";
import { GiHeavyCollar } from "react-icons/gi";
import { IoTimer } from "react-icons/io5";
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroup {
  category: string;
  items: Skill[];
}

const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <IoLogoJavascript /> },
      { name: "Tailwind CSS", icon: <IoLogoCss3 /> },
      { name: "JavaScript (ES6+)", icon: <IoLogoJavascript /> },
      { name: "Framer Motion", icon: <FaReact /> },
      { name: "State Management (Redux, Context API)", icon: <SiRedux /> },
      { name: "GraphQL (for Data Fetching)", icon: <SiGraphql /> },
      { name: "HTML5", icon: <IoLogoCss3 /> },
      { name: "CSS3", icon: <IoLogoCss3 /> },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <FaNodeJs /> },
      { name: "Go (Golang)", icon: <FaGolang /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "RESTful API Development", icon: <FaNodeJs /> },
      { name: "Redis", icon: <FaDatabase /> },
      { name: "Authentication & Authorization (JWT, OAuth)", icon: <TbBrandOauth /> },
      { name: "WebSockets (Real-time Communication)", icon: <FaNodeJs /> },
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", icon: <FaGit /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "Postman (API Testing)", icon: <FaNodeJs /> },
      { name: "VS Code", icon: <FaNodeJs /> },
      { name: "Cloudinary (File Storage)", icon: <FaNodeJs /> },
      { name: "AWS (Lambda, S3, EC2)", icon: <FaAws /> },
      { name: "MongoDB Atlas", icon: <FaDatabase /> },
      { name: "Figma", icon: <FaFigma /> },
      { name: "Apache Kafka", icon: <SiApachekafka /> },
    ]
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Problem Solving", icon: <MdReportProblem /> },
      { name: "Team Leadership", icon: <MdLeaderboard /> },
      { name: "Communication", icon: <RiUserCommunityFill /> },
      { name: "Agile", icon: <FaNodeJs /> },
      { name: "Collaboration", icon: <GiHeavyCollar /> },
      { name: "Time Management", icon: <IoTimer /> },
    ]
  }
]

export function Skills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Skills and expertise of Amit Kumar Satapathy">
      {skills.map((skillGroup, groupIndex) => (
        <motion.div
          key={skillGroup.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, index) => (
                  <HoverCard key={skill.name}>
                    <HoverCardTrigger asChild>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 rounded-full bg-accent flex items-center gap-2 cursor-pointer"
                        role="button"
                        aria-label={`Skill: ${skill.name}`}
                      >
                        <span>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </motion.span>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p>Proficiency: Advanced | Years of Experience: 3+</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}