import React, {FunctionComponent, useEffect, useState} from "react";
import "./index.less";

const twoPoint = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
};

interface OpenAttribute {
  x: number;
  y: number
}

// interface Ve {
//   x1: number,
//   x2: number,
//   y1: number,
//   y2: number
// }

let startX: number, startY: number;

const ImgOpen: FunctionComponent = () => {
  const [stv, setStv] = useState({
    offsetX: 30, //剪裁图片左上角坐标x
    offsetY: 170, //剪裁图片左上角坐标y
    zoom: false, //是否缩放状态
    distance: 0, //两指距离
    scale: 1, //缩放倍数
    rotate: 0, //旋转角度,
    offsetLeftX: 0,
    offsetLeftY: 0,
  });
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setStv({...stv})

  }, []);

  const touchstartCallback = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const {clientX, clientY} = e.touches[0];
      startX = clientX;
      startY = clientY;
      // touchStartEvent = e.touches;
    } else {
      const xMove = e.touches[1].clientX - e.touches[0].clientX;
      const yMove = e.touches[1].clientY - e.touches[0].clientY;
      const distance = Math.sqrt(xMove * xMove + yMove * yMove);
      twoPoint.x1 = e.touches[0].pageX * 2;
      twoPoint.y1 = e.touches[0].pageY * 2;
      twoPoint.x2 = e.touches[1].pageX * 2;
      twoPoint.y2 = e.touches[1].pageY * 2;
      const obj = {} as {
        distance: number;
        zoom: boolean;
      };
      obj["distance"] = distance;
      obj["zoom"] = true; //缩放状态
      setStv({
        ...stv,
        ...obj,
      });
    }
  };

  const touchendCallback = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) {
      const obj = {} as {
        zoom: boolean;
      };
      obj["zoom"] = false; //重置缩放状态
      setStv({
        ...stv,
        ...obj,
      });

      localStorage.setItem(
        "posterLocaStv",
        JSON.stringify({
          ...stv,
          ...obj,
        }),
      );
    }
  };

  // //计算叉乘
  const calculateVC = (vector1: { x: number; y: number }, vector2: { x: number; y: number }) => {
    return vector1.x * vector2.y - vector2.x * vector1.y > 0 ? 1 : -1;
  };

  //计算点乘
  const calculateVM = (vector1: { x: number; y: number }, vector2: { x: number; y: number }) => {
    return (
      (vector1.x * vector2.x + vector1.y * vector2.y) /
      (Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y) *
        Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y))
    );
  };

  const vector = function (open: OpenAttribute, x1: number, y1: number, x2: number, y2: number) {
    const open2 = open;
    open2.x = x2 - x1;
    open2.y = y2 - y1;
    return open2;
  };

  /**
   * fn:延时调用函数
   * delay:延迟多长时间
   * mustRun:至少多长时间触发一次
   */
  const throttle = function (fn: any, delay: number, mustRun: number) {
    let previous: number, timer: number;
    return function (...args: any[]) {
      const now = Number(new Date());
      // args = arguments;
      if (!previous) previous = now;
      const remaining = now - previous;
      if (mustRun && remaining >= mustRun) {
        fn.apply(args);
        previous = now;
      } else {
        clearTimeout(timer);
        timer = window.setTimeout(function () {
          fn.apply(args);
        }, delay);
      }
    };
  };

  const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    //触摸移动中
    if (e.touches.length === 1) {
      //单指移动
      if (stv.zoom) {
        //缩放状态，不处理单指
        return;
      }
      const {clientX, clientY} = e.touches[0];
      const offsetX = clientX - startX;
      const offsetY = clientY - startY;
      startX = clientX;
      startY = clientY;
      //  let { stv } = _this.state;
      const stv2 = {...stv} as {
        offsetX: number;
        offsetY: number;
        zoom: boolean;
        distance: number;
        scale: number;
        rotate: number;
        offsetLeftX: number;
        offsetLeftY: number;
      };
      stv2.offsetX += offsetX;
      stv2.offsetY += offsetY;
      stv2.offsetLeftX = -stv2.offsetX;
      stv2.offsetLeftY = -stv2.offsetLeftY;
      setStv({...stv2});
    } else if (e.touches.length === 2) {
      //计算旋转
      const preTwoPoint = JSON.parse(JSON.stringify(twoPoint));
      twoPoint.x1 = e.touches[0].pageX * 2;
      twoPoint.y1 = e.touches[0].pageY * 2;
      twoPoint.x2 = e.touches[1].pageX * 2;

      const vector1 = vector(
        {x: 0, y: 0},
        preTwoPoint.x1,
        preTwoPoint.y1,
        preTwoPoint.x2,
        preTwoPoint.y2,
      );
      const vector2 = vector({x: 0, y: 0}, twoPoint.x1, twoPoint.y1, twoPoint.x2, twoPoint.y2);
      const cos = calculateVM(vector1, vector2);
      const angle = (Math.acos(cos) * 180) / Math.PI;

      const direction = calculateVC(vector1, vector2);
      const _allDeg = direction * angle;

      if (Math.abs(_allDeg) > 1) {
        const obj = {} as {
          rotate: number;
        };
        obj["rotate"] = stv.rotate + _allDeg;

        setStv({...stv, ...obj});

      } else {
        //双指缩放
        const xMove = e.touches[1].clientX - e.touches[0].clientX;
        const yMove = e.touches[1].clientY - e.touches[0].clientY;
        const distance = Math.sqrt(xMove * xMove + yMove * yMove);

        const distanceDiff = distance - stv.distance;
        const newScale = stv.scale + 0.005 * distanceDiff;
        if (newScale < 0.2 || newScale > 2.5) {
          return;
        }
        const obj = {} as {
          distance: number;
          scale: number;
        };
        obj["distance"] = distance;
        obj["scale"] = newScale;

        setStv({...stv, ...obj});
      }
    } else {
      return;
    }
  };

  //为touchMove函数节流
  const fn = (e: React.TouchEvent<HTMLDivElement>) => {
    throttle(touchMove(e), 10, 10)
  };

  const touchmoveCallback = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    fn(e);
  };

  return (
    <div className="open_page">

      <div
        className="img"
        onTouchStart={(e) => touchstartCallback(e)}
        onTouchMove={(e) => touchmoveCallback(e)}
        onTouchEnd={(e) => touchendCallback(e)}
      >

        <img
          style={{
            transform: `translate(${stv.offsetX}px,${stv.offsetY}px) scale(${stv.scale}) rotate(${stv.rotate}deg)`,
            width: `330px`,
            height: `330px`,
            position: "absolute",
          }}
          src={`https://fl-newstore.oss-cn-beijing.aliyuncs.com/images/shareMarketingTheme/openimng.png`}
        />

        <div className="cropper_seawave">

          <img src={`https://file-aliyun-s1.firstleap.cn/referral/20201229/160924134697786fafd.png`}/>
        </div>
      </div>
    </div>
  );
};

export default ImgOpen;
