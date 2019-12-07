export default class Time {
  constructor(number) {
    this.date = number
  }
  toString() {
    let date = new Date(this.date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let second = date.getSeconds()
    return `${year} -${month}-${day}  ${hours}:${minutes}:${second}`
  }
}