import React from 'react';

const CheckBox = React.forwardRef(({indeterminate, ...rest},ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;
  React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate 
  }, [indeterminate, resolvedRef]);
  return (
    <div>
      <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        style={{
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      />
    </div>
  );
});

export default CheckBox;
