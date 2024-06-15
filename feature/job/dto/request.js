// Job request dto
function jobRequest(body) {
    const { name, nik, address, phone } = body;
    return { name, nik, address, phone };
}

module.exports = { jobRequest };