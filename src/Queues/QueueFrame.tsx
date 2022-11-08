import React from "react";
import { IQueue, IQueueTree } from ".";

export interface IQueueFrame{
    onClose:()=>void;
    QueueTree:IQueueTree[];
    Queues:IQueue[]; 
}

