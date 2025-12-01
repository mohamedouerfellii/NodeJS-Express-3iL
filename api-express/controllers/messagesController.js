module.exports = {
    getAll : function(req, res) {
        res.status(200).json(
            {
                status: 'success',
                data: 'coucou'
            }
        );
    }
}