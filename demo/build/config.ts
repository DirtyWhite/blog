///<reference path="./typings/index.d.ts"/>

export default new class buildConfig {
    /**活动标题 */
    title = ""
    /**活动名称 */
    name = "demo"
    /**活动平台 */
    platform = "game"
    /**活动年份 */
    year = "y2019"
    /**是否在编译完成后展现各模块的编译情况 */
    showAnalyze = false



    /**输出目录相对项目根目录位置 */
    relativePath = '../../../../'

    /**项目目录 */
    projectDir = `${this.year}/${this.platform}/`

    /**入口，根据需求更改 */
    entry = 'src/entries/**/*.{js,ts}'

    /**静态资源输出目录 */
    outputDir = `${this.relativePath}release/${this.projectDir}${this.name}`

    /**模板输出目录 */
    templateOutputDir = `${this.relativePath}server/${this.projectDir}views/${this.name}/`

    controllerOutputDir = `${this.relativePath}server/${this.projectDir}controllers/`

    /**构建的静态资源存放的子目录 */
    subDirectory = 'static'

    template = {
    }
}