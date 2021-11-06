import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";

export default function SmoothScroll() {
  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);

    Scrollbar.init(document.body, {
      damping: 0.03,
      renderByPixels: false,
      continuousScrolling: false,
      plugins: {
        overscroll: false,
      },
    });

    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);

  return null;
}
