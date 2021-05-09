import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// single selection from dropdown
function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;
  // console.log(value)
  return (
    <FormControl variant="outlined"
      {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={options.length > 0 ? value : ''}
        onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {
          options && options.map(
            (item) => {
              if (item.id) {
                return <MenuItem key={item?.id} value={item?.id}>{item?.title ? item?.title : item?.name ? item?.name : item?.id}</MenuItem>
              } else {
                return <MenuItem key={item?.value} value={item?.value}>{item?.title ? item?.title : item?.name ? item?.name : item?.value}</MenuItem>
              }
            }
          )
        }
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
};

// multiple selection from dropdown
function SelectMultiple(props) {
  //eslint-disable-next-line
  const { name, label, value, error = null, onChange, options } = props;
  return (
    <Autocomplete
      multiple
      // id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      name={name}
      onChange={onChange}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </React.Fragment>
      )}
      // style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} 
          variant="outlined" 
          label={label} 
          placeholder="" 
          error={error ? true :false}
          helperText={error}
          />
      )}
    />
  );
  
}

export { Select, SelectMultiple }