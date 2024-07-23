import React from 'react';
import styles from '../css/grid.module.css';

const Grid = ({ points }) => {
  const size = 9; // 4 + 4 + 1 pour inclure le zéro

  const renderGrid = () => {
    let rows = [];
    for (let y = 4; y >= -4; y--) {
      let cells = [];
      for (let x = -4; x <= 4; x++) {
        const point = points.find(p => p.x === x && p.y === y);
        cells.push(
          <div className={styles.cell} key={`${x},${y}`}>
            {point && <div className={styles.point}></div>}
          </div>
        );
      }
      rows.push(
        <div className={styles.row} key={y}>
          <div className={styles.header}>{y}</div> {/* Ajout de l'en-tête de ligne */}
          {cells}
        </div>
      );
    }
    return rows;
  };

  const renderColumnHeaders = () => {
    let headers = [<div className={styles.header} key="empty"></div>]; // Cellule vide en haut à gauche
    for (let x = -4; x <= 4; x++) {
      headers.push(
        <div className={styles.header} key={x}>
          {x}
        </div>
      );
    }
    return headers;
  };

  return (
    <div>
      <div className={styles.grid}>
        {renderColumnHeaders()}
        {renderGrid()}
      </div>
    </div>
  );
};

export default Grid;