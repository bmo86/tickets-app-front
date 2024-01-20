const StatusDisplay = ({status}) => {
  
  const getColor = (status) => {
    switch (status) {
      case "not started":
        return "bg-red-400";
      case "in progress":
        return "bg-yellow-400";
      case "completed":
        return "bg-green-400";
      default: "bg-slate-700";
        return        
    }
  };
  
  return (
    <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(status)}`}>
      {status}
    </span>
  );
};

export default StatusDisplay;
