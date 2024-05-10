import React, { CSSProperties, FC } from "react";
import * as Icons from "@ant-design/icons";

export type IconType = keyof typeof Icons;

const Icon: FC<{ name: IconType, style?: CSSProperties | undefined }> = ({ name, style }) => {
  const CustomIcon = Icons[name] as any;
  return <CustomIcon style={style}/>;
};

export default Icon;
