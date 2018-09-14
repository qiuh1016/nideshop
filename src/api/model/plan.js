module.exports = class extends think.Model {

  async getPlanAndItems(id) {
    let plan = await this.model('plan').where({ id }).find();
    let items = await this.model('plan_item').where({ plan_id: id }).select();
    for (let i in items) {
      let item = items[i];
      let goods = await this.model('goods').where({id: item.goods_id}).field(['list_pic_url']).find();
      item.url = goods.list_pic_url;
    }
    return { plan, items };
  }
}
