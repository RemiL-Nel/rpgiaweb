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
          {cells}
        </div>
      );
    }
    return rows;
  };

  return <div className={styles.grid}>{renderGrid()}</div>;
};

export default Grid;
