const sendSuccessResponse = ({ message, data = {}, res }) => {
    return res.status(200).json({ message, data, success: true });
}

module.exports = { sendSuccessResponse }