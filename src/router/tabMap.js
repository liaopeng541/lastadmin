

export default {
  install:(Vue)=>{

    Vue.component('home', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/home')),'home')})
		Vue.component('admin_AdminAuthItem_index', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/admin/AdminAuthItem')),'admin_AdminAuthItem')})
    Vue.component('shop_HhPrize_index', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/shop/HhPrize/index')),'shop_HhPrize_index')})
    Vue.component('admin_AdminUser_index', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/admin/AdminUser')),'admin_AdminUser')})
    Vue.component('admin_AdminMenu_index', (resolve) => {require.ensure([], () => resolve(require('@pages/modules/admin/AdminMenu')),'admin_AdminMenu')})
				// Vue.component('admin_AdminUser', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/AdminUser')),'admin_AdminUser')}),
				// Vue.component('admin_AdminMenu', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/AdminMenu')),'admin_AdminMenu')}),
				// Vue.component('system_HhServicePriceTactics', (resolve) => {require.ensure([], () => resolve(require('@pages/system/HhServicePriceTactics')),'system_HhServicePriceTactics')}),
				// Vue.component('system_HhServiceCat', (resolve) => {require.ensure([], () => resolve(require('@pages/system/HhServiceCat')),'system_HhServiceCat')}),
				// Vue.component('system_HhService', (resolve) => {require.ensure([], () => resolve(require('@pages/system/HhService')),'system_HhService')}),
				// Vue.component('system_HhProcess', (resolve) => {require.ensure([], () => resolve(require('@pages/system/HhProcess')),'system_HhProcess')}),
				// Vue.component('system_HhProcessCat', (resolve) => {require.ensure([], () => resolve(require('@pages/system/HhProcessCat')),'system_HhProcessCat')}),
				// Vue.component('system_HhOtoOrderType', (resolve) => {require.ensure([], () => resolve(require('@pages/system/HhOtoOrderType')),'system_HhOtoOrderType')}),
				// Vue.component('shop_SepcItem', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/SepcItem')),'shop_SepcItem')}),
				// Vue.component('shop_Spec', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/Spec')),'shop_Spec')}),
				// Vue.component('shop_GoodsType', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/GoodsType')),'shop_GoodsType')}),
				// Vue.component('shop_LpGoodsGift', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/LpGoodsGift')),'shop_LpGoodsGift')}),
				// Vue.component('shop_LpGoodsCategory', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/LpGoodsCategory')),'shop_LpGoodsCategory')}),
				// Vue.component('shop_LpBrand', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/LpBrand')),'shop_LpBrand')}),
				// Vue.component('shop_Lp_coupon', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/Lp_coupon')),'shop_Lp_coupon')}),
				// Vue.component('shop_LpGoods', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/LpGoods')),'shop_LpGoods')}),
				// Vue.component('store_HhStore', (resolve) => {require.ensure([], () => resolve(require('@pages/store/HhStore')),'store_HhStore')}),
				// Vue.component('app_Lp_mobile_window_item', (resolve) => {require.ensure([], () => resolve(require('@pages/app/Lp_mobile_window_item')),'app_Lp_mobile_window_item')}),
				// Vue.component('app_Lp_mobile_window', (resolve) => {require.ensure([], () => resolve(require('@pages/app/Lp_mobile_window')),'app_Lp_mobile_window')}),
				// Vue.component('finance_FinanceRechangeTatal', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/FinanceRechangeTatal')),'finance_FinanceRechangeTatal')}),
				// Vue.component('finance_FinanceShopTotal', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/FinanceShopTotal')),'finance_FinanceShopTotal')}),
				// Vue.component('finance_FinanceCash', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/FinanceCash')),'finance_FinanceCash')}),
				// Vue.component('finance_FinanceCard', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/FinanceCard')),'finance_FinanceCard')}),
				// Vue.component('store_LpUserLevel', (resolve) => {require.ensure([], () => resolve(require('@pages/store/LpUserLevel')),'store_LpUserLevel')}),
				// Vue.component('store_LpUsers', (resolve) => {require.ensure([], () => resolve(require('@pages/store/LpUsers')),'store_LpUsers')}),
				// Vue.component('system_HhUserBag', (resolve) => {require.ensure([], () => resolve(require('@pages/system/HhUserBag')),'system_HhUserBag')}),
				// Vue.component('store_HhUserBagLog', (resolve) => {require.ensure([], () => resolve(require('@pages/store/HhUserBagLog')),'store_HhUserBagLog')}),
				// Vue.component('shop_HhUsersCar', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/HhUsersCar')),'shop_HhUsersCar')}),
				// Vue.component('shop_LpOrder', (resolve) => {require.ensure([], () => resolve(require('@pages/shop/LpOrder')),'shop_LpOrder')}),
				// Vue.component('store_HhOtoOrder', (resolve) => {require.ensure([], () => resolve(require('@pages/store/HhOtoOrder')),'store_HhOtoOrder')}),
				// Vue.component('store_LpRechargeOrder', (resolve) => {require.ensure([], () => resolve(require('@pages/store/LpRechargeOrder')),'store_LpRechargeOrder')}),
				// Vue.component('finance_FinanceCat', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/FinanceCat')),'finance_FinanceCat')}),
				// Vue.component('finance_HhOtoOrder', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/HhOtoOrder')),'finance_HhOtoOrder')}),
				// Vue.component('finance_LpRechargeOrderInvoice', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/LpRechargeOrderInvoice')),'finance_LpRechargeOrderInvoice')}),
				// Vue.component('finance_FinanceInvoice', (resolve) => {require.ensure([], () => resolve(require('@pages/finance/FinanceInvoice')),'finance_FinanceInvoice')}),
				// Vue.component('admin_CooperateCat', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/CooperateCat')),'admin_CooperateCat')}),
				// Vue.component('admin_CooperatePacket', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/CooperatePacket')),'admin_CooperatePacket')}),
				// Vue.component('admin_CooperateBatch', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/CooperateBatch')),'admin_CooperateBatch')}),
				// Vue.component('admin_CooperateLog', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/CooperateLog')),'admin_CooperateLog')}),
				// Vue.component('admin_CooperateBatchCard', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/CooperateBatchCard')),'admin_CooperateBatchCard')}),
      //
      // Vue.component('admin_adminUser', (resolve) => {require.ensure([], () => resolve(require('@pages/admin/adminUser/index')))})
  }
}