const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f56551]/5 to-orange-100/5 dark:from-[#f56551]/10 dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative flex flex-col items-center">
        <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-[#f56551]" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );

  export default FeatureCard;