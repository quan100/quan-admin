// @ts-ignore
/* eslint-disable */

declare namespace API {

  type TreePermissionParams = {
    parentId?: number;
    name?: string;
    type?: number;
    appType?: string;
    pageNum?: number;
    pageSize?: number;
  };

  type SysPermission = {
    id?: number;
    parentId?: number;
    name?: string;
    redirect?: string;
    wrappers?: string;
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    flatMenu?: boolean;
    locale?: string;
    disabled?: boolean;
    title?: string;
    hash?: boolean;
    path?: string;
    tooltip?: string;
    key?: string;
    parentKeys?: string;
    component?: string;
    exact?: boolean;
    icon?: string;
    target?: string;
    appType?: string;
    permission?: string;
    type?: number;
    description?: string;
    sort?: number;
    delFlag?: boolean;
    createUser?: string;
    createTime?: any;
    updateUser?: string;
    updateTime?: any;
  }

  type SysRole = {
    id?: number;
    appType?: string;
    name?: string;
    code?: string;
    status?: number;
    delFlag?: boolean;
  }

  type SysRoleQuery = {
    id?: number;
    appType?: string;
    name?: string;
    code?: string;
    status?: number;
    delFlag?: boolean;
    roleIds?: any;
    pageNum?: number;
    pageSize?: number;
  }

  type AuthorizeRolePermissionEvent = {
    roleId?: number;
    permissionIdList?: number[];
  }

}
