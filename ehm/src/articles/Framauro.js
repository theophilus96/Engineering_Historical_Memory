import React from "react";
import { useScript } from "../hooks/useScript";
// import "../JSapplication/echarts";
// import "../JSapplication/FraMauroMap1";

export default function Framauro() {
  //   useScript("../JSapplication/echarts");
  //   useScript("../JSapplication/FraMauroMap1");
  const src = "https://engineeringhistoricalmemory.com/FraMauro.php";
  const width = "100%";
  const height = "100%";

  const demos = {
    soundcloud:
      '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/379775672&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',

    plotly:
      '<iframe src="https://codesandbox.io/embed/q7jmjyplvq?fontsize=14" title="Plotly All Graph Types" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>',

    framauro:
      '<iframe src="https://engineeringhistoricalmemory.com/FraMauro1.php" title="Plotly All Graph Types" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:calc(100vh);;  margin-top:40px; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>',
  };

  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
      />
    );
  }

  return (
    <div>
      {/* <div id="background"></div>
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


          <div id="shipDraggable" class="draggable"></div>
          <div id="infographDraggable"></div>
          <div id="ehmSearchDraggable"></div>
          <div id="introDraggable"></div>
        </div>
      </div> */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `<iframe src='https://engineeringhistoricalmemory.com/FraMauro.php' />`,
        }}
      />
      <iframe
        src="https://engineeringhistoricalmemory.com/FraMauro.php"
        sandbox=""
        title="Fra mauro"
      />
      <iframe
        src={src}
        width={width}
        height={height}
        title="Fra mauro"
      ></iframe>
      <h1>I frame Demo</h1> */}
      <Iframe iframe={demos["framauro"]} allow="autoplay" />,
    </div>
  );
}
