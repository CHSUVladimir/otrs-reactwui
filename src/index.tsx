import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { IDialogs, IOTRS } from './App';
import reportWebVitals from './reportWebVitals';

export {default as AwaitSpinner} from './Elements/AwaitSpinner';
export type {TicketGroupType, ITicketGroup} from './DashBoard/TicketGroup';
export {default as TicketGroup} from './DashBoard/TicketGroup';
export {default as OTRSWUI} from './App';


const drel = document.createElement('div');
document.body.appendChild(drel);
const dialog = ReactDOM.createRoot(drel);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
function OTRSConnector(o:IOTRS){
  o.Dialogs=setDialogsSettings(o);
  root.render(
    <React.StrictMode>
      <App 
        ExternalAwait={o.ExternalAwait} 
        URLS={o.URLS} 
        OTRSSession={o.OTRSSession}
        OTRSSettings={o.OTRSSettings}
        Dialogs={o.Dialogs}
        MenuSettings={o.MenuSettings}
      />
    </React.StrictMode>
  );
}

function setDialogsSettings(o:IOTRS):IDialogs{
  o.Dialogs=o.Dialogs??{
    MenuRoot:dialog
  };
  o.Dialogs.MenuRoot=o.Dialogs.MenuRoot??dialog;
  return o.Dialogs;
}

//Object.defineProperties(OTRS, { UserName: { value:(u:string)=>{UserName=u} } });

Object.defineProperty(global,'OTRSConnector',{value:(OTRS:IOTRS)=>OTRSConnector(OTRS), writable:false});




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
