# 组件使用tsdx框架开发的npm包。

![image](https://raw.githubusercontent.com/ljy15802316943/inbiz-image-search-screenshot/main/src/images/file.png)

## 安装依赖

```bash
npm install inbiz-image-search-screenshot
```

## 页面引入
```bash
import { InbizImageSearchScreenshot } from 'inbiz-image-search-screenshot';
```

```bash
示例
<InbizImageSearchScreenshot 
  visible={true}
  imgUrl="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F033021091503%2F210330091503-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674020756&t=f284a347e2b6f0424fb79dddc27fc4bd"
/>

```

## 参数描述

```bash
interface propsType {
  token:string;//请求koken。
  imgUrl: string;//图片地或者base64.
  listUrl:string;//获取图片列表接口地址
  visible: boolean;//显示组件
  onCancel:Function;//关闭组件回调
  onOk?:Function;//上传完成获取图片结果
  style?: any;
  className?:string;//自定义样式
  themeColor?: string;//主题色
  close?:boolean;//是否支持点击组件外关闭组件。
};
```
