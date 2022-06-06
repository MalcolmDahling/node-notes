import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { CreateDocument } from './components/CreateDocument/CreateDocument';
import { Home } from './components/Home/Home';
import { LoggedIn } from './components/LoggedIn/LoggedIn';
import { NotFound } from './components/NotFound/NotFound';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/loggedIn" element={<LoggedIn></LoggedIn>}></Route>
                <Route path="/createDocument" element={<CreateDocument></CreateDocument>}></Route>
                <Route path="/*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
