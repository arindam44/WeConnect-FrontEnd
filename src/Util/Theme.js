import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  spreadThis: {
    palette: {
      primary: {
        light: "#8d51fc",
        main: "#762ffa",
        dark: "#7328fc",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ec407a",
        main: "#e91e63",
        dark: "#d81b60",
        contrastText: "#fff",
      },
    },
    logo: {
      maxWidth: 75,
      maxHeight: 75,
    },
    typography: {
      useNextVariants: true,
    },
    link: {
      color: "#762ffa",
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 20,
      width: "30%",
      position: "relative",
      borderRadius: "15px",
      textAlign: "center",
      padding: "7px",
    },
    a: {
      color: "#762ffa",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
      marginTop: "5px",
      marginBottom: "5px",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
        margin: "auto",
        cursor: "pointer",
      },
      "& .profile-names": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#762ffa",
          maxWidth: "50px",
        },
      },
      "& .profile-details": {
        textAlign: "left",
        marginLeft: "10%",
        overflow: "hidden",
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
});

export default theme;
