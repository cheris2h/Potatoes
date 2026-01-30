import { useEffect, useState } from "react";

import f1 from "../assets/loading_doctor_1.png";
import f2 from "../assets/loading_doctor_2.png";
import f3 from "../assets/loading_doctor_3.png";

export default function LoadingDoctor({text="불러오는 중..."}){
    const frames =[f1,f2,f3,f2];
    const [idx, setIdx]=useState(0);

    useEffect(() => {
    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % frames.length);
    }, 600); // 600ms: 너무 빠르지 않게
    return () => clearInterval(id);
  }, []);

    return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh", gap: 16 }}>
      <img
        src={frames[idx]}
        alt="로딩 중"
        style={{ width: 220, height: "auto" }}
      />
      <div aria-live="polite" style={{ fontSize: 18 }}>
        {text}
      </div>
    </div>
  );
}