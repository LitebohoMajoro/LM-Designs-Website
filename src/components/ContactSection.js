import React from 'react';

function PortfolioItem({ project }) {
  const { title, description, image, video, software } = project;

  return (
    <div className="portfolio-item">
      <div className="portfolio-img">
        {image && <img src={image} alt={title} />}
        {video && <video src={video} controls></video>}
        {!image && !video && <i className="fas fa-laptop-code"></i>} {/* Placeholder icon */}
      </div>
      <div className="portfolio-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="software-tag">{software.join(', ')}</span>
      </div>
    </div>
  );
}

export default PortfolioItem;