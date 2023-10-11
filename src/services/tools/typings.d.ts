// @ts-ignore
/* eslint-disable */

declare namespace API {

  type Tools = {
    id?: number;
    avatar?: string;
    cover?: string;
    remarks?: string;
    title?: string;
    dataType?: number;
    listType?: number;
    createTime?: any;
    updateTime?: any;
    createUser?: string;
    updateUser?: string;
    status?: number;
    content?: string;
    jumpUrl?: string;
    jumpType?: number;
    sort?: number;
  };

  type ToolsQuery = {
    id?: number;
    title?: string;
    dataType?: number;
    listType?: number;
    createTime?: any;
    updateTime?: any;
    createUser?: string;
    updateUser?: string;
    status?: number;
    jumpType?: number;
    pageNum?: number;
    pageSize?: number;
  }

}
