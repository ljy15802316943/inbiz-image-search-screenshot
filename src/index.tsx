import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { iconClose } from './components/icon';
import { LoadingOutlined } from '@ant-design/icons';
import axios from './components/axios';
import Cookies from 'js-cookie';
import "cropperjs/dist/cropper.css";
// import 'antd/dist/antd.min.css';
import './index.less';

interface propsType {
  token?:string;//请求koken。
  imgUrl: string;//图片地或者base64.
  uploadUrl?:string;//获取图片列表接口地址
  visible: boolean;//显示组件
  onCancel?:Function;//关闭组件回调
  onOk?:Function;//上传完成获取图片结果
  style?: any;
  className?:string;//自定义样式
  themeColor?: string;//主题色
  close?:boolean;//是否支持点击组件外关闭组件。
};

export const InbizImageSearchScreenshot: React.FC<propsType> = (props) => {
  const {
    themeColor="#1989fa",
    visible=false,
    // imgUrl="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F033021091503%2F210330091503-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674020756&t=f284a347e2b6f0424fb79dddc27fc4bd"
  } = props;

  const [load, setLoad] = useState<boolean>(false);
  const [copeValue, setCopeValue] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<string>('');

  // 绑定截图-ref
  const cropperRef = useRef<any>(null);

  // 截图事件定时器
  let cropTimer:any = null;
  const onCrop = () => {
    //截图事件
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    // 节流
    clearTimeout(cropTimer);
    cropTimer = setTimeout(() => {
      if (cropper.getCroppedCanvas() && cropper.getCroppedCanvas().toDataURL()) {
        setCopeValue(cropper.getCroppedCanvas().toDataURL() || '');
      }
    }, 16);
  };

  useEffect(() => {
    if (props.imgUrl) {
      setImgUrls(props.imgUrl);
    };
  }, [props.imgUrl]);

  useEffect(() => {
    if (props.close) {
      document.addEventListener('click', () => {
        props.onCancel&&props.onCancel();
      });
    };
  }, []);

  const base64ToFile = (baseData:string) => {
    let arr:any = baseData.split(',');
    let type = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]);
    let n = bytes.length;
    let bufferArray = new Uint8Array(n);
    while (n--) {
      bufferArray[n] = bytes.charCodeAt(n);
    }
    return new File([bufferArray], 'test' + Math.random() + '.jpg', { type: type });
  };

  //截图请求
  const onOk = () => {
    if (!props.uploadUrl) {
      return;
    };
    setLoad(true);
    Cookies.set('token', props.token||'');
    let formData = new window.FormData();
    formData.append('file', base64ToFile(copeValue));
    axios.post(props.uploadUrl, formData).then((res:any) => {
      setLoad(false);
      props.onOk&&props.onOk(res);
      if (res.nResult=='0') {
        cropperRef.current.src = copeValue;
        setImgUrls(copeValue);
      }
    })
  };

  return (
    <div className={`cropperBox ${props.className||''}`} onClick={e=>e.stopPropagation()} style={{...(props.style||{}), visibility: visible?'visible':'hidden'}}>
      <div className="close" onClick={()=>props.onCancel&&props.onCancel()} dangerouslySetInnerHTML={{ __html: iconClose }} />
      <h3 className="title">请框选图片中要识别的区域</h3>
      <div className="cropper">
        <Cropper
          src={imgUrls}
          style={{ height: 200, width: '100%', backgroundColor: '#ededed' }}
          zoomTo={0.8} // 透明度
          initialAspectRatio={1}
          preview=".img-preview"
          viewMode={1}
          guides={false}
          crop={onCrop}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false} // 关闭背景色
          responsive={false} //
          zoomable={false} //是否允许缩放图像
          checkOrientation={false}
          ref={cropperRef}
        />
      </div>
      <div className='spin' style={{visibility: load?'visible':'hidden'}} onClick={(e)=>e.stopPropagation()}>
        <LoadingOutlined style={{fontSize: 38, color: themeColor}} />
      </div>
      <div className="btn">
        <div className="ok" style={{background: themeColor}} onClick={onOk}>确 定</div>
      </div>
    </div>
  )
};