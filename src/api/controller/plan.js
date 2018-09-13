const Base = require('./base.js');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Base {
  async indexAction() {
    think.logger.debug(think.ROOT_PATH + '/www/');
    return this.success(think.RESOURCE_PATH);
  }

  /**
   * 保存方案图片
   * @returns {Promise.<void>}
   */
  async saveAction() {
    const avatar = this.file('avatar');
    if (think.isEmpty(avatar)) {
      console.log('保存失败')
      return this.fail('保存失败');
    }

    // const avatarPath = think.RESOURCE_PATH + `/static/user/avatar/${this.getLoginUserId()}.` + _.last(_.split(avatar.path, '.'));
    const avatarPath = think.ROOT_PATH+ `/www/static/user/avatar/test.png` //+ _.last(_.split(avatar.path, '.'));
    let that = this;
    fs.rename(avatar.path, avatarPath, function(res) {
      return that.success();
    });
  }
};
