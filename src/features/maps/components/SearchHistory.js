import React, { useCallback } from 'react'
import {
  Button, IconButton,
  List, ListItem, ListItemIcon,
  ListItemText, ListItemSecondaryAction,
  Grid, Typography
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  HistoryOutlined as HistoryOutlinedIcon,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import { clearSearchHistory, removeSearchHistory } from '../mapSlice'

export const SearchHistory = ({ onHistorySelected }) => {
  const dispatch = useDispatch()
  const history = useSelector(state => state.map.history)

  const removeHistory = useCallback((value) => {
    return () => dispatch(removeSearchHistory(value))
  }, [dispatch])

  const clearAllSearchHistory = useCallback(() => {
    dispatch(clearSearchHistory())
  }, [dispatch])

  const onListItemSelected = useCallback((value) => {
    return () => {
      onHistorySelected(value)
    }
  }, [])

  if (history.length === 0) {
    return (
      <div>No history found</div>
    )
  }

  return (
    <>
      <Grid
        alignItems="center"
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="body1">Recents</Typography>
        </Grid>
        <Grid item>
          <Button onClick={clearAllSearchHistory}>
            clear all
          </Button>
        </Grid>
      </Grid>
      <List>
        {
          [...history].reverse().map((v, i) => (
            <ListItem button key={i} onClick={onListItemSelected(v)}>
              <ListItemIcon>
                <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText>{v}</ListItemText>

              <ListItemSecondaryAction onClick={removeHistory(v)}>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    </>
  )
}