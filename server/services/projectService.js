import Project from "../models/Project.js";

// Seed baseline projects: 3 clean distinct projects (no duplicates)
export const seedProjects = [
  {
    title: "NEW SHIV JEWELLERS",
    summary:
      "Royal Indian Haute Joaillerie — Luxury jewelry showcase platform featuring high-definition product catalogs, refined aesthetics, smooth animations, and responsive craftsmanship.",
    stack: ["React.js", "Tailwind CSS", "JavaScript", "Vercel"],
    link: "https://jewllary-ten.vercel.app/",
    websiteUrl: "https://jewllary-ten.vercel.app/",
    image: "/projects/new-shiv-jewellers.png",
    featured: true,
    order: 1,
  },
  {
    title: "Real Estate Platform",
    summary:
      "Full-stack MERN real estate platform with dynamic property listings, integrated administrative panel, custom filters, lead collection, and client management workflows.",
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    link: "https://dynamicrealestateweb.vercel.app/",
    websiteUrl: "https://dynamicrealestateweb.vercel.app/",
    image: "/projects/real-estate.png",
    featured: true,
    order: 2,
  },
  {
    title: "E-Commerce Platform",
    summary:
      "High-speed headless commerce engine with dynamic product catalog, persistent shopping cart, and administrative inventory controls.",
    stack: ["React.js", "Tailwind CSS", "Node.js", "Netlify"],
    link: "https://relaymart.netlify.app/",
    websiteUrl: "https://relaymart.netlify.app/",
    image: "/projects/relaymart.png",
    featured: true,
    order: 3,
  },
];

export const getAllProjectsService = async () => {
  try {
    let projects = await Project.find().sort({ order: 1, createdAt: -1 });
    if (!projects || projects.length === 0) {
      await Project.insertMany(seedProjects).catch(() => {});
      return seedProjects;
    }

    // Deduplicate and ensure exactly the 3 distinct projects
    const result = [];

    // 1. Jewellers
    const jewel = projects.find((p) => /jewel|shiv/i.test(p.title)) || seedProjects[0];
    result.push({
      ...jewel.toObject ? jewel.toObject() : jewel,
      title: "NEW SHIV JEWELLERS",
      image: "/projects/new-shiv-jewellers.png",
      link: "https://jewllary-ten.vercel.app/",
      websiteUrl: "https://jewllary-ten.vercel.app/",
      order: 1,
    });

    // 2. Real Estate Platform (remove dynamic duplicate)
    const realEstate = projects.find((p) => /real.*estate/i.test(p.title)) || seedProjects[1];
    result.push({
      ...realEstate.toObject ? realEstate.toObject() : realEstate,
      title: "Real Estate Platform",
      image: "/projects/real-estate.png",
      link: "https://dynamicrealestateweb.vercel.app/",
      websiteUrl: "https://dynamicrealestateweb.vercel.app/",
      order: 2,
    });

    // 3. E-Commerce Platform (remove relaymart duplicate)
    const ecommerce = projects.find((p) => /e-?commerce|relay/i.test(p.title)) || seedProjects[2];
    result.push({
      ...ecommerce.toObject ? ecommerce.toObject() : ecommerce,
      title: "E-Commerce Platform",
      image: "/projects/relaymart.png",
      link: "https://relaymart.netlify.app/",
      websiteUrl: "https://relaymart.netlify.app/",
      order: 3,
    });

    return result;
  } catch (error) {
    console.warn("[ProjectService] Database fetch error, returning seed projects:", error.message);
    return seedProjects;
  }
};

export const getProjectByIdService = async (id) => {
  try {
    return await Project.findById(id);
  } catch (error) {
    return seedProjects.find((p) => p._id === id || p.title === id) || null;
  }
};

export const createProjectService = async (data) => {
  return await Project.create(data);
};

export const updateProjectService = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteProjectService = async (id) => {
  return await Project.findByIdAndDelete(id);
};

export default {
  getAllProjectsService,
  getProjectByIdService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
};
