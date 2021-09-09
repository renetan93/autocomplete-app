import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { LocationOnOutlined as LocationOnOutlinedIcon } from '@material-ui/icons';

export const AutoCompleteList = ({ suggestions, getSuggestionItemProps }) => {
  return (
    <List>
      {
        suggestions.map(suggestion => {
          return (
            <ListItem button key={suggestion.index} {...getSuggestionItemProps(suggestion)}>
              <ListItemIcon>
                <LocationOnOutlinedIcon />
              </ListItemIcon>
              <ListItemText>{suggestion.description}</ListItemText>
            </ListItem>
          )
        })
      }
    </List>
  )
}