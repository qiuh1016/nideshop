const Base = require('./base.js');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Base {
  async indexAction() {
    think.logger.debug(think.ROOT_PATH + '/www/');
    return this.success(think.RESOURCE_PATH);
  }

  async getAction() {
    let id = this.get('id');
    let data = await this.model('plan').getPlanAndItems(id);
    this.success(data, 'ok');
  }

  async updateAction() {
    const image = this.file('image');
    const plan_id = this.post('id')
    const name = this.post('name');
    const style = this.post('style');
    const fit_group = this.post('fit_group');
    const fit_scene = this.post('fit_scene');
    const desc = this.post('desc');
    const goodsArr = JSON.parse(this.post('goodsArr'));

    const add_time = new Date()

    const image_path = think.ROOT_PATH + `/www/static/plan/${plan_id}.png`
    const image_url = `${think.config('hostUrl')}/static/plan/${plan_id}.png`

    await this.model('plan').where({ id: plan_id }).update({
      name, style, fit_group, fit_scene, desc, image_url, add_time
    });

    await this.model('plan_item').where({ plan_id }).delete();

    for (let i = 0; i < goodsArr.length; i++) {
      const item_model = this.model('plan_item');
      const goods = goodsArr[i];
      if (goods.x < 0) goods.x = 0;
      if (goods.y < 0) goods.y = 0;
      if (goods.z < 0) goods.z = 0;
      await item_model.add({
        plan_id: plan_id,
        goods_id: goods.goods_id,
        x: goods.x,
        y: goods.y,
        z: goods.z,
        w: goods.w,
        h: goods.h,
        enabled: goods.enabled
      })
    }

    if (think.isEmpty(image)) {
      return this.fail('保存失败');
    }

    let that = this;
    fs.rename(image.path, image_path, function (res) {
      return that.success();
    });
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

    const model = this.model('plan');
    const plan_id = await model.add({
      stylist_id, name, style, fit_group, fit_scene, desc, add_time
    })
    const image_path = think.ROOT_PATH + `/www/static/plan/${plan_id}.png`
    const image_url = `${think.config('hostUrl')}/static/plan/${plan_id}.png`
    await model.where({ id: plan_id }).update({ image_url });

    for (let i = 0; i < goodsArr.length; i++) {
      const item_model = this.model('plan_item');
      const goods = goodsArr[i];
      if (goods.x < 0) goods.x = 0;
      if (goods.y < 0) goods.y = 0;
      if (goods.z < 0) goods.z = 0;
      await item_model.add({
        plan_id: plan_id,
        goods_id: goods.goods_id,
        x: goods.x,
        y: goods.y,
        z: goods.z,
        w: goods.w,
        h: goods.h,
        enabled: goods.enabled
      })
    }

    if (think.isEmpty(image)) {
      return this.fail('保存失败');
    }

    let that = this;
    fs.rename(image.path, image_path, function (res) {
      return that.success();
    });
  }

  /**
   * 根据搭配师和风格 显示方案
   */
  async listAction() {
    let styles = ['简约', '休闲', '轻时尚'];
    const stylist_id = this.get('stylist_id') || 1;
    const style_id = this.get('style_id') || -1;
    let whereJson = { stylist_id }
    if (style_id != -1) {
      whereJson.style = styles[style_id]
    }
    this.success(await this.model('plan').where(whereJson).select())
  }

  /**
   * 搜索搭配方案
   */
  async searchAction() {
    const stylist_id = this.get('stylist_id') || 1;
    const keyword = this.get('keyword');
    const plans = await this.model('plan').where({ stylist_id: stylist_id, name: ['like', `%${keyword}%`] }).select();
    this.success(plans)
  }
};
