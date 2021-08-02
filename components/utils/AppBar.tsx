import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import MuiAppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import HideOnScroll from "./HideOnScroll";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    titleAppbar: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  })
);

interface IAppBar {
  title: string;
  includeSearch?: boolean;
  setLoad?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppBar: React.FC<IAppBar> = ({ title, includeSearch, setLoad }) => {
  const router = useRouter();
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const params = new URLSearchParams(router.asPath.split("?")[1]);

  return (
    <HideOnScroll>
      <MuiAppBar>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <IconButton edge="start">
              <ArrowBackIosIcon style={{ color: "white" }} />
            </IconButton>
          </Link>
          <Typography
            className={classes.titleAppbar}
            variant="h6"
            color="initial"
          >
            {title}
          </Typography>
          {includeSearch && setLoad && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (search === "") return;
                  searchInput.current?.blur();
                  setLoad(true);
                  params.set("s", search);
                  router.push(
                    "?" + params.toString(),
                    "?" + params.toString(),
                    {
                      scroll: false,
                    }
                  );
                }}
              >
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  inputRef={searchInput}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </form>
            </div>
          )}
        </Toolbar>
      </MuiAppBar>
    </HideOnScroll>
  );
};

export default AppBar;
