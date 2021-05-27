import React from "react";
import { useScript } from "../hooks/useScript";
import "../JSapplication/echarts";
import "../JSapplication/FraMauroMap1";

export default function Framauro() {
  useScript("../JSapplication/echarts");
  useScript("../JSapplication/FraMauroMap1");

  return (
    <div>
      <div id="background"></div>
      <div class="page_container">
        <div class="wrapper">
          <div style="position: relative">
            <div
              id="hist_map_container"
              style="height: calc(100vh - 45px)"
            ></div>
          </div>
          <div id="multiSpectralCont">
            <div id="multiSpectral"></div>
          </div>
          <div id="videoCont"></div>

          {/* <div id="cont_map_container"></div>
          <div id="globe_container"></div>
          <div id="visualization_container"></div> */}

          <div id="shipDraggable" class="draggable"></div>
          <div id="infographDraggable"></div>
          <div id="ehmSearchDraggable"></div>
          <div id="introDraggable"></div>
        </div>
      </div>
    </div>
  );
}
