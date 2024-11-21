import React from 'react';

const OptionService = ({ title, options, onSelect, selectedValue }) => {
  return (
    <div>
      <h2 className="text-xl my-3 font-medium">{title}</h2>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {options.map((item, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
              selectedValue === (item.people || item.title) ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => onSelect(item.people || item.title)}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <h2 className="font-bold text-lg">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.description}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionService;