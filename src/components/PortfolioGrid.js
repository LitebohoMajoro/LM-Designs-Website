// src/components/PortfolioGrid.js
import React from 'react';
import PortfolioItem from './PortfolioItem';

const PortfolioGrid = ({ items }) => {
    return (
        <div className="portfolio-grid">
            {items.map(item => (
                <PortfolioItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default PortfolioGrid;