import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

const RelativeTime = (props: { date: Date }) => {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      const timeAgo = formatDistanceToNow(props.date, {
        addSuffix: true,
      });
      setRelativeTime(timeAgo);
    };
    updateRelativeTime();
    const intervalId = setInterval(updateRelativeTime, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [props.date]);
  return <span className="text-gray-500">{relativeTime}</span>;
};

export default RelativeTime;
