
export const isEncoder = (user) => {

    return ( user === 'active' && user.access === 'encoder')
}

export const isAdmin = (user) => {
    return (user.status === 'active' && user.access ==='admin' )
}

export const canInsert = (user) => {
    const doInsert = (
        isEncoder(user) || isAdmin(user)
    )
    return doInsert
}