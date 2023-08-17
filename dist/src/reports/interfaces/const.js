"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_TYPES = exports.STATUS = exports.SourcePlatform = void 0;
var SourcePlatform;
(function (SourcePlatform) {
    SourcePlatform["WEB"] = "web";
    SourcePlatform["IOS"] = "ios";
    SourcePlatform["ANDROID"] = "android";
})(SourcePlatform = exports.SourcePlatform || (exports.SourcePlatform = {}));
exports.STATUS = {
    REPORTED: 'reported',
    PENDING: 'pending',
};
exports.CONTENT_TYPES = {
    'activity.activity': 'activity',
    'activity.activitycomment': 'comment',
    'community.profile': 'profile',
    activity: 'activity',
    comment: 'comment',
    profile: 'profile',
    media: 'media',
};
//# sourceMappingURL=const.js.map