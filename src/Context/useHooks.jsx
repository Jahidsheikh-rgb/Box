import React from 'react';

import { use } from 'react';
import { Authcontest } from './AuthContext';


const useHooks = () => {
    const authInfo = use(Authcontest);

    return authInfo;
};

export default useHooks;