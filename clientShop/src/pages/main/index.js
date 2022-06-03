import { useEffect, useCallback } from "react";
import {
  useTelegramWebApp,
  useIsTelegramWebAppReady,
} from "react-telegram-webapp";
import { Box } from "@mui/material";
import Grid from "./grid";
import { Pagination } from "../../components";
import {
  burger,
  cake,
  coke,
  cookie,
  donut,
  flan,
  fries,
  hotdog,
  pizza,
} from "../../res/icons";

const items = [
  { id: 1, caption: "Boby Boba", icon: burger },
  { id: 2, caption: "Andrey", icon: cake },
  { id: 3, caption: "GRAND", icon: coke },
  { id: 4, caption: "Джабраил", icon: cookie },
  { id: 5, caption: "Антон", icon: donut },
  { id: 6, caption: "Виктория", icon: flan },
  { id: 6, caption: "Виктор", icon: fries },
  { id: 6, caption: "Антон", icon: hotdog },
  { id: 6, caption: "Ivan", icon: pizza },
  {
    id: 6,
    caption: "NOUVEAU PARIS",
    icon: pizza,
  },
];

const Default = (props) => {
  const isReady = useIsTelegramWebAppReady();

  const tel = useTelegramWebApp();

  const handleOnClick = useCallback(() => {
    console.log(tel);
  }, [tel]);

  useEffect(() => {
    if (isReady) {
      tel.expand(true);
      tel.MainButton.setParams({
        color: "rgb(49, 181, 69)",
        text: "Привет Boby Boba",
        is_visible: true,
        is_active: true,
      })
        .showProgress(true)
        .onClick(() => {
          handleOnClick();
        });
    }
  }, [isReady, tel]);

  if (isReady)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Grid items={items} sx={{ overflow: "auto" }} />
        <div style={{ flexGrow: 1 }} />
        <Pagination
          center
          sx={{
            margin: 1,
          }}
        />
      </Box>
    );

  return <div />;
};

export default Default;