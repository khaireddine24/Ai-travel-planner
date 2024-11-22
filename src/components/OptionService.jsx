import React from 'react';

const OptionService = ({ title, options, onSelect, selectedValue }) => {
  return (
    <div>
      <h2 className="text-xl my-3 font-medium dark:text-white">{title}</h2>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {options.map((item, index) => (
          <div
            key={index}
            className={`p-4 border dark:border-gray-700 rounded-lg cursor-pointer 
              hover:shadow-lg dark:hover:shadow-gray-900/50 
              transition-all duration-200
              ${
                selectedValue === (item.people || item.title)
                  ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30'
                  : 'dark:bg-gray-800'
              }`}
            onClick={() => onSelect(item.people || item.title)}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <h2 className="font-bold text-lg dark:text-white">{item.title}</h2>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">
              {item.description}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionService;