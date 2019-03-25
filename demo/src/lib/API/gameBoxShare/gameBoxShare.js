var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var gameBoxShare = /** @class */ (function () {
    function gameBoxShare() {
        var _this = this;
        this.shareAPI = window['shareAPI'] || {};
        //当前的客户端配置
        this.curConfig = {};
        this.getClientConfig = function () {
            return new Promise(function (resolve) {
                window['setShareData'] = function (clientConfig) {
                    _this.initConfig = clientConfig;
                    resolve();
                };
                _this.shareAPI.getShareData && _this.shareAPI.getShareData();
            });
        };
        /**
         * 定制客户端分享并打开分享面板
         */
        this.openShare = function (userConfig) {
            if (userConfig === void 0) { userConfig = {}; }
            var fianlConfig = _this.mergeConfig(_this.initConfig, userConfig);
            _this.callShare(fianlConfig);
            return _this.shareComplete();
        };
        /**
         * 定制客户端分享并直接分享到对应渠道
         */
        this.shareForType = function (userConfig) {
            var _a = _this.initConfig, shareIcon = _a.shareIcon, shareTitle = _a.shareTitle, shareContent = _a.shareContent;
            var fianlConfig = _this.mergeConfig(_this.initConfig, _this.mergeConfig({
                icon: shareIcon,
                title: shareTitle,
                message: shareContent
            }, userConfig));
            _this.callShareForType(fianlConfig);
            return _this.shareComplete();
        };
        this.init();
    }
    gameBoxShare.prototype.mergeConfig = function (into, from) {
        for (var key in from) {
            if (into[key] && into[key].toString() === "[object Object]") {
                this.mergeConfig(into[key], from[key]);
            }
            else {
                into[key] = from[key];
            }
        }
        return into;
    };
    gameBoxShare.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClientConfig()];
                    case 1:
                        _a.sent();
                        this.test();
                        return [2 /*return*/];
                }
            });
        });
    };
    gameBoxShare.prototype.test = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    gameBoxShare.prototype.shareComplete = function () {
        return new Promise(function (resolve) {
            window['shareCompleted'] = function (e) {
                resolve(e);
            };
        });
    };
    gameBoxShare.prototype.callShare = function (finalConfig) {
        this.shareAPI.onJsShare(JSON.stringify(finalConfig));
    };
    gameBoxShare.prototype.callShareForType = function (finalConfig) {
        this.shareAPI.onJsShareForType(JSON.stringify(finalConfig));
    };
    /**设置分享配置，会影响右上角分享组件的配置。*/
    gameBoxShare.prototype.setClientShare = function (config) {
        this.curConfig = this.mergeConfig(this.initConfig, config);
        window['openShare'] = this.callShare(this.curConfig);
    };
    /**重置分享配置为初始状态（读取后台配置），会影响右上角配置*/
    gameBoxShare.prototype.resetClientShare = function (config) {
        this.curConfig = Object.assign({}, this.initConfig);
        window['openShare'] = this.callShare(this.curConfig);
    };
    return gameBoxShare;
}());
export default new gameBoxShare();
