import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
VantComponent({
  classes: ['num-class', 'rating-class','desc-class', 'thumb-class', 'title-class', 'price-class', 'origin-price-class'],
  mixins: [link],
  props: {
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    originPrice: String,
    rating: String,
    display_phoneL:String,
    price:String,
    categorie:String,
    url:String,
    thumbMode: {
      type: String,
      value: 'aspectFit'
    },
    currency: {
      type: String,
      value: '¥'
    }
  },
  methods: {
    onClickThumb: function onClickThumb() {
      this.jumpLink('thumbLink');
    },
    goto:function(e){
      var that = this;
      wx.navigateTo({
        url: e.target.dataset.url,
      })
    }
  }
});