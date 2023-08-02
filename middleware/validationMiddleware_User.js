export function validateJSON_createUser(req, res, next) {
    const expectedKeys = [
        "user_id",
        "name",
        "email",
        "user_type"
    ]

    try {
        const incomingKeys_createUser = Object.keys(req.body);
        const isPayloadValid = expectedKeys.every(key => incomingKeys_createUser.includes(key))
        if(!isPayloadValid) {
            return res.status(400).json({error: "Invalid JSON payload format for createUser"})
        } else {
            next()
        }
    } catch (e) {
        return res.status(400).json({error: e})
    } finally {

    }
}

export function validateJSON_updateUser(req, res, next) {
    const expectedKeys = [
        "user_id",
        "name",
        "email",
        "user_type"
    ]

    try {
        const incomingKeys_updateUser = Object.keys(req.body);
        const isPayloadValid = expectedKeys.every(key => incomingKeys_updateUser.includes(key))
        if(!isPayloadValid) {
            return res.status(400).json({error: "Invalid JSON payload format for updateUser"})
        } else {
            next()
        }
    } catch (e) {
        return res.status(400).json({error: e})
    } finally {

    }
}


export function validateParam_getUser(req, res, next) {
    try {
        if(!req.query.hasOwnProperty('user_id')) {
            return res.status(400).json({error: "Missing user_id key for get User query"})
        } else {
            next()
        }
    } catch (e) {
        return res.status(400).json({error: e})
    } finally {

    }
}

export function validateParam_deleteUser(req, res, next) {
    try {
        if(!req.query.hasOwnProperty('user_id')) {
            return res.status(400).json({error: "Missing user_id key for delete User query"})
        } else {
            next()
        }
    } catch (e) {
        return res.status(400).json({error: e})
    } finally {

    }
}