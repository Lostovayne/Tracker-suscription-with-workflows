```mermaid
graph TD;
    A[Inicio] --> B[Controladores];
    B --> C[auth.controller.ts];
    C --> D[signIn];
    C --> E[signOut];
    C --> F[signUp];
    B --> G[Middleware];
    G --> H[error.middleware.ts];
    H --> I[errorMiddleware];
    H --> J[ErrorType];
    B --> K[Configuración];
    K --> L[env.ts];
    L --> M[PORT];
    L --> N[NODE_ENV];
    L --> O[DB_URI];
    L --> P[JWT_SECRET];
    A --> Q[Fin];