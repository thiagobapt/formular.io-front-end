import React, { Suspense, lazy } from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Importação do JSON de configuração das rotas
import routesConfig from "./JsonData/menulinks.json";

const lazyLoadComponent = (componentName: string) => lazy(() => import(`./Pages/${componentName}/${componentName}`));

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routesConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={React.createElement(lazyLoadComponent(route.component))}
            />
          ))}
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
