// @ts-ignore
/* eslint-disable */

declare namespace API {

  type Article = {
    /**
     * 自增主键
     */
    id?: number;

    /**
     * 文章ID
     */
    articleId?: string;

    /**
     * 用户ID
     */
    userId?: string;

    /**
     * 标题
     */
    title?: string;

    /**
     * 作者
     */
    author?: string;

    /**
     * 作者链接
     */
    authorUrl?: string;

    /**
     * 文章类型, 1：原创，2：转载，3：官方
     */
    type?: number;

    /**
     * 发布类型, 1：全部可见，2：仅自己可见，3：粉丝可见
     */
    publishType?: number;

    /**
     * 文章来源
     */
    source?: string;

    /**
     * 文章来源链接
     */
    sourceUrl?: string;

    /**
     * 头像地址
     */
    avatar?: string;

    /**
     * 封面图
     */
    cover?: string;

    /**
     * 作者联系账号
     */
    authorAccounts?: string;

    /**
     * 作者联系账号是否公开
     */
    authorAccountsPublic?: number;

    /**
     * 备注
     */
    remarks?: string;

    /**
     * 内容跳转链接
     */
    jumpUrl?: string;

    /**
     * 跳转类型
     */
    jumpType?: number;

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

    /**
     * 删除状态，false：未删除，true：已删除
     */
    delFlag?: boolean;

    /**
     * 文章缩略文
     */
    briefContent?: string;

    /**
     * 文章内容
     */
    content?: ArticleContent;

    /**
     * 分类ID
     */
    categoryId?: string;

    tagIdList?: string[];
  };

  type ArticleContent = {
    /**
     * 文章ID
     */
    articleId?: string;

    /**
     * 内容
     */
    content?: string;

    /**
     * 内容代码
     */
    contentCode?: string;

    /**
     * 文章缩略文
     */
    briefContent?: string;
  }

  type ArticleQuery = {
    id?: number;
    code?: string;
    open?: number;
    remark?: string;
    name?: string;
    pageNum?: number;
    pageSize?: number;
  }

  type ArticleCategory = {
    id?: number;
    categoryId: string;
    type?: number;
    name: string;
    color?: string;
    sort?: number;
  };

  type ArticleCategoryQuery = {
    id?: number;
    categoryId?: string;
    type?: number;
    name?: string;
    color?: string;
    sort?: number;
  };

  type ArticleTag = {
    id?: number;
    tagId: string;
    type?: number;
    name: string;
    color?: string;
    sort?: number;
    icon?: string;
  };
}
