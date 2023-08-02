import React from "react";

const Popover = (props: any) => {
  const { content } = props;

  return (
    <div>
      <p>{content}</p>
    </div>
  );
};

export default Popover;
