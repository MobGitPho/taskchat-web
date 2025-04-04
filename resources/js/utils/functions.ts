import imageCompression from 'browser-image-compression'
import _ from 'lodash'

/**
 * Generates the initials of a given name.
 *
 * @param {string} name - The name to generate the initials from.
 * @return {string} The initials of the given name.
 */
export function getNameInitials(name: string): string {
  const nameSplit = name.split(' '),
    initials =
      nameSplit.length > 1
        ? nameSplit[0].charAt(0).toUpperCase() +
          nameSplit[1].charAt(0).toUpperCase()
        : nameSplit[0].charAt(0).toUpperCase()

  return initials
}

/**
 * Generates a random integer between the provided minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @return {number} The randomly generated integer.
 */
export function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Removes the trailing slash from a given path.
 *
 * @param {string} path - The path to remove the trailing slash from.
 * @return {string} The path without the trailing slash.
 */
export function removeTrailingSlash(path: string): string {
  if (path.length > 1 && path.charAt(path.length - 1) === '/') {
    return path.substring(0, path.length - 1)
  }
  return path
}

/**
 * Removes the leading slash from a path if it starts with a slash.
 *
 * @param {string} path - The path from which to remove the leading slash.
 * @return {string} The path without the leading slash.
 */
export function removeLeadingSlash(path: string): string {
  if (path.startsWith('/')) {
    return path.slice(1)
  }
  return path
}

/**
 * Calculates the distance between two points on the Earth's surface using the Haversine formula.
 *
 * @param {number} lat1 - The latitude of the first point.
 * @param {number} lon1 - The longitude of the first point.
 * @param {number} lat2 - The latitude of the second point.
 * @param {number} lon2 - The longitude of the second point.
 * @return {number} The distance between the two points in kilometers.
 */
export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  var R = 6371
  var dLat = deg2rad(lat2 - lat1)
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c

  return d
}

/**
 * Converts degrees to radians.
 *
 * @param {number} deg - The angle in degrees.
 * @returns {number} The angle in radians.
 */
export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * Checks if the given path is an external URL, email address, or phone number.
 *
 * @param {string} path - The path to check.
 * @return {boolean} Returns true if the path is external, false otherwise.
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * Formats the given duration in seconds into a string representation of time.
 *
 * @param {number} duration - The duration in seconds to be formatted.
 * @param {Object} options - Optional parameters for formatting.
 * @param {string} options.separator - The separator used between hours, minutes, and seconds. Defaults to ':'.
 * @return {string} - The formatted time string.
 */
export function formatTimeFromSeconds(
  duration: number,
  { separator = ':' } = {}
): string {
  var hrs = ~~(duration / 3600)
  var mins = ~~((duration % 3600) / 60)
  var secs = ~~duration % 60

  var ret = ''

  if (hrs > 0) {
    ret +=
      '' + strPadLeft(String(hrs), '0', 2) + separator + (mins < 10 ? '00' : '')
  }

  ret +=
    '' + strPadLeft(String(mins), '0', 2) + separator + (secs < 10 ? '00' : '')
  ret += '' + strPadLeft(String(secs), '0', 2)

  return ret
}

/**
 * Pads the left side of a string with a specified character until it reaches a specified length.
 *
 * @param {string} string - The string to be padded.
 * @param {string} pad - The character used for padding.
 * @param {number} length - The desired length of the resulting string.
 * @return {string} The padded string.
 */
export function strPadLeft(string: string, pad: string, length: number) {
  return (new Array(length + 1).join(pad) + string).slice(-length)
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} string - The string to capitalize.
 * @return {string} The modified string with the first letter capitalized.
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Generates a password with the specified length and character options.
 *
 * @param {number} length - The length of the password to be generated. Default is 10.
 * @param {object} options - The character options for the password. Default is { letters: true, numbers: true, symbols: false }.
 * @param {boolean} options.letters - Specifies whether to include letters in the password. Default is true.
 * @param {boolean} options.numbers - Specifies whether to include numbers in the password. Default is true.
 * @param {boolean} options.symbols - Specifies whether to include symbols in the password. Default is false.
 * @return {string} The generated password.
 */
export function genPassword(
  length = 10,
  { letters = true, numbers = true, symbols = false } = {}
) {
  if (!letters && !numbers && !symbols) return ''

  let base: string[] = [],
    password = ''

  const numbersBase = '0123456789'.split(''),
    symbolsBase = '!@#$%^&*()'.split(''),
    lettersBase = 'abcdefghijklmnopqrstuvwxyz'.split('')

  if (letters) base.push(...lettersBase)
  if (numbers) base.push(...numbersBase)
  if (symbols) base.push(...symbolsBase)

  base = _.shuffle(base)

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * base.length)

    const char =
      lettersBase.includes(base[randomNumber]) &&
      Math.floor(Math.random() * 2) === 0
        ? base[randomNumber].toUpperCase()
        : base[randomNumber]

    password += char
  }

  return password
}

/**
 * Extracts uppercase words from the given input string.
 *
 * @param {string} input - The input string to extract uppercase words from.
 * @return {Array<string>} An array of uppercase words found in the input string.
 */
export function extractUppercaseWords(input: string) {
  return input.match(/(\b[A-Z]['A-Z]+|\b[A-Z]\b)/g)
}

/**
 * Extracts lowercase words from the input string.
 *
 * @param {string} input - The string to extract lowercase words from.
 * @return {string[]} An array of lowercase words extracted from the input string.
 */
export function extractLowercaseWords(input: string) {
  return input.match(/(\b[a-z]['a-z]+|\b[a-z]\b)/g)
}

/**
 * Generates a random color code in hexadecimal format.
 *
 * @return {string} The randomly generated color code.
 */
export function genRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

/**
 * Converts a data URL to a Blob object.
 *
 * @param {string} dataUrl - The data URL to be converted.
 * @return {Blob} The resulting Blob object.
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, body] = dataUrl.split(',')
  const [type] = header.split(';')
  const decodedBody = atob(body)
  const byteArray = new Uint8Array(decodedBody.length)

  for (let i = 0; i < decodedBody.length; i++) {
    byteArray[i] = decodedBody.charCodeAt(i)
  }

  return new Blob([byteArray], { type })
}

/**
 * Converts a data URL to a File object.
 *
 * @param {string} dataUrl - The data URL to convert.
 * @param {Object} options - Optional parameters.
 * @param {string} options.fileName - The name of the file. Default is 'file.png'.
 * @param {string} options.type - The MIME type of the file. Default is 'image/png'.
 * @returns {File} The converted File object.
 */
export function dataUrlToFile(
  dataUrl: string,
  {
    fileName = 'file.png',
    type = 'image/png',
  }: { fileName?: string; type?: string } = {}
): File {
  const blob = dataUrlToBlob(dataUrl)

  return new File([blob], fileName, {
    type: type || blob.type,
    lastModified: new Date().getTime(),
  })
}

/**
 * Creates a new array of pure JavaScript objects by making a shallow copy of each object in the input array.
 *
 * @param {Array<object>} array - The input array containing objects to be copied.
 * @return {Array<object>} A new array containing the copied objects.
 */
export function toArrayOfPureJsObjects(array: Array<object>) {
  return array.map((obj) => {
    return Object.assign({}, obj)
  })
}

/**
 * Converts a number of bytes to a human-readable file size.
 *
 * @param {number} bytes - The number of bytes to convert.
 * @param {boolean} si - Whether to use the SI units (1000) or binary units (1024).
 * @param {number} dp - The number of decimal places to round the result to.
 * @return {string} The human-readable file size.
 */
export function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return bytes.toFixed(dp) + ' ' + units[u]
}

/**
 * Returns the filename from a given URL.
 *
 * @param {string} url - The URL from which to extract the filename.
 * @return {string} The filename extracted from the URL.
 */
export function filenameFromUrl(url: string) {
  return url.substring(url.lastIndexOf('/') + 1)
}

/**
 * Downloads a file by URL.
 *
 * @param {string} url - The URL of the file to be downloaded.
 */
export function downloadByUrl(url: string) {
  var element = document.createElement('a')
  element.setAttribute('href', url)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

/**
 * Downloads the given object as a JSON file with the specified name.
 *
 * @param {object} exportObj - The object to be exported as JSON.
 * @param {string} exportName - The name of the exported file.
 * @return {void} This function does not return a value.
 */
export function downloadObjectAsJson(exportObj: object, exportName: string) {
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj, null, 2))

  var element = document.createElement('a')
  element.setAttribute('href', dataStr)
  element.setAttribute('download', exportName + '.json')

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

/**
 * Parses an INI string and returns an object containing the key-value pairs.
 *
 * @param {string} iniString - The INI string to parse.
 * @return {{ [key: string]: string }} - An object containing the key-value pairs parsed from the INI string.
 */
export function parseINIString(iniString: string): { [key: string]: string } {
  const lines = iniString.split('\n')
  const result: { [key: string]: string } = {}

  let currentSection: string | null = null
  for (const line of lines) {
    // eslint-disable-next-line no-useless-escape
    const section = line.match(/^\s*\[([^\[\]]+)\]\s*$/)
    if (section) {
      currentSection = section[1]
      continue
    }

    const keyValue = line.match(/^\s*([^=]+?)\s*=\s*(.+?)\s*$/)
    if (keyValue) {
      const key = keyValue[1]
      const value = keyValue[2]
      if (currentSection) {
        result[`${currentSection}.${key}`] = value
      } else {
        result[key] = value
      }
    }
  }

  return result
}

/**
 * Compresses an image file.
 *
 * @param {File} file - The image file to compress.
 * @param {Object} options - Optional parameters for compression.
 * @param {number} options.maxSizeMB - The maximum size of the compressed image file in megabytes (default is 1MB).
 * @param {number} options.maxWidthOrHeight - The maximum width or height of the compressed image file in pixels (default is 1920).
 * @return {Promise<File>} The compressed image file.
 */
export async function compressImage(
  file: File,
  { maxSizeMB = 1, maxWidthOrHeight = 1920 } = {}
) {
  const extensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg']

  const fileExt = file.name.split('.').pop()

  const options = {
    maxSizeMB: maxSizeMB,
    maxWidthOrHeight: maxWidthOrHeight,
  }

  let result = file

  if (fileExt != null && extensions.includes(fileExt.toLowerCase())) {
    try {
      result = await imageCompression(file, options)
    } catch (error) {
      console.log(error)
    }
  }

  if (result instanceof Blob) return new File([result], file.name)

  return result
}

/**
 * Returns the base URL of the current window location.
 *
 * @return {string} The base URL of the current window location.
 */
export function getBaseUrl() {
  return window.location.protocol + '//' + window.location.hostname
}

/**
 * Returns the URL of the current page by appending the base URL with the pathname.
 *
 * @return {string} The URL of the current page.
 */
export function getPageUrl() {
  return getBaseUrl() + window.location.pathname
}

/**
 * Generates a function comment for the given function body in a markdown code block with the correct language syntax.
 *
 * @param {string} url - the URL to open in the new window
 * @param {Array<string>} data - an array of strings containing the data to be sent to the server
 * @param {Object} options - an optional object containing target and method properties
 * @param {string} options.target - the target attribute for the form submission (default: '_self')
 * @param {string} options.method - the method attribute for the form submission (default: 'POST')
 * @return {void} This function does not return anything
 */
export function openWindowWithJS(
  url: string,
  data: { [key: string]: string },
  { target = '_self', method = 'POST' } = {}
) {
  var form = document.createElement('form')
  form.target = target
  form.method = method
  form.action = url
  form.style.display = 'none'

  for (var key in data) {
    var input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = data[key]
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

/**
 * Loads the metadata of an image from the specified URL.
 *
 * @param {string} url - The URL of the image.
 * @return {Promise<Image>} A promise that resolves with the loaded image.
 */
export function loadImageMeta(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/**
 * Abbreviates a number by adding a suffix representing the magnitude.
 *
 * @param {number} number - The number to be abbreviated.
 * @return {string} The abbreviated number with the magnitude suffix.
 */
export function abbreviateNumber(number: number) {
  var SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

  var tier = (Math.log10(Math.abs(number)) / 3) | 0

  if (tier == 0) return number

  var suffix = SI_SYMBOL[tier]
  var scale = Math.pow(10, tier * 3)

  var scaled = number / scale

  return scaled.toFixed(1) + suffix
}

/**
 * Extracts numbers from a given string.
 *
 * @param {string} string - The string from which to extract numbers.
 * @param {object} options - Optional parameters for customization.
 * @param {boolean} options.array - Whether to return an array of numbers. Defaults to false.
 * @param {boolean} options.float - Whether to include floating-point numbers. Defaults to true.
 * @return {number|array} - The extracted number(s) from the string. If options.array is true, an array will be returned. Otherwise, a single number will be returned.
 */
export function extractNumber(
  string: string,
  { array = false, float = true } = {}
) {
  const result = string.toString().match(float ? /[+-]?\d+(\.\d+)?/g : /\d/g)

  if (result)
    return array
      ? result.map((r) => parseFloat(r))
      : parseFloat(result.join(''))
  else return array ? [0] : 0
}

/**
 * Extracts all alphabetic characters from a given string.
 *
 * @param {string} string - The input string.
 * @param {Object} options - Optional parameters.
 * @param {boolean} options.array - Whether to return the result as an array. Default is false.
 * @return {string | string[]} - The extracted alphabetic characters, either as a string or an array.
 */
export function extractAlphabet(string: string, { array = false } = {}) {
  const result = string.toString().match(/[a-zA-Z]/)

  if (result) return array ? result : result.join('')
  else return array ? [''] : ''
}

/**
 * Removes the specified searchString from the given str.
 *
 * @param {string} str - The original string.
 * @param {string} searchString - The string to be removed from str.
 * @return {string} The modified string with the searchString removed.
 */
export function removeFromString(str: string, searchString: string): string {
  if (str.endsWith(searchString)) {
    return str.slice(0, -searchString.length)
  }
  return str
}

/**
 * Replaces multiple parts of a string based on a given set of replacements.
 *
 * @param {string} inputString - The original string to be modified.
 * @param {Record<string, string>} replacements - An object containing key-value pairs where the key is the part to be replaced and the value is the replacement string.
 * @return {string} - The modified string with all occurrences of the specified parts replaced.
 */
export function replaceStringParts(
  inputString: string,
  replacements: Record<string, string>
): string {
  if (Object.keys(replacements).length === 0) {
    return inputString
  }

  // Create a regular expression pattern by joining all keys of replacements with the "|" (OR) operator
  const pattern = new RegExp(Object.keys(replacements).join('|'), 'g')

  // Use the replace method with a callback function
  const resultString = inputString.replace(pattern, (match) => {
    // Use the match as a key to get the replacement value from the replacements object
    return replacements[match]
  })

  return resultString
}

/**
 * Generates a custom ID of the specified length.
 *
 * @param {number} length - The length of the ID to be generated.
 * @return {string} The custom ID.
 */
export function generateCustomId(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    result += chars.charAt(randomIndex)
  }

  return result
}

/**
 * Removes duplicate elements from an array based on a specified property.
 *
 * @param {T[]} arr - The array from which duplicate elements will be removed.
 * @param {keyof T} property - The property used to determine duplicates.
 * @returns {T[]} The array with duplicate elements removed.
 */
export function removeDuplicates<T>(arr: T[], property: keyof T): T[] {
  const uniqueValues = new Set()

  return arr.filter((obj) => {
    const value = obj[property]

    if (!uniqueValues.has(value)) {
      uniqueValues.add(value)
      return true
    }

    return false
  })
}

/**
 * Converts a hexadecimal color code to an RGBA color with the specified alpha value.
 *
 * @param {string} hex - the hexadecimal color code
 * @param {number} alpha - the alpha value for the RGBA color
 * @return {string} the RGBA color code
 */
export function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Shuffles the elements in an array in place using the Fisher-Yates algorithm.
 *
 * @param {T[]} array - The array to be shuffled.
 * @return {T[]} The shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
  }
  return array
}

/**
 * Scrolls to the element with the specified ID, with a smooth animation.
 *
 * @param {string} id - The ID of the element to scroll to.
 */
export function slideToId(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    console.error(`Element with ID "${id}" not found.`)
  }
}
