import React, {FC} from "react";
import * as Icons from "@ant-design/icons";

const Icon: FC<{ name: keyof typeof Icons }> = ({name}) => {
    const CustomIcon = Icons[name] as any;
    return <CustomIcon/>;
};

export default Icon;
