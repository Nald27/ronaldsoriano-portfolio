import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { projects } from "../data/projects";
import "../App.css";

const PROJECTS_PAGE_DESCRIPTION =
  "A collection of full-stack, automation, AI, database, and IoT projects built for real-world workflows and practical problem solving.";

function formatProjectNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function useModalControls(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen, onClose]);
}

function ProjectsHeader() {
  return (
    <header className="projects-page-header">
      <Link to="/" className="back-link" aria-label="Go back to homepage">
        <FaArrowLeft aria-hidden="true" />
        <span>Back</span>
      </Link>

      <div className="projects-page-title">
        <span>Portfolio</span>
        <h1>All Projects</h1>
        <p>{PROJECTS_PAGE_DESCRIPTION}</p>
      </div>
    </header>
  );
}

function ProjectHighlights({ highlights }) {
  if (!highlights?.length) {
    return null;
  }

  return (
    <div className="all-project-highlights">
      <h3>Key Highlights</h3>

      <ul>
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectLocation({ location }) {
  if (!location) {
    return null;
  }

  return (
    <div className="all-project-location">
      <strong>Location:</strong>

      <a href={location.mapOpenUrl} target="_blank" rel="noreferrer">
        {location.address} ↗
      </a>
    </div>
  );
}

function ProjectTechnologies({ technologies }) {
  if (!technologies?.length) {
    return null;
  }

  return (
    <div className="tech-list all-project-tech">
      {technologies.map((technology) => (
        <span key={technology}>{technology}</span>
      ))}
    </div>
  );
}

function ProjectActions({ project, onWatchVideo }) {
  const hasActions = project.video || project.liveDemo || project.github;

  if (!hasActions) {
    return null;
  }

  return (
    <div className="all-project-actions">
      {project.video && (
        <button
          type="button"
          className="project-video-button"
          onClick={() =>
            onWatchVideo({
              src: project.video,
              title: project.title,
            })
          }
        >
          Watch Demo Video ▶
        </button>
      )}

      {project.liveDemo && (
        <a href={project.liveDemo} target="_blank" rel="noreferrer">
          Live Demo ↗
        </a>
      )}

      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index, onWatchVideo }) {
  return (
    <article className="all-project-card">
      <div className="project-number">{formatProjectNumber(index)}</div>

      <div className="all-project-content">
        <div className="all-project-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <h2>{project.title}</h2>

        <p className="all-project-summary">{project.summary}</p>

        <p className="all-project-description">{project.description}</p>

        <ProjectHighlights highlights={project.highlights} />

        <ProjectLocation location={project.location} />

        <ProjectTechnologies technologies={project.tech} />

        <ProjectActions
          project={project}
          onWatchVideo={onWatchVideo}
        />
      </div>
    </article>
  );
}

function VideoModal({ video, onClose }) {
  useModalControls(Boolean(video), onClose);

  if (!video) {
    return null;
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  return (
    <div
      className="video-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} demo video`}
    >
      <div className="video-modal" onClick={handleModalClick}>
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close demo video"
        >
          ×
        </button>

        <video
          key={video.src}
          controls
          autoPlay
          playsInline
          aria-label={`${video.title} demo`}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoModal = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  const closeVideoModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <div className="projects-page">
      <div className="container">
        <ProjectsHeader />

        <main className="all-projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onWatchVideo={openVideoModal}
            />
          ))}
        </main>
      </div>

      <VideoModal video={selectedVideo} onClose={closeVideoModal} />
    </div>
  );
}