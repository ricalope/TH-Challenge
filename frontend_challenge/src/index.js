import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import App from './App';
import configureStore from './store';
import './index.css';

const store = configureStore();

function Root() {
    return (
        <ReduxProvider store={store}>
            <ModalProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ModalProvider>
        </ReduxProvider>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
