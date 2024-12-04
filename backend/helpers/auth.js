import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' })
    try {
        const authHeader = req.headers.authorization
        const accessToken = authHeader.split(' ')[1]
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export { auth }