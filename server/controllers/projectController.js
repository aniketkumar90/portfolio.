import {
  getAllProjectsService,
  getProjectByIdService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
} from "../services/projectService.js";
import { uploadToCloudinary } from "../services/cloudinaryService.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const projects = await getAllProjectsService();
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res, next) => {
  try {
    const project = await getProjectByIdService(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body };
    if (typeof projectData.stack === "string") {
      projectData.stack = projectData.stack.split(",").map((s) => s.trim());
    }

    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file.buffer);
      projectData.image = uploadRes.secure_url;
    }

    const project = await createProjectService(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (typeof updateData.stack === "string") {
      updateData.stack = updateData.stack.split(",").map((s) => s.trim());
    }

    if (req.file) {
      const uploadRes = await uploadToCloudinary(req.file.buffer);
      updateData.image = uploadRes.secure_url;
    }

    const updated = await updateProjectService(req.params.id, updateData);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const deleted = await deleteProjectService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};
