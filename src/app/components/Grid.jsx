import React from 'react';
import styles from '../css/grid.module.css';

const Grid = ({ playerPosition, cityPosition }) => {
  const renderGrid = () => {
    let rows = [];
    for (let y = 4; y >= -4; y--) {
      let cells = [];
      for (let x = -4; x <= 4; x++) {
        let content = null;
        if (playerPosition.x === x && playerPosition.y === y) {
          content = <div className={styles.point}></div>;
        } else if (cityPosition && cityPosition.x === x && cityPosition.y === y) {
          content = <div className={styles.city}></div>; // Icône de ville
        }
        cells.push(
          <div className={styles.cell} key={`${x},${y}`}>
            {content}
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