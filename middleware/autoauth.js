/**
 * Created by Administrator on 2016/11/18.
 */
exports.checkLogin= function (req, res, next) {
    if(req.session.user)
    {
        next()
    }else
    {
        res.redirect('/user/login')
    }
};
//¼ì²éÓÃ»§Î´µÇÂ¼
exports.checkNotLogin= function (req, res, next) {
    if(req.session.user)
    {
        res.redirect('/')
    }else
    {
        next()
    }
};
