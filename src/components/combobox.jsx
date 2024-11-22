import React, { useState, useRef, useEffect } from 'react'
import { Input } from './ui/input'
import { cn } from "@/lib/utils"

export function Combobox({ 
  options, 
  value, 
  onSearch, 
  onSelect, 
  placeholder 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const handleSelect = (selectedValue) => {
    onSelect(selectedValue)
    setIsOpen(false)
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      <Input 
        type="text"
        value={value}
        onChange={(e) => {
          onSearch(e)
          setIsOpen(true)
        }}
        placeholder={placeholder}
        className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        onFocus={() => setIsOpen(true)}
      />
      
      {isOpen && options.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg dark:shadow-gray-900/50 max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
                "text-sm dark:text-gray-200"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
