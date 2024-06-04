import React, {useState} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay} from '@mui/x-date-pickers/PickersDay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextField  from '@mui/material/TextField';

export default function Calendar() {
    const [value, setValue] = React.useState(new Date());
    const [highlightedDays, setHighlightedDays] = React.useState(
        [1, 2, 15])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker 
            orientation="portrait"
            openTo='day'
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => (
            <TextField
                {...params}
            renderDay={(day, _value, DayComponentProps) => {
                const isSelected = 
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.indexOf(day.getDate()) > 0;
                
                return (
                    <Badge
                        key={day.toString()}
                        overlap="circular"
                        badgeContent={isSelected ? <CheckCircleIcon/> : undefined}>
                        <PickersDay {...DayComponentProps} />
                        </Badge>
                        );
                    }}
                />
                )}
            />
    </LocalizationProvider>
  );
}
