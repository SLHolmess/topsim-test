import { Pane } from "evergreen-ui";
import * as React from "react";

type PropsType = {
  children?: any,
  width?: number | string
  style?: object 
}

const Card = (props: PropsType) => {
  const { children, width, style } = props
  return (
    <Pane
      display="flex"
      className="flex-col lg:flex-col rounded-md p-3 bg-white"
      elevation={1}
      width={width}
      style={style}
    >
      {children}
    </Pane>
  );
};

export default Card;
