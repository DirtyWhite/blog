
declare class HostConfig {
    /**
     * 统计接口地址
     */
    tjHost: string
    /**
     * 服务端接口地址
     */
    host: string

    /**
     * node服务器地址
     */
    nodeHost: string
    /**
     * 获取node端的接口请求根路径,用于请求非转发的node端接口
     */
    getRoot(): string
    /**
     * 获取node端转发请求的路径
     */
    getHost(): string
    /**
     * 获取统计的路径
     */
    getTjHost(): string
}
declare var hostConfig: HostConfig;
export default hostConfig;