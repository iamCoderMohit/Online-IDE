import React from 'react'

function LangSelector({language, onSelect}) {
    const languages = ['python', 'javascript', 'typescript', 'java', 'csharp', 'php']
  return (
    <div className='flex flex-col gap-5 mb-10'>
        <div className='text-white text-lg font-bold w-fit p-2 rounded-lg'>
            Select Language : 
        </div>
        <select name="" id="" className='text-white cursor-pointer font-bold bg-gray-800 rounded-lg p-2 w-fit'
        onChange={(e) => onSelect(e.target.value)}
        >
            {languages.map((lang) => (
                <option
                className={lang === language ? 'bg-gray-700 font-bold' : 'bg-gray-800 font-bold text-white'}
                value={lang}>{lang}</option>
            ))}
        </select>
    </div>
  )
}

export default LangSelector