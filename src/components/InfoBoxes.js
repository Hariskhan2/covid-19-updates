import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
function InfoBoxes(props) {
  console.log(props);
  return (
    <Card>
      <CardContent>
        <Typography className='infoBox_title' color="textSecondary">{props.title}</Typography>
        <h2 className='infoBox_cases'>{props.cases}</h2>
        <Typography className='infoBox_total' color='textSecondary'>{props.total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBoxes;
