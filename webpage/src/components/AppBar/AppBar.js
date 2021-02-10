import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Search from '../AppBar/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  gridItem: {
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleText: {
    verticalAlign: 'center'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function MenuAppBar() {

  const classes = useStyles();

  return(
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
        >
          <Grid item className={classes.gridItem} xs={4}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <div className={classes.title}>
              <Typography variant="h6" className={classes.titleText}>
                The Good Resell
              </Typography>
            </div>
          </Grid>

          <Grid item className={classes.gridItem} xs={4}>
            <Search />
          </Grid>
          <Grid item className={classes.gridItem} xs={4}>
            <p>test</p>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default MenuAppBar;
