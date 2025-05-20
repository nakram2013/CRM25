import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

// export default [index("routes/home.tsx")] satisfies RouteConfig;


export default [
    //index("routes/home.tsx"),
    // route("about", "./about.tsx"),
  
    layout("./routes/auth/layout.tsx", [
      route("login", "./routes/auth/login.tsx"),
      route("register", "./routes/auth/register.tsx"),
    ]),
    layout("./routes/layouts/_layout.tsx", [
      route("/", "./dashboard/dashboard.tsx"),
      route("Leads/:id?", "./leads/leads.tsx"),
      route("Lead/:id", "./leads/lead-preview.tsx"),
      route("Users/:id?", "./users/users.tsx"),
      route("Integrations/Facebook", "./integrations/facebook/fb.tsx"),
    //   route("register", "./auth/register.tsx"),
    ]),
  
    // ...prefix("concerts", [
    //   index("./concerts/home.tsx"),
    //   route(":city", "./concerts/city.tsx"),
    //   route("trending", "./concerts/trending.tsx"),
    // ]),
  ] satisfies RouteConfig;