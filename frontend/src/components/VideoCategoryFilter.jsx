import React from "react";
import { filterTags, categoryIcons } from "../utils/staticData";

const VideoCategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hidden mb-4"> {/* Container */}
      <div className="flex items-center gap-2 md:gap-4 min-w-max"> {/* ScrollRow */}
        {filterTags.map((category) => {
          const Icon = categoryIcons[category];     // IconLookup
          const isSelected = selectedCategory === category; // Selected

          return (
            <button
              key={category}                      // Key
              className={`px-4 py-1.5 rounded-xl text-sm whitespace-nowrap flex items-center gap-1 ${
                isSelected                       // StyleConditional
                  ? category === "All"           // AllCategoryCheck
                    ? "bg-gray-700 text-gray-300" // SelectedAllStyle
                    : "bg-gray-800 hover:bg-slate-300 text-white hover:text-slate-800" // SelectedStyle
                  : "bg-slate-100 text-slate-600 hover:bg-gray-100" // DefaultStyle
              }`}
              onClick={() => setSelectedCategory(category)} // ClickHandler
              aria-pressed={isSelected}          // ARIA
            >
              {Icon && <Icon size={16} />}      {/* Icon */}
              {category}                        {/* Label */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCategoryFilter;
