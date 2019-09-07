const log4js = require('log4js')
const path = require('path')

const logConfig = {
  dir: path.join(__dirname, '../../logs'),
  infoLeave: 'info'
}

// 所有日志级别 生成一个方法到上下文中
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

// log4js 配置
log4js.configure({
  appenders: {
    cheese: {
      type: 'dateFile', // 日志类型
      filename: `${logConfig.dir}/task`, // 输出的文件名
      pattern: '-yyyy-MM-dd.log', // 文件名增加后缀
      alwaysIncludePattern: true // 是否总是有后缀名
    }
  },
  // 日志级别
  categories: {
    default: {
      appenders: ['cheese'],
      level: logConfig.infoLeave
    }
  }
})

module.exports = async (ctx, next) => {
  // 生成日志实例
  const logger = log4js.getLogger('cheese')
  // 上下文日志
  const contenxtLog = {}

  methods.forEach(v => {
    // 每一个日志级别给一个方法
    contenxtLog[v] = message => {
      logger[v](message)
    }
  })
  // 挂载到 context 上下文中
  ctx.log = contenxtLog

  await next()
}
