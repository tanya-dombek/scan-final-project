import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const TonalityDropdown = ({setSearchParameters}) => {
    const [tonality, setTonality] = React.useState('any');

    const handleChange = (value, name) => {
        setTonality(value);
        setSearchParameters(prevState => ({...prevState, [name]: value}))
    };
  
    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tonality}
            onChange={(e) => handleChange(e.target.value, 'tonality')}
            className='tonality-dropdown'
            >
            <MenuItem value={'positive'}>Позитивная</MenuItem>
            <MenuItem value={'negative'}>Негативная</MenuItem>
            <MenuItem value={'any'}>Любая</MenuItem>
        </Select>
    );}

export default TonalityDropdown