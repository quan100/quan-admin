// @ts-ignore
/* eslint-disable */

declare namespace API {

  type Result<T> = {
    code?: number;
    type?: string;
    message?: string;
    data: T;
    success: boolean;
  } & T;

  type PageResult<T> = {
    // 分页参数
    /**
     * 总数
     */
    total: number;

    /**
     * 总页数
     */
    pages: number;

    /**
     * 页码，从1开始
     */
    pageNum: number;

    /**
     * 页面大小
     */
    pageSize: number;

    /**
     * 查询数据列表
     */
    records: T[];

  } & T;

}
