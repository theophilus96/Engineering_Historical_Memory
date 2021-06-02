import React from "react";

export default function researchTeam() {
  const demos = {
    ResearchTeam:
      '<iframe src="https://engineeringhistoricalmemory.com/Collaborators.php" title="Research Team" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:calc(100vh);  margin-top:20px; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>',
  };

  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
      />
    );
  }

  return <Iframe iframe={demos["ResearchTeam"]} allow="autoplay" />;
}
