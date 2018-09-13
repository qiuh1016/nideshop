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
    const image = this.file('image');
    const stylist_id = this.post('stylist_id') || 1;
    const name = this.post('name');
    const style = this.post('style');
    const fit_group = this.post('fit_group');
    const fit_scene = this.post('fit_scene');
    const desc = this.post('desc');
    const goodsArr = JSON.parse(this.post('goodsArr'));

    const add_time = new Date()

    const image_path = think.ROOT_PATH + `/www/static/plan/${add_time.getTime()}.png`
    const image_url = `http://192.168.0.120:8360/static/plan/${add_time.getTime()}.png`
    const model = this.model('plan');
    const plan_id = await model.add({
      stylist_id, name, style, fit_group, fit_scene, desc, image_url
    })

    for (let i = 0; i < goodsArr.length; i++) {
      const item_model = this.model('plan_item');
      const goods = goodsArr[i];
      await item_model.add({
        plan_id: plan_id,
        goods_id: goods.id,
        x: goods.x,
        y: goods.y,
        w: goods.w,
        h: goods.h,
        enabled: goods.enabled
      })
    }

    if (think.isEmpty(image)) {
      return this.fail('保存失败');
    }

    let that = this;
    fs.rename(image.path, image_path, function(res) {
      return that.success();
    });
  }

  /**
   * 根据搭配师和风格 显示方案
   */
  async listAction() {
    const stylist_id = this.get('stylist_id') || 1;
    const style = this.get('style') || '简约';
    this.success(await this.model('plan').where({stylist_id, style}).select())
  }

  /**
   * 搜索搭配方案
   */
  async searchAction() {
    const stylist_id = this.get('stylist_id') || 1;
    const keyword = this.get('keyword');
    const plans = await this.model('plan').where({ stylist_id: stylist_id, name : ['like', `%${keyword}%`] }).select();
    this.success(plans)
  }
};
