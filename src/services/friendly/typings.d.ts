// @ts-ignore
/* eslint-disable */

declare namespace API {

  type Friendly = {
    /**
     * 自增主键
     */
    id?: number;

    /**
     * 站点名称
     */
    name?: string;

    /**
     * 链接
     */
    linkUrl?: string;

    /**
     * 图标地址
     */
    avatar?: string;

    /**
     * 联系邮箱
     */
    email?: string;

    /**
     * 联系邮箱是否公开
     */
    emailPublic?: boolean;

    /**
     * 备注
     */
    remarks?: string;

    /**
     * 站点描述
     */
    description?: string;

    /**
     * 排序
     */
    sort?: number;

    /**
     *
     */
    createTime?: any;

    /**
     *
     */
    updateTime?: any;

    /**
     *
     */
    createUser?: string;

    /**
     *
     */
    updateUser?: string;

    /**
     * 状态，0：正常，1：审核中，2：审核不通过
     */
    status?: number;

    style?: any;

  };

  type FriendlyQuery = {
    /**
     * 自增主键
     */
    id?: number;

    /**
     * 站点名称
     */
    name?: string;

    /**
     * 链接
     */
    linkUrl?: string;

    /**
     * 联系邮箱
     */
    email?: string;

    /**
     * 联系邮箱是否公开
     */
    emailPublic?: boolean;

    /**
     *
     */
    createTime?: any;

    /**
     *
     */
    updateTime?: any;

    /**
     *
     */
    createUser?: string;

    /**
     *
     */
    updateUser?: string;

    /**
     * 状态，0：正常，1：审核中，2：审核不通过
     */
    status?: number;

  }

}
