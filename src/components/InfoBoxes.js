import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@mui/material";
function InfoBoxes(props) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox  ${props.active && "infoBox--selected"} ${
        props.isRed && "infoBox_Red"
      } ${props.isBlue && "infoBox_Blue"}`}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {props.title}
        </Typography>
        <h2
          className={`infoBox_cases ${props.isRed && "infoBox_Red"} ${
            !(props.isRed || props.isBlue) && "infoBox_cases_green"
          } ${!(props.isRed || props.isGreen) && "infoBox_cases_blue"} `}
        >
          {props.cases}
        </h2>
        <Typography className="infoBox_total" color="textSecondary">
          {props.total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBoxes;
