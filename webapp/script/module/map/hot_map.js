/**
 * Item Name  : 
 *Creator         :cc
 *Email            :cc
 *Created Date:2017.6.27
 *@pararm     :
 */
(function($, window) {
  function Hot_map(opts) {
    this.id = opts.id;

    // 热力的数据
    this.hot_arr = [];

    // 聚合数据
    this.clus_arr = [];

    // ----------------------------------api
    // this.api = new sbike.module.server().map.tj;
  };
  Hot_map.prototype = {
    //面向对象初始化
    init: function() {
      var me = this;
      me.init_Baner(); //开启控件
      setTimeout(function() {
        me.init_event();
      }, 500);
    },
    //控件默认初始化
    init_Baner: function() {
      var me = this;
      var map = me.map = new AMap.Map(me.id, {
        expandZoomRange: true,
        zoom: 12,
        labelzIndex: 10,
        zooms: [3, 18],
        features: ['road', 'building'],
      });
    },
    init_event: function() {
      var me = this;
      me._bind();
      me._hot();
    },
    _hot: function() {
      var me = this;
      me._init();
    },
    _bind: function() {
      var me = this;

      var fn = {
        _init: function() {
          me._hot_tool();
        },
        // 添加热力图工具
        _hot_tool: function() {
          me.map.plugin(["AMap.Heatmap"], function() {
            //初始化heatmap对象
            me.heatmap = new AMap.Heatmap(me.map, {
              radius: 35, //给定半径
              opacity: [0, 0.8],
              zooms: [3, 18]
            });

            // 请求数据
            me._ajax();
          });
        },
        // ---请求数据
        _ajax: function() {
          // me.api.hot()
          //   .done(function(data) {
          //     console.log(JSON.stringify(data.data));
          //     me._ajax_done(data.data);
          //     me._inject_data();
          //   });
          var arr = [];
          for (var i = 0; i < 2000; i++) {
            arr.push({
              lng:116.442213+Math.random()*10,
              lat:39.920912+Math.random()*10,
              count: 1
            });
          }
          me._ajax_done(arr);
          me._inject_data();
        },
        // ----数据处理
        _ajax_done: function(arr) {
          me.hot_arr = arr;
          for (var i = 0; i < arr.length; i++) {
            // ------------聚合数据初始化
            me.clus_arr.push(new AMap.Marker({
              position: [arr[i].lng, arr[i].lat],
              // content: '',
              content: '<div style="background-color: hsla(180, 100%, 50%, 0); height: 24px; width: 24px;"></div>',
              offset: new AMap.Pixel(-15, -15)
            }));
          }
        },
        // ----聚合工具
        _clus_tool: function() {

          var _cluser_Marker = function(context) {
            var div = document.createElement('div');

            div.style.width = div.style.height = '20px';
            div.style.backgroundColor = 'rgba(0,0,0,0)';

            div.style.border = 'none';

            div.style.color = '#000000';
            div.style.fontSize = '10px';
            div.style.lineHeight = '20px';
            div.style.textAlign = 'center';
            div.innerHTML = context.count;

            context.marker.setOffset(new AMap.Pixel(-10, -10));
            context.marker.setContent(div)
          };

          me.map.plugin(["AMap.MarkerClusterer"], function() {
            new AMap.MarkerClusterer(me.map, me.clus_arr, {
              gridSize: 10,
              renderCluserMarker: _cluser_Marker
            });
          });
        },

        // 注入数据
        _inject_data: function() {
          //设置数据集：该数据为北京部分“公园”数据
          me.heatmap.setDataSet({
            data: me.hot_arr,
            max: 1
          });
          me._clus_tool();
          me.map.setFitView(me.clus_arr);
        },
      };


      for (var k in fn) {
        me[k] = fn[k];
      };

    },
  };
  sbike.module["Hot_map"] = Hot_map;
})(jQuery, window);
