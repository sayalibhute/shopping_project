import React from 'react';

const ColumeFilter = ({column}) => {
    const { filterValue, setFilter } = column;
  return (
    <div>
        <span>
            Search: {' '}
            <input
                value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Type to search..."
                style={{
                    color:'black',
                    width: '200px',
                    padding: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
        </span>
      
    </div>
  );
}

export default ColumeFilter;