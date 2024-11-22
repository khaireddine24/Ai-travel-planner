import { StatDetails } from "@/constants/option";

const Stats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-12">
      {StatDetails.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-[#f56551]">{stat.number}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );

  export default Stats;