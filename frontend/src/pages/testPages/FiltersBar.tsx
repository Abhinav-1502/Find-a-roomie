import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  SelectChangeEvent,
  Typography,
  Container,
  Grid,
  Slider,
  TextField,
  Collapse,
} from '@mui/material';

import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface FiltersBarProps {
  applyFilters: (filters: Filters) => void;
}

interface Filters {
  postType: string[];
  houseType: string[];
  furnished: string[];
  utilities: string[];
  amenities: string[];
  preferences: string[];
  priceRange: number[];
  moveInDate: Date | null;
  sortOrder: string;
  sortBy: string;
}

interface PriceRangeProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const StyledInputLabel = styled(InputLabel)({
  transform: 'translate(20px, 20px) scale(1)',
  '&.MuiInputLabel-shrink': {
    transform: 'translate(0, -20px) scale(0.75)',
  },
});

const PriceRangeSlider: React.FC<PriceRangeProps> = ({ value, onChange }) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setMinValue(newValue[0]);
      setMaxValue(newValue[1]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = event.target;
    const parsedValue = parseInt(inputValue, 10);

    if (!isNaN(parsedValue)) {
      if (name === 'min') {
        setMinValue(parsedValue);
      } else if (name === 'max') {
        setMaxValue(parsedValue);
      }
    }
  };

  const handleBlur = () => {
    onChange([minValue, maxValue]);
  };

  useEffect(() => {
    onChange([minValue, maxValue]);
  }, [minValue, maxValue, onChange]);

  return (
    <div>
      {/* Slider in the first line */}
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Typography variant="subtitle1">{0}</Typography>
        <Slider
          value={[minValue, maxValue]}
          onChange={handleSliderChange}
          step={100}
          marks
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
          min={0}
          max={1500}
          style={{ maxWidth: '70%' }}
        />
        <Typography variant="subtitle1">{1500}</Typography>
      </Stack>
      {/* Min/Max Price inputs in the second line */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <TextField
          label="Min Price"
          type="number"
          name="min"
          value={minValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <Typography variant="subtitle1" style={{ margin: '0 4px' }}>-</Typography>
        <TextField
          label="Max Price"
          type="number"
          name="max"
          value={maxValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

const FiltersBar: React.FC<FiltersBarProps> = ({ applyFilters }) => {
  const [filters, setFilters] = useState<Filters>({
    postType: [],
    houseType: [],
    furnished: [],
    utilities: [],
    amenities: [],
    preferences: [],
    priceRange: [0, 1500],
    moveInDate: null,
    sortOrder: 'asc', // Set default sort order to 'asc'
    sortBy: 'costly',
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);

  const handleFilterChange = (
    filterType: keyof Filters,
    value: string | string[] | number | number[] | Date | null
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: Array.isArray(value) ? value : [value],
    }));
  };

  const handleDateChange = (newDate: string) => {
    const formattedDate = newDate ? new Date(newDate) : null;

    setSelectedDate(formattedDate);
    handleFilterChange('moveInDate', formattedDate);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortOrder: event.target.value,
    }));
  };

  const handleSortByChange = (event: SelectChangeEvent<string>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: event.target.value,
    }));
  };


  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
    applyFilters(filters);
  };

  const togglePriceRange = () => {
    setPriceRangeOpen(!priceRangeOpen);
  };

  const filterOptions = [
    { name: 'Posting Type', key: 'postType', values: ['Roomie', 'Room'] },
    { name: 'House Type', key: 'houseType', values: ['Apartment', 'Town House', 'Condo'] },
    { name: 'Furnished', key: 'furnished', values: ['Fully', 'Semi', 'Unfurnished'] },
    { name: 'Utilities', key: 'utilities', values: ['Laundry', 'Heater', 'Hot Water'] },
    { name: 'Amenities', key: 'amenities', values: ['Swimming Pool', 'Gym', 'Pet-Friendly'] },
    {
      name: 'Preferences',
      key: 'preferences',
      values: [
        'No Smoking',
        'No Alcohol',
        'Occasional Parties',
        'Indians Preferred',
        'All Girl Apartment',
        'All Guys Apartment',
        'Mixed Gender Apartment',
      ],
    },
  ];

  return (
    <Container style={{ maxWidth: '90vw', marginTop:'20px', padding: '20px'}} className="filters-bar">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={2}>
          {filterOptions.map((filter) => (
            <Grid item xs={2} key={filter.key}>
              <FormControl fullWidth>
                <StyledInputLabel>{filter.name}</StyledInputLabel>
                <Select
                  multiple
                  value={filters[filter.key as keyof Filters]}
                  onChange={(e: SelectChangeEvent<typeof filters[keyof Filters]>) =>
                    handleFilterChange(filter.key as keyof Filters, e.target.value)
                  }
                >
                  {filter.values.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}

          {/* Price Range */}
          <Grid item xs={2} style={{ position: 'relative' }}>
            <Typography
              variant="subtitle1"
              onClick={togglePriceRange}
              style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                padding: '12.5px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Price Range {priceRangeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Typography>
            <Collapse in={priceRangeOpen} onExited={() => setPriceRangeOpen(false)} onEntered={() => setPriceRangeOpen(true)}>
              <PriceRangeSlider
                value={filters.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
              />
            </Collapse>
          </Grid>

          {/* Move-In Date */}
          <Grid item xs={2}>
            <TextField
              label="Ready to move in from?"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleDateChange(e.target.value)}
              fullWidth
            />
          </Grid>

          {/* Sort Order */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <StyledInputLabel>Sort Order</StyledInputLabel>
              <Select value={filters.sortOrder} onChange={handleSortChange}>
                <MenuItem value="asc">A to Z</MenuItem>
                <MenuItem value="desc">Z to A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Sort By */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <StyledInputLabel>Sort By</StyledInputLabel>
              <Select value={filters.sortBy} onChange={handleSortByChange}>
                <MenuItem value="costly">High to Low</MenuItem>
                <MenuItem value="affordable">Low to High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default FiltersBar;
