export default (req, res) => {
    const { tenantId, userId, password } = req.query
    if (userId === password) {
        res.status(200).json({ isLogin: true })
    } else {
        res.status(403).json({ isLogin: false })
    }
    
}