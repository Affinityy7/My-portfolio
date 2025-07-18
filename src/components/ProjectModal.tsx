import React from 'react';
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tools: string[];
  icon: React.ReactNode;
  details?: {
    duration?: string;
    challenges?: string[];
    outcomes?: string[];
    technologies?: string[];
    demoUrl?: string;
    githubUrl?: string;
  };
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
              {project.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Project Overview</h3>
            <p className="text-gray-700">{project.description}</p>
          </div>

          {/* Duration */}
          {project.details?.duration && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Duration: {project.details.duration}</span>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges */}
          {project.details?.challenges && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Key Challenges</h3>
              <ul className="space-y-2">
                {project.details.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcomes */}
          {project.details?.outcomes && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Key Outcomes</h3>
              <ul className="space-y-2">
                {project.details.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            {project.details?.demoUrl && (
              <a
                href={project.details.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Demo
              </a>
            )}
            {project.details?.githubUrl && (
              <a
                href={project.details.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}