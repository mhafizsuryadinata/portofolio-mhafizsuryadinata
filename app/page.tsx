import { prisma } from "@/lib/prisma";
import PortfolioClient from "@/components/PortfolioClient";
import {
  MOCK_PROFILE,
  MOCK_CONTACT,
  MOCK_EDUCATION,
  MOCK_SKILLS,
  MOCK_PROJECTS,
  MOCK_CERTIFICATES,
  MOCK_EXPERIENCE,
  MOCK_ACHIEVEMENTS,
  MOCK_GOALS,
} from "@/lib/mockData";

// Prevent static caching so it is dynamic and pulls latest changes from admin panel
export const revalidate = 0;

export default async function HomePage() {
  let profile: any = MOCK_PROFILE;
  let contact: any = MOCK_CONTACT;
  let education: any[] = MOCK_EDUCATION;
  let skills: any[] = MOCK_SKILLS;
  let projects: any[] = MOCK_PROJECTS;
  let certificates: any[] = MOCK_CERTIFICATES;
  let experience: any[] = MOCK_EXPERIENCE;
  let achievements: any[] = MOCK_ACHIEVEMENTS;
  let goals: any[] = MOCK_GOALS;

  try {
    const [
      dbProfile,
      dbContact,
      dbEducation,
      dbSkills,
      dbProjects,
      dbCertificates,
      dbExperience,
      dbAchievements,
      dbGoals,
    ] = await Promise.all([
      prisma.profile.findUnique({ where: { id: "profile" } }),
      prisma.contact.findUnique({ where: { id: "contact" } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.certificate.findMany({ orderBy: { order: "asc" } }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.achievement.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.goal.findMany({ orderBy: { targetYear: "asc" } }),
    ]);

    if (dbProfile) profile = dbProfile;
    if (dbContact) contact = dbContact;
    if (dbEducation && dbEducation.length > 0) education = dbEducation as any[];
    if (dbSkills && dbSkills.length > 0) skills = dbSkills as any[];
    if (dbProjects && dbProjects.length > 0) projects = dbProjects as any[];
    if (dbCertificates && dbCertificates.length > 0) certificates = dbCertificates as any[];
    if (dbExperience && dbExperience.length > 0) experience = dbExperience as any[];
    if (dbAchievements && dbAchievements.length > 0) achievements = dbAchievements as any[];
    if (dbGoals && dbGoals.length > 0) goals = dbGoals as any[];
  } catch (error) {
    console.warn(
      "Database connection failed or not yet migrated. Falling back to default mock data.",
      error
    );
  }

  return (
    <PortfolioClient
      profile={profile}
      contact={contact}
      education={education}
      skills={skills}
      projects={projects}
      certificates={certificates}
      experience={experience}
      achievements={achievements}
      goals={goals}
    />
  );
}
