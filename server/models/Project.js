import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    summary: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Web Development",
    },
    stack: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    websiteUrl: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
