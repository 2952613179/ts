(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e5b7"],{d4e6:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mt-header",{attrs:{fixed:"",title:t.tabbar}}),a("mt-tabbar",{attrs:{fixed:""},model:{value:t.tabbar,callback:function(e){t.tabbar=e},expression:"tabbar"}},t._l(t.tabList,(function(e,n){return a("mt-tab-item",{key:n,attrs:{id:e.label}},[a("i",{class:e.icon}),a("p",[t._v(t._s(e.label))])])})),1),a("div",{staticStyle:{"margin-top":"40px","padding-bottom":"62px"}},[a("router-view")],1)],1)},i=[],o=(a("4de4"),{name:"Home",data:function(){return{tabbar:"今日签到",tabList:[{label:"今日签到",a:"/student/home/sign",icon:"el-icon-edit-outline"},{label:"签到记录",a:"/student/home/signMessage",icon:"el-icon-document"},{label:"作业提交",a:"/student/home/job",icon:"el-icon-upload"},{label:"作业记录",a:"/student/home/jobMessage",icon:"el-icon-document"},{label:"作业列表",a:"/student/home/jobList",icon:"el-icon-document"}]}},watch:{tabbar:function(t){t!==window.sessionStorage.getItem("tab")&&(window.sessionStorage.setItem("tab",t),this.$router.push(this.tabList.filter((function(e){return e.label==t}))[0].a))}},created:function(){var t=window.sessionStorage.getItem("tab");if(t){this.tabbar=t;var e=this.tabList.filter((function(e){return e.label==t}))[0];this.$route.path!==e.a&&this.$router.push(e.a)}}}),s=o,r=a("2877"),b=Object(r["a"])(s,n,i,!1,null,"5656682c",null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d21e5b7.01d6efc5.js.map