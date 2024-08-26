import colors from 'colors'

export class Logger {
    public static info = (msg: any) =>
        console.log(colors.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof msg === 'string' ? colors.blue(msg) : msg)
    public static warn = (msg: any) =>
        console.log(colors.yellow(`[${new Date().toLocaleString()}] [INFO]`), typeof msg === 'string' ? colors.yellow(msg) : msg)
    public static error = (msg: any) =>
        console.log(colors.red(`[${new Date().toLocaleString()}] [INFO]`), typeof msg === 'string' ? colors.red(msg) : msg)
}
