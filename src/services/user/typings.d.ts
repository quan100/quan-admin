// @ts-ignore
/* eslint-disable */

declare namespace API {

  type SysUser = {
    info?: API.SysUserInfo;
    account?: API.SysUserAccount;
    tripartiteAccount?: API.SysUserTripartiteAccount;
  }

  type SysUserAccount = {
    /**
     * 自增主键
     */
    id?: number;

    /**
     * 用户ID
     */
    userId?: string;

    /**
     * 账号
     */
    account?: string;

    /**
     * 密码
     */
    password?: string;

    /**
     * 登录类型（1：普通用户；2：会员用户）
     */
    type?: number;

    /**
     * 状态（0：正常，1：冻结，2：注销）
     */
    status?: number;

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
     * 应用编码，标识权限所属的应用
     */
    appType?: string;

    roleIdList?: number[];

  };

  type SysUserInfo = {
    /**
     * 自增主键
     */
    id?: number;

    /**
     * 用户ID
     */
    userId?: string;

    /**
     * 昵称
     */
    nickName?: string;

    /**
     * 性别（0：保密）
     */
    sex?: number;

    /**
     * 通讯地址
     */
    address?: string;

    /**
     * 通讯邮箱
     */
    email?: string;

    /**
     * 真实姓名
     */
    realName?: string;

    /**
     * 生日
     */
    birthday?: any;

    /**
     * 个人描述
     */
    description?: string;

    /**
     * 通讯电话
     */
    phone?: string;

    /**
     * 用户头像地址
     */
    avatar?: string;

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

  };

  type SysUserTripartiteAccount = {
    /**
     * 自增主键
     */
    id?: number;

    /**
     * 用户ID
     */
    userId?: string;

    /**
     * 账号
     */
    account?: string;

    /**
     * 第三方类型
     */
    thirdType?: string;

    /**
     * 第三方ID
     */
    thirdId?: string;

    /**
     * 绑定状态，0：未绑定，1：已绑定
     */
    bindStatus?: number;

    status?: number;
  }

}
