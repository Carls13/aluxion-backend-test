const statusMessages = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
};

const mapStatusCodeMessage = (code) => {
    return statusMessages[code];
}

exports.success = (req, res, message, code) => {
    res.status(code || 200).send({
        error: '',
        body: message || mapStatusCodeMessage(code)
    });
}

exports.error = (req, res, message, code, error) => {
    console.error(error);
    res.status(code || 500).send({
        error: mapStatusCodeMessage(code),
        body: message
    });
}