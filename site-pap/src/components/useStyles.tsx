import { makeStyles } from "@material/ui/core";

export const useStyles = makeStyles((theme) => ({
  map: {
    height: "400px",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
  contactInfo: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  footer: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));
