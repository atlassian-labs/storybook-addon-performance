import React from 'react';
import { Nullable } from '../types';
import { ServiceType } from './machine';

export default React.createContext<Nullable<ServiceType>>(null);
