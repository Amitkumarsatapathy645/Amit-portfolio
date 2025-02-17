"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    title: "SDE Intern",
    company: "iServeu",
    period: "2024 - Present",
    description:
      "As a Full Stack Developer, I work with React, Next.js, Node.js, Go, PostgreSQL, and MongoDB, focusing on scalable fintech applications. I optimize performance with pprof, Grafana, and Prometheus for memory profiling and monitoring.",
  },
  {
    title: "Data Engineer",
    company: "DRDO",
    period: "may 2024 - july 2024",
    description:
      "Worked on lift-off detection of flight vehicles using Apache Kafka. My role involved designing a real-time data streaming system to process and analyze telemetry data for accurate launch event detection.",
  },
  {
    title: "Frontend Intern",
    company: "RadicaiAI",
    period: "june 2023 - september 2023",
    description:
      "At Radical AI, I worked on SEO optimization and API development. My role involved enhancing website visibility through technical SEO and optimizing APIs for better performance and scalability.",
  },
  {
    title: "Django Developer",
    company: "Suravi.io",
    period: "October 2023 - January 2024",
    description:
      "At Suravi.io, I worked as a Django Developer, focusing on backend development and API integration. My role involved building scalable web applications, optimizing database queries, and ensuring efficient data handling using Django, PostgreSQL, and REST APIs.",
  },
  // Add more experiences
];

export function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-accent" />

      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row gap-8 mb-8 relative ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1" />
          <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 mt-6" />
          <Card className="flex-1">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">{experience.title}</h3>
              <p className="text-muted-foreground">{experience.company}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {experience.period}
              </p>
              <p>{experience.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
