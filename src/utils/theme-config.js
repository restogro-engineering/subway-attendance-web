export const Theme = {
  typography: {
    fontFamily: ["ProximaNovaAltLight-Regular"],
  },
  palette: {
    primary: {
      main: "#008952",
    },
    secondary: {
      main: "#db1102",
    },
    light: {
      main: "white",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        color: "#008952",
      },
      containedPrimary: {
        color: "#008952",
      },
      outlinedPrimary: {
        color: "#008952",
        border: "#008952",
      },
      text: {
        color: "#008952",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 30,
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "#fff",
      },
    },
  },
};
