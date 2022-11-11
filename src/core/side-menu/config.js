import { getOfflineData } from "../../utils/offline-services";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
export const SIDE_MENU = () => {
  const user = getOfflineData("user");

  let options = [
    {
      label: "Pending Approval",
      url: "/approval",
      value: "/approval",
      logo: <PendingActionsIcon sx={{ mr: 1 }} />,
    },
  ];
  if (user && user.role === "ADMIN") {
    options = [
      {
        label: "Create CF",
        url: "/",
        value: "/",
        logo: <NoteAddIcon sx={{ mr: 1 }} />,
      },
      ...options,
      {
        label: "Users",
        url: "/users",
        value: "/users",
        logo: <GroupIcon sx={{ mr: 1 }} />,
      },
    ];
  }
  return [
    ...options,
    {
      label: "Reports",
      url: "/reports",
      value: "/reports",
      logo: <AssessmentIcon sx={{ mr: 1 }} />,
    },
  ];
};
