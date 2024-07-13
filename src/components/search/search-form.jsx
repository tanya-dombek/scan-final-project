import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Checkbox, TextField, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import TonalityDropdown from './tonality-dropdown';
import MainButton from '../buttons/main-btn';
import checkedIcon from '../../utils/imgs/icons/check.svg';
import unCheckedIcon from '../../utils/imgs/icons/uncheck.svg';
import { useDispatch } from 'react-redux';
import { histogramSearch } from '../../redux/histogram-search';
import { searchData } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/en-gb';
import { checkboxData } from '../../utils/checkbox-data';
import { objectSearch } from '../../redux/object-search';
import { validateInn, errMessage, validateLimit, validateDates } from '../../utils/validation';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    '&.Mui-checked': {
        opacity: '100%',
        '& + .MuiFormControlLabel-label': {
            opacity: '100%',
        },
    },
    '&:not(.Mui-checked)': {
        opacity: '40%',
        '& + .MuiFormControlLabel-label': {
            opacity: '40%',
        },
  },
}));


const SearchForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParameters, setSearchParameters] = useState(searchData);
    const limitError = validateLimit(searchParameters.limit);
    const innError = validateInn(searchParameters.inn);
    const datesError = validateDates(searchParameters.startDate,searchParameters.endDate)
    const requiredInputs = searchParameters.inn !== '' && searchParameters.limit !== '' && searchParameters.startDate !== '' && searchParameters.endDate !== '';

    const handleChange = (value, name) => {
        setSearchParameters(prevState => ({...prevState, [name]: value}))
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(histogramSearch({ searchData: searchParameters }));
        dispatch(objectSearch({ searchData: searchParameters }));
        navigate('/result');
    };

  return (
    <div className='search-form'>
        <div className='inputs'>
            <p>ИНН компании*</p>
            <TextField required id='inn' className='input' placeholder='10 цифр' onChange={e => handleChange(e.target.value, 'inn')}
                error={innError} helperText={innError ? errMessage : null} />
            <p>Тональность</p>
            <TonalityDropdown setSearchParameters={setSearchParameters}/>
            <p>Количество документов в выдаче*</p>
            <TextField required id='docAmount' className='input' placeholder='От 1 до 1000'
                onChange={e => handleChange(e.target.value, 'limit')} error={limitError} helperText={limitError ? errMessage : null}/>
            <p>Диапазон поиска*</p>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'} >
                <div className='date-range'>
                    <DatePicker className='input' onChange={value => handleChange(value, 'startDate')}
                        disableFuture views={['year', 'month', 'day']} maxDate={searchParameters.endDate ? searchParameters.endDate : null}/>
                    <DatePicker className='input' onChange={value => handleChange(value, 'endDate')}
                        disableFuture views={['year', 'month', 'day']} minDate={searchParameters.startDate ? searchParameters.startDate : null}/>
                </div>
                {datesError && (<p className='error'>{errMessage}</p>)}
            </LocalizationProvider>
        </div>
        <div className='checkboxes-container'>
            <div className='checkboxes'>
                {checkboxData.map((label, index) => (
                    <FormControlLabel key={index} label={label.name} onChange={e => handleChange(e.target.checked, label.value)}
                        control={<CustomCheckbox icon={<img src={unCheckedIcon} alt="unchecked" style={{ width: 20, height: 20 }} />}
                        checkedIcon={<img src={checkedIcon} alt="checked" style={{ width: 20, height: 20 }} />} />}/>
                ))}
            </div>
            <div className='btn-container'>
                <MainButton styling={'search-btn'} isDisabled={!requiredInputs || limitError || innError || datesError} onClick={handleClick}>Поиск</MainButton>
                <p>* Обязательные к заполнению поля</p>
            </div>
        </div>

    </div>
  )
}

export default SearchForm
