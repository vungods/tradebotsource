import React, { useState } from "react";

interface ComboBoxProps {
  emptyMessage?: string;
  inputPlaceholder?: string;
  items?: string[];
  value?: string;
  onSelectItem?: any;
}

const ComboBox = ({
  emptyMessage = "No records found",
  inputPlaceholder = "Select an item",
  items = ["Item 1", "Item 2", "Item 3", "Test", "DuyTP1", "Heheeh"],
  value = "",
  onSelectItem,
}: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 10);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSelectItem = (item: string) => {
    setInputValue(item);
    setIsOpen(false);
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const filteredItems = items.filter(
    (item: any) =>
      item.toLowerCase().includes(inputValue.trim().toLowerCase()) === false
  );

  const renderDropdownContent = () => {
    if (filteredItems.length === 0) {
      return (
        <li className="px-4 py-2 text-sm text-gray-700 cursor-default">
          {emptyMessage}
        </li>
      );
    }

    return filteredItems.map((item) => (
      <li
        key={item}
        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
        onMouseDown={() => handleSelectItem(item)}
      >
        {item}
      </li>
    ));
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        placeholder={inputPlaceholder}
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1">{renderDropdownContent()}</ul>
        </div>
      )}
    </div>
  );
};

export default ComboBox;
