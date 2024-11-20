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
        className="w-full"
        onFocus={() => setIsOpen(true)}
      />
      
      {isOpen && options.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "px-4 py-2 cursor-pointer hover:bg-gray-100",
                "text-sm"
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
