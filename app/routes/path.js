module.exports = (express) => {
    const router = express.Router();
    const pathController = require('../controllers/pathContoller');

    /**
     * @param /path/findPath
     * @desc 길찾기
     * */
    router.post('/findPath', pathController.findPath);

    return router;
};
