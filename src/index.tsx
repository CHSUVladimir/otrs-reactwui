import './index.css';
import reportWebVitals from './reportWebVitals';
import OTRSConnector from './OTRS/OTRSConnector';
import OTRSDisplay from './OTRS/OTRSDisplay';

export {default as AwaitSpinner} from './Elements/AwaitSpinner';
export type {TicketGroupType, ITicketGroup} from './DashBoard/TicketGroup';
export type { 
  IDivToSafe, IElementToSafe, IHeaderSafe, IInputToSafe, ILabelToSafe, IPanel, IPanelProps, IPanelState, IQueue, IQueueForm,
  IQueueTree, ISafeElement, ISelectOption, ISelectToSafe, IStep, ITextAreaToSafe, IxTickToSafe, PrimitiveType, ElementsType, Parameters,

} from './Queues/index';
export {default as TicketGroup} from './DashBoard/TicketGroup';
export {default as OTRSWUI} from './App';
export {default as OTRSConnector} from './OTRS/OTRSConnector'



Object.defineProperty(global,'OTRSDisplay',{value:OTRSDisplay});
Object.defineProperty(global,'OTRSConnector',{value:OTRSConnector});//(OTRS:IOTRS)=>OTRSConnector(OTRS), writable:false});




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
