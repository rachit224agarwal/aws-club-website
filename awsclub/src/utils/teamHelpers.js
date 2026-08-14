import {
  Award,
  Code,
  Briefcase,
  Users,
  Palette,
  Calendar,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const getCategoryIcon = (categoryTitle) => {
  const title = categoryTitle.toLowerCase();
  if (title.includes("leadership") || title.includes("president")) return Award;
  if (title.includes("technical")) return Code;
  if (title.includes("administration") || title.includes("admin")) return Briefcase;
  if (title.includes("creative") || title.includes("design")) return Palette;
  if (title.includes("events") || title.includes("finance")) return Calendar;
  if (title.includes("community")) return Users;
  if (title.includes("member")) return UserCheck;
  return ShieldCheck;
};

export const groupMembersByCategory = (membersList, isExecutive = false) => {
  const groups = [];
  const groupMap = new Map();

  membersList.forEach((member) => {
    let title = member.role || "Members";

    if (isExecutive) {
      if (member.department === "Leadership" || title === "President" || title === "Vice President") {
        title = "Leadership";
      } else if (member.department === "Creative") {
        title = "Creative Leads";
      } else if (member.department === "Community" || title.includes("Community")) {
        title = "Community Leads";
      } else if (title === "Member") {
        title = "Members";
      } else if (title.endsWith("Lead") && !title.endsWith("Leads")) {
        title = `${title}s`;
      }
    } else {
      if (title === "Associate Team Member") {
        title = "Associate Team Members";
      } else if (title.endsWith("Member") && !title.endsWith("Members")) {
        title = `${title}s`;
      } else if (title.endsWith("Lead") && !title.endsWith("Leads")) {
        title = `${title}s`;
      }
    }

    if (!groupMap.has(title)) {
      const newGroup = { title, members: [] };
      groups.push(newGroup);
      groupMap.set(title, newGroup);
    }
    groupMap.get(title).members.push(member);
  });

  return groups;
};
