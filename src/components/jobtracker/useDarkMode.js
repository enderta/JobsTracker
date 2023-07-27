import {useEffect, useState} from 'react';

const useDarkMode = (initialMode = true) => {
    const [darkMode, setDarkMode] = useState(initialMode);

    useEffect(() => {
        const bodyClassList = document.body.classList;

        if (darkMode) {
            bodyClassList.add('bg-dark', 'text-white');
        } else {
            bodyClassList.remove('bg-dark', 'text-white');
        }
    }, [darkMode]);

    return [darkMode, setDarkMode];
};

export default useDarkMode;