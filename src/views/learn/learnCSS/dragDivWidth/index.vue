<template>
  <div class="box">
    <div class="side">
      <div class="bar">⋮</div>
      <div class="text">
        对酒当歌1，人生几何2！
        譬如朝露，去日苦多3。
        慨当以慷4，忧思难忘。
        何以解忧？唯有杜康5。
        青青子衿，悠悠我心6。
        但为君故，沉吟至今7。
        呦呦鹿鸣，食野之苹。
        我有嘉宾，鼓瑟吹笙8。
        明明如月，何时可掇9？
        忧从中来，不可断绝。
        越陌度阡10，枉用相存11。
        契阔谈宴12，心念旧恩。
        月明星稀，乌鹊南飞。
        绕树三匝13，何枝可依？
        山不厌高，海不厌深14。
        周公吐哺，天下归心15。 [1]
      </div>
    </div>
    <div class="content">
      滕王阁序1
      豫章故郡，洪都新府2。星分翼轸，地接衡庐3。襟三江而带五湖4，控蛮荆而引瓯越5。物华天宝，龙光射牛斗之墟6；人杰地灵，徐孺下陈蕃之榻7。雄州雾列8，俊采星驰9。台隍枕夷夏之交10，宾主尽东南之美11。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻12。十旬休假13，胜友如云；千里逢迎14，高朋满座。腾蛟起凤，孟学士之词宗15；紫电清霜，王将军之武库16。家君作宰，路出名区；童子何知，躬逢胜饯17。
      时维九月，序属三秋18。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路19，访风景于崇阿。临帝子之长洲，得天人之旧馆20。层峦耸翠，上出重霄；飞阁流丹，下临无地21。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势22。
      披绣闼，俯雕甍23，山原旷其盈视，川泽纡其骇瞩24。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳25。云销雨霁，彩彻区明26。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨27，雁阵惊寒，声断衡阳之浦28。
      遥襟甫畅，逸兴遄飞29。爽籁发而清风生，纤歌凝而白云遏30。睢园绿竹，气凌彭泽之樽31；邺水朱华，光照临川之笔32。四美具33，二难并。穷睇眄于中天34，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数35。望长安于日下，目吴会于云间36。地势极而南溟深，天柱高而北辰远37。关山难越，谁悲失路之人；萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年38？
      嗟乎！时运不齐39，命途多舛40。冯唐易老，李广难封41。屈贾谊于长沙，非无圣主42；窜梁鸿于海曲，岂乏明时43？所赖君子见机，达人知命44。老当益壮，宁移白首之心45？穷且益坚，不坠青云之志46。酌贪泉而觉爽，处涸辙以犹欢47。北海虽赊，扶摇可接48；东隅已逝，桑榆非晚49。孟尝高洁，空余报国之情50；阮籍猖狂，岂效穷途之哭51！
      勃，三尺微命52，一介书生。无路请缨，等终军之弱冠53；有怀投笔，慕宗悫之长风54。舍簪笏于百龄，奉晨昏于万里55。非谢家之宝树，接孟氏之芳邻56。他日趋庭，叨陪鲤对57；今兹捧袂，喜托龙门58。杨意不逢，抚凌云而自惜59；钟期既遇，奏流水以何惭60？
      呜乎！胜地不常，盛筵难再61；兰亭已矣62，梓泽丘墟63。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公64。敢竭鄙怀，恭疏短引65；一言均赋，四韵俱成66。请洒潘江，各倾陆海云尔67。
      滕王高阁临江渚，佩玉鸣鸾罢歌舞。
      画栋朝飞南浦云，珠帘暮卷西山雨。
      闲云潭影日悠悠，物换星移几度秋。
      阁中帝子今何在？槛外长江空自流。 [2]
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
div.box {
  height: 100%;
  width: 100%;
}

div {
  box-sizing: border-box;
}

div.box {
  display: flex;
}

div.side {
  position: relative;
  height: 100%;
  outline: 1px solid greenyellow;
}

div.content {
  flex: 1;
  height: 100%;
  padding: 0 10px;
}

/* 侧边栏文本样式 */
div.text {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  padding: 0 5px;
  background: #ffffff;
}

/*拖动按钮样式*/
/*拖动bar盒时，父级盒side会被bar盒撑开，又因为text盒的宽高都设为100%，所以改变bar盒就是在改变text盒*/
div.bar {
  width: 200px;
  height: 100%;
  margin-right: -2px;
  /* 因为bar盒子和text盒子是重合的所以必须设置一个负值才能看到我们的拖动按钮*/
  overflow: scroll;
  /* 可设置其他值来进行对别，只可意会，不可言传*/
  resize: horizontal;
  /*水平拖放*/
}

/*因为拖动按钮属于滚动条系列，所以可通过改变滚动来间接改变拖动按钮的样式*/
div.bar::-webkit-scrollbar {
  width: 10px;
  height: 9999px
  /*可设为100%或者其他数值来查看展示效果，只可意会，不可言传*/
}

div.bar::-webkit-resizer {
  /* 设置拖放按钮的背景颜色 */
  background: skyblue;
}
</style>

<!--<template>-->
<!--  <el-card class="app-card-container" shadow="never">-->
<!--    <div class="box" ref="box">-->
<!--      <div class="left" style="background-color: #f1fff5">-->
<!--        <ul>-->
<!--          <li>1</li>-->
<!--          <li>2</li>-->
<!--          <li>3</li>-->
<!--        </ul>-->
<!--      </div>-->
<!--      <div class="resize" title="收缩侧边栏">-->
<!--        ⋮-->
<!--      </div>-->
<!--      <div class="mid" style="background-color: #96b1eb">-->
<!--        <ul>-->
<!--          <li>1</li>-->
<!--          <li>2</li>-->
<!--          <li>3</li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
<!--  </el-card>-->
<!--</template>-->

<!--<script setup>-->

<!--import {onMounted} from "vue";-->

<!--const dragControllerDiv = () => {-->
<!--  let resize = document.getElementsByClassName('resize');-->
<!--  let left = document.getElementsByClassName('left');-->
<!--  let mid = document.getElementsByClassName('mid');-->
<!--  let box = document.getElementsByClassName('box');-->


<!--  //-->
<!--  for (let i = 0; i < resize.length; i++) {-->
<!--    // 鼠标按下事件-->
<!--    resize[i].onmousedown = function (e) {-->
<!--      // 变色提示-->
<!--      resize[i].style.background = '#818181';-->
<!--      let startX = e.clientX;-->
<!--      resize[i].left = resize[i].offsetLeft;-->
<!--      // 鼠标拖动事件-->
<!--      document.onmousemove = function (e) {-->
<!--        let endX = e.clientX;-->
<!--        let moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度-->
<!--        let maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度-->

<!--        if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px-->
<!--        if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px-->

<!--        resize[i].style.left = moveLen; // 设置左侧区域的宽度-->

<!--        for (let j = 0; j < left.length; j++) {-->
<!--          left[j].style.width = moveLen + 'px';-->
<!--          mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px';-->
<!--        }-->
<!--      };-->
<!--      // 鼠标松开事件-->
<!--      document.onmouseup = function (evt) {-->
<!--        //颜色恢复-->
<!--        resize[i].style.background = '#d6d6d6';-->
<!--        document.onmousemove = null;-->
<!--        document.onmouseup = null;-->
<!--        resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉-->
<!--      };-->
<!--      resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获-->
<!--      return false;-->
<!--    };-->
<!--  }-->
<!--}-->

<!--onMounted(() => {-->
<!--  dragControllerDiv();-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--.app-card-container {-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--}-->

<!--::v-deep(.el-card__body) {-->
<!--  height: 100%;-->
<!--}-->

<!--.scrollbar-wrapper {-->
<!--  height: 100%;-->
<!--}-->

<!--.cus-card-header {-->
<!--  height: 32px;-->
<!--}-->

<!--.function-toolbar {-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.query-box {-->
<!--  float: right;-->
<!--  height: 20px;-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.card-table-container {-->
<!--  height: calc(90vh - 150px);-->
<!--  width: calc(100%);-->
<!--  transition: width 1s ease-in-out .5s;-->
<!--}-->

<!--.pagination-toolbar {-->
<!--}-->

<!--.scrollbar-demo-item {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  height: 50px;-->
<!--  margin: 10px;-->
<!--  text-align: left;-->
<!--  border-radius: 4px;-->
<!--  background-color: #fff5f5;-->
<!--  color: #ff9999;-->
<!--  font-weight: bold;-->
<!--//background: var(&#45;&#45;el-color-primary-light-9); //color: var(&#45;&#45;el-color-primary);-->
<!--}-->

<!--::v-deep(.vxe-body&#45;&#45;row.row-red) {-->
<!--  background-color: #ffd6d6;-->
<!--}-->

<!--::v-deep(.vxe-body&#45;&#45;column.col-red) {-->
<!--  background-color: #f37676;-->
<!--}-->

<!--::v-deep(.el-upload-list__item) {-->
<!--  margin: 0;-->
<!--  padding-left: 0;-->
<!--}-->

<!--/* 拖拽相关样式 */-->
<!--/*包围div样式*/-->
<!--.box {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  margin: 1% 0;-->
<!--  overflow: hidden;-->
<!--  box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);-->
<!--}-->

<!--/*左侧div样式*/-->
<!--.left {-->
<!--  width: calc(21% - 10px); /*左侧初始化宽度*/-->
<!--  height: 100%;-->
<!--  background: #FFFFFF;-->
<!--  float: left;-->
<!--}-->

<!--/*拖拽区div样式*/-->
<!--.resize {-->
<!--  cursor: col-resize;-->
<!--  float: left;-->
<!--  position: relative;-->
<!--  top: 45%;-->
<!--  background-color: #d6d6d6;-->
<!--  border-radius: 5px;-->
<!--  margin-top: -10px;-->
<!--  width: 10px;-->
<!--  height: 50px;-->
<!--  background-size: cover;-->
<!--  background-position: center;-->
<!--  /*z-index: 99999;*/-->
<!--  font-size: 32px;-->
<!--  color: white;-->
<!--}-->

<!--/*拖拽区鼠标悬停样式*/-->
<!--.resize:hover {-->
<!--  color: #444444;-->
<!--}-->

<!--/*右侧div'样式*/-->
<!--.mid {-->
<!--  float: right;-->
<!--  width: 78%; /*右侧初始化宽度*/-->
<!--  height: 100%;-->
<!--  background: #fff;-->
<!--  box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);-->
<!--}-->
<!--</style>-->