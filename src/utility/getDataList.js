export function getDirectorList(arr) {
    let myMap = new Map();
    let holder = []
    arr.forEach(movie => {
        if (!myMap.has(movie.director)) {
            myMap.set(movie.director, { name: movie.director })
        }
    })
    for (let director of myMap.values()) {
        holder.push(director)
    }
    return holder
}

export function getCertificationList(arr) {
    let myMap = new Map();
    let holder = []
    arr.forEach(movie => {
        if (!myMap.has(movie.certification)) {
            myMap.set(movie.certification, {
                label: movie.certification, value: movie.certification
            })
        }
    })
    for (let certification of myMap.values()) {
        holder.push(certification)
    }
    return holder
}