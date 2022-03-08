import React from 'react';

const Filter = ({filterName, handleFilterName}) => (
    <div>
        Filter shown with <input value={filterName} onChange={handleFilterName}></input>
    </div>
)

export default Filter