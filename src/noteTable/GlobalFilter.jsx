import React from 'react';

const GlobalFilter = ({filter, setFilter}) => {
  return (
    <div>
        <span>
            Search: {' '}
            <input
                value={filter || ''}
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

export default GlobalFilter;
