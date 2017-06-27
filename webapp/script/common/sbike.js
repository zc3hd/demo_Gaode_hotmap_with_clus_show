/**
 * Created by cc on 2017/4/19.
 */
(function(win, $) {
  var sbike = win.sbike = win.sbike || {
    basePrefixURL: 'http://' + window.location.host + "/sbike_monitor",
    basePrefixImgUrl: "",
    module: {},
    // **************************************************************监控层的配置
    // --------------------------围栏的数据
    // 围栏正常的图片
    fence_nor: '../../images/map/fence_nor.png',
    // 围栏异常的图片
    fence_unnor: '../../images/map/fence_unnor.png',

    // mass围栏显示的大小
    // ---3-13 --0.5
    fence_size_s: [16, 12.5],
    //  19----1
    fence_size_l: [64, 50],



    // 围栏图片实际的大小-width height-px---用于打围栏上面的定点的marker
    fence_true_size: [64, 50],
    // 宏观围栏的循环时间
    fence_big_time: 10000,
    // 围观围栏的循环时间
    fence_small_time: 10000,
    
    // 围栏显示的样式
    fence_styleOptions: {
      strokeColor: "blue", //边线颜色。
      fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 1, //边线的宽度，以像素为单位。
      strokeOpacity: 0.5, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.1, //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid' //边线的样式，solid或dashed。
    },
    // --------------------------自行车的数据
    bike_time: 10000,

    // mass自行车显示的大小
    // ---3-13 --0.5
    bike_size_s: [13.75, 16.5],
    bike_size_l: [55, 66],

    // 自行车报警的图片名称
    bike_alarm: '../../images/map/alarm_',
    // 自行车非本区的图片名称
    bike_un_area: '../../images/map/fb_',
    // 自行车图片的格式
    bike_img_type: '.png',
    // **************************************************************围栏的配置
    // 围栏显示的样式
    fence_styleOptions: {
      strokeColor: "blue", //边线颜色。
      fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 1, //边线的宽度，以像素为单位。
      strokeOpacity: 0.5, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.1, //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid' //边线的样式，solid或dashed。
    },
    // 编辑围栏的样式
    fence_editOptions: {
      strokeColor: "red", //边线颜色。
      fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 1, //边线的宽度，以像素为单位。
      strokeOpacity: 0.5, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.1, //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid' //边线的样式，solid或dashed。
    },
    // **************************************************************顶部通栏配置
    // 上部通栏信息循环时间
    top_info_time:10000,
  }
})(window, jQuery);
