import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.less';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <HashRouter>
        <App />
    </HashRouter>,
);
