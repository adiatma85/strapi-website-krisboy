'use strict';

/**
 * A set of functions called "actions" for `query-search`
 */

module.exports = {

  // Without Parameter Call
  async normalCatalogPagination(ctx, next){
    
  },

  // With Parameter in Home Page Query
  async advancedHomepageQuery(ctx, next){

    // All Param
    var brandParam = ctx.query.brand ? ctx.query.brand : ""; // Perlu diingat ini nanti bisa aja dua kan ya?
    var tagParam = ctx.query.tag ? ctx.query.tag : ""; // Perlu diingat ini juga nanti dua atau lebih
    const minimalRangeValue = ctx.query.minimal ? ctx.query.minimal : 0; // Kalau ini pasti satu
    const maximalRangeValue = ctx.query.maximal ? ctx.query.maximal : 0; // Ini juga pasti satu gk sih

    // Cek if BrandParam and TagParam is an array or not
    // brandParam = brandParam.indexOf(',') > -1 ? brandParam.split(',') : brandParam;
    tagParam = tagParam.indexOf(',') > -1 ? tagParam.split(',') : brandParam;

    // Assign objectParam
    const objBrandParam = brandParam ? { brand: { $contains: brandParam }} : null;
    const rangeaValueParam = minimalRangeValue && maximalRangeValue ? { price: {$lte: maximalRangeValue, $gte: minimalRangeValue}} : null;
    const objTagPram = tagParam ? { tags: { name: { $contains: tagParam } } }: {};

    const whereCondition = {
      ...objBrandParam,
      ...objTagPram,
      ...rangeaValueParam,
    }

    const entries = await strapi.db.query('api::review.review').findMany({
      select: ['title', 'brand'],
      where: whereCondition,
      populate: { tags: true },
    });
    
    ctx.body = entries
  },
};
