import React, { useCallback, useState } from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import {
  ChevronLeft as ChevronLeftIcon,
  SearchOutlined as SearchOutlinedIcon
} from '@material-ui/icons';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useDispatch } from 'react-redux'
import { addSearchHistory } from './mapSlice'
import Map from './components/Map'
import { AutoCompleteList, SearchHistory } from './components'

const MapFragment = () => {
  const dispatch = useDispatch()

  const [center, setCenter] = useState()
  const [textFieldFocus, setTextFieldFocus] = useState(false)
  const [address, setAddress] = useState("")

  const handleChange = React.useCallback(address => {
    setAddress(address)
  }, [])

  const handleSelect = React.useCallback(address => {
    setAddress(address)

    var ele = document.getElementById("textAutoComplete")
    ele.blur()
    setTextFieldFocus(false)

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setCenter(latLng)
        dispatch(addSearchHistory(address))
      })
      .catch(error => console.error('Error', error));
  }, [dispatch])

  const onHistorySelected = useCallback((value) => {
    setAddress(value)
    handleSelect(value)
  }, [handleSelect])

  const renderBackButton = React.useMemo(() => {
    if (textFieldFocus) {
      return (
        <Grid item>
          <IconButton size="small" onClick={() => setTextFieldFocus(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
      )
    }

    return null
  }, [textFieldFocus])

  return (
    <Grid
      container
      item
      spacing={4}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
            return (
              <div>
                <Grid container item xs={12} direction="row">
                  {renderBackButton}
                  <Grid item xs>
                    <TextField
                      fullWidth
                      id="textAutoComplete"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                      onClick={() => setTextFieldFocus(true)}
                      {...getInputProps({
                        placeholder: 'Search Places',
                        className: 'location-search-input',
                      })} />
                  </Grid>
                </Grid>
                {
                  textFieldFocus ? (
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {
                        suggestions.length === 0
                          ? <SearchHistory onHistorySelected={onHistorySelected} />
                          : <AutoCompleteList suggestions={suggestions} getSuggestionItemProps={getSuggestionItemProps} />
                      }
                    </div>
                  ) : <Map center={center} />
                }
              </div>
            )
          }
          }
        </PlacesAutocomplete>
      </Grid>
    </Grid>
  )
}

export default MapFragment