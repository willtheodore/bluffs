export function formatDateForDescription(date) {
  if (date) {
    const jsDate = new Date(date.seconds * 1000)
    const month = jsDate.getMonth() + 1
    const day = jsDate.getDate()
    const year = jsDate.getYear().toString().slice(1)
    const { hours, apm } = parseHours(jsDate.getHours())
    const minutes = parseMinutes(jsDate.getMinutes())

    return `${month}/${day}/${year} at ${hours}:${minutes} ${apm}`
  } else {
    return "MM/DD/YY at HH:MM AM"
  }
}

export function parsePath(location) {
  if (location) {
    const path = location.pathname
    let stringBuild = ""
    let tokens = []
    for (let i = 0; i < path.length; i++) {
      if (path.charAt(i) == "/") {
        if (stringBuild != "") {
          tokens.push(stringBuild)
        }
        stringBuild = ""
      } else {
        stringBuild = stringBuild.concat(path.charAt(i))
      }
    }
    if (stringBuild != "") {
      tokens.push(stringBuild)
    }
    return tokens
  }
}

function parseMinutes(minutes) {
  if (minutes < 10) { return `0${minutes}` }
  else { return minutes }
}

function parseHours(hours) {
  let result = {
    hours: hours,
    apm: "AM"
  }
  if (hours > 12) {
    result.hours = hours - 12
    result.apm = "PM"
  }
  return result
}
