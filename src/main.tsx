import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import App from 'App';
import theme from 'utils/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='customer-service'>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
