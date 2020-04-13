import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 300,
    border: "1px solid black",
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();

  const handleToggle = (value) => () => {
    const currentIndex = props.schoolSelected.indexOf(value);
    const newChecked = [...props.schoolSelected];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    props.setSchoolSelected(newChecked);
  };

  return (

    <List className={classes.root}>
      {props.result.map((value) => {
        const labelId = `checkbox-list-label-${value.name}`;

        return (
          <ListItem key={value.name} role={undefined} dense button onClick={handleToggle(value.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.schoolSelected.indexOf(value.name) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.name} 
              secondary={`Location: ${value.city}, ${value.state}, SAT: ${value.sat}, ACT: ${value.act}, Number of Students: ${value.num_students}, AP Enroll: ${Math.round((value.ap_enroll*100))}%`}/>
            {Math.round(value.score)}
          </ListItem>
        );
      })}
    </List>
  );
}
