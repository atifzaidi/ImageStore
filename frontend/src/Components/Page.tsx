import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import PhotoPage from "./PhotoPage/PhotoPage";
import { Photo, PhotoAlbum } from "@material-ui/icons";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import AlbumPage from "./AlbumPage/AlbumPage";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up("sm")]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
                background: "white",
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        topleft: {
            color: "#666666",
            fontSize: "xx-large",
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            height: 64,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
);

export default function ResponsiveDrawer({ window }: any) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const history = useHistory();
    const location = useLocation();

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <div className={classes.topleft}>ImageStore</div>
            </div>
            <Divider />
            <List>
                <ListItem button selected={location.pathname === "/"} onClick={() => history.push("/")}>
                    <ListItemIcon>
                        <Photo />
                    </ListItemIcon>
                    <ListItemText primary="Photos" />
                </ListItem>
                <ListItem button selected={location.pathname === "/albums"} onClick={() => history.push("/albums")}>
                    <ListItemIcon>
                        <PhotoAlbum />
                    </ListItemIcon>
                    <ListItemText primary="Albums" />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawerElement = (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );

    return (
        <Switch>
            <Route path="/albums">
                <AlbumPage drawerElement={drawerElement} handleDrawerToggle={handleDrawerToggle} />
            </Route>
            <Route path="/">
                <PhotoPage drawerElement={drawerElement} handleDrawerToggle={handleDrawerToggle} />
            </Route>
        </Switch>
    );
}