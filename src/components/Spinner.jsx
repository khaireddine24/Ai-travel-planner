import { Loader } from "lucide-react";

const Spinner = ({text}) => (
  <div className="min-h-screen flex flex-col items-center justify-center ">
    <Loader className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-spin" />
    <p className="mt-4 text-lg text-purple-800 dark:text-purple-300 animate-pulse">{text}</p>
  </div>
);

export default Spinner;