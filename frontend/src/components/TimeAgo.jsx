import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ date, addSuffix }) => {
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {formatDistanceToNow(new Date(date), {
        addSuffix: addSuffix,
      })}
    </>
  );
};

export default TimeAgo;
