import pathToRegexp from 'path-to-regexp'

export const compilePath = (pattern = '/', options) => {
    const { exact = false, strict = false, sensitive = false } = options
    const keys = []
    const re = pathToRegexp(pattern, keys, { end: exact, strict, sensitive })
    return { re, keys }
}

export const matchPath = (pathname, props, pathReAndKeys) => {
    const { path = '/', exact = false } = props
    const { re, keys } = pathReAndKeys
    const match = re.exec(pathname)

    if (!match)
        return null

    const [ url, ...values ] = match
    const isExact = pathname === url

    if (exact && !isExact)
        return null

    return {
        path, // the path pattern used to match
        url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
        isExact, // whether or not we matched exactly
        params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index]
            return memo
        }, {})
    }
}