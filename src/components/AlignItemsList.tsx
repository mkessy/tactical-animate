import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { PlayerOnBoard } from "../types/Player";
import config from "../config";

const AlignItemsList = ({ players }: { players: PlayerOnBoard[] }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        maxHeight: `${config.canvas.HEIGHT}`,
        bgcolor: "background.paper",
        overflow: "auto",
      }}
    >
      {players
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((p, i) => {
          const { name, id, position, age, number, photoUrl, active, team } = p;

          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={name} src={photoUrl} />
                </ListItemAvatar>
                <ListItemText primary={name} secondary={position} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
    </List>
  );
};

export default AlignItemsList;
